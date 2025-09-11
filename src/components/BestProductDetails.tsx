import React from "react";
import { BestProductProp } from "../types/types";
import Button from "../common/Button";
import { FaStar, FaHeart } from "react-icons/fa";


function BestProductDetails({ products }: { products: BestProductProp }) {
  const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

  console.log(products);
  if (!products) {
    return <p>Loading product details...</p>;
  }
  return (
    <div
      className="max-w-fit h-50 mt-8 mb-8 p-4 border m-4 border-green-900 rounded-lg shadow-lg mx-auto mx-4"
    >
      <div className="flex flex-row justify-between">
        <p className="bg-primary  w-fit px-2 py-1 rounded-lg text-third text-[.65rem]">  New</p>
      
         <button className="cursor-pointer items-end-safe">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg></button>
      </div>
     

      {/* <FaHeart className="text-purple-500 w-6 h-6" /> */}
      <img
        className="h-60 w-60 m-auto"
        // src={`/images/${products.image_url}`}
        src={`${cloud_url}/${products.image_url}`}
        alt="best-pro-image"
        loading="lazy"
      />

      <h2 className="text-left mt-4 text-xs">{products.common_name}</h2>
      <div className="flex flex-row justify-start gap-2">
        <p className=" text-xxs text-primary font-semibold">
          ${products.original_price}
        </p>
        <p className="text-xs line-through ">
          ${products.discounted_price}
        </p>
        <FaStar className="text-yellow-400 w-5 h-5 ml-20" />
        <p>{products.rating}</p>
      </div>
      <Button btnType="add" />
    </div>
  );
}

export default BestProductDetails;
