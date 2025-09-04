import React from "react";
import Button from "../common/Button";
interface GiftBoxProps{
    id: string;
    titile: string;
    description: string;
    img_url: string;
    discount: number;
    price: number;
    ori_price: number;
}
interface GiftboxItemsProps{
     id: number;
     giftbox_id: number;
     item_name: string;
     quantity: number;

}

interface GiftboxWithItemsProps extends GiftBoxProps{
    items: GiftboxItemsProps[];
}
function GiftBoxCard(){
    return (
        <>      <div className="relative  min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center row-span-2">
                         {/* <img src={`{${img_url}/v1756927884/gift-box_c1mcms.jpg}`} alt="" /> */}
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">26% OFF</div>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className="text-lg font-bold">Best Selling</h3>
                        <p className="text-sm">Modern Geometric Design</p>
                        <Button btnType="shop_now" />
                    </div>
            
                </div></>
    )
}