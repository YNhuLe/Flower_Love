import { useState, useEffect } from "react";
import { GiftItemsCategoriesProps, GiftCategories } from "../../types/types";
import axios from "axios";
import ToggleMenu from "../../common/ToggleMenu";
import CustomGiftBoxCard from "./CustomGiftBoxCard";
function CustomGiftBox({ gift_items }: GiftItemsCategoriesProps) {
    // const [giftType, setGiftType] = useState<"plants" | "vases" | "accessories">("plants");
    const [gifts, setGifts] = useState<GiftItemsCategoriesProps[]>([]);
    const [giftCategories, setGiftCategories] = useState<GiftCategories[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);
const [selectedCategory, setSelectedCategory] = useState<string>("plants");

    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    //fetch gifts
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

    // console.log("Gift name: ", gifts[0].category_name);
    console.log(gift_items);

    //fetch categories

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

    console.log("GIFTs: ", gifts);

if( loading) return <p>Loading...</p>
if(error) return <p>{error}</p>


const selectcategoryObj = giftCategories.find((cat) => cat.category_name === selectedCategory)
//filter the gifts based on selectedCategory
const filteredGifts = gifts.flatMap(({gift_items}) =>
Array.isArray(gift_items) ? gift_items.filter((item) => item.category_id === selectcategoryObj?.id) : []);
    return (
        <section className="my-10 mx-4">
            <h1 className="text-2xl font-semibold text-center">Custom Gift Box</h1>
            <p className="text-center mt-2">Create the perfect plant gift by choosing your favorite plants, pots, and accessories. Each gift box is beautifully packaged and ready to give.</p>

            <ToggleMenu giftCategories={giftCategories} 
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}/>
            <div>

                {
                    filteredGifts.length > 0 ?(
                            filteredGifts.map(({ id, name, price, category_id }) => (
                                <CustomGiftBoxCard key={id} id={id} name={name} price={price} category_id={category_id} />
                            ))
                        ):(
                            <p>No gift is available for this category..</p>
                        )
                }


            </div>

        </section>
    )
}

export default CustomGiftBox;