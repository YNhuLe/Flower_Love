import React from "react";
import NavBar from "./NavBar";
import Button from "../common/Button";
function Hero() {
  const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-[#f5f1ea] to-[#eaf5ea] relative overflow-hidden">
      <NavBar />
      <div className="absolute top-0 right-0 w-56 h-56 bg-green-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute right-6 top-4 w-72 h-72 bg-brand-700 rounded-full opacity-20 blur-2xl ultra:w-96 ultra:h-96 ultra:left-[80rem] ultra:blur-3xl"></div>
      <div className="absolute right-6 top-4 w-72 h-72 bg-yellow-600 rounded-full opacity-20 blur-2xl ultra:w-96 ultra:h-96 ultra:left-[85rem] ultra:blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-700 rounded-full opacity-20 blur-2xl ultra:w-96 ultra:h-96 ultra:left-[20rem] ultra:blur-3xl"></div>
      <div className="absolute bottom-0 left-[8rem] w-72 h-72 bg-yellow-600 rounded-full opacity-20 blur-2xl ultra:w-96 ultra:h-96 ultra:left-[20rem] ultra:blur-3xl"></div>
      <div className="z-10 max-w-xl mt-[8rem]">
        <h1
          className="text-4xl font-bold text-brand-700 m-4 mb-6 leading-tight tablet:text-5xl tablet:mt-10 laptop:mt-20
        
        ultra:text-6xl ">
          Rooted in nature. Delivered to you.
        </h1>

        <p className="text-green-800 text-lg m-4 mb-50 mt-10 tablet:text-2xl    ultra:text-3xl">
          Make your days feeling good with beautiful plant.
        </p>

        <img
          loading="lazy"
          src={`${cloud_url}/v1756387863/leaf3_ef38ac.png`}
          alt="leaf"
          className="w-[calc(100%-2rem)]  h-[20rem] right-0 absolute top-[23rem] tablet:w-[25rem] tablet:h-[25rem] tablet:top-[20rem] -z-10
        laptop:h-[35rem] laptop:w-[30rem] laptop:top-[23rem]
           ultra:h-[45rem] ultra:w-[40rem] ultra:top-[12rem] "
        />

        <img
          loading="lazy"
          src={`${cloud_url}/v1756387864/leaf4_xfagl8.png`}
          alt="leaf"
          className="w-[calc(100%-2rem)]  h-[18rem] left-0 absolute top-[36rem] 
          tablet:w-[25rem] tablet:h-[31rem] tablet:top-[20rem] -z-10
           laptop:h-[35rem] laptop:w-[30rem] laptop:top-[23rem]
                     ultra:h-[45rem] ultra:w-[40rem] ultra:top-[12rem] "
        />
        <div className="flex flex-col sm:flex-row items-center gap-3 m-4 mt-40 tablet:mt-80 tablet:justify-center laptop:mb-30">
          <Button btnType="signup" />
          <Button btnType="learn_more" />
        </div>
      </div>
    </div>
  );
}
export default Hero;
