import {  Tag, Truck , Shield, Gift} from "lucide-react";
import Button from "../../common/Button";
import useCartStore from "../../hooks/useCartStore";
import { useState } from "react";

function OrderSummary() {


    const totalSpend = useCartStore((state) =>
        state.items.reduce((sumSpend, item) => sumSpend + item.price * item.quantity, 0)
    );

    function getShippingFee(subtotal: number) {
  if (subtotal === 0) return "--";
  if (subtotal < 75) return (subtotal * 0.3).toFixed(2);
  return "FREE";
}


    return (
        <section className="bg-surface-raised/80 p-4 m-4 rounded-xl ">

            <h1>Order Summary</h1>
            <div className="flex gap-2 items-center mt-6 mb-2 ">

                <Tag className="w-4 h-4 " />
                <p className="text-xxs">
                    Promo code
                </p>
            </div>

            <div className="flex gap-2">

                <input
                    className="p-1 rounded-xl bg-text-muted/30 w-full text-xs pl-2"
                    placeholder="Enter code"
                />
                <Button btnType="promo_apply" />
            </div>
            <p className="text-xs mt-2 mb-6">Try: PLANT10 or WELCOME20</p>
            <hr className="border-t border-gray-300" />


            <div className="my-6 flex justify-between ">


                <div className="flex flex-col">
                    <p>Subtotal: </p>
                    <p>Shipping</p>
                    <p>Tax (8%)</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-text-primary/60">${totalSpend.toFixed(2)}</p>
                    {/* <p>{
                        totalSpend > 75 ? <p className="text-success-300">FREE</p> : <p>--</p>
                    }</p> */}
                    <p className="text-sm">
  {(() => {
    const fee = getShippingFee(totalSpend);

    if (fee === "FREE") {
      return <span className="text-success-300">FREE</span>;
    }

    if (fee === "--") {
      return <span>--</span>;
    }

    return <span>${fee}</span>;
  })()}
</p>

                    <p className="text-text-primary/60">${(totalSpend * 0.08).toFixed(2)}</p>

                </div>
            </div>

            <hr className="border-t border-gray-300" />
            <div className="flex justify-between my-6">
                <p>Total: </p>
                <p>${((totalSpend*1.08) + getShippingFee(totalSpend))}</p>
            </div>
            <Button btnType="process_checkout" />
<Button btnType="continue_shopping" />
  <hr className="border-t border-gray-300" />
            <div className="mt-8">

                <div className="flex gap-2 m-2">
                  <Shield className="w-4 h-4 text-success-300" />
                  <p className="text-xs">Secure Checkout</p>
                </div>
                 <div className="flex gap-2 m-2">

<Truck className="w-4 h-4 text-amber-600" />
                    
                <p className="text-xs">Free shipping on orders over $75</p>
                 </div>
                  <div className="flex gap-2 m-2">  <Gift className="w-4 h-4 text-icon-emerald-600" />
                    <p className="text-xs">Gift wrapping available</p></div>
            </div>
        </section>
    )
}

export default OrderSummary;