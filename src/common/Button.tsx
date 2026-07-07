import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { ShoppingCart } from "lucide-react";
import {
  Download,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock
} from 'lucide-react';
interface ButtonProps {
  btnType?: "add" | "submit" | "cancel" | "signup" | "learn_more" | "shop_now" | "customize" | "explore" | "plant_quiz" | "view_all"
  | "add_to_cart" | "quick_view"
  | "AI_analyze" | "new_analysis"
  | "all_recommendations"
  | "start_shopping"
  | "promo_apply"
  | "process_checkout"
  | "continue_shopping"
  | "export"
  | "place_order"
  | "create_account"
  | "sign_in"
  | "add_to_cart_recommendation";
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
  view_all: "text-xs rounded-2xl text-brand-700 hover:bg-success-500 transition-all duration-300 hover:text-brand-100 hover:bg-success-500",
  add_to_cart: "p-1 w-[calc(100% - 1rem)] rounded-2xl px-[1rem] text-[.75rem] text-brand-100 bg-brand-700 border border-brand-100 hover:bg-surface-base hover:border-brand-700 hover:text-brand-700 transition-all duration-300 text-brand-100 ",
  add_to_cart_recommendation:"p-1 w-[calc(100% - 1rem)] rounded-2xl px-[.75rem] text-[.65rem] text-brand-100 bg-brand-700 border border-brand-100 hover:bg-surface-base hover:border-brand-700 hover:text-brand-700 transition-all duration-300 text-brand-100 ",

  quick_view: "p-1 text-xs px-4 rounded-2xl text-brand-700 bg-brand-100 border rounded-xl hover:bg-brand-700 hover:text-brand-100 transition-all duration-300 ",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none bg-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white",
  plant_quiz: "p-2 text-xxs px-4 rounded-lg text-brand-100 text-center bg-gradient-to-r from-cart-700 to-amber-600 hover:bg-amber-800 transition-all duration-300",
  AI_analyze: "p-2 text-xxs rounded-lg bg-gradient-to-r from-cart-700 to-amber-600 text-surface-card mt-10 mx-auto ",
  AI_disabled: "opacity-50 cursor-not-allowed pointer-events-none",
  new_analysis: "bg-text-inverse p-2 border  rounded-xl text-xs curosr-pointer ",
  all_recommendations: "",
  start_shopping: "flex gap-2 items-center text-text-inverse p-2 border  rounded-xl text-xs cursor-pointer bg-amber-600 px-8 m-8 mb-12 hover:bg-amber-800 transition-all duration-300",
  promo_apply: "text-amber-800 text-xs cursor-pointer  rounded-xl border border-1 border-amber-300 p-2 px-4 hover:border-amber-600 transition-all duration-300 hover:text-text-primary hover:bg-amber-50",
  process_checkout: "text-text-inverse bg-amber-600 rounded-xl w-full group my-4 cursor-pointer  hover:bg-amber-800 py-2 ",
  continue_shopping: "text-text-primary border border-1 border-text-muted mb-8 rounded-xl p-2 cursor-pointer w-full my-4 hover:bg-text-inverse",
  place_order: "text-text-inverse bg-icon-amber-600 rounded-md hover:bg-amber-icon-800 p-2 cursor-pointer w-[calc(100%-2rem)] my-8 mx-auto",
  export: "p-2 rounded rounded-md border border-1 mt-4 text-xs",
  create_account: "p-2 rounded-md text-xs bg-success-800 text-text-inverse w-full group my-4",
  sign_in: "p-2 rounded-md text-xs bg-success-800 text-text-inverse w-full group my-4"
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
  view_all: "View All Plants",
  add_to_cart: "Add to Cart",
  add_to_cart_recommendation:"Add to Cart",
  quick_view: "Quick View",
  plant_quiz: "Try AI plant Finder",
  AI_analyze: "Find My Perfect Plant",
  new_analysis: "Start New Analysis",
  all_recommendations: "View All Recommendations",
  start_shopping: "Start Shopping",
  promo_apply: "Apply",
  process_checkout: "Process to Checkout",
  continue_shopping: "Continue Shopping",
  export: "Export",
  place_order: "Place Order",
  create_account: "Create Account",
  sign_in: "Sign In"
}

const iconMap: Record<string, ReactNode> = {
  add: <ShoppingCart className="w-5 h-5 text-white-700 hover:text-green-500 transition" />,
  AI_analyze: <Sparkles className="w-5 h-5 text-white-700" />,
  plant_quiz: <Sparkles className="w-5 h-5 text-white-700" />,
  new_analysis: <ArrowLeft className="w-5 h-5 text-text-muted transition-transform duration-200 hover:-translate-x-1" />,
  start_shopping: <ShoppingCart className="w-5 h-5" />,
  process_checkout: <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />,
  export: <Download className="w-4 h-4" />,
  place_order: < Lock className="w-4 h-4" />,
  create_account: <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />,
  sign_in: <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
}
const urlMap: Record<string, string> = {
  add: "/add-item",
  learn_more: "/products",
  // signup: "/signup",
  customize: "/customize",
  shop_now: "/shop",
  explore: "/category",
  view_all: "/view_all",
  add_to_cart: "/products/cart",
  add_to_cart_recommendation: "/products/cart",
  plant_quiz: "/plant_quiz",
  AI_analyze: "/products/quiz/quiz_result",
  start_shopping: "/products",
  process_checkout: "/checkout",
  continue_shopping: "/products",
  create_account: "/users/profile",
  sign_in: "/signin"
}

function Button({ btnType = "add", url, price, onSubmit, onClick, disabled }: ButtonProps) {
  const navigate = useNavigate();
  const btnClasses = styleMap[btnType] || "bg-gray-300 text-text-primary";
  const disabledClass = disabled ? styleMap.disabled : "";
  const finalStyle = `${btnClasses} ${disabledClass}`;
  // const label = (btnType === "add" || btnType === "place_order") && price ? `Add to Cart - $${price}` : labelMap[btnType] || "Click";
  const label = labelMap[btnType]
  const targetUrl = url || urlMap[btnType];

  const handleClick = () => {

    if (disabled) return;
    if (onClick) return onClick();
    if (targetUrl) navigate(targetUrl);
  }

  const renderContent = () => {
    switch (btnType) {
      case "start_shopping":
      case "new_analysis":
      case "plant_quiz":
      case "export":

        return (
          <>
            {iconMap[btnType]} {label} </>
        );

      case "place_order":
      case "add":
        return (
          <>
            {iconMap[btnType]} {label} - ${price}</>
        )
      case "AI_analyze":
      case "process_checkout":
      case "create_account":
      case "sign_in":
        return (
          <>{label} {iconMap[btnType]}</>
        );
      default:
        return (
          <>
            {label} {iconMap[btnType]}
          </>
        )
    }
  }


  return (
    <div className="">
      <button className={`cursor-pointer flex flex-row justify-center items-center gap-3 ${finalStyle}`}
        onClick={handleClick}
        disabled={disabled}
      >
        <span className="flex items-center gap-2">
          {renderContent()}
        </span>

      </button>

    </div>
  );
}

export default Button;