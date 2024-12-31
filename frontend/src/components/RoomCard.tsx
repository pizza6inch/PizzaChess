import React from "react";

import { GameInfo, player } from "@/redux/types/webSocket";
import { useRouter } from "next/navigation";

const RoomCard = ({ game }: { game: GameInfo }) => {
  const handleJoinGame = () => {
    console.log("join logic");
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
      <div className="flex items-center justify-between">
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
        <div className="flex">
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
          className="rounded-xl border-2 border-green-700 bg-green-500 p-2 font-bold text-white hover:bg-green-600 disabled:border-transparent disabled:bg-gray-600"
          onClick={handleJoinGame}
        >
          {game.gameState === "waiting" ? "Join Game！" : "room is full！"}
        </button>
        <button
          className="rounded-xl border-2 border-red-700 bg-red-500 p-2 font-bold text-white hover:bg-red-600 disabled:border-transparent disabled:bg-gray-600"
          onClick={handleSpectateGame}
        >
          Spectate Game！
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
