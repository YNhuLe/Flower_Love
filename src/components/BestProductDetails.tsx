import { PlantWithSize } from "../types/types";
import { FaStar } from "react-icons/fa";
import HeartButton from "../common/HeartButton";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import useCartStore from "../hooks/useCartStore";
import { useNavigate } from "react-router-dom";
import StockDisplay from "../common/StockDisplay";
function BestProductDetails({ products }: { products: PlantWithSize }) {
  const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

  if (!products) {
    return <p>Loading product details...</p>;
  }

  //add-to-cart function
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (!products.id) return;
    addToCart({
      product_id: products.id,
      name: products.common_name,
      science_name: products.scientific_name,
      level: products.plantinglevel,
      stock: products.stock_quantity,
      price: products.sizes[0].original_price,
      image: products.image_url[0],
      quantity: 1,
      size: products.sizes[0].size
    })
    navigate("/products/cart")
  }
  const isOutOfStock = products.stock_quantity <= 0;
  return (


    <div
      className="max-w-fit h-50 mt-8 mb-8 p-4 border m-4 border-green-900 rounded-lg shadow-lg mx-auto"
    >
      <div className="flex flex-row justify-between">
        <div>
          {
            products.isnewarrival && (
              <p className="bg-brand-700  w-fit px-2 py-1 rounded-lg text-surface-base text-[.65rem]">  New</p>

            )
          }
        </div>
        <HeartButton btnType="gift_box" />
      </div>
      <Link to={`/products/${products.id}`} >
        <img
          className="h-60 w-60 m-auto transform transition-transform duration-300 hover:scale-105"
          src={`${cloud_url}/${products.image_url[0]
            }`}
          alt={products.common_name}
          loading="lazy"
        />
      </Link>
      <h2 className="text-left mt-4 text-xxs font-semibold">
        {products.common_name} {products.id}
      </h2>
      <div className="flex flex-row justify-start gap-2">
        <p className="text-xxs text-brand-700 font-semibold">
          ${products.sizes[0].original_price.toFixed(2)}
        </p>
        <p className="text-xs line-through">
          ${products.sizes[0].discounted_price.toFixed(2)}
        </p>

        <FaStar className="text-yellow-400 w-5 h-5 ml-20" />
        <p>{products.rating}</p>


      </div>

      <div className="mt-2 flex justify-between ">


        <p className="text-xs">{products.sizes[0].size}</p>
        <StockDisplay stockType="cart" stockQuantity={products.stock_quantity} />
      </div>

      <div className="flex gap-2 justify-start mt-6 mb-4 ">
        <Button btnType="add_to_cart" onClick={handleAddToCart} disabled={isOutOfStock} />
        <Button btnType="quick_view" url={`/products/${products.id}`} />
      </div>
    </div>

  );
}

export default BestProductDetails;
