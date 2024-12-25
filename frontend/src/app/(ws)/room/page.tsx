'use client'
import Test from '@/components/Test'
import '@/app/global.css'
import React, { useState, useEffect } from 'react'
import { useWebSocket } from '@/contexts/WebSocketProvider'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import { useRouter } from 'next/navigation'

import RoomCard from '@/components/RoomCard'

import { GameInfo } from '@/redux/types/webSocket'

type status = 'ALL' | 'In-Game' | 'Available'

type sortBy = 'GameId' | 'Timer' | 'Rating' | 'Most People'

type sortOrder = 'asc' | 'desc'

export default function Room() {
  const { sendMessage } = useWebSocket()

  const router = useRouter()

  const { wsConnected, gameOwnerToken, games, playerInfo, currentGame } = useSelector(
    (state: RootState) => state.websocket
  )

  const { user } = useSelector((state: RootState) => state.auth)

  const [status, setStatus] = useState<status>('ALL')
  const [sortBy, setSortBy] = useState<sortBy>('GameId')
  const [sortOrder, setSortOrder] = useState<sortOrder>('asc')

  const categories: Array<{ status: status }> = [{ status: 'ALL' }, { status: 'In-Game' }, { status: 'Available' }]
  const sortOptions: Array<{ sortBy: sortBy }> = [
    { sortBy: 'GameId' },
    { sortBy: 'Timer' },
    { sortBy: 'Rating' },
    { sortBy: 'Most People' },
  ]

  const testGames: GameInfo[] = [
    {
      'gameId': '0',
      'white': null,
      black: {
        'id': '1',
        'displayName': 'pizza6inch',
        'rating': 1250,
        'isInGame': true,
      },
      'spectators': [
        {
          'id': '1',
          'displayName': '123',
          'rating': 0,
          'isInGame': true,
        },
      ],
      'gameState': 'waiting',
      timeLimit: 600,
      // gameState: 'waiting' | 'in-progress' | 'finished'
    },
    {
      'gameId': '1',
      'white': null,
      black: {
        'id': '1',
        'displayName': 'pizza6inch',
        'rating': 1200,
        'isInGame': true,
      },
      'spectators': [
        {
          'id': '1',
          'displayName': '123',
          'rating': 0,
          'isInGame': true,
        },
      ],
      'gameState': 'waiting',
      timeLimit: 659,
    },
    {
      'gameId': '2',
      'white': null,
      black: {
        'id': '1',
        'displayName': 'pizza6inch',
        'rating': 1201,
        'isInGame': true,
      },
      'spectators': [
        {
          'id': '1',
          'displayName': '123',
          'rating': 0,
          'isInGame': true,
        },
      ],
      'gameState': 'waiting',
      timeLimit: 659,
    },
    {
      'gameId': '3',
      'white': {
        'id': '1',
        'displayName': 'pizza6inch',
        'rating': 1203,
        'isInGame': true,
      },
      black: null,
      'spectators': [
        {
          'id': '1',
          'displayName': '123',
          'rating': 0,
          'isInGame': true,
        },
      ],
      'gameState': 'in-progress',
      timeLimit: 300,
    },
    {
      'gameId': '4',
      'white': {
        'id': '1',
        'displayName': 'pizza6inch',
        'rating': 1204,
        'isInGame': true,
      },
      black: {
        'id': '1',
        'displayName': 'pizza6inch',
        'rating': 1205,
        'isInGame': true,
      },
      'spectators': [],
      'gameState': 'finished',
      timeLimit: 450,
    },
  ]

  useEffect(() => {
    const handleRegister = (displayName: string, rating: number) => {
      const payload = {
        displayName: displayName,
        rating: rating,
      }
      sendMessage('register', payload)
    }

    const handleGetPlayerInfo = () => {
      const payload = {
        playerToken: sessionStorage.getItem('playerToken'),
      }
      sendMessage('getPlayerInfo', payload)
    }

    if (!wsConnected) return

    // 如果沒有playerToken就向ws server 註冊一個
    if (!sessionStorage.getItem('playerToken')) {
      if (sessionStorage.getItem('accessToken')) {
        if (user) {
          handleRegister(user.displayName, user.rating)
        }
      } else {
        // generate random string as display name
        const randomName = Math.random().toString(36).substring(2, 6)
        handleRegister(randomName, 1200)
      }
    }

    if (sessionStorage.getItem('playerToken')) {
      handleGetPlayerInfo()
    }
  }, [wsConnected, user])

  // useEffect(() => {
  //   console.log('playerInfo', playerInfo)
  // }, [playerInfo, user])

  return (
    <>
      <div className="bg-black text-white pt-[100px] px-[5%]">
        <section className="flex justify-between items-center p-4">
          <h1 className=" font-bold text-3xl">Room List</h1>
          <p className="font-semibold text-2xl">{`${games.length} Games`}</p>
        </section>
        <p>{playerInfo.displayName}</p>
        <section className="flex justify-between p-4 border-b-2 border-white">
          <div>
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
          </div>
          <div className="flex items-end">
            <p>Sort by：</p>
            {sortOptions.map((option, index) => (
              <p
                key={index}
                className={`${
                  sortBy === option.sortBy ? 'text-white' : 'text-slate-400'
                } text-white  shadow-lg  font-semibold mr-4 cursor-pointer hover:text-white`}
                onClick={() => setSortBy(option.sortBy)}
              >
                {`${option.sortBy}`}
              </p>
            ))}

            <span
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="material-symbols-outlined cursor-pointer"
            >
              {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
            </span>
          </div>
        </section>
        <section className=" grid grid-cols-4 gap-4 p-4">
          <GameList games={testGames} status={status} sortBy={sortBy} sortOrder={sortOrder} />
        </section>
        {/* <Test /> */}
      </div>
    </>
  )
}

const GameList = ({
  status,
  sortBy,
  sortOrder,
  games,
}: {
  status: status
  sortBy: sortBy
  sortOrder: sortOrder
  games: GameInfo[]
}) => {
  const filteredGames = games.filter(game => {
    if (status === 'In-Game') return game.gameState === 'in-progress'
    if (status === 'Available') return game.gameState === 'waiting'
    return true // 'ALL'
  })

  const sortedGames = filteredGames.sort((a, b) => {
    if (sortOrder === 'asc') {
      if (sortBy === 'GameId') return a.gameId.localeCompare(b.gameId)
      if (sortBy === 'Timer') return a.timeLimit - b.timeLimit
      if (sortBy === 'Rating') {
        return (a?.white?.rating ?? 0) + (a?.black?.rating ?? 0) - (b?.white?.rating ?? 0) - (b?.black?.rating ?? 0)
      }
      if (sortBy === 'Most People') return a.spectators.length - b.spectators.length
    }
    if (sortOrder === 'desc') {
      if (sortBy === 'GameId') return b.gameId.localeCompare(a.gameId)
      if (sortBy === 'Timer') return b.timeLimit - a.timeLimit
      if (sortBy === 'Rating') {
        return (b?.white?.rating ?? 0) + (b?.black?.rating ?? 0) - (a?.white?.rating ?? 0) - (a?.black?.rating ?? 0)
      }
      if (sortBy === 'Most People') return b.spectators.length - a.spectators.length
    }
    return 0
  })

  return (
    <>
      {sortedGames.map((game, index) => (
        <RoomCard key={index} game={game} />
      ))}
    </>
  )
}
