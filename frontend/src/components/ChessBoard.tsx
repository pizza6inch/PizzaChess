import React, { useState } from "react";
import { Chess, Square } from "chess.js";

import Chessground from "@react-chess/chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

const ChessGame = () => {
  const [fen, setFen] = useState("start");
  const [chess, setChess] = useState(new Chess());
  const [dests, setDests] = useState(new Map());

  const [currentColor, setCurrentColor] = useState<
    "white" | "black" | "both" | undefined
  >("white");

  const afterHandler = (orig: string, dest: string) => {
    if (currentColor === "white") {
      setCurrentColor("black");
    } else {
      setCurrentColor("white");
    }
    chess.move({ from: orig, to: dest });
    console.log(currentColor, orig, dest);
  };

  // console.log(chess.moves());

  const getDest = () => {
    const dests = new Map();
    chess.moves().forEach((move) => {
      // console.log(move);
    });
  };
  // console.log(getDest());

  return (
    <Chessground
      config={{
        fen: chess.fen(),
        movable: {
          free: false,
          color: currentColor,
          dests: dests,
          // valid moves. {"a2" ["a3" "a4"] "b1" ["a3" "c3"]}
          events: {
            after: afterHandler,
          },
        },
        events: {
          // move: (from, to) => {
          //   console.log(from, to);
          // },
          select: (key) => {
            console.log(chess.moves({ square: key as Square, verbose: true }));
            const moves = chess.moves({ square: key as Square, verbose: true });
            const dest = moves.map((move) => move.to);

            setDests(dests.set(key, dest));
          },
        },
      }}
    />
  );
};

export default ChessGame;
