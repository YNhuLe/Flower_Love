import { useNavigate } from "react-router-dom";

interface ButtonProps {
  btnType?: "add" | "submit" | "cancel";
  url?: string
  onSubmit?: () => void;
  onClick?: () => void;
}

const styleMap: Record<string, string> ={

  add: "bg-primary border border-tertiary hover:bg-third hover:border-primary hover:text-primary text-tertiary",
  cancel: "bg-purple-500 hover:bg-blue-500 text-tertiary",
  submit: "bg-pink-500 hover:bg-blue-500 text-tertiary"


}

const labelMap: Record<string, string> ={
add: "Add", cancel: "Cancel", submit :"Submit"
}

function Button({ btnType="add", url, onSubmit, onClick }: ButtonProps) {
  const navigate = useNavigate();
  const btnClasses = styleMap[btnType]  || "bg-gray-300 text-black";
  const label = labelMap[btnType] || "Click";
  return (
    <div className="flex flex-row justify-center mt-4">
      <button className={`p-1 rounded-2xl text-sm px-4 mx-0 my-auto cursor-pointer ${btnClasses}`}>{label}</button>
    </div>
  );
}

export default Button;