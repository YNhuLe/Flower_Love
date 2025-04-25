import React, { useState } from "react";
interface EntryProps {
  emoji: string;
  name: string;
  meaning: string;
}
function Entry({ emoji, name, meaning }: EntryProps) {
  const [isMouseOver, setMouseOver] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }
  function handleMouseOut() {
    setMouseOver(false);
  }
  return (
    <div
      className={`transition-transform duration-300 ease-in-out p-6 rounded-xl shadow-lg border border-white/80 backdrop-blur-md bg-white/50 text-black cursor-pointer mt-4 mb-4 ${
        isMouseOver ? "scale-105" : "scale-100"
      }`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>
      <dt className="flex items-center gap-4 font-semibold text-lg">
        <span role="img" aria-label="Tense Biceps" className="text-xl">
          {emoji}
        </span>
        <span>{name}</span>
      </dt>
      <span>{meaning}</span>
    </div>
  );
}

export default Entry;
