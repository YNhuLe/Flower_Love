import { Tag, Truck, Shield, Gift } from "lucide-react";
import Button from "../../common/Button";
import useCartStore from "../../hooks/useCartStore";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { X } from "lucide-react";
/**
 * 
 * @returns A JSX element representing the order summary component
 */
function OrderSummary() {

    const [typedCode, setTypedCode] = useState("");

    const appliedCode = useCartStore(s => s.discountCode);
    const applyDiscount = useCartStore(s => s.setDiscountCode);

    const discountRate = useCartStore(state => state.getDiscountRate(appliedCode))
    const total = useCartStore((state) => state.getTotal(appliedCode)
    );
    const subTotal = useCartStore((state) => state.totalSpend())
    const shippingFee = useCartStore(state => state.shippingFee)
    const saving = useCartStore(s => s.getDiscountSave(discountRate));

    const [applyDiscountCode, setApplyDiscountCode] = useState<string | null>(null);
    const discountSave = useCartStore(s => s.getDiscountSave(discountRate));
    const isDisabled = useCartStore((state) => state.isApplyDisabled);
    const handleDiscountApply = (() => {
        applyDiscount(typedCode.trim().toLocaleUpperCase());
        setTypedCode("");
    });

    const removePromoCode = () => {
        setApplyDiscountCode(null);

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




            {
                appliedCode ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-700">
                                {appliedCode.toUpperCase()}
                            </Badge>å
                            <span className="text-green-700 text-sm">
                                -{(discountRate * 100).toFixed(0)}% off
                            </span>
                        </div>
                        <button


                            onClick={removePromoCode}
                            className="h-6 w-6 p-0 text-green-700 hover:text-green-800"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>) : (
                    <div className="flex items-center gap-2 mb-2">
                        {/* <Badge className="bg-green-100 text-green-700">
                            {appliedCode.toUpperCase()}
                        </Badge>
                        <span className="text-green-700 text-sm">
                            -{(discountRate * 100).toFixed(0)}% off
                        </span> */}

                        <div className="flex flex-col w-full">
                            <input
                                className="p-1 rounded-xl bg-text-muted/30 w-full text-xs pl-2 h-9"
                                placeholder="Enter code"

                                value={typedCode}

                                onChange={(e) => {


                                    const value = e.target.value;
                                    setTypedCode(value)
                                    if (isDisabled(typedCode)) { setApplyDiscountCode("") }
                                }}

                                onKeyDown={(e) => e.key === "Enter" && handleDiscountApply()}
                            />




                        </div>

                        <Button btnType="promo_apply" onClick={handleDiscountApply} disabled={isDisabled(typedCode)} /></div>
                )}

            <p className="text-xs mt-2 mb-6">Try: PLANT10 or WELCOME20</p>
            <hr className="border-t border-gray-300" />


            <div className="my-6 flex justify-between ">


                <div className="flex flex-col">
                    <p>Subtotal: </p>
                    <p className="text-success-500">Discount: ({appliedCode})</p>
                    <p>Shipping</p>
                    <p>Tax (5%)</p>

                </div>

                <div className="flex flex-col">
                    <p className="text-text-primary/60">${subTotal.toFixed(2)}</p>
                    <p className=" text-success-500">-${discountSave.toFixed(2)}</p>
                    <p className="text-sm">
                        {(() => {
                            const fee = shippingFee();

                            if (fee === 0) {
                                return <span className="text-success-500">FREE</span>;
                            }

                            if (fee === null) {
                                return <span>--</span>;
                            }

                            return <span>${fee.toFixed(2)}</span>;
                        })()}

                    </p>

                    <p className="text-text-primary/60">${(subTotal * 0.05).toFixed(2)}</p>

                </div>
            </div>

            <hr className="border-t border-gray-300" />
            <div className="flex justify-between my-6 mb-2">
                <p>Total: </p>
                <p>${total.toFixed(2)}</p>

            </div>

     
            <Button btnType="process_checkout"


            />
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