import { Trash2, Shield, Truck, Gift } from "lucide-react";
import { useState } from "react";
import QuantitySelector from "../../common/QuantitySelector";
import useCartStore from "../../hooks/useCartStore";
import StockDisplay from "../../common/StockDisplay";

/**
 *  
 * @returns A JSX element representing the items in the shopping cart
 */
function ItemsInCart({ isCheckout }: { isCheckout?: boolean }) {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
    const { items, updateQuantity } = useCartStore();
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const handleRemove = (product_id: number, size: string) => {
        removeFromCart(product_id, size)
    }

    const appliedCode = useCartStore(s => s.discountCode);

    const subTotal = useCartStore((state) => state.totalSpend())
    const discountRate = useCartStore(state => state.getDiscountRate(appliedCode))


    const discountSave = useCartStore(s => s.getDiscountSave(discountRate));
    const shippingFee = useCartStore(state => state.shippingFee)
    const total = useCartStore((state) => state.getTotal(appliedCode)
    );

    return (
        <>



            {
                isCheckout ?
                    <div className="rounded-md bg-surface-card/10 p-4 shadow-md w-auto m-4">

                        {
                            items.map((item) => (

                                <>
                                    <article key={item.product_id} className="flex gap-2 p-4 rounded-xl">
                                        <div className="max-w-24 max-h-20 rounded-xl bg-text-inverse/80 flex flex-col justify-center">
                                            <img className="" src={`${cloud_url}/${item.image}`} />
                                        </div>

                                        <section>
                                            <div className="flex items-center justify-between gap-8 m-2">
                                                <h1 className="text-xxs">{item.name}</h1>

                                                <p className="text-xxs">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <h2 className="text-xs text-text-muted italic m-2">{item.science_name}</h2>
                                            <p className="text-xs bg-text-muted/30 w-fit p-2 py-1 rounded-full object-cover m-2">{item.size}</p>

                                        </section>
                                    </article>



                                </>
                            ))
                        }
                        <hr className="border-t border-gray-300" />
                        <div className="my-6 flex justify-between ">


                            <div className="flex flex-col">
                                <p>Subtotal: </p>

                                {
                                    appliedCode && (<p className="text-success-500 text-sm">Discount: ({appliedCode})</p>)
                                }

                                <p>Shipping</p>
                                <p>Tax (5%)</p>

                            </div>

                            <div className="flex flex-col">
                                <p className="text-text-primary/60">${subTotal.toFixed(2)}</p>
                                {
                                    appliedCode && (<p className=" text-success-500 text-sm">-${discountSave.toFixed(2)}</p>)
                                }

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
                    </div> :
                    <>
                        {
                            items.map((item) => (
                                <article key={item.product_id} className="flex gap-2 bg-surface-raised/80 p-4 m-4 rounded-xl">
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
                                                <p className="text-xs flex items-end gap-1">${(item.price)} <span className="text-[.6rem]">each</span></p>

                                            </div>
                                        </div>
                                    </section>
                                </article>
                            )
                            )
                        }</>
            }
        </>
    );
}

export default ItemsInCart;