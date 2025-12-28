
import BestProductDetails from "./BestProductDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import useAllPlants from "../hooks/useAllPlants";
function BestProduct() {
 const {
        data: plantInfo,
        isLoading,
        isError,
        error
    } = useAllPlants();

      if (isLoading) {
    return <p>Loading plant information...</p>;
  }

  
  

  if (isError || !plantInfo || plantInfo.length === 0) {
    return <p>Error loading plant details</p>;
  }

  return (
    <div className="w-full mt-[7rem]">

      <h2 className="m-4 mb-0 text-2xl text-center font-semibold">New Arrivals</h2>
      <p className="text-xs text-center m-4">Discover our latest collection of beautiful indoor plants, carefully selected to bring life and freshness to your space.</p>
      {error && <p className="text-error-DEFAULT">{error}</p>}
      <Swiper
        modules={[Navigation]}
        // spaceBetween={5}
        slidesPerView={1}
        navigation
        loop={false}
      >
        {plantInfo.map((product) => ( product.isnewarrival && 
          <SwiperSlide >
            <BestProductDetails key={product.id}
              products={product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BestProduct;
