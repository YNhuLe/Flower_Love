import SearchBar from "../common/SearchBar";
import NavBar from "../components/NavBar";
import ItemsInCart from "../features/ShoppingCart/ItemsInCart";
import useCartStore from "../hooks/useCartStore";


function PaymentPage(){
const totalItemCount = useCartStore((state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)
);

    return(
        <>
        <NavBar />
        <SearchBar />
        <h1 className="text-xl font-bold m-4 mb-2">Shopping Cart</h1>
        <h2 className="text-xxs m-4 mt-2">{totalItemCount} items in your cart</h2>
        <ItemsInCart />
        </>
    )
}
export default PaymentPage;