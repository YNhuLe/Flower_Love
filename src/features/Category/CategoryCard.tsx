import { CategoriesProps } from "../../types/types";
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Button from "../../common/Button";
function CategoryCard({ categories }: { categories: CategoriesProps }) {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    if (!categories) {
        return <p>Loading product categories...</p>

    }

    const imgSrc = categories.cate_img ? `${cloud_url}/${categories.cate_img}` : `${cloud_url}/v1759276481/mathias-reding-dMhVYCT_xn0-unsplash_xrnswy.jpg`;
    return (

        <section className="border rounded-xl w-[calc(100%-2rem)] mx-auto mx-4 my-6 overflow-hidden relative transform transition-shadow duration-300 hover:shadow-lg">

            <img
                className="w-full h-[10rem] object-cover transform transition-transform duration-300 hover:scale-105"

                src={imgSrc} alt="categories-pictures"
                loading="lazy"
            />
            <div className="flex flex-row justify-between mx-4 my-5">
                <h2 className="text-m font-semibold">{categories.name}</h2>

                <p className="text-lightGreen">{categories.quantity}+ plants</p>
            </div>
            <p className="mx-4 mb-4 text-xs">{categories.description}</p>
            <div className="flex flex-row mb-4 ml-4 hover:bg-tertiary transition-all duration-300 w-fit hover:border hover:rounded-xl pr-[.8rem]">
                <Button btnType="explore" />
                <ArrowRightIcon className="h-4 w-4 text-lightGreen self-center  transition-transform hover:translate-x-1" />
            </div>
        </section>

    )
}

export default CategoryCard;