import React, { useEffect, useState } from "react";
import axios from "axios";
import BestProductDetails from "./BestProductDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BestProductProp } from "../types/types";

function BestProduct() {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [products, setProducts] = useState<BestProductProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/allplants`);
        setProducts(response.data);
      } catch (error: any) {
        setError(error.message || "Failed to load products!")
      } finally {
        setLoading(false);
      }
    }
    fetchProducts()
  }, []);

  return (
    <div className="w-full mt-[7rem]">

      <h2 className="m-4 mb-0 text-2xl text-center font-semibold">New Arrivals</h2>
      <p className="text-xs text-center m-4">Discover our latest collection of beautiful indoor plants, carefully selected to bring life and freshness to your space.</p>
      {loading && <p>Loading ...  </p>}
      {error && <p className="text-error-DEFAULT">{error}</p>}
      <Swiper
        modules={[Navigation]}
        // spaceBetween={5}
        slidesPerView={1}
        navigation
        loop={false}
      >
        {products.map((product) => (
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
