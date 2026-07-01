
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
  up: "hover:border-brand-700 hover:text-brand-900 cursor-pointer",
  down: "hover:border-error-700 hover:text-error-700 cursor-pointer",
}

/***
 * FeedbackThumb component renders a thumbs up or thumbs down button for user feedback.
 * @param feedback - The type of feedback, either "up" or "down".
 *  @param selected - A boolean indicating if the feedback is currently selected.
 * @param disabled - A boolean indicating if the button is disabled.
 * @param onClick - A callback function to handle click events on the button.
 * @returns A JSX element representing the FeedbackThumb component.
 */
function FeedbackThumb({ feedback, onClick, selected, disabled }: FeedbackThumbProps) {

  const activeStyle =
    feedback === "up" ? "bg-brand-700 text-text-inverse border-brand-700" : "bg-error-500 text-text-inverse border-error-500";


  const inActive = `bg-transparent text-text-muted ${hoverStyle[feedback]}`

  const Icon = feedback === "up" ? ThumbsUp : ThumbsDown;
  return (

    <button
      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300
        border  focus:outline-none
        ${selected ? activeStyle : inActive}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      aria-pressed={true}
    >
      <Icon size={12} aria-hidden="true" className={`transition-all ${selected ? "scale-110" : ""}`} />
    </button>
  );
}

export default FeedbackThumb;