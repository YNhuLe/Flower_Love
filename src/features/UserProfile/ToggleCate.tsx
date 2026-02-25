import { ProfileCategoriesProps } from "../../types/profileType";

interface ToggleCategpriesProps {
    selectedCate: string;
    setSelectedCate: (category: string) => void;
    profileCategories: string[];
}

function ToggleCate({ profileCategories, selectedCate, setSelectedCate }: ToggleCategpriesProps) {
    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (


        <div className="bg-surface-base flex flex-row justify-between  my-2 mx-auto border border-brand-700 rounded-full mt-6">
            {
                profileCategories.map((labelCate) => (

                    <button
                        key={labelCate}
                        onClick={() => setSelectedCate(labelCate)}
                        className={`px-2 py-2 rounded-full text-[.5rem] w-full ${selectedCate === labelCate ? "bg-brand-700 text-white" : "bg-surface-base text-brand-700"
                            }`}
                    >
                        {capitalizeFirst(labelCate)}
                    </button>

                ))
            }
        </div>

    )
}

export default ToggleCate;