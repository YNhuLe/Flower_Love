import { Trash2 } from "lucide-react";
import { useState } from "react";
import QuantitySelector from "../../common/QuantitySelector";
import useCartStore from "../../hooks/useCartStore";
import StockDisplay from "../../common/StockDisplay";
function ItemsInCart() {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
    const {items,updateQuantity} = useCartStore();
    const removeFromCart = useCartStore((state) =>state.removeFromCart);
    const handleRemove = (product_id: number, size: string) =>{
        removeFromCart(product_id, size)
    }

     return (
<>
        {
            items.map((item) =>(
        <article className="flex gap-2 bg-surface-raised/80 p-4 m-4 rounded-xl">
            <div className="max-w-24 max-h-20 rounded-xl bg-text-inverse/80 flex flex-col justify-center">
                <img className="" src={`${cloud_url}/${item.image}`} />
                  </div>

            <section>
                <div className="flex items-center justify-between gap-8 m-2">
                    <h1 className="text-xxs">{item.name}</h1>
                    <Trash2 className="w-4 h-4 text-error-500 cursor-pointer" onClick={() => handleRemove(item.product_id, item.size)} />
                </div>
                <h2 className="text-xs text-text-muted italic m-2">{item.science_name}</h2>
                <p className="text-xs bg-text-muted/30 w-fit p-2 py-1 rounded-full object-cover m-2">{item.size}</p>
                <div className="flex gap-4 m-2">

                    <p className="px-2 bg-success-300/30 rounded-full py-1 w-fit text-success-700 text-[.6rem]">{item.level}</p>

          <StockDisplay stockQuantity={item.stock} stockType="cart" />
                   
                </div>
                <div className="flex justify-between items-center gap-4">

                    <QuantitySelector value={item.quantity} min={1} max={200} onChange={(newQuantity) => updateQuantity(item.product_id, newQuantity, item.size)} selectorType="cartItem" />
              
                   <div className="flex flex-col items-end"> 
                   <p className="text-xxs">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs flex items-end gap-1">${item.price.toFixed(2)} <span className="text-[.6rem]">each</span></p></div>
                </div>
            </section>
        </article>
       )
            )
        }
          </>
    );
}

export default ItemsInCart;