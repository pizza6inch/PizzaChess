import React from "react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  const icons = [
    {
      src: "/instagram.svg",
      alt: "Instagram",
      link: "https://www.instagram.com/pizza_chess",
    },
    {
      src: "/github.svg",
      alt: "Github",
      link: "https://github.com/pizza6inch/PizzaChess",
    },
    {
      src: "/104.jpg",
      alt: "104",
      link: "https://www.104.com",
    },
    {
      src: "/cake.jpg",
      alt: "Cake",
      link: "https://www.cake.com",
    },
  ];
  return (
    <footer className="flex flex-col items-center justify-between gap-4 bg-[#ECECEC] px-4 py-10 text-black lg:flex-row">
      <h2>Terms & Conditions | Privacy Policy</h2>
      <div className="flex gap-10">
        {icons.map((icon, index) => (
          <Link href={icon.link} key={index}>
            <img
              src={icon.src}
              alt={icon.alt}
              className="h-[30px] w-[30px] hover:scale-110"
            />
          </Link>
        ))}
      </div>
      <h2>&copy; 2024 PizzaChess. All rights reserved.</h2>
    </footer>
  );
};

export default Footer;
