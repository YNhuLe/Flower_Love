import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import {
  Share2,
  Droplets,
  Sun,
  Thermometer,
  Wind,
  Sparkles,
} from 'lucide-react';
interface ButtonProps {
  btnType?: "add" | "submit" | "cancel" | "signup" | "learn_more" | "shop_now" | "customize" | "explore" | "plant_quiz" | "view_all"
  | "add_to_cart" | "quick_view" | "AI_analyze";
  url?: string;
  price?: string | number;
  onSubmit?: () => void;
  onClick?: () => void;
  disabled?: boolean;
}

const styleMap: Record<string, string> = {

  add: "w-[calc(100%-2rem)] p-2 mt-2 mx-auto  text-sm bg-brand-700 rounded-3xl border border-brand-100 hover:bg-surface-base hover:border-brand-700 hover:text-brand-700  transition-all duration-300 text-brand-100",
  cancel: "rounded-2xl text-sm bg-purple-500 hover:bg-blue-500  transition-all duration-300 text-brand-100",
  submit: "rounded-2xl text-sm bg-pink-500 hover:bg-blue-500  transition-all duration-300 text-brand-100",
  // explore: "  text-sm border border-cart-500 hover:bg-cart-500 hover:text-surface-base transition-all duration-300  text-cart-500 mt-5 mb-8",
  signup: "bg-brand-700 rounded-2xl text-surface-base w-full max-sm:w-[15rem] hover:text-brand-700  hover:bg-white border transition-all duration-300 hover:border-brand-700  font-semibold rounded-3xl cursor-pointer h-10 tablet:text-2xl tablet:h-16 tablet:rounded-full tablet:w-[15rem]",
  learn_more: "p-1 bg-white rounded-2xl text-brand-700 font-semibold w-full max-sm:w-[15rem] rounded-3xl border border-brand-700 transition-all duration-300 hover:bg-brand-700  hover:text-white cursor-pointer h-10 pl-1 tablet:text-2xl tablet:h-16 tablet:rounded-full tablet:w-[15rem]",
  customize: "p-1 text-xs px-4 py-2 rounded-2xl text-surface-base bg-cart-500 hover:bg-cart-700 transition-all duration-300 absolute bottom-[1rem] left-[1rem]",
  shop_now: "text-xs px-4 py-2 rounded-2xl text-surface-base bg-brand-500 hover:bg-brand-700 transition-all duration-300  absolute bottom-[1rem] left-[1rem]",
  explore: "text-xs rounded-2xl text-success-500",
  plant_quiz: "p-2 text-xxs px-4 rounded-lg text-brand-100 text-center bg-gradient-to-r from-cart-700 to-amber-600 hover:bg-amber-800 transition-all duration-300",
  AI_analyze: "p-2 text-xxs rounded-lg bg-gradient-to-r from-cart-700 to-amber-600 text-surface-card mt-10 mx-auto ",

  view_all: "text-xs rounded-2xl text-brand-700 hover:bg-success-500 transition-all duration-300 hover:text-brand-100 hover:bg-success-500"
  , add_to_cart: "p-1 w-full rounded-2xl px-[37px] text-xs text-brand-100 bg-brand-700 border border-brand-100 hover:bg-surface-base hover:border-brand-700 hover:text-brand-700 transition-all duration-300 text-brand-100 "
  , quick_view: "p-1 text-xs px-4 rounded-2xl text-brand-700 bg-brand-100 border rounded-xl hover:bg-brand-700 hover:text-brand-100 transition-all duration-300 ",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none bg-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white",
  AI_disabled: "opacity-50 cursor-not-allowed pointer-events-none"
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
  plant_quiz: "Try AI plant Finder",
  AI_analyze: "Find My Perfect Plant",
  view_all: "View All Plants",
  add_to_cart: "Add to Cart",
  quick_view: "Quick View"
}

const iconMap: Record<string, ReactNode> = {
  add: <ShoppingCartIcon className="w-5 h-5 text-white-700 hover:text-green-500 transition" />,
  AI_analyze: <Sparkles className="w-5 h-5 text-white-700" />
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
  AI_analyze: "/quiz_result"

}

function Button({ btnType = "add", url, price, onSubmit, onClick, disabled }: ButtonProps) {
  const navigate = useNavigate();
  const btnClasses = styleMap[btnType] || "bg-gray-300 text-text-primary";
  const disabledClass = disabled ? styleMap.disabled : "";
  const finalStyle = `${btnClasses} ${disabledClass}`;
  // const label = labelMap[btnType] || "Click";
  const label = btnType === "add" && price ? `Add to Cart - $${price}` : labelMap[btnType] || "Click";
  const targetUrl = url || urlMap[btnType];

  const handleClick = () => {

    if (disabled) return;
    if (onClick) {
      onClick();
    } else if (targetUrl) {
      navigate(targetUrl);
    }
  }
  return (
    <div className="">
      <button className={`cursor-pointer flex flex-row justify-center items-center gap-3 ${finalStyle}`}
        onClick={handleClick}
        disabled={disabled}
      >
        <span className="flex items-center gap-2">
          {
            btnType === 'plant_quiz' && (
              <Sparkles className="w-6 h-6 text-brand-100" />
            )}

          {label}

          {
            btnType === 'AI_analyze' && (
              <Sparkles className="w-5 h-5 text-brand-100"/>
            )
          }
        </span>

      </button>

    </div>
  );
}

export default Button;