import React from "react";

interface TestimonialsProps {
  id: string;
  name: string;
  profilePic: string;
  title: string;
  content: string;
}
function TestimonialsCard({
  id,
  name,
  profilePic,
  title,
  content,
}: TestimonialsProps) {
  return (
    <div className="bg-tertiary mt-4 p-4 rounded-md">
      <div className="flex flex-row mb-6">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={`/Flower_Love/images/${profilePic}`}
          alt="profile-picture"
        />
        <div className="text-left">
          <h2 className="font-semibold text-xl">{name}</h2>
          <p>{title}</p>
        </div>
      </div>
      <p className="text-left">{content}</p>
    </div>
  );
}

export default TestimonialsCard;
