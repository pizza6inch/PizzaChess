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
  const { spectateGame, leaveGame, register, login, startGame } =
    useWebSocket();

  const { gameOwnerToken, games, playerInfo, currentGame, wsConnected } =
    useSelector((state: RootState) => state.websocket);

  const { user } = useSelector((state: RootState) => state.auth);

  const pathname = usePathname();
  const router = useRouter();

  const gameId = pathname.split("/")[2];

  useEffect(() => {
    if (!wsConnected) return;

    if (!games) return;

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

    login(payload);
  }, [wsConnected, user, playerInfo]);

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

  const handleLeaveGame = () => {
    const playerToken = sessionStorage.getItem("playerToken");
    if (!playerToken) return;
    const payload = {
      gameId: gameId,
      playerToken,
    };
    leaveGame(payload);
    router.push("/room");
  };

  const handleStartGame = () => {
    const playerToken = sessionStorage.getItem("playerToken");
    if (!playerToken) return;
    if (!gameOwnerToken) return;
    const payload = {
      gameId: gameId,
      gameOwnerToken: gameOwnerToken,
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
      <div className="h-[600px] w-[80vw] rounded-xl bg-slate-200 lg:h-[600px] lg:w-[300px]">
        {gameOwnerToken && (
          <button onClick={handleStartGame}>Start Game</button>
        )}
        <button onClick={handleLeaveGame}>Leave Game</button>
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
