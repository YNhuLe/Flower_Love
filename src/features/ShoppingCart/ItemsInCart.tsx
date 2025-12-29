import { Trash2 } from "lucide-react";
import { useState } from "react";
import QuantitySelector from "../../common/QuantitySelector";

function ItemsInCart() {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
    const [quantity, setQuantity] = useState(1);
    return (
        <article className="flex gap-2 bg-surface-raised/80 p-4 m-4 rounded-xl">
            <div className="w-28 h-20 rounded-xl bg-text-inverse/80 flex flex-col justify-center">
                <img className="" src={`${cloud_url}/v1766877443/o3-removebg-preview_1_k2o1mz.png`} />
                  </div>

            <section>
                <div className="flex items-center justify-between gap-8 m-2">
                    <h1 className="text-xxs">Orchid</h1>
                    <Trash2 className="w-4 h-4 text-error-500 " />
                </div>
                <h2 className="text-xs text-text-muted italic m-2">Phalaenopsis spp</h2>
                <p className="text-xs bg-text-muted/30 w-fit p-2 py-1 rounded-full object-cover m-2">Medium (6" pot)</p>
                <div className="flex gap-4 m-2">

                    <p className="px-2 bg-success-300/30 rounded-full py-1 w-fit text-success-700 text-xs">Easy</p>
                    <p className="px-2 bg-success-300/30 rounded-full py-1 w-fit text-success-700 text-xs">In Stock</p>
                </div>
                <div className="flex justify-between items-center gap-4">

                    <QuantitySelector value={quantity} min={1} max={200} onChange={setQuantity} selectorType="cartItem" />
              
                   <div className="flex flex-col justify-center"> 
                   <p className="text-xxs">{(23*quantity).toFixed(2)}</p>
                    <p className="text-xs">$49.99</p></div>
                </div>
            </section>
        </article>
    );
}

export default ItemsInCart;