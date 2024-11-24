import React, { useState } from "react";

function Entry(props) {
  const [isMouseOver, setMouseOver] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }
  function handleMouseOut() {
    setMouseOver(false);
  }
  return (
    <div
      className="term"
      style={{ transform: isMouseOver ? "scale(1.1)" : "scale(1)" }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>
      <dt>
        <span className="flower" role="img" aria-label="Tense Biceps">
          {props.emoji}
        </span>
        <span>{props.name}</span>
      </dt>
      <span>{props.meaning}</span>
    </div>
  );
}

export default Entry;
