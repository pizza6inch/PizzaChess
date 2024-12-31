"use client";

import React, { useState } from "react";
import "@/app/global.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { signup, login, updatePassword } from "@/serverActions/user";

import ChessModel from "@/components/ChessModel";

export default function Home() {
  const [type, setType] = useState<string>("pawn");

  return (
    <>
      <section className="bg-hero relative flex h-min w-full flex-col gap-[100px] p-[5%] lg:h-[100vh] lg:flex-row">
        <div className="bg-circle absolute bottom-0 left-[45%] hidden h-[150px] w-[150px] translate-x-[-50%] translate-y-[50%] rounded-full lg:block" />
        <div className="flex flex-col justify-center gap-10 pt-20 text-white lg:w-[50%] lg:p-0">
          <h2 className="text-xl font-semibold">Wanna Play ?</h2>
          <h1 className="text-6xl font-semibold">CHESS</h1>
          <p className="text-xl leading-loose">
            Mastering the art of strategy and precision, where every move counts
            and every decision shapes the game.
          </p>
          <button className="rounded-xl bg-white px-5 py-2 text-black">
            <Link href="/room">PLAY NOW</Link>
          </button>
        </div>
        <div className="relative flex items-center justify-center lg:w-[50%]">
          <div className="bg-circle aspect-square w-full rounded-full opacity-70">
            <ChessModel type={type} />
          </div>
        </div>
      </section>
      <section className="flex w-full flex-col gap-[150px] overflow-hidden bg-black py-[200px]">
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, easings: "ease-in-out" }}
          className="flex h-[150px] w-[65%] self-end"
        >
          <div className="flex h-full w-[30%] items-center justify-center bg-[#AEAEAE]">
            <span className="material-symbols-outlined -rotate-12 scale-[300%]">
              chess
            </span>
          </div>
          <div className="flex h-full w-[70%] items-center justify-center bg-[#9E9085] p-4">
            <p className="text-center font-semibold">
              This is an open international chess website practice page,
              providing players of all kinds with an opportunity to challenge AI
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, easings: "ease-in-out" }}
          className="flex h-[150px] w-[65%] self-start"
        >
          <div className="flex h-full w-[70%] items-center justify-center bg-[#E9E9E9] p-4">
            <p className="text-center font-semibold">
              Our design concept is to imagine a webpage as a country, and each
              title is an organization, including the matters that each
              organization is responsible for.
            </p>
          </div>
          <div className="flex h-full w-[30%] items-center justify-center bg-[#AEAEAE]">
            <span className="material-symbols-outlined scale-[300%]">
              polyline
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, easings: "ease-in-out" }}
          className="flex h-[150px] w-[65%] self-end"
        >
          <div className="flex h-full w-[30%] items-center justify-center bg-[#AEAEAE]">
            <span className="material-symbols-outlined scale-[300%]">
              psychology
            </span>
          </div>
          <div className="flex h-full w-[70%] items-center justify-center bg-[#9E9085] p-4">
            <p className="text-center font-semibold">
              The core value of our website is that when players compete with AI
              robots, they allow players to operate their brains at the same
              time and gain a sense of accomplishment from it.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, easings: "ease-in-out" }}
          className="flex h-[150px] w-[65%] self-start"
        >
          <div className="flex h-full w-[70%] items-center justify-center bg-[#E9E9E9] p-4">
            <p className="text-center font-semibold">
              Having an exciting battle with friends is the most fun and
              relaxing moment
            </p>
          </div>
          <div className="flex h-full w-[30%] items-center justify-center bg-[#AEAEAE]">
            <span className="material-symbols-outlined scale-[300%]">mood</span>
          </div>
        </motion.div>
      </section>
      <section className="flex h-[400px] w-full items-center justify-center bg-white px-4 text-black">
        <p className="text-center text-3xl font-bold">
          Come and join us for an exciting showdown！！
        </p>
      </section>
      <section className="relative flex h-[1000px] flex-col items-center justify-center bg-black px-4 text-white">
        <h2 className="mb-10 text-3xl font-bold">COMPANY</h2>
        <p className="text-xl">we are super NutNut people</p>
        <img src="/logo.svg" className="absolute bottom-10 right-10" />
      </section>
    </>
  );
}
