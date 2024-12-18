"use client";
import Test from "../components/Test";
import React, { useState } from "react";
import "@/app/global.css";
import Link from "next/link";

import { signup, login, updatePassword } from "@/app/serverActions/user";

import ChessModel from "@/components/ChessModel";

export default function Home() {
  const [type, setType] = useState<string>("pawn");

  return (
    <>
      <div className=" bg-hero w-full h-[100vh] flex relative">
        <div className=" absolute bg-circle w-[150px] h-[150px] left-[45%] bottom-0 rounded-full translate-x-[-50%] translate-y-[50%]" />
        <div className="w-[50%] flex flex-col justify-center text-white pl-[100px] gap-10">
          <h2 className=" font-semibold text-xl">Wanna Play ?</h2>
          <h1 className=" font-semibold text-6xl">CHESS</h1>
          <p className=" leading-loose text-xl">
            Mastering the art of strategy and precision, where every move counts and every decision shapes the game.
          </p>
          <button className=" bg-white text-black px-5 py-2 rounded-xl">
            <Link href="/room">PLAY NOW</Link>
          </button>
          <button onClick={() => setType("pawn")}>pawn</button>
          <button onClick={() => setType("queen")}>queen</button>
        </div>
        <div className="w-[50%] relative">
          <div className=" absolute bg-circle w-[80%] aspect-square opacity-70  top-[50%] left-[50%] rounded-full translate-x-[-50%] translate-y-[-50%]">
            <ChessModel type={type} />
          </div>
        </div>
      </div>
    </>
  );
}
