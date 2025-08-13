import React from "react";
import { Link } from "react-router-dom";
const date = new Date().getFullYear();
function Footer() {
  return (
    <footer className="m-4">
      <a href="/">
        <div className="flex flex-row items-center gap-4 justify-center mt-16 mb-4 ultra:mb-12">
          {/* <a href="/"> */}
          <img
            loading="lazy"
            src="/images/logo.png"
            alt="logo2"
            className="w-[3rem] h-[3rem] rounded-full cursor-pointer"
          />{" "}
          <span className="text-3xl font-medium text-primary">Evererdant</span>
          {/* </a> */}
        </div>
      </a>
      <div className="flex flex-row flex-wrap justify-evenly text-xs gap-3 laptop:text-[1rem]">
        <p className="cursor-pointer hover:text-primary ">About Us</p>
        <p className="cursor-pointer   hover:text-primary">Contact Us</p>
        <p className="cursor-pointer  hover:text-primary">FAQs</p>
        <p className="cursor-pointer  hover:text-primary">Terms & Conditions</p>
        <p className="cursor-pointer  hover:text-primary">Privacy policy</p>
      </div>
      <div className="border border-b-0 border-black my-8"></div>
      <p className="text-xs text-center  laptop:text-[1rem]">
        ©{date} Evererdant
      </p>
      <div className="text-xs text-center flex flex-wrap justify-evenly mt-4  laptop:text-[1rem]">
        <p className="cursor-pointer  hover:text-primary">Privacy Policy</p>
        <p className="cursor-pointer  hover:text-primary">
          Terms and Conditions
        </p>
        <p className="cursor-pointer  hover:text-primary">Cookies Policy</p>
      </div>
    </footer>
  );
}
export default Footer;
