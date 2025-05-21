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
    <div
      className="flex flex-col laptop:flex laptop:flex-row laptop:mx-20 laptop:my-32 laptop:items-center
      desktop:flex desktop:items-center
    ultra:justify-center ultra:items-center
    ">
      <img
        loading="lazy"
        src={`/showcase/${topImg}`}
        className="h-[20rem] w-[calc(100%-2rem)] mx-auto items-center mt-[8rem] rounded-xl tablet:w-[calc(100%-8rem)] tablet:h-[25rem]
 laptop:h-[25rem] laptop:w-1/2  laptop:mt-0


desktop:mt-0
ultra:h-[30rem]
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
