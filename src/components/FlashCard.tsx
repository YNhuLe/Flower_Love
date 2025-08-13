import React from "react";

interface FlashCardProps {
  title: string;
  content: string;
  onClick: () => void;
  isActive: boolean;
}
function FlashCard({ title, content, onClick, isActive }: FlashCardProps) {
  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className={`focus:outline-none ${
        isActive ? "border-l-2 border-secondary" : ""
      } cursor-pointer m-6 mt-8 mb-0 tablet:my-10 
      laptop:m-8 
      `}>
      <div className="ml-6">
        <h1 className="text-3xl text-secondary font-semibold  mb-3 tablet:text-3xl">
          {title}
        </h1>
        <p className="text-sm tablet:text-xl">{content}</p>
      </div>
    </div>
  );
}

export default FlashCard;
