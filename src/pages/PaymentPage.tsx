import SearchBar from "../common/SearchBar";
import NavBar from "../components/NavBar";
import ItemsInCart from "../features/ShoppingCart/ItemsInCart";


function PaymentPage(){

    return(
        <>
        <NavBar />
        <SearchBar />
        <h1 className="text-xl font-bold m-4 mb-2">Shopping Cart</h1>
        <h2 className="text-xxs m-4 mt-2">3 items in your cart</h2>
        <ItemsInCart />
        </>
    )
}
export default PaymentPage;