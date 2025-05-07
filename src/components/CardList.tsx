import React, { useState } from "react";
import { cardDetails, comDetails } from "../constants";
import FlashCard from "./FlashCard";
interface CardListProps {
  type: "card" | "com";
}

function CardList({ type }: CardListProps) {
  const dataType = type === "card" ? cardDetails : comDetails;
  const [topImg, setTopImg] = useState(dataType[0].image);
  const [activeIndex, setActiveIndex] = useState(dataType[0].id);
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
        {dataType.map(
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
