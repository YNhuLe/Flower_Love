import Button from "../../common/Button";
import { FaStar , FaPaw} from "react-icons/fa";
import { ProductAndInfo,ProductWithCategory } from "../../types/types";
import { product } from "../../constants";
function NewProductCard({ newProduct }: { newProduct: ProductWithCategory }) {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    if (!newProduct) {
        return <p>Loading new products...</p>
    }
    return (
        <section className="border rounded-xl w-[calc(100%-2rem)] mx-auto mx-4 my-6 overflow-hidden relative transform transition-shadow duration-300 hover:shadow-lg">

            <div>
                <p>{newProduct.isnewarrival}</p>
                <img
                    className="w-full h-[10rem] object-cover transform transition-transform duration-300 hover:scale-105"

                    src={`${cloud_url}/v1759276481/mathias-reding-dMhVYCT_xn0-unsplash_xrnswy.jpg`} alt="categories-pictures"
                    loading="lazy"
                /> 
                 {/* <p>{newProduct.plantinglevel}</p> */}
              {newProduct.is_pet_friendly && (
  <p className="absolute top-2 bg-third px-[.3rem] py-[.3rem] border rounded-[50%] ml-2">
   <FaPaw className="text-xs" />
  </p>
)}
            </div>
            <div className="pl-4">

  <h2 className="text-lg font-semibold pt-4">{newProduct.common_name}</h2>
                 
                <p className="text-xs mb-4">{newProduct.name}</p>
                <div className="flex gap-2 justify-between">
                    <div className="flex row gap-1">
                     <FaStar className="text-yellow-400 w-5 h-5" />
                    <p>{newProduct.rating}</p></div>

   <div className="flex gap-2 flex-wrap mr-4">
    {
       newProduct.size_available.split(",").map((size , index) => (
        <p className=" p-1 text-[.6rem] border rounded-lg" key={index}>{size.trim()}</p>
       ))
    }
   </div>
                </div>
             
                <div className="flex flex-row justify-start gap-2 my-4">
               
                <p className="text-primary font-semibold">{newProduct.discounted_price}</p>
                 <p className="text-xs line-through">{newProduct.original_price}</p>
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