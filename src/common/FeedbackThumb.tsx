
import {  ThumbsUp,
  ThumbsDown,} from "lucide-react";
  import {useState} from "react";

interface FeedbackThumbProps {

  feedback: "up" | "down";
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}


const hoverStyle: Record<'up' | 'down', string> = {
   up: "hover:border-success-700 hover:text-success-700",
  down: "hover:border-error-700 hover:text-error-700",}
function FeedbackThumb({ feedback, onClick, selected, disabled }: FeedbackThumbProps) {

const activeStyle =
    feedback === "up" ? "border-success-700 text-success-700" : "border-error-700 text-error-700";



const Icon=feedback === "up" ? ThumbsUp :ThumbsDown;
  return (

   <button
      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all
        bg-surface-card border border-text-muted text-text-inverse
        ${selected ? activeStyle : hoverStyle[feedback]}
        disabled:opacity-60 focus:outline-none`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      <Icon size={24} aria-hidden="true" />
    </button>
  );
}

export default FeedbackThumb;