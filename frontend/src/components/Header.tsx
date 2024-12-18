'use client'
import React from 'react'
import Link from 'next/link'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { signup, login, updatePassword } from '@/app/serverActions/user'

const Header = () => {
  const { playerToken, gameOwnerToken, games, playerInfo, currentGame } = useSelector((state: RootState) => state.auth)

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

  const handleSaveUser = async () => {
    const userName = 'John Doe'
    const password = 'test123'
    const displayName = 'John'

    console.log('Signup:', { userName, password, displayName })

    const response = await signup({ userName, password, displayName })

    if (response.success && response.token) {
      localStorage.setItem('accessToken', response.token)
      console.log('Signup success:', response.token)
    } else {
      console.log('Signup failed:', response.error)
    }
  }

  const handleLogin = async () => {
    const userName = 'John Doe'
    const password = 'test123'

    console.log('Login:', { userName, password })
    const response = await login({ userName, password })

    if (response.success && response.token) {
      localStorage.setItem('accessToken', response.token)
      console.log('Login success:', response.token)
    } else {
      console.log('Login failed:', response.error)
    }
  }

  const handleUpdatePassword = async () => {
    const oldPassword = 'test123'
    const newPassword = 'newPassword123'

    const token = localStorage.getItem('accessToken')

    if (!token) {
      throw new Error('No token found')
    }

    console.log('Update Password:', { oldPassword, newPassword })
    const result = await updatePassword({ oldPassword, newPassword }, token)
    if (result.success) {
      console.log('Update Password success')
    } else {
      console.log('Update Password failed:', result.error)
    }
  }

  return (
    <header className=" fixed text-white flex font-bold text-xl justify-between items-center w-full  p-10 z-10">
      <nav className="flex w-[50%]">
        <div className="w-[30%]">Icon</div>
        <ul className="flex w-[70%] gap-24 ">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.url}>{item.title.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <button>SIGN UP</button>
    </header>
  )
}

export default Header
