'use client'
import Test from '../components/Test'
import React, { useState } from 'react'
import '@/app/global.css'
import Link from 'next/link'

import { signup, login, updatePassword } from '@/app/serverActions/user'

import ChessModel from '@/components/ChessModel'

export default function Home() {
  const [type, setType] = useState<string>('pawn')

  return (
    <>
      <div className=" bg-hero w-full lg:h-[100vh] h-min flex flex-col lg:flex-row relative p-[5%] gap-[100px]">
        <div className=" absolute lg:block hidden bg-circle w-[150px] h-[150px] left-[45%] bottom-0 rounded-full translate-x-[-50%] translate-y-[50%]" />
        <div className="lg:w-[50%] lg:p-0 pt-20 flex flex-col justify-center text-white  gap-10">
          <h2 className=" font-semibold text-xl">Wanna Play ?</h2>
          <h1 className=" font-semibold text-6xl">CHESS</h1>
          <p className=" leading-loose text-xl">
            Mastering the art of strategy and precision, where every move counts and every decision shapes the game.
          </p>
          <button className=" bg-white text-black px-5 py-2 rounded-xl">
            <Link href="/room">PLAY NOW</Link>
          </button>
        </div>
        <div className="lg:w-[50%] relative flex justify-center items-center">
          <div className=" bg-circle w-full aspect-square opacity-70   rounded-full ">
            <ChessModel type={type} />
          </div>
        </div>
      </div>
    </>
  )
}
