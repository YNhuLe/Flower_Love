import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { ReactNode } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
interface ButtonProps {
  btnType?: "add" | "submit" | "cancel" | "signup" | "learn_more" | "shop_now" | "customize" | "explore" | "plant_quiz" | "view_all"
  | "add_to_cart" | "quick_view";
  url?: string;
  price?: string | number;
  onSubmit?: () => void;
  onClick?: () => void;
}

const styleMap: Record<string, string> = {

  add: "w-[calc(100%-2rem)] p-2 mt-2 mx-auto  text-sm bg-primary rounded-3xl border border-tertiary hover:bg-third hover:border-primary hover:text-primary  transition-all duration-300 text-tertiary",
  cancel: "rounded-2xl text-sm bg-purple-500 hover:bg-blue-500  transition-all duration-300 text-tertiary",
  submit: "rounded-2xl text-sm bg-pink-500 hover:bg-blue-500  transition-all duration-300 text-tertiary",
  // explore: "  text-sm border border-cartRed hover:bg-cartRed hover:text-third transition-all duration-300  text-cartRed mt-5 mb-8",
  signup: "bg-primary rounded-2xl text-third w-full max-sm:w-[15rem] hover:text-primary  hover:bg-white border transition-all duration-300 hover:border-primary  font-semibold rounded-3xl cursor-pointer h-10 tablet:text-2xl tablet:h-16 tablet:rounded-full tablet:w-[15rem]",
  learn_more: "p-1 bg-white rounded-2xl text-primary font-semibold w-full max-sm:w-[15rem] rounded-3xl border border-primary transition-all duration-300 hover:bg-primary  hover:text-white cursor-pointer h-10 pl-1 tablet:text-2xl tablet:h-16 tablet:rounded-full tablet:w-[15rem]",
  customize: "p-1 text-xs px-4 py-2 rounded-2xl text-third bg-cartRed hover:bg-darkCartRed transition-all duration-300 absolute bottom-[1rem] left-[1rem]",
  shop_now: "text-xs px-4 py-2 rounded-2xl text-third bg-accent hover:bg-primary transition-all duration-300  absolute bottom-[1rem] left-[1rem]",
  explore: "text-xs rounded-2xl text-lightGreen",
  plant_quiz: "p-1 text-xs px-4 rounded-2xl text-tertiary text-center bg-lightGreen hover:bg-tertiary transition-all duration-300 hover:text-lightGreen",
  view_all: "text-xs rounded-2xl text-primary hover:bg-lightGreen transition-all duration-300 hover:text-tertiary hover:bg-lightGreen"
  , add_to_cart: "p-1 w-full rounded-2xl px-[37px] text-xs text-tertiary bg-primary border border-tertiary hover:bg-third hover:border-primary hover:text-primary transition-all duration-300 text-tertiary "
  , quick_view: "p-1 text-xs px-4 rounded-2xl text-primary bg-tertiary border rounded-xl hover:bg-primary hover:text-tertiary transition-all duration-300 "
}

const labelMap: Record<string, string> = {
  add: `Add to Cart`,
  cancel: "Cancel",
  submit: "Submit",
  explore: "Explore Category",
  signup: "Sign Up",
  learn_more: "Learn More 🌻",
  shop_now: "Shop Now",
  customize: "Build Now",
  plant_quiz: "Take Plant Quiz",
  view_all: "View All Plants",
  add_to_cart: "Add to Cart",
  quick_view: "Quick View"
}

const iconMap: Record<string, ReactNode> = {
  add: <ShoppingCartIcon className="w-5 h-5 text-white-700 hover:text-green-500 transition" />
}
const urlMap: Record<string, string> = {
  add: "/add-item",
  learn_more: "/products",
  signup: "/signup",
  customize: "/customize",
  shop_now: "/shop",
  explore: "/category",
  plant_quiz: "/plant_quiz",
  view_all: "/view_all",
  add_to_cart: "/add_to_cart",


}

function Button({ btnType = "add", url, price, onSubmit, onClick }: ButtonProps) {
  const navigate = useNavigate();
  const btnClasses = styleMap[btnType] || "bg-gray-300 text-black";
  // const label = labelMap[btnType] || "Click";
  const label = btnType === "add" && price ? `Add to Cart - $${price}` : labelMap[btnType] || "Click";
  const targetUrl = url || urlMap[btnType];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (targetUrl) {
      navigate(targetUrl);
    }
  }
  return (
    <div className="">
      <button className={`cursor-pointer flex flex-row justify-center items-center gap-3 ${btnClasses}`}
        onClick={handleClick}
      >

        {iconMap[btnType] && iconMap[btnType]}
        <span>{label}</span>

      </button>

    </div>
  );
}

export default Button;