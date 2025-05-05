import React, { useState } from "react";
import { cardDetails } from "../constants";
import FlashCard from "./FlashCard";
function CardList() {
  const [topImg, setTopImg] = useState("/plant-25.jpg");
  const [activeIndex, setActiveIndex] = useState("1");
  const clickCard = (newImg: string) => {
    setTopImg(newImg);
  };

  return (
    <div className="flex flex-col laptop:flex-row laptop:bg-slate-600">
      <img
        src={`/Flower_Love/showcase/${topImg}`}
        className="w-[calc(100%-2rem)] h-[20rem] m-auto mt-[8rem] rounded-xl laptop:w-[25rem] laptop:h-[25rem]"
        alt="top banner"
      />
      <div className="flex flex-col laptop:flex-col">
        {cardDetails.map(
          ({
            id,
            title,
            content,
            image,
          }: {
            id: string;
            title: string;
            content: string;
            image: string;
          }) => (
            <FlashCard
              content={content}
              title={title}
              key={id}
              onClick={() => {
                clickCard(image);
                setActiveIndex(id);
              }}
              isActive={id === activeIndex}
            />
          )
        )}
      </div>
    </div>
  );
}

export default CardList;
