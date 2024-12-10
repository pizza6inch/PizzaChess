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
  console.log(currentGame?.black);
  console.log(currentGame?.white);

  console.log(currentGame?.fen);

  const [fen, setFen] = useState<string | undefined>(currentGame?.fen);
  const [validDests, setValidDests] = useState(new Map());

  const [currentColor, setCurrentColor] = useState<
    "white" | "black" | "both" | undefined
  >("white");

  useEffect(() => {
    if (currentGame?.fen) {
      setFen(fen);
    }
  }, [currentGame?.fen]);

  const afterHandler = (orig: string, dest: string) => {
    if (currentColor === "white") {
      setCurrentColor("black");
    } else {
      setCurrentColor("white");
    }
    sendMessage("makeMove", {
      playerToken,
      gameId: currentGame?.gameId,
      move: { from: orig, to: dest },
    });
    console.log(currentColor, orig, dest);
  };

  const onSelect = (key: string) => {
    console.log(fen);

    const chess = new Chess(fen);
    console.log(chess.moves({ square: key as Square, verbose: true }));
    const moves = chess.moves({ square: key as Square, verbose: true });
    const dest = moves.map((move) => move.to);

    setValidDests(validDests.set(key, dest));
  };

  // console.log(chess.moves());

  return (
    <Chessground
      config={{
        fen: fen,
        movable: {
          free: false,
          color: currentColor,
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
