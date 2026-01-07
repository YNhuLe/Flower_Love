import { Badge, Tag } from "lucide-react";
import Button from "../../common/Button";
import useCartStore from "../../hooks/useCartStore";
import { P } from "framer-motion/dist/types.d-DagZKalS";
function OrderSummary() {


    const totalSpend = useCartStore((state) =>
        state.items.reduce((sumSpend, item) => sumSpend + item.price * item.quantity, 0)
    )

 
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


            <div className="mt-6 flex justify-between ">


                <div className="flex flex-col">
                    <p>Subtotal: </p>
                    <p>Shipping</p>
                    <p>Tax (8%)</p>
                </div>
                <div className="flex flex-col"><p>${totalSpend.toFixed(2)}</p>
                    <p>{
                        totalSpend > 50 ? <p className="text-success-300">FREE</p> : <p></p>
                    }</p>
                    <p>{(totalSpend * 0.08).toFixed(2)}</p>

                </div>
            </div>
        </section>
    )
}

export default OrderSummary;