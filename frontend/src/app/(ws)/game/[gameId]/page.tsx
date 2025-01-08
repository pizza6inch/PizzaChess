"use client";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useWebSocket } from "@/contexts/WebSocketProvider";
import { useEffect, useState, useRef, use } from "react";

import ChessGame from "@/components/ChessBoard";
import { setIsFetching } from "@/redux/slices/webSocketSlice";
import { toast } from "react-toastify";
import { GameDetail, Player } from "@/types/webSocket";

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

    if (playerInfo) return;

    const payload = {
      playerToken: playerToken,
    };
    console.log(playerInfo);

    getPlayerInfo(payload);
  }, [wsConnected, user]);

  useEffect(() => {
    if (!wsConnected) return;
    const playerToken = sessionStorage.getItem("playerToken");
    if (!playerToken) return;
    if (!playerInfo) return;

    if (!currentGame) {
      const payload = {
        playerToken: playerToken,
        gameId: gameId,
      };
      console.log(currentGame);

      spectateGame(payload);
    }
    // if (currentGame && currentGame.gameId !== gameId) {
    //   router.push(`/game/${currentGame.gameId}`);
    // }
  }, [wsConnected, currentGame]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4 md:flex-row">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:items-start">
        {currentGame && playerInfo && (
          <PlayerText
            currentGame={currentGame}
            playerInfo={playerInfo}
            role="opponent"
          />
        )}
        <div className="relative h-[80vw] w-[80vw] md:h-[700px] md:w-[600px]">
          <ChessGame />

          <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-red-700">
            {currentGame?.white && currentGame?.black ? (
              <button>Start Game</button>
            ) : (
              <button>Waiting for opponent</button>
            )}
          </div>
        </div>
        {currentGame && playerInfo && (
          <PlayerText
            currentGame={currentGame}
            playerInfo={playerInfo}
            role="self"
          />
        )}
      </div>
      <div className="h-[400px] w-[80vw] rounded-xl bg-slate-200 md:h-full md:w-[400px]"></div>
    </div>
  );
};

export default GamePage;

const PlayerText = ({
  currentGame,
  playerInfo,
  role,
}: {
  currentGame: GameDetail;
  playerInfo: Player;
  role: "self" | "opponent";
}) => {
  const getOpponent = () => {
    if (currentGame?.black?.id === playerInfo.id) return currentGame?.white;
    if (currentGame?.white?.id === playerInfo.id) return currentGame?.black;
    return null;
  };

  const getSelf = () => {
    if (currentGame?.black?.id === playerInfo.id) return currentGame?.black;
    if (currentGame?.white?.id === playerInfo.id) return currentGame?.white;
    return null;
  };

  const target = role === "opponent" ? getOpponent() : getSelf();

  return target ? (
    <p>{`${target?.displayName} (${target?.rating})`}</p>
  ) : (
    <p>{role === "opponent" ? "等待值得一戰的對手" : "你不在此局中"}</p>
  );
};
