'use client'
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { signup, login, updatePassword, getInfo } from '@/app/serverActions/user'
import { setShowSignInModal, setShowSignUpModal } from '@/redux/slices/modalSlice'

import { setUser } from '@/redux/slices/authSlice'
import { toast } from 'react-toastify'

import TitleIcon from './TitleIcon'

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

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
    <header className=" fixed text-white flex font-bold text-xl justify-between items-center w-full  p-10 z-10">
      <nav className="flex w-[50%]">
        <div className="w-[30%]">
          <TitleIcon />
        </div>
        <ul className="flex w-[70%] gap-24 ">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.url}>{item.title.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {user && <div>{user.displayName}</div>}
      {!user && <button onClick={handleSignIn}>SIGN IN</button>}
    </header>
  )
}

export default Header
