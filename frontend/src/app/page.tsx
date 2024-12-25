'use client'

import React, { useState } from 'react'
import '@/app/global.css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { signup, login, updatePassword } from '@/serverActions/user'

import ChessModel from '@/components/ChessModel'

export default function Home() {
  const [type, setType] = useState<string>('pawn')

  return (
    <>
      <section className=" bg-hero w-full lg:h-[100vh] h-min flex flex-col lg:flex-row relative p-[5%] gap-[100px]">
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
      </section>
      <section className=" w-full bg-black flex flex-col gap-[150px] py-[200px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, easings: 'ease-in-out' }}
          className="flex w-[65%] h-[150px] self-end"
        >
          <div className=" bg-[#AEAEAE] w-[30%] h-full flex justify-center items-center ">
            <span className="material-symbols-outlined scale-[300%] -rotate-12">chess</span>
          </div>
          <div className=" bg-[#9E9085] w-[70%] h-full p-4 flex justify-center items-center">
            <p className=" font-semibold text-center">
              This is an open international chess website practice page, providing players of all kinds with an
              opportunity to challenge AI
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, easings: 'ease-in-out' }}
          className="flex w-[65%] h-[150px] self-start"
        >
          <div className=" bg-[#E9E9E9] w-[70%] h-full p-4 flex justify-center items-center">
            <p className=" font-semibold text-center">
              Our design concept is to imagine a webpage as a country, and each title is an organization, including the
              matters that each organization is responsible for.
            </p>
          </div>
          <div className=" bg-[#AEAEAE] w-[30%] h-full flex justify-center items-center">
            <span className="material-symbols-outlined scale-[300%] ">polyline</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, easings: 'ease-in-out' }}
          className="flex w-[65%] h-[150px] self-end"
        >
          <div className=" bg-[#AEAEAE] w-[30%] h-full flex justify-center items-center">
            <span className="material-symbols-outlined scale-[300%] ">psychology</span>
          </div>
          <div className=" bg-[#9E9085] w-[70%] h-full p-4 flex justify-center items-center">
            <p className=" font-semibold text-center">
              The core value of our website is that when players compete with AI robots, they allow players to operate
              their brains at the same time and gain a sense of accomplishment from it.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, easings: 'ease-in-out' }}
          className="flex w-[65%] h-[150px] self-start"
        >
          <div className=" bg-[#E9E9E9] w-[70%] h-full p-4 flex justify-center items-center">
            <p className=" font-semibold text-center">
              Having an exciting battle with friends is the most fun and relaxing moment
            </p>
          </div>
          <div className=" bg-[#AEAEAE] w-[30%] h-full flex justify-center items-center">
            <span className="material-symbols-outlined scale-[300%] ">mood</span>
          </div>
        </motion.div>
      </section>
      <section className=" w-full h-[400px] bg-white text-black flex justify-center items-center px-4">
        <p className=" text-3xl text-center font-bold">Come and join us for an exciting showdown！！</p>
      </section>
      <section className=" h-[1000px] bg-black text-white flex flex-col justify-center items-center px-4 relative">
        <h2 className=" text-3xl font-bold mb-10">COMPANY</h2>
        <p className=" text-xl">we are super NutNut people</p>
        <img src="/logo.svg" className=" absolute bottom-10 right-10" />
      </section>
    </>
  )
}
