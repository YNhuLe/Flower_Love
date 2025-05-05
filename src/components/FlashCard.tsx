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
      } cursor-pointer m-6 mt-8 mb-0`}>
      <div className="ml-6">
        <h1 className="text-4xl text-secondary font-medium  mb-3">{title}</h1>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}

export default FlashCard;
