'use client'
import Test from '@/components/Test'
import '@/app/global.css'
import React, { useState, useEffect } from 'react'
import { useWebSocket } from '@/contexts/WebSocketProvider'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import { useRouter } from 'next/navigation'

import RoomCard from '@/components/RoomCard'

export default function Room() {
  const { sendMessage } = useWebSocket()

  const router = useRouter()

  const { playerToken, gameOwnerToken, games, playerInfo, currentGame } = useSelector(
    (state: RootState) => state.websocket
  )

  const [status, setStatus] = useState<string | null>(null)

  const categories = [{ status: 'All games' }, { status: 'In-game' }, { status: 'Waiting' }]

  const testGames = [
    {
      'gameId': '0',
      'white': null,
      black: {
        'id': '1',
        'displayName': 'pizza6inch',
        'email': 'test',
        'rating': 1200,
        'isInGame': true,
      },
      'spectators': [
        {
          'id': '1',
          'displayName': '123',
          'email': 'test',
          'rating': 0,
          'isInGame': true,
        },
      ],
      'gameState': 'waiting',
    },
    {
      'gameId': '0',
      'white': null,
      black: {
        'id': '1',
        'displayName': 'pizza6inch',
        'email': 'test',
        'rating': 1200,
        'isInGame': true,
      },
      'spectators': [
        {
          'id': '1',
          'displayName': '123',
          'email': 'test',
          'rating': 0,
          'isInGame': true,
        },
      ],
      'gameState': 'waiting',
    },
    {
      'gameId': '0',
      'white': null,
      black: {
        'id': '1',
        'displayName': 'pizza6inch',
        'email': 'test',
        'rating': 1200,
        'isInGame': true,
      },
      'spectators': [
        {
          'id': '1',
          'displayName': '123',
          'email': 'test',
          'rating': 0,
          'isInGame': true,
        },
      ],
      'gameState': 'waiting',
    },
    {
      'gameId': '1',
      'white': {
        'id': '1',
        'displayName': 'pizza6inch',
        'email': 'test',
        'rating': 1200,
        'isInGame': true,
      },
      black: null,
      'spectators': [
        {
          'id': '1',
          'displayName': '123',
          'email': 'test',
          'rating': 0,
          'isInGame': true,
        },
      ],
      'gameState': 'in-progress',
    },
    {
      'gameId': '2',
      'white': {
        'id': '1',
        'displayName': 'pizza6inch',
        'email': 'test',
        'rating': 1200,
        'isInGame': true,
      },
      black: {
        'id': '1',
        'displayName': 'pizza6inch',
        'email': 'test',
        'rating': 1200,
        'isInGame': true,
      },
      'spectators': [],
      'gameState': 'finished',
    },
  ]

  return (
    <>
      <div className="bg-black text-white pt-[100px] px-[5%]">
        <section className="flex justify-between items-center p-4">
          <h1 className=" font-bold text-3xl">Room List</h1>
          <p className="font-semibold text-2xl">{`${games.length} Games`}</p>
        </section>
        <section className="flex p-4 border-b-2 border-white">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${
                status === category.status ? 'bg-red-500 border-red-700' : 'bg-[#1A1C21]'
              } text-white hover:bg-red-500  border-2 hover:border-red-700 box-border shadow-lg p-4 rounded-full font-semibold mr-4`}
              onClick={() => setStatus(category.status)}
            >
              {`# ${category.status}`}
            </button>
          ))}
        </section>
        <section className=" grid grid-cols-4 gap-4 p-4">
          {testGames.map((game, index) => (
            <RoomCard key={index} game={game} />
          ))}
        </section>
        {/* <Test /> */}
      </div>
    </>
  )
}
