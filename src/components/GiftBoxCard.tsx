import React from "react";
import Button from "../common/Button";
import { GiftboxWithItemsProps } from "../types/types";

function GiftBoxCard( giftbox: GiftboxWithItemsProps) {
       const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
       const baseClass = 'relative  min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center hover:scale-[1.05]';
       const firstClass = isFirst ? 'row-span-2' : '';
    return (
         
          <div className={`${baseClass} ${firstClass}`}>
            <img src={`${cloud_url}/${giftbox.img_url}`} alt="" />
            {/* <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{giftbox.discount}% OFF</div> */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                <h3 className="text-lg font-bold">Best Selling</h3>
                       <p className="text-sm">{giftbox.discount}% OFF</p>
                <p className="text-sm">${giftbox.price}</p>
                <p className="text-sm">${giftbox.ori_price}</p>
   
                <Button btnType="shop_now" />
            </div>

        </div>
    )
}

export default GiftBoxCard;