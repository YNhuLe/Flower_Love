import QuantitySelector from "../common/QuantitySelector";
import { useState } from "react";
function CustomGiftCard() {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
   
    const [quantity, setQuantity] = useState(0);
    return (
        <div className="border rounded-xl  w-[calc(100% - 2rem)] mx-4 my-6 overflow-hidden">
            <img      loading="lazy"
        src={`${cloud_url}/v1756387871/headquarter_kwvneo.jpg`} className="w-full h-[240px] object-cover" />
            <h1 className="text-sm m-4 mb-2">Gift name</h1>
            <p className="text-cartRed font-semibold ml-4"> $ Price</p>
            <QuantitySelector value={quantity}
                onChange={setQuantity}
                min={1} max={200}
            />
        </ div>
    )
}

export default CustomGiftCard;