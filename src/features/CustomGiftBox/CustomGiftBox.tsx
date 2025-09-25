import { useState, useEffect } from "react";
import { GiftCategories, GiftItemProps } from "../../types/types";
import axios from "axios";
import ToggleMenu from "../../common/ToggleMenu";
import CustomGiftBoxCard from "./CustomGiftBoxCard";
interface CustomGiftBoxProps {
    giftItems: GiftItemProps[];
}
function CustomGiftBox({ giftItems }: CustomGiftBoxProps) {
    const [giftCategories, setGiftCategories] = useState<GiftCategories[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("plants");

    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
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

    if (loading) { return <p>Loading...</p> }
    if (error) { return <p>{error}</p> }


    const filteredGifts = giftItems.filter((item) => item.category_name === selectedCategory)
    return (
        <section className="my-10 mx-4">
            <h1 className="text-2xl font-semibold text-center">Custom Gift Box</h1>
            <p className="text-center mt-2">Create the perfect plant gift by choosing your favorite plants, pots, and accessories. Each gift box is beautifully packaged and ready to give.</p>

            <ToggleMenu giftCategories={giftCategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory} />
            <div>

                {
                    filteredGifts.length > 0 ? (
                        filteredGifts.map(({ id, name, price, category_id, category_name, img_url }) => (
                            <CustomGiftBoxCard id={id} name={name}
                                price={price} category_id={category_id} category_name={category_name} img_url={img_url} />
                        ))
                    ) : (
                        <p>No gift is available for this category..</p>
                    )
                }
            </div>

        </section>)
}

export default CustomGiftBox;