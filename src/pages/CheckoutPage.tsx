import ShippingInfoForm from "../features/Checkout/ShippingInfoForm";
import {Box, ChevronLeft } from "lucide-react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import useCartStore from "../hooks/useCartStore";

function CheckoutPage() {
    const navigate = useNavigate();

const totalSpend=   useCartStore((state) =>
state.getTotal(state.discountCode)
    )
    return (
        <section className="mt-8">

            <div className="flex gap-2 items-center">
                <ChevronLeft className="w-5 h-5 cursor-pointer ml-6"

                    onClick={() => navigate(-1)} />

                <p>Back to Cart</p></div>
            <h1 className="ml-4 text-xs mt-6">Check out</h1>
            <h2 className="ml-4 text-xs mb-6">Complete your order and bring nature home</h2>
            <ShippingInfoForm />

            <div className="rounded-md bg-surface-card p-4 shadow-md w-full m-4 ">

                <div className="flex gap-2 items-center mb-6">
                    <p className="p-2 rounded-full bg-icon-amber-600/20">
                        <Box className="w-5 h-5 text-icon-amber-600" /></p>
                    <h1>Billing Address</h1>
                </div>

                <div className="flex gap-2 items-center">
                    <input type="checkbox" defaultChecked className="checkbox rounded-sm text-text-primary" />
                    <p className="text-xs">Same as shipping address</p>

                </div>
            </div>

            <Button btnType="place_order" price={totalSpend.toFixed(2)}/>
    
        </section>
    )
}
export default CheckoutPage;