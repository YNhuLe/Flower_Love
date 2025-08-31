import React from "react";

interface PriceCardProps {
  id: string;
  title: string;
  price: string;
  sub_price: string;
  features: string[];
}
function PriceCard({ title, price, sub_price, features, id }: PriceCardProps) {
      const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,h_24,w_24,f_auto,q_auto";

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
            src={`${cloud_url}/v1756387917/check_e4icbm.svg`}
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
