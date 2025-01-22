"use client";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useWebSocket } from "@/contexts/WebSocketProvider";
import { useEffect, useState, useRef, use } from "react";

import ChessGame from "@/components/ChessBoard";

import { toast } from "react-toastify";
import { GameDetail, Player } from "@/types/webSocket";
import { motion } from "framer-motion";

const GamePage = () => {
  const { leaveGame, register, login, startGame } = useWebSocket();

  const { games, playerInfo, currentGame, wsConnected } = useSelector(
    (state: RootState) => state.websocket,
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const pathname = usePathname();

  const gameId = pathname.split("/")[2];

  useEffect(() => {
    if (!wsConnected) return;
    if (!playerInfo) return;
    if (!currentGame) window.location.href = `/room`;
    if (currentGame?.gameId !== gameId) window.location.href = `/room`;
  }, [currentGame, playerInfo]);

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
    }

    if (playerToken) {
      const payload = {
        playerToken: playerToken,
      };
      login(payload);
    }
  }, [wsConnected, user]);

  const handleLeaveGame = () => {
    const playerToken = sessionStorage.getItem("playerToken");
    if (!playerToken) return;
    const payload = {
      gameId: gameId,
      playerToken,
    };

    leaveGame(payload);
  };

  const handleStartGame = () => {
    const playerToken = sessionStorage.getItem("playerToken");
    if (!playerToken) return;
    if (!playerInfo?.gameOwnerToken) return;
    const payload = {
      gameId: gameId,
      gameOwnerToken: playerInfo.gameOwnerToken,
      playerToken,
    };
    startGame(payload);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4 lg:flex-row">
      <div className="flex h-full flex-col items-center justify-center gap-4 lg:items-start">
        {currentGame && playerInfo && (
          <PlayerText
            currentGame={currentGame}
            playerInfo={playerInfo}
            role="opponent"
          />
        )}
        <div className="relative h-[80vw] w-[80vw] lg:h-[600px] lg:w-[600px]">
          <ChessGame />
          {currentGame?.gameState === "waiting" && (
            <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-red-700">
              {currentGame?.white && currentGame?.black ? (
                <div>Waiting for game to start</div>
              ) : (
                <div>Waiting for opponent</div>
              )}
            </div>
          )}
        </div>
        {currentGame && playerInfo && (
          <PlayerText
            currentGame={currentGame}
            playerInfo={playerInfo}
            role="self"
          />
        )}
      </div>
      <div className="h-[600px] w-[80vw] rounded-xl bg-gray-800 p-5 lg:h-[600px] lg:w-[300px]">
        <div className="flex h-full w-full flex-col items-center gap-4">
          <div className="h-[200px]"></div>
          <hr className="w-full bg-white" />
          <div className="flex w-full flex-col items-center gap-4">
            {playerInfo?.gameOwnerToken && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-[60%] rounded-xl border border-black bg-red-700 p-4 font-Abril_Fatface text-xl text-white"
                onClick={handleStartGame}
              >
                Start Game
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-[60%] rounded-xl border border-black bg-red-700 p-4 font-Abril_Fatface text-xl text-white"
              // className="w-[80%] rounded-xl bg-transparent p-4 font-Abril_Fatface text-xl text-red-700"
              onClick={handleLeaveGame}
            >
              Leave Game
            </motion.button>
          </div>
        </div>
      </div>
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
    return currentGame.black; // spectator
  };

  const getSelf = () => {
    if (currentGame?.black?.id === playerInfo.id) return currentGame?.black;
    if (currentGame?.white?.id === playerInfo.id) return currentGame?.white;
    return currentGame.white; // spectator
  };

  const target = role === "opponent" ? getOpponent() : getSelf();

  return target ? (
    <p>{`${target?.displayName} (${target?.rating})`}</p>
  ) : (
    <p>等待值得一戰的對手</p>
  );
};
