'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { signup, login, updatePassword, getInfo } from '@/app/serverActions/user'
import { setShowSignInModal, setShowSignUpModal } from '@/redux/slices/modalSlice'

import { setUser } from '@/redux/slices/authSlice'
import { toast } from 'react-toastify'
import { Sheet } from './ui/sheet'

import TitleIcon from './TitleIcon'

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  const headerRef = useRef<HTMLHeadElement>(null)
  const [showSideBar, setShowSideBar] = useState(false)

  const navItems = [
    {
      title: 'rules',
      url: '/rules',
    },
    {
      title: 'about',
      url: '/about',
    },
    {
      title: 'play',
      url: '/room',
    },
  ]

  // check if header on top
  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current
      if (header) {
        if (window.scrollY > 0) {
          header.style.backgroundColor = 'black'
        } else {
          header.style.backgroundColor = 'transparent'
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
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        const response = await getInfo(accessToken)
        if (response.success && response.user) {
          dispatch(setUser(response.user))
        } else {
          console.error('Failed to get user info:')
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
              <li key={index}>
                <Link href={item.url}>{item.title.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:hidden flex items-center">
          <span className="material-symbols-outlined mr-4" onClick={() => setShowSideBar(true)}>
            menu
          </span>
          <TitleIcon />
        </div>
        {user && <div>{user.displayName}</div>}
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
          <header className="fixed top-0 left-0 h-[100vh] w-[200px] bg-black z-30">hi</header>
        </>
      )}
    </>
  )
}

export default Header
