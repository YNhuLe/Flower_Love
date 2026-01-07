
import SearchBar from "../common/SearchBar";
import NavBar from "../components/NavBar";
import ItemsInCart from "../features/ShoppingCart/ItemsInCart";
import useCartStore from "../hooks/useCartStore";
import { Truck , ShoppingCart} from "lucide-react";
import MightLikeSection from "../features/ShoppingCart/MightLikeSection";
import Button from "../common/Button";
import OrderSummary from "../features/ShoppingCart/OrderSummary";
function PaymentPage() {
  // const totalItemCount = useCartStore((state) =>
  //   state.items.reduce((sum, item) => sum + item.quantity, 0)
  // );

  // const totalSpend = useCartStore((state) =>
  //   state.items.reduce((sumSpend, item) => sumSpend + item.price * item.quantity, 0)
  // )

  // const isFreeShipping = totalSpend > 50;
const totalItemCount = useCartStore((c) => c.totalItemCount())
  const shippingFee = useCartStore((s) => s.shippingFee());
  console.log("IsFreeShipping: ", shippingFee);

  
  return (
    <section >
      <NavBar />
      <SearchBar />
      {/* {
        isFreeShipping ? <p className="flex gap-4 items-center p-2 bg-success-300 mt-8 mx-4 text-text-inverse rounded-2xl"><Truck className="w-8 h-8" />Congratulations! You qualify for FREE shipping! 🎉</p> : ""

      } */}

      {shippingFee > 75 ? <p className="flex gap-4 items-center p-2 bg-success-300 mt-8 mx-4 text-text-inverse rounded-2xl"><Truck className="w-8 h-8" />Congratulations! You qualify for FREE shipping! 🎉</p> : ""
 }
      <h1 className="text-xl font-bold m-4 mb-2">Shopping Cart</h1>
      <h2 className="text-xxs m-4 mt-2">{totalItemCount} items in your cart</h2>
      <ItemsInCart />

{/* if there is at least 1 item in the cart, show the MightLikeSection, if not show the "Your cart is empty section" */}
      {
        totalItemCount > 0 ?  <MightLikeSection /> :
        
        <section className="bg-surface-raised/80 p-4 m-4 rounded-xl flex flex-col items-center">
          <div className="p-4 rounded-full bg-text-muted/20 w-fit mt-12 mb-8">
<ShoppingCart className="w-20 h-20 text-text-muted/40" />

</div>
<p className="text-center">Looks like you haven't added any plants to your cart yet. Start shopping and discover the perfect plants for your space!</p>
<Button btnType="start_shopping"/>
        </section>
      }

    
     <OrderSummary />
    </section>
  )
}
export default PaymentPage;