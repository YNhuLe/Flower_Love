import React, {useEffect, useState} from "react";
import axios from "axios";
import BestProductDetails from "./BestProductDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BestProductProp } from "../types/types";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
console.log("Base URL:", baseUrl);
function BestProduct() {
  const [products, setProducts] = useState<BestProductProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() =>{
    const fetchProducts = async () =>{
      try{
const response = await axios.get(`${baseUrl}/allplants`);
setProducts(response.data);
console.log(response.data);
      }catch(error: any){
        setError(error.message || "Failed to load products!")
      }finally{
        setLoading(false);
      }
    }
    fetchProducts()
  }, []);
  
  return (
    <div className="w-full">

      <h2 className="m-4 mb-0 text-2xl">Best Products</h2>
      {loading && <p>Loading ...  </p>}
      {error && <p className="text-red-500">{error}</p>}
      <Swiper
        modules={[Navigation]}
        spaceBetween={5}
        slidesPerView={2}
        navigation
        loop={false}
      >
        {products.map((product) => (
          <SwiperSlide >
            <BestProductDetails key={product.id}
           products =   {product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BestProduct;
