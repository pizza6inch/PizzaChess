"use client";
// import { useRouter, usePathname } from "next/navigation";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { useWebSocket } from "@/contexts/WebSocketProvider";
// import { useEffect, useState, useRef } from "react";

import ChessGame from "@/components/ChessBoard";

const GamePage = () => {
  // const { sendMessage } = useWebSocket();

  // const { playerToken, gameOwnerToken, games, playerInfo, currentGame } =
  //   useSelector((state: RootState) => state.websocket);

  // const pathname = usePathname();
  // const router = useRouter();

  // const [gameId, setGameId] = useState("");

  // useEffect(() => {
  //   setGameId(pathname.split("/")[2]);
  // }, [pathname]);

  // if (!currentGame || currentGame.gameId !== gameId) {
  //   if (!playerToken) {
  //     router.push("/");
  //   }
  //   sendMessage("spectateGame", { playerToken, gameId });
  // }

  return (
    <div>
      <h1>Game Page: {1}</h1>
      <p>這是遊戲頁面，遊戲 ID 是 {1}。</p>
      <ChessGame />
    </div>
  );
};

export default GamePage;
