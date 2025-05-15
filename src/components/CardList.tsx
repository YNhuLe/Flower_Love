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
  //w-[calc(100%-4rem)] laptop:w-[50rem]
  return (
    <div className="flex flex-col laptop:flex-row laptop:mx-20 laptop:my-32">
      <img
        loading="lazy"
        src={`/Flower_Love/showcase/${topImg}`}
        className=" h-[20rem] mx-auto items-center mt-[8rem] rounded-xl tablet:w-[calc(100%-8rem)] tablet:h-[25rem]
 laptop:h-[25rem]
w-full laptop:w-1/2
  "
        alt="top banner"
      />
      <div
        className="flex flex-col laptop:flex-col tablet:ml-8 laptop:gap-2
      w-full laptop:w-1/2
      ">
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
