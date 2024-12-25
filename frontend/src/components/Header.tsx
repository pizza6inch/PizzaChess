'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { signup, login, updatePassword, getInfo } from '@/serverActions/user'
import { setShowSignInModal, setShowSignUpModal } from '@/redux/slices/modalSlice'

import { useRouter } from 'next/navigation'

import { setUser } from '@/redux/slices/authSlice'

import TitleIcon from './TitleIcon'

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const router = useRouter()

  const dispatch = useDispatch()

  const headerRef = useRef<HTMLHeadElement>(null)
  const [showSideBar, setShowSideBar] = useState(false)
  const [showAccountPopover, setShowAccountPopover] = useState(false)

  const navItems = [
    {
      title: 'home',
      url: '/',
      icon: 'home',
    },
    {
      title: 'play',
      url: '/room',
      icon: 'chess_pawn',
    },
    {
      title: 'rules',
      url: '/rules',
      icon: 'rule',
    },
    {
      title: 'about',
      url: '/about',
      icon: 'group',
    },
  ]

  const accountItems = [
    {
      title: 'settings',
      url: '/settings',
      icon: 'manage_accounts',
      onclick: () => {
        router.push('/')
        setShowAccountPopover(false)
        // 待動工
      },
    },
    {
      title: 'logout',
      url: '/logout',
      icon: 'logout',
      onclick: () => {
        dispatch(setUser(null))
        sessionStorage.removeItem('accessToken')
      },
    },
  ]

  // check if header on top
  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current
      if (header) {
        if (window.scrollY > 0) {
          header.style.backgroundColor = 'black'
          header.style.borderBottom = '2px solid white'
          header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'
          header.style.transition = 'all 0.5s'
        } else {
          header.style.backgroundColor = 'transparent'
          header.style.boxShadow = 'none'
          header.style.borderBottom = 'none'
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const authUser = async () => {
      const accessToken = sessionStorage.getItem('accessToken')
      if (accessToken) {
        const response = await getInfo(accessToken)
        if (response.success && response.user) {
          dispatch(setUser(response.user))
        } else {
          // console.error('Failed to get user info:')
        }
      }
    }

    authUser()
  }, [dispatch])

  const handleSignIn = () => {
    dispatch(setShowSignInModal(true))
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed text-white flex font-bold text-xl justify-between items-center w-full  p-5 z-10"
      >
        <nav className="lg:flex hidden ">
          <ul className="flex w-full gap-24 items-center ">
            <TitleIcon />
            {navItems.map((item, index) => (
              <li
                key={index}
                className=" transition-all duration-300 p-2 border-b-2 border-transparent hover:border-white"
              >
                <Link href={item.url}>{item.title.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:hidden flex items-center">
          <span className="material-symbols-outlined mr-8 hover:cursor-pointer" onClick={() => setShowSideBar(true)}>
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
              {showAccountPopover ? 'close' : 'account_circle'}
            </span>
            {showAccountPopover && (
              <div className=" absolute top-[110%] right-0 flex flex-col p-4 gap-4 bg-black rounded-lg text-white w-[200px] z-10 transition-opacity duration-300 animate-fade-in">
                <div className=" flex flex-row  items-center">
                  <span className="material-symbols-outlined scale-150 mr-4">account_circle</span>
                  <p>{user.displayName}</p>
                </div>
                <p>{`@ ${user.username}`}</p>
                <p>{`ratings：${user.rating}`}</p>
                <div className="w-full h-[2px] bg-white" />
                <div className="flex flex-col gap-4">
                  <Link href={'/settings'} className="flex gap-4 items-center hover:bg-red-600 rounded-lg p-2">
                    <span className="material-symbols-outlined">settings</span>
                    <p className=" font-light">SETTINGS</p>
                  </Link>
                  <div
                    onClick={() => {
                      sessionStorage.removeItem('accessToken')
                      sessionStorage.removeItem('playerToken')
                      window.location.reload()
                    }}
                    className="flex gap-4 items-center hover:cursor-pointer hover:bg-red-600 rounded-lg p-2"
                  >
                    <span className="material-symbols-outlined">logout</span>
                    <p className=" font-light">LOGOUT</p>
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
            className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-50 z-20"
            onClick={() => {
              setShowSideBar(false)
            }}
          />
          <nav className="fixed top-0 left-0 h-[100vh] w-[300px] bg-black z-30 text-white p-6 transition-all duration-200 animate-slide-in">
            <TitleIcon />
            <h2 className="text-2xl font-bold mt-8">Menu</h2>
            <ul className="mt-6 flex flex-col gap-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.url}
                    className="flex gap-4 justify-between items-center transition-all duration-300 bg-transparent hover:bg-red-600 rounded-lg p-4"
                    onClick={() => setShowSideBar(false)}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <p className="font-semibold">{item.title.toUpperCase()}</p>
                  </Link>
                  <div className="w-full h-1 bg-white rounded-lg" />
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </>
  )
}

export default Header
