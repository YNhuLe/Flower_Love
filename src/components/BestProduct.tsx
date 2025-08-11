import React from "react";
import BestProductDetails from "./BestProductDetails";
import { dis_plants } from "../constants";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation} from 'swiper/modules';
function BestProduct() {
  return (
    <div className="w-full ">
    {/* // <div className="flex flex-nowrap gap-4 p-4"> */}
    <Swiper
  modules={[Navigation]}
  spaceBetween={15}
  slidesPerView={2}
  navigation
  loop
>
      {dis_plants.slice(0, 10).map(
        ({ id, plantName, image, details, originalPrice, discountedPrice }) => (
          // <div key={id} className="flex-shrink-0 w-40">
             <SwiperSlide key={id}>
          <BestProductDetails
            id={id}
            image={image}
            plantName={plantName}
            details={details}
            originalPrice={originalPrice}
            discountedPrice={discountedPrice}
          /></SwiperSlide>
   
        )
      )}</Swiper>
    {/* // </div> */}
    </div>
  );
}

export default BestProduct;
