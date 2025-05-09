import React, { useState, useEffect } from "react";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
function NavBar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      <div className="flex flex-row  justify-between items-center ">
        <Link
          to="/"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}>
          <img
            src="/Flower_Love/images/logo.png"
            alt="logo2"
            className="w-[3rem] h-[3rem] rounded-full cursor-pointer ml-4"
          />
        </Link>
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="cursor-pointer mr-4"
          onClick={() => setToggle(!toggle)}
        />
      </div>
      <div
        className={`${
          !toggle ? "hidden" : "flex flex-col justify-center items-center"
        }`}>
        <ul className="flex flex-col justify-center items-center h-[10rem] gap-4 font-medium">
          {navLinks.map((nav: { id: string; title: string }) => (
            <li key={nav.id} onClick={() => setActive(nav.title)}>
              <a
                href={`#${nav.id}`}
                className="transition-all duration-300 hover:text-primary hover:scale-150">
                {nav.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-row justify-center items-center h-[8rem] gap-4">
          <button
            className="bg-primary text-white w-[10rem] hover:text-primary hover:bg-white border
          
          transition-all duration-300 hover:border-primary font-semibold rounded-2xl cursor-pointer h-8">
            Search Plants
          </button>
          <button
            className="bg-white text-primary font-semibold w-[8rem] rounded-2xl border border-primary 
          transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer h-8">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
