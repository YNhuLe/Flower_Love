import Button from "../../common/Button";
import {FaStar} from "react-icons/fa";
import {NewProductProps} from "../../types/types";
function NewProductCard({newProducts} :{newProducts: NewProductProps}){
     const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

     if(!newProducts){
        return <p>Loading new products...</p>
     }
    return(
        <section className="border rounded-xl w-[calc(100%-2rem)] mx-auto mx-4 my-6 overflow-hidden relative transform transition-shadow duration-300 hover:shadow-lg">

            <div>
                <p>{newProducts.isnewarrival}</p>
                 <img
                className="w-full h-[10rem] object-cover transform transition-transform duration-300 hover:scale-105"

                src={ `${cloud_url}/v1759276481/mathias-reding-dMhVYCT_xn0-unsplash_xrnswy.jpg`} alt="categories-pictures"
                loading="lazy"
            />  <p>{newProducts.plantinglevel}</p>
            <p>{newProducts.is_pet_friendly ? "Yes" : "No"}</p>
            </div>
            <div>
                <h2>{newProducts.common_name}</h2>
        
                {/* <p>{newProducts.name}</p> */}
                <FaStar className="text-yellow-400 w-5 h-5 ml-20" />
                <p>{newProducts.rating}</p>
                <p>{newProducts.size_available}</p>
                <p>{newProducts.original_price}</p>
                <p>{newProducts.discounted_price}</p>
                
            </div>
            <Button btnType="add_to_cart" />
            <Button btnType="quick_view" />

        </section>
    )
}

export default NewProductCard;