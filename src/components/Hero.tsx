import React from "react";
import NavBar from "./NavBar";

function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-[#f5f1ea] to-[#eaf5ea] relative overflow-hidden">
      <NavBar />
      <div className="absolute top-0 right-0 w-56 h-56 bg-green-200 rounded-full opacity-30 blur-3xl"></div>

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-800 rounded-full opacity-20 blur-2xl"></div>

      <div className="z-10 max-w-xl mt-[8rem]">
        <h1 className="text-5xl font-bold text-green-900 mb-6 leading-tight">
          Plants make a<br />
          positive impact
          <br />
          on your environment.
        </h1>
        <p className="text-green-800 text-lg mb-8">
          Provide your house & office space with the right plants and let our
          plant care team keep them flourishing.
        </p>

        <div className="flex items-center gap-6">
          <button className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition">
            Book now
          </button>
          <button className="flex items-center text-green-700 font-semibold hover:underline">
            Know more
            <span className="ml-2">🌿</span>
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}
export default Hero;
