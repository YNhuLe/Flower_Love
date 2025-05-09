import React from "react";
import NavBar from "./NavBar";

function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-[#f5f1ea] to-[#eaf5ea] relative overflow-hidden">
      <NavBar />
      <div className="absolute top-0 right-0 w-56 h-56 bg-green-200 rounded-full opacity-30 blur-3xl"></div>

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-0 left-[8rem] w-72 h-72 bg-yellow-600 rounded-full opacity-20 blur-2xl"></div>
      <div className="z-10 max-w-xl mt-[8rem]">
        <h1 className="text-4xl font-bold text-primary m-4 mb-6 leading-tight">
          Let the environment be green.🌿
        </h1>

        <p className="text-green-800 text-lg m-4 mb-50 mt-10">
          Make your days feeling good with beautiful plant.
        </p>
        {/* <img
          src="/Flower_Love/images/leaf.jpg"
          alt="leaf"
          className="w-[15rem]  h-[15rem] right-0 absolute top-[15rem]"
        /> */}
        <div className="flex flex-col sm:flex-row items-center gap-3 m-4 ">
          <button
            className="bg-primary  text-white w-full max-sm:w-[15rem] hover:text-primary  hover:bg-white border
          
          transition-all duration-300 hover:border-primary  font-semibold rounded-3xl cursor-pointer h-10">
            Sign Up
          </button>
          <button
            className="bg-white text-primary font-semibold w-full max-sm:w-[15rem] rounded-3xl border border-primary 
          transition-all duration-300 hover:bg-primary  hover:text-white cursor-pointer h-10 pl-1">
            Learn more
            <span className="ml-1">🌻</span>
          </button>
        </div>
      </div>

      {/* <img
        src="/Flower_Love/images/daisy.jpg"
        alt="leaf"
        className="w-full  h-[15rem] right-0 absolute bottom-0"
      /> */}
    </div>
  );
}
export default Hero;
