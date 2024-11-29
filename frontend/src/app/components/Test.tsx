import React from "react";
import { useWebSocket } from "./WebSocketProvider";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { time } from "console";

const Test = () => {
  const { sendMessage } = useWebSocket();

  const { playerToken } = useSelector((state: RootState) => state.websocket);

  const handleRegister = () => {
    const payload = {
      displayName: "test",
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

  return (
    <div>
      <h1>Test</h1>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleCreateGame}>Create Game</button>
    </div>
  );
};

export default Test;
