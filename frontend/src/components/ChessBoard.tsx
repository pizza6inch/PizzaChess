"use client"; 
import React, { useState, useEffect } from "react";
import { Chess, Square } from "chess.js";
import { RootState } from "../redux/store";

import Chessground from "@react-chess/chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

import { useSelector } from "react-redux";
import { useWebSocket } from "@/contexts/WebSocketProvider";

const ChessGame = () => {
  const { sendMessage } = useWebSocket();

  const { playerToken, gameOwnerToken, games, playerInfo, currentGame } =
    useSelector((state: RootState) => state.websocket);

  console.log(currentGame?.fen);

  const [validDests, setValidDests] = useState(new Map());

  useEffect(() => {
    console.log("currentGame", currentGame);
    
  }, [currentGame]);

  const afterHandler = (orig: string, dest: string) => {

    sendMessage("makeMove", {
      playerToken,
      gameId: currentGame?.gameId,
      move: { from: orig, to: dest },
    });

  };

  const onSelect = (key: string) => {

    if(currentGame?.isWhiteTurn === true && playerInfo?.id !== currentGame?.white?.id) {
      setValidDests(new Map());
      return;
    }
    if(currentGame?.isWhiteTurn === false && playerInfo?.id !== currentGame?.black?.id) {
      setValidDests(new Map());
      return;
    }
    const chess = new Chess(currentGame?.fen);
    const moves = chess.moves({ square: key as Square, verbose: true });
    const dest = moves.map((move) => move.to);

    setValidDests(validDests.set(key, dest));
  };

  // console.log(chess.moves());

  return (
    <Chessground
      config={{
        fen: currentGame?.fen,
        orientation: currentGame?.black?.id === playerInfo?.id ? "black" : "white", // 觀察者 & 白棋是白方視角
        movable: {
          free: false,
          // color: currentGame?.isWhiteTurn ? "white" : "black",
          dests: validDests,
          events: {
            after: afterHandler,
          },
        },
        events: {
          // move: (from, to) => {
          //   console.log(from, to);
          // },
          select: onSelect,
        },
      }}
    />
  );
};

export default ChessGame;
