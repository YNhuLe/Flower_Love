import React from "react";
import { BestProductProp } from "../types/types";
import Button from "../common/Button";
import { FaStar, FaHeart } from "react-icons/fa";
import HeartButton from "../common/HeartButton";
import { FaShoppingCart } from "react-icons/fa";

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
        <div>
          {
            products.isnewarrival && (
               <p className="bg-primary  w-fit px-2 py-1 rounded-lg text-third text-[.65rem]">  New</p>
       
            )
          }
        </div>
          <HeartButton btnType="gift_box"/>
      </div>

      <img
        className="h-60 w-60 m-auto transform transition-transform duration-300 hover:scale-105"
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
      <Button btnType="add"
      
      />
    </div>
  );
}

export default BestProductDetails;
