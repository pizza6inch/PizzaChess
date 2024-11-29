import React from "react";
import { useWebSocket } from "./WebSocketProvider";
import { UseSelector } from "react-redux";

const Test = () => {
  const { sendMessage } = useWebSocket();

  const { playerToken } = UseSelector((state) => state.user);

  const handleRegister = () => {
    const payload = {
      displayName: "test",
      email: "test",
      password: "test",
      rating: 0,
    };
    sendMessage("register", payload);
  };

  return (
    <div>
      <h1>Test</h1>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Test;
