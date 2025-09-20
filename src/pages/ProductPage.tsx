import {useState, useEffect} from "react";
import axios from "axios";
import BestProduct from "../components/BestProduct";
import GiftBoxOffer from "../components/GiftBoxOffer";
import NavBar from "../components/NavBar";
import CustomGiftBox from "../features/CustomGiftBox/CustomGiftBox";
import CustomGiftCard from "../features/CustomGiftBox/CustomGiftBoxCard";
import {GiftItemsCategoriesProps} from "../types/types";
function ProductPage() {
      const [gifts, setGifts] = useState<GiftItemsCategoriesProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
        useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/gifts`);
                setGifts(response.data);
                console.log(" GIFT: ", response);

            } catch (error: any) {
                setError(error.message || "Failed to load products!");
            } finally {
                setLoading(false);
            }
        }
        fetchGifts();
    }, []);
if (loading) return <p>Loading!</p>
if( error) return <p>Error</p>
    // console.log("Gift name: ", gifts[0].category_name);
    console.log("GIFTS::::::", gifts);
  return (
    <>
      <NavBar />
      <BestProduct />
      <GiftBoxOffer />
      <CustomGiftBox gift_items={gifts}/>
      {/* <CustomGiftCard /> */}
    </>
  );
}

export default ProductPage;
