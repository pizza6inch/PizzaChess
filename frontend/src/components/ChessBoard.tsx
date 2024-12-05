import React, { useEffect, useState } from "react";
import Chessground from "@react-chess/chessground";
import { Chessground as ChessgroundType } from "@react-chess/chessground";
import "@react-chess/chessground/dist/chessground.css"; // 引入樣式

const ChessGame = () => {
  const [cg, setCg] = useState<ChessgroundType | null>(null);

  const [fen, setFen] = useState("start"); // 初始狀態

  useEffect(() => {
    if (!cg) return;

    cg.set({
      fen: fen, // 設定當前棋盤的 FEN 狀態
    });
  }, [fen, cg]);

  // 移動棋子
  const handleMove = (from: string, to: string) => {
    if (cg) {
      cg.move(from, to); // 使用 move 來移動棋子
      console.log(`Moved from ${from} to ${to}`);
    }
  };

  // 控制棋盤的設置
  const controlPieces = () => {
    if (cg) {
      cg.set({
        pieces: {
          e2: "P", // 放置白兵在 e2
          e4: "p", // 放置黑兵在 e4
        },
      });
    }
  };

  return (
    <div>
      <Chessground
        ref={(el) => {
          if (el) setCg(el);
        }}
        width={400}
        height={400}
        draggable={true}
        dropOffBoard="trash"
        sparePieces={true}
        onMove={(from, to) => {
          handleMove(from, to);
        }}
      />

      <button onClick={controlPieces}>控制棋子</button>
      <button onClick={() => setFen("start")}>重置棋盤</button>
    </div>
  );
};

export default ChessGame;
