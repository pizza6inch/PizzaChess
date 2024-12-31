"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { signup, login, updatePassword, getInfo } from "@/serverActions/user";
import {
  setShowSignInModal,
  setShowSignUpModal,
} from "@/redux/slices/modalSlice";

import { useRouter } from "next/navigation";

import { setUser } from "@/redux/slices/authSlice";

import TitleIcon from "./TitleIcon";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  const dispatch = useDispatch();

  const headerRef = useRef<HTMLHeadElement>(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showAccountPopover, setShowAccountPopover] = useState(false);

  const navItems = [
    {
      title: "home",
      url: "/",
      icon: "home",
    },
    {
      title: "play",
      url: "/room",
      icon: "chess_pawn",
    },
    {
      title: "rules",
      url: "/rules",
      icon: "rule",
    },
    {
      title: "about",
      url: "/about",
      icon: "group",
    },
  ];

  const accountItems = [
    {
      title: "settings",
      url: "/settings",
      icon: "manage_accounts",
      onclick: () => {
        router.push("/");
        setShowAccountPopover(false);
        // 待動工
      },
    },
    {
      title: "logout",
      url: "/logout",
      icon: "logout",
      onclick: () => {
        dispatch(setUser(null));
        sessionStorage.removeItem("accessToken");
      },
    },
  ];

  // check if header on top
  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (header) {
        if (window.scrollY > 0) {
          header.style.backgroundColor = "black";
          header.style.borderBottom = "2px solid white";
          header.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
          header.style.transition = "all 0.5s";
        } else {
          header.style.backgroundColor = "transparent";
          header.style.boxShadow = "none";
          header.style.borderBottom = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const authUser = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const response = await getInfo(accessToken);
        if (response.success && response.user) {
          dispatch(setUser(response.user));
        } else {
          // console.error('Failed to get user info:')
        }
      }
    };

    authUser();
  }, [dispatch]);

  const handleSignIn = () => {
    dispatch(setShowSignInModal(true));
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed z-10 flex w-full items-center justify-between p-5 text-xl font-bold text-white"
      >
        <nav className="hidden lg:flex">
          <ul className="flex w-full items-center gap-24">
            <TitleIcon />
            {navItems.map((item, index) => (
              <li
                key={index}
                className="border-b-2 border-transparent p-2 transition-all duration-300 hover:border-white"
              >
                <Link href={item.url}>{item.title.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center lg:hidden">
          <span
            className="material-symbols-outlined mr-8 hover:cursor-pointer"
            onClick={() => setShowSideBar(true)}
          >
            menu
          </span>
          <TitleIcon />
        </div>
        {user && (
          <div className="relative flex p-2">
            <span
              className="material-symbols-outlined scale-[200%] hover:cursor-pointer"
              onClick={() => setShowAccountPopover(!showAccountPopover)}
            >
              {showAccountPopover ? "close" : "account_circle"}
            </span>
            {showAccountPopover && (
              <div className="animate-fade-in absolute right-0 top-[110%] z-10 flex w-[200px] flex-col gap-4 rounded-lg bg-black p-4 text-white transition-opacity duration-300">
                <div className="flex flex-row items-center">
                  <span className="material-symbols-outlined mr-4 scale-150">
                    account_circle
                  </span>
                  <p>{user.displayName}</p>
                </div>
                <p>{`@ ${user.username}`}</p>
                <p>{`ratings：${user.rating}`}</p>
                <div className="h-[2px] w-full bg-white" />
                <div className="flex flex-col gap-4">
                  <Link
                    href={"/settings"}
                    className="flex items-center gap-4 rounded-lg p-2 hover:bg-red-600"
                  >
                    <span className="material-symbols-outlined">settings</span>
                    <p className="font-light">SETTINGS</p>
                  </Link>
                  <div
                    onClick={() => {
                      sessionStorage.removeItem("accessToken");
                      sessionStorage.removeItem("playerToken");
                      window.location.reload();
                    }}
                    className="flex items-center gap-4 rounded-lg p-2 hover:cursor-pointer hover:bg-red-600"
                  >
                    <span className="material-symbols-outlined">logout</span>
                    <p className="font-light">LOGOUT</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {!user && <button onClick={handleSignIn}>SIGN IN</button>}
      </header>
      {showSideBar && (
        <>
          <div
            className="fixed left-0 top-0 z-20 h-[100vh] w-[100vw] bg-black opacity-50"
            onClick={() => {
              setShowSideBar(false);
            }}
          />
          <nav className="animate-slide-in fixed left-0 top-0 z-30 h-[100vh] w-[300px] bg-black p-6 text-white transition-all duration-200">
            <TitleIcon />
            <h2 className="mt-8 text-2xl font-bold">Menu</h2>
            <ul className="mt-6 flex flex-col gap-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.url}
                    className="flex items-center justify-between gap-4 rounded-lg bg-transparent p-4 transition-all duration-300 hover:bg-red-600"
                    onClick={() => setShowSideBar(false)}
                  >
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                    <p className="font-semibold">{item.title.toUpperCase()}</p>
                  </Link>
                  <div className="h-1 w-full rounded-lg bg-white" />
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
