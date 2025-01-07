"use client";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useWebSocket } from "@/contexts/WebSocketProvider";
import { useEffect, useState, useRef } from "react";

import ChessGame from "@/components/ChessBoard";

const GamePage = () => {
  const { spectateGame, leaveGame, register, getPlayerInfo } = useWebSocket();

  const { gameOwnerToken, games, playerInfo, currentGame, wsConnected } =
    useSelector((state: RootState) => state.websocket);

  const { user } = useSelector((state: RootState) => state.auth);

  const pathname = usePathname();
  const router = useRouter();

  const [gameId, setGameId] = useState("");
  const [playerToken, setPlayerToken] = useState("");

  useEffect(() => {
    setGameId(pathname.split("/")[2]);
  }, [pathname]);

  useEffect(() => {
    if (!wsConnected) return;
    const playerToken = sessionStorage.getItem("playerToken");

    if (!playerToken) return;

    if (!currentGame) {
      const payload = {
        playerToken: playerToken,
        gameId: gameId,
      };
      spectateGame(payload);
      return;
    }

    if (currentGame.gameId !== gameId) {
      const newPayload = {
        playerToken: playerToken,
        gameId: gameId,
      };
      spectateGame(newPayload);
    }
  }, [wsConnected, currentGame, router]);

  useEffect(() => {
    const playerToken = sessionStorage.getItem("playerToken");
    const accessToken = sessionStorage.getItem("accessToken");

    const handleRegister = (displayName: string, rating: number) => {
      const payload = {
        displayName: displayName,
        rating: rating,
      };
      register(payload);
    };

    if (!wsConnected) return;

    // 如果沒有playerToken就向ws server 註冊一個
    if (!playerToken) {
      if (accessToken) {
        if (user) {
          handleRegister(user.displayName, user.rating);
        }
      } else {
        // generate random string as display name
        const randomName = Math.random().toString(36).substring(2, 6);
        handleRegister(`${randomName}_guest`, 1200);
      }
      window.location.reload();
    }

    if (playerToken) {
      const payload = {
        playerToken: playerToken,
      };
      getPlayerInfo(payload);
    }
  }, [wsConnected, user]);

  return (
    <div className="flex h-[90vh] items-center justify-center gap-4 py-4">
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="">
          {currentGame?.black?.id === playerInfo.id ? (
            <p>{`${currentGame?.white?.displayName} (${currentGame?.white?.rating})`}</p>
          ) : (
            <p>{`${currentGame?.black?.displayName} (${currentGame?.black?.rating})`}</p>
          )}
        </div>
        <div className="relative">
          <ChessGame />
          <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-red-700">
            {currentGame?.white && currentGame?.black ? (
              <button>Start Game</button>
            ) : (
              <button>Waiting for opponent</button>
            )}
          </div>
        </div>
        <div className="">
          {currentGame?.black?.id === playerInfo.id ? (
            <p>{`${currentGame?.black?.displayName} (${currentGame?.black?.rating})`}</p>
          ) : (
            <p>{`${currentGame?.white?.displayName} (${currentGame?.white?.rating})`}</p>
          )}
        </div>
      </div>
      <div className="h-full w-[400px] rounded-xl bg-slate-200"></div>
    </div>
  );
};

export default GamePage;
