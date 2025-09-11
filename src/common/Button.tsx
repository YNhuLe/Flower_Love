import { useNavigate } from "react-router-dom";

interface ButtonProps {
  btnType?: "add" | "submit" | "cancel" | "explore" | "signup" | "learn_more" | "shop_now" | "customize";
  url?: string
  onSubmit?: () => void;
  onClick?: () => void;
}

const styleMap: Record<string, string> = {

  add: "w-full mt-2 text-sm bg-primary border border-tertiary hover:bg-third hover:border-primary hover:text-primary  transition-all duration-300 text-tertiary",
  cancel: " text-sm bg-purple-500 hover:bg-blue-500  transition-all duration-300 text-tertiary",
  submit: " text-sm bg-pink-500 hover:bg-blue-500  transition-all duration-300 text-tertiary",
  explore: "  text-sm border border-cartRed hover:bg-cartRed hover:text-third transition-all duration-300  text-cartRed mt-5 mb-8",
  signup: "bg-primary  text-third w-full max-sm:w-[15rem] hover:text-primary  hover:bg-white border transition-all duration-300 hover:border-primary  font-semibold rounded-3xl cursor-pointer h-10 tablet:text-2xl tablet:h-16 tablet:rounded-full tablet:w-[15rem]",
  learn_more: "bg-white text-primary font-semibold w-full max-sm:w-[15rem] rounded-3xl border border-primary transition-all duration-300 hover:bg-primary  hover:text-white cursor-pointer h-10 pl-1 tablet:text-2xl tablet:h-16 tablet:rounded-full tablet:w-[15rem]",
  customize : "text-xs text-third bg-cartRed hover:bg-darkCartRed transition-all duration-300 absolute bottom-[1rem] left-[1rem]",
  shop_now: "text-xs text-third bg-accent hover:bg-primary transition-all duration-300  absolute bottom-[1rem] left-[1rem]"

}

const labelMap: Record<string, string> = {
  add: "Add",
  cancel: "Cancel",
  submit: "Submit",
  explore: "Explore The Shop",
  signup: "Sign Up",
  learn_more: "Learn More 🌻",
  shop_now: "Shop Now", 
  customize: "Build Now"
}

const urlMap : Record<string, string> ={
  add:"/add-item",
  learn_more:"/products", 
  signup:"/signup",
  customize:"/customize",
  shop_now:"/shop"

}

function Button({ btnType = "add", url, onSubmit, onClick }: ButtonProps) {
  const navigate = useNavigate();
  const btnClasses = styleMap[btnType] || "bg-gray-300 text-black";
  const label = labelMap[btnType] || "Click";
  const targetUrl = url || urlMap[btnType];

  const handleClick = () =>{
    if(onClick){
      onClick();
    }else if(targetUrl){
      navigate(targetUrl);
    }
  }
  return (
    <div className="flex flex-row justify-center">
      <button className={`p-1 rounded-2xl px-4 mx-0 my-auto cursor-pointer ${btnClasses}`}
      onClick={handleClick}
      >{label}</button>
    </div>
  );
}

export default Button;