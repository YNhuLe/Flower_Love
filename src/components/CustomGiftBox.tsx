import { useState, useEffect } from "react";
import { GiftItemsCategoriesProps, GiftCategories } from "../types/types";
import axios from "axios";
import ToggleMenu from "../common/ToggleMenu";
function CustomGiftBox() {
    const [giftType, setGiftType] = useState<"plants" | "vases" | "accessories">("plants");
    // const activeGiftType = giftType === "plants" ? plants 

    const [gifts, setGifts] = useState<GiftItemsCategoriesProps[]>([]);
    const [giftCategories, setGiftCategories] = useState<GiftCategories[]>([]);
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

    useEffect(() => {
        const fetchGiftCategories = async () => {
            try {
                const giftCategoriesData = await axios.get(`${baseUrl}/gift_categories`);
                setGiftCategories(giftCategoriesData.data);
            } catch (error: any) {
                setError(error.message || "Failed to load gift categories!")
            } finally {
                setLoading(false);
            }
        }
        fetchGiftCategories();
    }, []);

    console.log("Gift:", gifts);
console.log("NAME: ", giftCategories);



    return (
        <section className="my-10 mx-4">
            <h1 className="text-2xl font-semibold text-center">Custom Gift Box</h1>
            <p className="text-center mt-2">Create the perfect plant gift by choosing your favorite plants, pots, and accessories. Each gift box is beautifully packaged and ready to give.</p>

        <ToggleMenu giftCategories={giftCategories} />

        </section>
    )
}

export default CustomGiftBox;