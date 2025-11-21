import React from "react";
import { Link } from "react-router-dom";
const date = new Date().getFullYear();
function Footer() {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,w_800,h_600,f_auto,q_auto";

  return (
    <footer className="m-4">
      <a href="/">
        <div className="flex flex-row items-center gap-4 justify-center mt-16 mb-4 ultra:mb-12">
          {/* <a href="/"> */}
          <img
            loading="lazy"
            src={`${cloud_url}/v1756387918/logo_mqmxll.png`}
            alt="logo2"
            className="w-[3rem] h-[3rem] rounded-full cursor-pointer"
          />{" "}
          <span className="text-3xl font-medium text-brand-700">Evererdant</span>
          {/* </a> */}
        </div>
      </a>
      <div className="flex flex-row flex-wrap justify-evenly text-xs gap-3 laptop:text-[1rem]">
        <p className="cursor-pointer hover:text-brand-700 ">About Us</p>
        <p className="cursor-pointer   hover:text-brand-700">Contact Us</p>
        <p className="cursor-pointer  hover:text-brand-700">FAQs</p>
        <p className="cursor-pointer  hover:text-brand-700">Terms & Conditions</p>
        <p className="cursor-pointer  hover:text-brand-700">Privacy policy</p>
      </div>
      <div className="border border-b-0 border-text-primary my-8"></div>
      <p className="text-xs text-center  laptop:text-[1rem]">
        ©{date} Evererdant
      </p>
      <div className="text-xs text-center flex flex-wrap justify-evenly mt-4  laptop:text-[1rem]">
        <p className="cursor-pointer  hover:text-brand-700">Privacy Policy</p>
        <p className="cursor-pointer  hover:text-brand-700">
          Terms and Conditions
        </p>
        <p className="cursor-pointer  hover:text-brand-700">Cookies Policy</p>
      </div>
    </footer>
  );
}
export default Footer;
