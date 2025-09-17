import { useState } from "react";
import { GiftCategories } from "../types/types";
interface ToggleMenuProps {
    giftCategories: GiftCategories[];
}
function ToggleMenu({ giftCategories }: ToggleMenuProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("plants");
    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <div className="bg-third flex flex-row justify-between align-center my-4 mx-auto border border-primary rounded-full">
            {
                giftCategories.map((labelCate) => (

                    <button key={labelCate.id}
                        onClick={() => setSelectedCategory(labelCate.name)}
                        className={`px-4 py-2 rounded-full text-[.65rem] w-full ${selectedCategory === labelCate.name ? "bg-primary text-white" : "bg-third text-primary"
                            }`}
                    >
                        {capitalizeFirst(labelCate.name)}
                    </button>

                ))
            }
        </div>
    )
}
export default ToggleMenu;