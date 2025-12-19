import Button from "../../common/Button";
import { FaStar, FaPaw } from "react-icons/fa";
import { BsHandThumbsUp } from "react-icons/bs";
import { ProductWithCategory } from "../../types/types";
import HeartButton from "../../common/HeartButton";

function NewProductCard({ newProduct }: { newProduct: ProductWithCategory }) {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
   
   
    const imgSrc = newProduct.image_url ? `${cloud_url}/${newProduct.image_url[0]}` : `${cloud_url}/v1759276481/mathias-reding-dMhVYCT_xn0-unsplash_xrnswy.jpg`;
    if (!newProduct) {
        return <p>Loading new products...</p>
    }

    

    
    return (
        <section className="border rounded-xl w-[calc(100%-2rem)] mx-auto my-6 overflow-hidden relative transform transition-shadow duration-300 hover:shadow-lg">

            <div>
                {
                    newProduct.isnewarrival && (
                        <p className="text-surface-base text-[.65rem] absolute z-40 border rounded-lg m-4 px-2 py-1 bg-brand-700">New</p>
                    )


                }

                <img
                    className="w-full h-[10rem] object-cover transform transition-transform duration-300 hover:scale-105"

                    src={imgSrc} alt="categories-pictures"
                    loading="lazy"
                />
                <div className="flex absolute top-4  gap-2 right-4">

                    {
                        newProduct.plantinglevel && (
                            <p className="bg-surface-base p-2 border rounded-full">
                                <BsHandThumbsUp className="w-4 h-4" />
                            </p>

                        )
                    }
                    {newProduct.is_pet_friendly && (
                        <p className=" bg-surface-base p-2 border rounded-full">
                            <FaPaw className="w-4 h-4" />
                        </p>
                    )}

                    <HeartButton btnType="new_product"/>
                </div>
            </div>
            <div className="pl-4">

                <h2 className="text-lg font-semibold pt-4">{newProduct.common_name}</h2>

                <p className="text-xs mb-4">{newProduct.name}</p>
                <div className="flex gap-2 justify-between">
                    <div className="flex row gap-1">
                        <FaStar className="text-yellow-400 w-5 h-5" />
                        <p>{newProduct.rating}</p>
                        <p className="text-text-muted">({newProduct.num_reviews})</p>

                    </div>

                    <div className="flex gap-2 flex-wrap mr-4">
                        {/* {
                            newProduct.sizes.map((size, index) => (
                                <p className=" p-1 text-[.6rem] border rounded-lg" key={index}>{size.size} - ${size.discount_percentage.toFixed(2)}</p>
                            ))
                
                        } */}
                    </div>
                </div>

                <div className="flex flex-row justify-start gap-2 my-4">

                    {/* <p className="text-brand-700 font-semibold">{newProduct.original_price}</p> */}
                    <p className="text-xs line-through">{}</p>
                </div>
            </div>

            <div className="flex gap-2 justify-start mb-6 pl-4">
                <Button btnType="add_to_cart" />
                <Button btnType="quick_view" url={`/products/${newProduct.id}`} />
            </div>
        </section>
    )
}

export default NewProductCard;