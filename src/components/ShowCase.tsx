import React from "react";
import { imgList, imgList2 } from "../constants";
function ShowCase() {
  return (
    <div className="overflow-hidden flex flex-wrap w-full">
      <div className="min-w-max flex gap-4  animate-scrollLeft hover:[animation-play-state:paused] tablet:gap-8">
        {imgList.map((link: string, id: number) => (
          <div
            key={id}
            className="w-[10rem] tablet:w-[20rem]  [perspective:1000px] ultra:w-[30rem]">
            <img
              loading="lazy"
              src={`${link}`}
              alt={link}
              className="w-40 h-40 object-cover rounded-md mt-4 
               transition duration-300 [transform-style:preserve-3d] hover:[transform:translateZ(2.5rem) tablet:hover:[transform:translateZ(8rem)] 
                      tablet:w-80 tablet:h-80 tablet:gap-8 tablet:my-8
                      ultra:w-[30rem] ultra:h-[30rem] ultra:mx-12
              "
            />
          </div>
        ))}
      </div>
      <div className="min-w-max flex gap-4  animate-scrollRight  hover:[animation-play-state:paused] tablet:gap-8">
        {imgList2.map((link2: string, id: number) => (
          <div
            key={id}
            className="w-[10rem] tablet:w-[20rem]   [perspective:1000px] ultra:w-[30rem]">
            <img
              loading="lazy"
              src={`${link2}`}
              alt={link2}
              className="w-40 h-40 object-cover  rounded-md mt-4 
               transition duration-300 [transform-style:preserve-3d] hover:[transform:translateZ(2.5rem)]
               tablet:w-80 tablet:h-80 
               ultra:w-[30rem] ultra:h-[30rem] ultra:mx-12
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowCase;
