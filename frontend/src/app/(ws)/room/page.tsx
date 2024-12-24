'use client'
import Test from '@/components/Test'
import '@/app/global.css'
import React, { useState, useEffect } from 'react'
import { useWebSocket } from '@/contexts/WebSocketProvider'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import { useRouter } from 'next/navigation'

export default function Room() {
  const { sendMessage } = useWebSocket()

  const router = useRouter()

  const { playerToken, gameOwnerToken, games, playerInfo, currentGame } = useSelector(
    (state: RootState) => state.websocket
  )

  const categories = [{ status: 'in-game' }, { status: 'waiting' }]

  return (
    <>
      <div className="bg-black h-[100vh] text-white pt-[100px] px-[5%]">
        <section className="flex justify-between items-center p-4">
          <h1 className=" font-bold text-3xl">Room List</h1>
          <p className="font-semibold text-2xl">{`${games.length} Games`}</p>
        </section>
        <section className="flex p-4">
          {categories.map((category, index) => (
            <button key={index} className={`bg-[#1d1e22] shadow-lg p-2 rounded-full`}>
              {category.status}
            </button>
          ))}
        </section>
        {/* <Test /> */}
      </div>
    </>
  )
}
