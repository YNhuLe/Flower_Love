import { useState } from "react";
import { GiftCategories } from "../types/types";
interface ToggleMenuProps {
    selectedCategory: string;
  setSelectedCategory: (category: string) => void;
    giftCategories: GiftCategories[];
}
function ToggleMenu( {giftCategories, selectedCategory, setSelectedCategory }: ToggleMenuProps) {
    // const [selectedCategory, setSelectedCategory] = useState<string>("plants");
    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <div className="bg-third flex flex-row justify-between  my-4 mx-auto border border-primary rounded-full">
            {
                giftCategories.map((labelCate) => (

                    <button key={labelCate.id}
                        onClick={() => setSelectedCategory(labelCate.category_name)}
                        className={`px-4 py-2 rounded-full text-[.65rem] w-full ${selectedCategory === labelCate.category_name ? "bg-primary text-white" : "bg-third text-primary"
                            }`}
                    >
                        {capitalizeFirst(labelCate.category_name)}
                    </button>

                ))
            }
        </div>
    )
}
export default ToggleMenu;