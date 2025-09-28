import { useState, useEffect } from "react";
import axios from "axios";
import BestProduct from "../components/BestProduct";
import GiftBoxOffer from "../components/GiftBoxOffer";
import NavBar from "../components/NavBar";
import CustomGiftBox from "../features/CustomGiftBox/CustomGiftBox";
import { GiftItemProps } from "../types/types";
import CategorySection from "../features/Category/CategorySection";
function ProductPage() {
  const [giftItems, setGiftItems] = useState<GiftItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/gifts`);
        setGiftItems(response.data);

      } catch (error: any) {
        setError(error.message || "Failed to load products!");
      } finally {
        setLoading(false);
      }
    }
    fetchGifts();
  }, []);
  if (loading) return <p>Loading!</p>
  if (error) return <p>Error</p>

  return (
    <>
      <NavBar />
      <BestProduct />
      <GiftBoxOffer />
      <CustomGiftBox giftItems={giftItems} />
      <CategorySection />
    </>
  );
}

export default ProductPage;
