import Test from "../components/Test";
import React from "react";
import "@/app/global.css";
import Link from "next/link";

import { signup, login, updatePassword } from "@/app/actions/user";

import ChessModel from "@/components/ChessModel";

export default function Home() {
  const handleSaveUser = async () => {
    const userName = "John Doe";
    const password = "test123";
    const displayName = "John";

    console.log("Signup:", { userName, password, displayName });

    const response = await signup({ userName, password, displayName });

    if (response.success && response.token) {
      localStorage.setItem("accessToken", response.token);
      console.log("Signup success:", response.token);
    } else {
      console.log("Signup failed:", response.error);
    }
  };

  const handleLogin = async () => {
    const userName = "John Doe";
    const password = "test123";

    console.log("Login:", { userName, password });
    const response = await login({ userName, password });

    if (response.success && response.token) {
      localStorage.setItem("accessToken", response.token);
      console.log("Login success:", response.token);
    } else {
      console.log("Login failed:", response.error);
    }
  };

  const handleUpdatePassword = async () => {
    const oldPassword = "test123";
    const newPassword = "newPassword123";

    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No token found");
    }

    console.log("Update Password:", { oldPassword, newPassword });
    const result = await updatePassword({ oldPassword, newPassword }, token);
    if (result.success) {
      console.log("Update Password success");
    } else {
      console.log("Update Password failed:", result.error);
    }
  };

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
        </div>
        <div className="w-[50%] relative">
          <div className=" absolute bg-circle w-[80%] aspect-square opacity-70  top-[50%] left-[50%] rounded-full translate-x-[-50%] translate-y-[-50%]">
            <ChessModel />
          </div>
        </div>
      </div>
    </>
  );
}
