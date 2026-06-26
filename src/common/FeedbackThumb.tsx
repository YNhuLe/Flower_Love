
import {
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface FeedbackThumbProps {

  feedback: "up" | "down";
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}


const hoverStyle: Record<'up' | 'down', string> = {
  up: "hover:border-success-700 hover:text-success-700 cursor-pointer",
  down: "hover:border-error-700 hover:text-error-700 cursor-pointer",
}
function FeedbackThumb({ feedback, onClick, selected, disabled }: FeedbackThumbProps) {

  const activeStyle =
    feedback === "up" ?  "bg-brand-900 text-text-inverse border-brand-900" : "bg-error-500 text-text-inverse border-error-500";


  const inActive = `bg-surface-card border-text-muted text-text-muted ${hoverStyle[feedback]}`

  const Icon = feedback === "up" ? ThumbsUp : ThumbsDown;
  return (

    <button
      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300
        border disabled:opacity-60 focus:outline-none
        ${selected ? activeStyle : inActive}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      aria-pressed={selected}
    >
      <Icon size={12} aria-hidden="true"  className={`transition-all ${
    selected ? "text-white scale-110" : "text-text-muted"
  }`} />
    </button>
  );
}

export default FeedbackThumb;