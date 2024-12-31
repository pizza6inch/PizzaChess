import React from "react";

import { GameInfo, player } from "@/types/webSocket";
import { useWebSocket } from "@/contexts/WebSocketProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RoomCard = ({ game }: { game: GameInfo }) => {
  const { joinGame } = useWebSocket();

  const handleJoinGame = () => {
    const playerToken = sessionStorage.getItem("playerToken");

    if (playerToken === null) {
      toast.error("Please login first!");
      return;
    }

    const payload = {
      playerToken: playerToken,
      gameId: game.gameId,
    };

    joinGame(payload);
  };

  const handleSpectateGame = () => {
    console.log("spectate logic");
  };

  return (
    <div className="rounded-xl bg-[#313638] p-4">
      <div className="mb-4 flex justify-between">
        <h2># {game.gameId}</h2>
        <div className="flex">
          <span className="material-symbols-outlined mr-2">visibility</span>
          <p>{game.spectators.length}</p>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div className="w-[40%]">
          {game.white ? (
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined mb-2 scale-[200%] font-bold">
                person
              </span>
              <p className="">{game.white?.displayName}</p>
              <div className="flex">
                <span className="material-symbols-outlined scale-50">star</span>
                <p>{game.white.rating}</p>
              </div>
            </div>
          ) : (
            <div
              className="flex cursor-pointer justify-center"
              onClick={handleJoinGame}
            >
              <span className="material-symbols-outlined scale-[200%] font-bold">
                person_add
              </span>
            </div>
          )}
        </div>
        <p className="text-2xl">VS.</p>
        <div className="w-[40%]">
          {game.black ? (
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined mb-2 scale-[200%] font-bold text-black">
                person
              </span>
              <p className="">{game.black?.displayName}</p>
              <div className="flex">
                <span className="material-symbols-outlined scale-50">star</span>
                <p>{game.black.rating}</p>
              </div>
            </div>
          ) : (
            <div
              className="flex cursor-pointer justify-center"
              onClick={handleJoinGame}
            >
              <span className="material-symbols-outlined scale-[200%] font-bold text-black">
                person_add
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        {game.gameState === "waiting" && (
          <div className="rounded-3xl border-2 border-green-700 bg-green-500 p-2">
            {game.gameState}
          </div>
        )}
        {game.gameState === "in-progress" && (
          <div className="rounded-3xl border-2 border-yellow-700 bg-yellow-500 p-2">
            {game.gameState}
          </div>
        )}
        {game.gameState === "finished" && (
          <div className="rounded-3xl border-2 border-red-700 bg-red-500 p-2">
            {game.gameState}
          </div>
        )}
        <div className="flex items-end gap-2">
          <span className="material-symbols-outlined">timer</span>
          <p>
            {Math.floor(game.timeLimit / 60)}:
            {(game.timeLimit % 60).toString().padStart(2, "0")}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <button
          disabled={game.gameState !== "waiting"}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-green-700 bg-green-500 p-2 font-bold text-white hover:bg-green-600 disabled:border-transparent disabled:bg-gray-600"
          onClick={handleJoinGame}
        >
          <span className="material-symbols-outlined">add</span>
          <p>
            {game.gameState === "waiting" ? "Join Game！" : "room is full！"}
          </p>
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-700 bg-red-500 p-2 font-bold text-white hover:bg-red-600 disabled:border-transparent disabled:bg-gray-600"
          onClick={handleSpectateGame}
        >
          <span className="material-symbols-outlined">visibility</span>
          <p>Spectate Game！</p>
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
