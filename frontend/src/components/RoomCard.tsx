import React from 'react'

import { GameInfo, player } from '@/redux/types/webSocket'
import { useRouter } from 'next/navigation'

const RoomCard = ({ game }: { game: GameInfo }) => {
  return (
    <div className=" bg-[#313638] rounded-xl p-4">
      <div className="flex justify-between mb-4">
        <h2># {game.gameId}</h2>
        <div className="flex">
          <span className=" material-symbols-outlined mr-2">visibility</span>
          <p>{game.spectators.length}</p>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div className=" w-[40%]">
          {game.white ? (
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined font-bold scale-[200%] mb-2">person</span>
              <p className="">{game.white?.displayName}</p>
              <div className="flex">
                <span className=" material-symbols-outlined scale-50 ">star</span>
                <p>{game.white.rating}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="material-symbols-outlined font-bold scale-[200%] ">person_add</span>
            </div>
          )}
        </div>
        <p className="text-2xl">VS.</p>
        <div className="w-[40%] ">
          {game.black ? (
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined font-bold scale-[200%] mb-2 text-black">person</span>
              <p className="">{game.black?.displayName}</p>
              <div className="flex">
                <span className=" material-symbols-outlined scale-50 ">star</span>
                <p>{game.black.rating}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="material-symbols-outlined font-bold scale-[200%] text-black">person_add</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        {game.gameState === 'waiting' && (
          <div className=" rounded-3xl bg-green-500 border-2 border-green-700 p-2">{game.gameState}</div>
        )}
        {game.gameState === 'in-progress' && (
          <div className=" rounded-3xl bg-yellow-500 border-2 border-yellow-700 p-2">{game.gameState}</div>
        )}
        {game.gameState === 'finished' && (
          <div className=" rounded-3xl bg-red-500 border-2 border-red-700 p-2">{game.gameState}</div>
        )}
        <div className="flex">
          <span className=" material-symbols-outlined ">timer</span>
          <p>
            {Math.floor(659 / 60)}:{(659 % 60).toString().padStart(2, '0')}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <button
          disabled={game.gameState !== 'waiting'}
          className=" rounded-xl bg-green-500 border-2 border-green-700 p-2  text-white hover:bg-green-600 disabled:bg-gray-600 disabled:border-transparent  font-bold"
        >
          Join Game!
        </button>
        <button className="rounded-xl bg-red-500 border-2 border-red-700 p-2  text-white hover:bg-red-600 disabled:bg-gray-600 disabled:border-transparent  font-bold">
          Spectate Game!
        </button>
      </div>
    </div>
  )
}

export default RoomCard
