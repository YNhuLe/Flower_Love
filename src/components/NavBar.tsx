import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Droplets,
  Sun,
  Thermometer,
  Wind,
  Sparkles,
  ChevronLeft,
  Check,
  AlertCircle,
  ChevronRight,
  Dice1, User
} from 'lucide-react';
import useCartStore from "../hooks/useCartStore";
function NavBar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
const totalItemCount = useCartStore((state) =>
state.items.reduce((sum, item) => sum + item.quantity, 0)
)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={` top-0 fixed py-5 z-20 w-full
           ${scrolled ? "bg-white/70" : "bg-[#ffff]"}

  `}>
      <div className="flex flex-row  justify-between items-center laptop:justify-start ">
        <Link
          to="/"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          <img
            loading="lazy"
            src={`${cloud_url}/v1756387918/logo_mqmxll.png`}
            alt="logo2"
            className="w-[3rem] h-[3rem] rounded-full cursor-pointer ml-4 tablet:w-[4rem] tablet:h-[4rem] 
            laptop:mx-8"

          />
        </Link>

        <div className="flex gap-6">
          <Link
            to="/signup"
          > <User />
          </Link>
          <Link to="/products/cart">
          <div className="relative">
            <ShoppingCart />
            <div className="absolute  -right-4 -top-5 text-text-inverse rounded-[.4rem]  bg-error-700 px-2 py-1 w-fit h-[1.5rem] flex flex-col justify-center">
              <span className="text-[.65rem] m-0 text-center">{totalItemCount}</span>
              
              </div>
         </div> </Link>
          <img
            loading="lazy"

            src={`${toggle ? `${cloud_url}/v1756387918/close_nhwhzv.svg` : `${cloud_url}/v1756387919/menu_ir6xyk.svg`}`}
            alt="menu"
            className="laptop:hidden cursor-pointer mr-4 tablet:w-[2.5rem] mobile:w-[.5rem]"
            onClick={() => setToggle(!toggle)}
          />
          <ul className="list-none hidden laptop:flex flex-row gap-4">
            {navLinks.map((nav: { id: string; title: string }) => (
              <li key={nav.id} onClick={() => setActive(nav.title)}>
                <a
                  href={`/${nav.id}`}
                  className="transition-all duration-300 hover:text-brand-700 hover:scale-150 tablet:text-2xl
                desktop:text-3xl
                ">
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
          <div
            className="hidden laptop:flex flex-row laptop:justify-end items-center h-[5rem] laptop:gap-4 ml-auto laptop:mr-8
        
        ">
            <button
              className="bg-brand-700 text-white p-4 flex flex-row  items-center hover:text-brand-700 hover:bg-white border
          
          transition-all duration-300 hover:border-brand-700 font-medium rounded-2xl cursor-pointer h-8 text-[1rem] laptop:p-4
          desktop:text-2xl desktop:h-10 desktop:rounded-3xl
          ">
              Search Plants
            </button>
            <button
              className="bg-white text-brand-700 font-medium p-4 flex flex-row  items-center rounded-2xl border border-brand-700 
          transition-all duration-300 hover:bg-brand-700 hover:text-white cursor-pointer h-8 text-[1rem]
             desktop:text-2xl desktop:h-10 desktop:rounded-3xl
          ">
              Get Started
            </button>
          </div>
        </div>
      </div>
      {/* <ul className="list-none hidden laptop:flex flex-row gap-4">
        {navLinks.map((nav: { id: string; title: string }) => (
          <li key={nav.id} onClick={() => setActive(nav.title)}>
            <a
              href={`#${nav.id}`}
              className="transition-all duration-300 hover:text-brand-700 hover:scale-150 tablet:text-2xl">
              {nav.title}
            </a>
          </li>
        ))}
      </ul> */}
      <div
        className={` ${!toggle ? "hidden" : "flex flex-col justify-center items-center"
          }`}>
        <ul className="flex flex-col justify-center items-center h-[10rem] gap-4 font-medium">
          {navLinks.map((nav: { id: string; title: string }) => (
            <li key={nav.id} onClick={() => setActive(nav.title)}>
              <a
                href={`/${nav.id}`}
                className="transition-all duration-300 hover:text-brand-700 hover:scale-150 tablet:text-2xl">
                {nav.title}
              </a>
            </li>
          ))}
        </ul>
        <div
          className="flex flex-row justify-center items-center h-[8rem] gap-4 tablet:gap-6
        
        ">
          <button
            className="bg-brand-700 text-white p-4 flex flex-row  items-center hover:text-brand-700 hover:bg-white border
          
          transition-all duration-300 hover:border-brand-700 font-medium rounded-2xl cursor-pointer h-8 text-xs tablet:text-2xl tablet:p-6 tablet:rounded-3xl">
            Search Plants
          </button>
          <button
            className="bg-white text-brand-700 font-medium p-4 flex flex-row  items-center rounded-2xl border border-brand-700 
          transition-all duration-300 hover:bg-brand-700 hover:text-white cursor-pointer h-8 text-xs tablet:text-2xl tablet:p-6 tablet:rounded-3xl">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
