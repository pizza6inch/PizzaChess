"use client";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useWebSocket } from "@/contexts/WebSocketProvider";
import { useEffect, useState, useRef, use } from "react";

import ChessGame from "@/components/ChessBoard";
import { setIsFetching } from "@/redux/slices/webSocketSlice";
import { toast } from "react-toastify";

const GamePage = () => {
  const {
    spectateGame,
    leaveGame,
    register,
    getPlayerInfo,
    getAllGamesStatus,
  } = useWebSocket();

  const { gameOwnerToken, games, playerInfo, currentGame, wsConnected } =
    useSelector((state: RootState) => state.websocket);

  const { user } = useSelector((state: RootState) => state.auth);

  const pathname = usePathname();
  const router = useRouter();

  const gameId = pathname.split("/")[2];

  useEffect(() => {
    if (!wsConnected) return;

    if (!games) {
      getAllGamesStatus();
      return;
    }
    if (!games?.find((game) => game.gameId === gameId)) {
      router.push("/room");
      toast.error("Game not found");
    }
  }, [wsConnected, games]);

  useEffect(() => {
    if (!wsConnected) return;

    const playerToken = sessionStorage.getItem("playerToken");
    const accessToken = sessionStorage.getItem("accessToken");

    const handleRegister = (displayName: string, rating: number) => {
      const payload = {
        displayName: displayName,
        rating: rating,
      };
      register(payload);
    };

    if (!playerToken) {
      if (!accessToken) {
        // generate random string as display name
        const randomName = Math.random().toString(36).substring(2, 6);
        handleRegister(`${randomName}_guest`, 1200);
      }
      if (accessToken) {
        if (!user) return;
        handleRegister(user.displayName, user.rating);
      }
      return;
    }

    if (!user) {
      const payload = {
        playerToken: playerToken,
      };
      getPlayerInfo(payload);
      return;
    }
  }, [wsConnected, user]);

  useEffect(() => {
    if (!wsConnected) return;
    const playerToken = sessionStorage.getItem("playerToken");
    if (!playerToken) return;
    if (!user) return;

    if (!currentGame) {
      const payload = {
        playerToken: playerToken,
        gameId: gameId,
      };
      spectateGame(payload);
    }
    if (currentGame && currentGame.gameId !== gameId) {
      router.push(`/game/${currentGame.gameId}`);
    }
  }, [wsConnected, currentGame]);

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
