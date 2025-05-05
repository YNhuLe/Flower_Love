import React from "react";
import { imgList, imgList2 } from "../constants";
function ShowCase() {
  return (
    <div className="overflow-hidden flex flex-wrap w-full">
      <div className="min-w-max flex gap-4  animate-scrollLeft hover:[animation-play-state:paused] ">
        {imgList.map((link: string, id: number) => (
          <div key={id} className="w-[10rem]  [perspective:1000px] ">
            <img
              src={`/Flower_Love/showcase/${link}`}
              alt={link}
              className="w-40 h-40 tablet:w-[10rem] tablet:h-[10rem] laptop:w-[15rem] laptop:bg-blue-600 laptop:h-[15rem] desktop:w-[20rem] desktop:h-[20rem] object-cover rounded-md mt-4 
               transition duration-300 [transform-style:preserve-3d] hover:[transform:translateZ(2.5rem)] 
              "
            />
          </div>
        ))}
      </div>
      <div className="min-w-max flex gap-4  animate-scrollRight  hover:[animation-play-state:paused]">
        {imgList2.map((link2: string, id: number) => (
          <div key={id} className="w-[10rem]  [perspective:1000px]">
            <img
              src={`/Flower_Love/showcase/${link2}`}
              alt={link2}
              className="w-40 h-40 object-cover  rounded-md mt-4 
               transition duration-300 [transform-style:preserve-3d] hover:[transform:translateZ(2.5rem)]
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowCase;
