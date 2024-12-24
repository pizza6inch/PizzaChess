import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  const icons = [
    {
      src: '/instagram.svg',
      alt: 'Instagram',
      link: 'https://www.instagram.com/pizza_chess',
    },
    {
      src: '/github.svg',
      alt: 'Github',
      link: 'https://github.com/pizza6inch/PizzaChess',
    },
    {
      src: '/104.jpg',
      alt: '104',
      link: 'https://www.104.com',
    },
    {
      src: '/cake.jpg',
      alt: 'Cake',
      link: 'https://www.cake.com',
    },
  ]
  return (
    <footer className="bg-[#ECECEC] text-black items-center flex lg:flex-row flex-col gap-4 justify-between px-4 py-10 ">
      <h2>Terms & Conditions | Privacy Policy</h2>
      <div className="flex gap-10">
        {icons.map((icon, index) => (
          <Link href={icon.link} key={index}>
            <img src={icon.src} alt={icon.alt} className="hover:scale-110 w-[30px] h-[30px]" />
          </Link>
        ))}
      </div>
      <h2>&copy; 2024 PizzaChess. All rights reserved.</h2>
    </footer>
  )
}

export default Footer