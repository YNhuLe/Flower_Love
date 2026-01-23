import { Tag, Truck, Shield, Gift } from "lucide-react";
import Button from "../../common/Button";
import useCartStore from "../../hooks/useCartStore";
import { useState } from "react";


function getShippingFee(subtotal: number) {
    if (subtotal === 0) return null;
    if (subtotal < 75) return subtotal * 0.13;
    return 0;
}

function getDiscountRate(code: string) {
    const normalized = code.trim().toUpperCase();
    if (normalized === "PLANT10") return 0.1;
    if (normalized === 'WELCOME20') return .2;
    return 0;
}

function getTotal(subtotal: number, discountCode: string) {
    if (subtotal === 0) return 0;

    const shipping = getShippingFee(subtotal) ?? 0;
    const tax = subtotal * .05;
    const discountRate = getDiscountRate(discountCode);
    const beforeDiscount = subtotal + shipping + tax;
    const afterDiscount = beforeDiscount * (1 - discountRate);

    return afterDiscount.toFixed(2);

}
function getDiscountSave(totalSpend: number, discountRate: number) {
    return totalSpend * (discountRate)
}
function OrderSummary() {


    const totalSpend = useCartStore((state) =>
        state.items.reduce((sumSpend, item) => sumSpend + item.price * item.quantity, 0)
    );

    const [discountCode, setDiscountCode] = useState("");
    const [applyDiscountCode, setApplyDiscountCode] = useState("");
    const [discountSave, setDiscountSave] = useState(0);

    const upper = discountCode.trim().toUpperCase();
    const isValid = upper === "PLANT10" || upper === "WELCOME20";
    const isApplyDisabled = discountCode.trim() === "" || discountCode === upper || !isValid;

    const handleDiscountApply =
        (() => {
            const rate = getDiscountRate(discountCode);

            const code = discountCode.trim().toUpperCase();
            const isValid = code === "PLANT10" || code === "WELCOME20";

            if (isValid) {
                setApplyDiscountCode(code);
                setDiscountSave(getDiscountSave(totalSpend, getDiscountRate(discountCode)))
            } else {
                setApplyDiscountCode("");
            }
            setDiscountCode("");
        })


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

                    value={discountCode}

                    onChange={(e) => {


                        const value = e.target.value;
                        setDiscountCode(value)

                        const upper = value.trim().toUpperCase();
                        const isValid = upper === "PLANT10" || upper === "WELCOME20";
                        const isApplyDisabled = discountCode.trim() === "" || discountCode === upper || !isValid;
                        if (!isValid) { setApplyDiscountCode(""); }
                    }}

                />

                {
                    discountCode && !["PLANT10", "WELCOME20"].includes(discountCode.trim().toUpperCase()) && (
                        <p className="text-error-500 text-xs ">Invalid discount code</p>
                    )
                }

                <Button btnType="promo_apply" onClick={handleDiscountApply} disabled={isApplyDisabled} />
            </div>
            <p className="text-xs mt-2 mb-6">Try: PLANT10 or WELCOME20</p>
            <hr className="border-t border-gray-300" />


            <div className="my-6 flex justify-between ">


                <div className="flex flex-col">
                    <p>Subtotal: </p>
                    <p>Shipping</p>
                    <p>Tax (5%)</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-text-primary/60">${totalSpend.toFixed(2)}</p>

                    <p className="text-sm">
                        {(() => {
                            const fee = getShippingFee(totalSpend);

                            if (fee === 0) {
                                return <span className="text-success-300">FREE</span>;
                            }

                            if (fee === null) {
                                return <span>--</span>;
                            }

                            return <span>${fee.toFixed(2)}</span>;
                        })()}

                    </p>

                    <p className="text-text-primary/60">${(totalSpend * 0.05).toFixed(2)}</p>

                </div>
            </div>

            <hr className="border-t border-gray-300" />
            <div className="flex justify-between my-6 mb-2">
                <p>Total: </p>
                <p>${getTotal(totalSpend, applyDiscountCode)}</p>

            </div>

            <div className="flex gap-2 justify-between mb-6">

                <p className="text-xs">You saved: </p>
                <p className="text-xs text-success-500">${discountSave.toFixed(2)}</p>
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