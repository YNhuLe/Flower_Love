import React from "react";
import { cardDetails } from "../constants";
import FlashCard from "./FlashCard";
function CardList() {
  return (
    <div>
      <img
        src="/Flower_Love/showcase/plant-1.jpg"
        className="w-[calc(100%-2rem)] m-auto mt-[4rem] rounded-xl"
        alt=""
      />
      {cardDetails.map(
        ({
          id,
          title,
          content,
        }: {
          id: string;
          title: string;
          content: string;
        }) => (
          <FlashCard content={content} title={title} key={id} />
        )
      )}
    </div>
  );
}

export default CardList;
