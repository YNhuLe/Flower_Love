import React from "react";
import BestProductDetails from "./BestProductDetails";
import { dis_plants } from "../constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
function BestProduct() {
  return (
    <div className="w-full ">
      <h2 className="ml-4">Best Product</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        loop
      >
        {dis_plants
          .slice(0, 10)
          .map(
            ({
              id,
              plantName,
              image,
              details,
              originalPrice,
              discountedPrice,
            }) => (
              <SwiperSlide key={id}>
                <BestProductDetails
                  id={id}
                  image={image}
                  plantName={plantName}
                  details={details}
                  originalPrice={originalPrice}
                  discountedPrice={discountedPrice}
                />
              </SwiperSlide>
            )
          )}
      </Swiper>
    </div>
  );
}

export default BestProduct;
