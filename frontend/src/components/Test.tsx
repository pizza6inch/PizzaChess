"use client"; //
import React, { useState, useEffect } from "react";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Test = () => {
  const { sendMessage } = useWebSocket();

  const router = useRouter();

  const { playerToken, gameOwnerToken, games, playerInfo, currentGame } =
    useSelector((state: RootState) => state.websocket);

  const [gameId, setGameId] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (currentGame?.gameState === "in-progress") {
      router.push(`/game/${currentGame.gameId}`);
    }
  }, [currentGame, router]);

  const handleRegister = () => {
    const payload = {
      displayName: displayName,
      email: "test",
      password: "test",
      rating: 0,
    };
    sendMessage("register", payload);
  };

  const handleCreateGame = () => {
    const payload = {
      playerToken: playerToken,
      playWhite: true,
      timeLimit: 300,
    };
    sendMessage("createGame", payload);
  };

  const handleJoinGame = () => {
    const payload = {
      playerToken: playerToken,
      gameId: gameId,
    };
    sendMessage("joinGame", payload);
  };

  const handleLeaveGame = () => {
    const payload = {
      playerToken: playerToken,
      gameId: currentGame?.gameId,
    };
    sendMessage("leaveGame", payload);
  };

  const handleSpectateGame = () => {
    const payload = {
      playerToken: playerToken,
      gameId: gameId,
    };
    sendMessage("spectateGame", payload);
  };

  const handleStartGame = () => {
    const payload = {
      gameOwnerToken: gameOwnerToken,
      playerToken: playerToken,
      gameId: currentGame?.gameId,
    };
    sendMessage("startGame", payload);
  };

  // console.log(playerToken, games, playerInfo);

  return (
    <div>
      <h1>{playerToken ? playerInfo.displayName : "you haven't register"}</h1>
      <div className="flex flex-col h-[400px] justify-between w-[400px]">
        <div className=" flex w-[400px] justify-between">
          <Button onClick={handleRegister}>Register</Button>
          <Input type="text" onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <Button onClick={handleCreateGame}>Create Game</Button>
        <div className=" flex w-[400px] justify-between">
          <Button onClick={handleJoinGame}>Join Game</Button>
          <Input type="text" onChange={(e) => setGameId(e.target.value)} />
        </div>
        <div className=" flex w-[400px] justify-between">
          <Button onClick={handleLeaveGame}>Leave Game</Button>
        </div>
        <div className="flex w-[400px] justify-between">
          <Button onClick={handleSpectateGame}>Spectate Game</Button>
        </div>
        <div className="flex w-[400px] justify-between">
          <Button onClick={handleStartGame}>Start Game</Button>
        </div>
      </div>
      <div>
        <h2>Games</h2>
        <ul>
          {/*   // const { gameId, white, black, spectators, gameState }
           */}
          {games.map((game) => (
            <li key={game.gameId}>
              <h3>{game.gameId}</h3>
              <p>
                White:{" "}
                {game.white?.displayName
                  ? game.white.displayName
                  : "waiting for player..."}
              </p>
              <p>
                Black:{" "}
                {game.black?.displayName
                  ? game.black.displayName
                  : "waiting for player..."}
              </p>
              <div>
                Spectators:
                {game.spectators.map((spectator) => (
                  <span key={spectator.id}>{spectator.displayName}、</span>
                ))}{" "}
              </div>
              <p>Game State: {game.gameState}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Test;
