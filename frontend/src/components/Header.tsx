import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

const Header = () => {
    const navItems = [{
        title: 'rules',
        url: '/rules'
    },
    {
        title:'about',
        url: '/about'
    },
    {
        title: 'play',
        url: '/room'
    }

]
  return (
    <header className=' absolute text-white flex font-bold text-xl justify-between items-center w-full  p-10 z-10'>
        <nav className='flex w-[50%]'>
            <div className='w-[30%]'>Icon</div>
            <ul className='flex w-[70%] gap-24 '>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <Link href={item.url}>
                            {item.title.toUpperCase()}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
        <button>SIGN UP</button>
    </header>
  )
}

export default Header