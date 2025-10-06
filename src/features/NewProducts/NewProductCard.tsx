import Button from "../../common/Button";
import { FaStar } from "react-icons/fa";
import { NewProductProps } from "../../types/types";
function NewProductCard({ newProducts }: { newProducts: NewProductProps }) {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    if (!newProducts) {
        return <p>Loading new products...</p>
    }
    return (
        <section className="border rounded-xl w-[calc(100%-2rem)] mx-auto mx-4 my-6 overflow-hidden relative transform transition-shadow duration-300 hover:shadow-lg">

            <div>
                <p>{newProducts.isnewarrival}</p>
                <img
                    className="w-full h-[10rem] object-cover transform transition-transform duration-300 hover:scale-105"

                    src={`${cloud_url}/v1759276481/mathias-reding-dMhVYCT_xn0-unsplash_xrnswy.jpg`} alt="categories-pictures"
                    loading="lazy"
                />  <p>{newProducts.plantinglevel}</p>
                {/* <p className="absolute top-4 bg-tertiary p-2 border rounded-[50%]">{newProducts.is_pet_friendly ? "🐾" : null}</p> */}
            {newProducts.is_pet_friendly && (
  <p className="absolute top-2 bg-third px-[.3rem] py-[.1rem] border rounded-[50%] ml-2">
    🐾
  </p>
)}
            </div>
            <div className="pl-4">

  <h2 className="text-lg font-semibold pt-4">{newProducts.common_name}</h2>
                 
                {/* <p>{newProducts.name}</p> */}
                <div className="flex gap-2">
                     <FaStar className="text-yellow-400 w-5 h-5" />
                    <p>{newProducts.rating}</p>
   <p className="text-xs">{newProducts.size_available}</p>
                </div>
             
                <div className="flex flex-row justify-start gap-2 mb-2">
               
                <p className="text-primary font-semibold">{newProducts.discounted_price}</p>
                 <p className="text-xs line-through">{newProducts.original_price}</p>
</div>
            </div>

            <div className="flex gap-2 justify-start mb-6 pl-4">
                <Button btnType="add_to_cart" />
                <Button btnType="quick_view" />
            </div>
        </section>
    )
}

export default NewProductCard;