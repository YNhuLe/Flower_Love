import React from "react";

function SigUpCard() {
  return (
    <div className="m-4 transform duration-300 hover:scale-105">
      <div className="bg-primary mt-16  transform rotate-2 w-[calc(100%-2rem)] mx-auto rounded-md">
        <div
          className="bg-tertiary p-16 pl-10 pr-10 mt-16 rounded-xl transform -rotate-3 duration-300
        hover:bg-dark_green hover:text-white group 
        ">
          <h2 className="text-4xl text-secondary font-medium  mb-3 group-hover:text-white">
            Start Buying and Selling Plants Today!
          </h2>
          <p>
            Join our community of plant lovers and start exploring a wide
            variety of plants for sale. Whether you're looking to expand your
            collection or sell your own plants, we've got you covered.
          </p>
          <button
            title="Sign Up"
            className="bg-primary p-4 pb-0 pt-0 text-white  max-sm:w-[15rem] hover:text-primary  hover:bg-white border
          
          transition-all duration-300 hover:border-primary  font-semibold rounded-3xl cursor-pointer h-10 mt-10">
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SigUpCard;
