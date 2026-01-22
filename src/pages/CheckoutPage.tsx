import ShippingInfoForm from "../features/Checkout/ShippingInfoForm";
import { Truck, Box } from "lucide-react";
import Button from "../common/Button";
function CheckoutPage() {

    return (
        <>
            <h1>Check out</h1>
            <h2>Complete your order and bring nature home</h2>
            <ShippingInfoForm />

            <div className="rounded-md bg-surface-card p-4 shadow-md w-ful m-4 ">

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

            <Button btnType="place_order" />
        </>
    )
}
export default CheckoutPage;