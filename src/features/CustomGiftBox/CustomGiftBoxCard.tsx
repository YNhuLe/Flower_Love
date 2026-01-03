import QuantitySelector from "../../common/QuantitySelector";
import HeartButton from "../../common/HeartButton";
import { useState } from "react";
import { GiftItemProps } from "../../types/types";
function CustomGiftBoxCard({ name, price, img_url }: GiftItemProps) {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    const [quantity, setQuantity] = useState(0);

    const imgSrc = img_url ? `${cloud_url}/${img_url}` : `${cloud_url}/v1758512182/grass_drtecm.jpg`;

    return (
        <div className="border rounded-xl  w-full mx-auto my-6 overflow-hidden relative">
          
            <img loading="lazy"
                src={imgSrc} className="w-full h-[22rem] object-cover transform transition-transform duration-300 hover:scale-105" />
              <HeartButton btnType="custom_gift"/>
            <h1 className="text-sm m-4 mb-2"> {name}</h1>
            <p className="text-cart-500 font-semibold ml-4"> $ {price}</p>
            <QuantitySelector value={quantity}
            selectorType="plantItem"
                onChange={setQuantity}
                min={1} max={200}
            />
        </ div>
    )
}

export default CustomGiftBoxCard;