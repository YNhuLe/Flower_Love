import React from "react";

interface FlashCardProps {
  title: string;
  content: string;
}
function FlashCard({ title, content }: FlashCardProps) {
  return (
    <div
      tabIndex={0}
      className=" focus:outline-none focus:border-l-2 focus:border-secondary cursor-pointer m-8 mt-10">
      <div className="ml-6">
        <h1 className="text-4xl text-secondary font-medium  mb-3">{title}</h1>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}

export default FlashCard;
