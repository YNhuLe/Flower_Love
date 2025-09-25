import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface ButtonType {
  btnType: "custom_gift" | "gift_box";
  url?: string;
  onClick?: () => void;
}

const styleMap: Record<string, string>= {
  custom_gift: "absolute top-4 right-4",
  gift_box: ""
}

const urlMap: Record<string, string> = {
  custom_gift:"/wish-item"
}
function HeartButton({ btnType, url, onClick }: ButtonType) {
const navigate = useNavigate();
  const btnClasses = styleMap[btnType] || "";
  const targetUrl = url || urlMap[btnType];
  const [liked, setLiked] = useState(false);

  const handleClickLike = () =>{
if(onClick){
  onClick();
}else if (targetUrl){
navigate(targetUrl);
}
  }
  return (

    <button
      onClick={() => setLiked(!liked)}
      className={`cursor-pointer 
          ${btnClasses}`}>
      <svg xmlns="http://www.w3.org/2000/svg"
        fill={liked ? "red" : "none"}
        viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </button>

  )
}
export default HeartButton;