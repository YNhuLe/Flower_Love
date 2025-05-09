import React from "react";
import { Link } from "react-router-dom";
const date = new Date().getFullYear();
function Footer() {
  return (
    <footer className="m-4">
      <a href="/">
        <div className="flex flex-row items-center gap-4 justify-center mt-16 mb-4">
          {/* <a href="/"> */}
          <img
            src="/Flower_Love/images/logo.png"
            alt="logo2"
            className="w-[3rem] h-[3rem] rounded-full cursor-pointer"
          />{" "}
          <span className="text-3xl font-medium text-primary">Evererdant</span>
          {/* </a> */}
        </div>
      </a>
      <div className="flex flex-row text-xs  gap-3">
        <span className="cursor-pointer hover:text-primary ">About Us</span>
        <span className="cursor-pointer   hover:text-primary">Contact Us</span>
        <span className="cursor-pointer  hover:text-primary">FAQs</span>
        <span className="cursor-pointer  hover:text-primary">
          Terms and Conditions
        </span>
        <span className="cursor-pointer  hover:text-primary">
          Privacy policy
        </span>
      </div>
      <div className="border border-b-0 border-black my-8"></div>
      <p className="text-xs text-center">©{date} Evererdant</p>
      <div className="text-xs text-center flex flex- mt-4">
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
