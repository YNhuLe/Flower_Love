import React from "react";

import check from "/public/assets/check.svg";

interface PriceCardProps {
  id: string;
  title: string;
  price: string;
  sub_price: string;
  features: string[];
}
function PriceCard({ title, price, sub_price, features, id }: PriceCardProps) {
  return (
    <div
      className={`${
        id === "1"
          ? "bg-third border-primary "
          : id === "2"
          ? "bg-tertiary border-ternary"
          : "bg-accent border-primary"
      } mt-8 p-4 rounded-md border-[.1rem] border-primary w-full text-center`}>
      <p className="text-center m-4 tablet:text-3xl">{title}</p>
      <h2 className="text-3xl text-center font-semibold  tablet:text-4xl">
        {price}
      </h2>
      <p className="text-xl text-center mt-4   tablet:text-2xl tablet:mb-8">
        {sub_price}
      </p>
      <ul>
        {features.map((fea: string, id: number) => (
          <li key={id} className="flex flex-row gap-4 mt-4">
            <img
              loading="lazy"
              src={check}
              alt="check"
              className="tablet:ml-8"
            />
            <p className="text-sm tablet:text-xl text-left"> {fea}</p>
          </li>
        ))}
      </ul>
      <button
        className={`border-2 ${
          id === "1"
            ? "bg-third border-primary text-primary  hover:text-third"
            : id === "2"
            ? "bg-accent border-primary text-third"
            : "bg-primary border-primary text-third"
        } w-[15rem]  max-sm:w-[15rem] tablet:w-[20rem] mx-auto hover:bg-black border
          
          transition-all duration-300 hover:border-primary  hover:scale-110 font-semibold rounded-3xl cursor-pointer h-10 mt-6
            tablet:my-8 tablet:h-12`}>
        Sign Up Now
      </button>
    </div>
  );
}

export default PriceCard;
