
import { ArrowRight, Leaf } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PlantRecommendation } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from '../../hooks/useCartStore';
import useFeedback from '../../hooks/useFeedback';
import FeedbackThumb from '../../common/FeedbackThumb';
import Button from '../../common/Button';
/** *
 * 
 * 
 * @param secondRecom - The plant recommendation data
 * @returns A JSX element representing the secondary recommended plant card
 */
function SecondaryRecommendedCard({ secondRecom, sessionId }: { secondRecom: PlantRecommendation, sessionId: number | null }) {
  const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
  const navigate = useNavigate();
  const gradients = [
    "from-green-500 via-emerald-600 to-teal-700",
    "from-purple-500 via-indigo-600 to-blue-700",
    "from-orange-400 via-red-500 to-pink-600",
    "from-rose-400 via-fuchsia-500 to-purple-600",
    "from-sky-400 via-blue-500 to-indigo-600",
    "from-amber-400 via-orange-500 to-yellow-600"
  ];
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  const selectedGradient = useMemo(() => randomGradient, []);
  const { vote, submitFeedback } = useFeedback({ sessionId, plantId: secondRecom.id });

  const handleCardClick = () => {
    navigate(`/products/${secondRecom.id}`);
  }

  const { addToCart } = useCartStore();
  const isOutOfStock = secondRecom.stock_quantity <= 0;
  const handleAddToCart = () => {
    if (!secondRecom.id) return;
    addToCart({
      product_id: Number(secondRecom.id),
      name: secondRecom.common_name,
      science_name: secondRecom.scientific_name,
      level: secondRecom.plantinglevel,
      stock: secondRecom.stock_quantity,
      price: secondRecom.sizes[0].original_price,
      image: secondRecom.image_url[0],
      quantity: 1,
      size: secondRecom.sizes[0].size
    })
    navigate("/products/cart")
  }
  return (

    <section className=" flex flex-col border borer-1 h-fit m-4 rounded-2xl overflow-hidden hover:shadow-lg  transition-all duration-300 p-4" >

      <div className=" flex gap-2 ">

        <div onClick={handleCardClick}
          className="group w-[5rem] h-full 
       cursor-pointer  shadow-sm hover:shadow-2xl transition-all duration-500
       "
        >
          <div className="relative overflow-hidden h-[8rem] w-[5rem]">
            <img
              className="w-full h-full object-cover transition-all rounded-xl duration-700 ease-in-out opacity-100 group-hover:scale-110 group-hover:backdrop-blur-sm "

              src={`${cloud_url}/${secondRecom.image_url[0]}`}
              alt={secondRecom.common_name} />
            <div
              className={`absolute rounded-xl w-full h-[10rem] inset-0 z-10 bg-gradient-to-br ${selectedGradient} opacity-0 group-hover:opacity-40 group-hover:rounded-xl transition-opacity duration-300 pointer-events-none`}
            />
            <div className="absolute inset-0 z-20 flex gap-0 items-center justify-center  opacity-0 group-hover:opacity-100 group-hover:rounded-xl transition-all duration-500 transform scale-90 group-hover:scale-100">
              <span className="flex items-center bg-text-inverse/30 py-2 px-2 text-text-inverse font-bold rounded-full text-[.5rem] uppercase tracking-[0.2em] shadow-2xl m-0       
            ">
                Explore

                <ArrowRight className="w-4 h-4 text-text-inverse transition-tranform duration-300 ease-out transform group-hover:translate-x-1.5" />     </span> </div>

          </div>


        </div>

        <div className='w-full'>

          <div className="flex gap-1 mb-2 justify-between">
            <div>
              <h1 className="text-xxs mb-1">{secondRecom.common_name}</h1>
              <p className="italic text-xs text-text-muted">{secondRecom.scientific_name}</p>
            </div>

            <div className="w-fit h-fit p-2 py-1 bg-amber-600/40 rounded-3xl flex  items-center">
              <p className="text-amber-800 text-[.6rem]">{Math.round(secondRecom.scoreMatch * 100)}%</p></div>
          </div>
     <ul className='mb-4'>

            {
              (secondRecom.reasoning).map((r, index) => (
                <li key={index} className='text-[.6rem] flex gap-1'>
                  <Leaf className='w-3 h-3 text-success-500' />
                  {r}</li>
              ))
            }
          </ul>
          <div className="flex justify-between w-full">
            <p className="text-text-muted text-xs">{secondRecom.plantinglevel}</p>
            <p className="text-amber-600 text-xs">${((secondRecom.sizes[0].original_price) * ((100 - secondRecom.sizes[0].discount_percentage) * .01)).toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className=" w-full flex items-center justify-between px-1">
        {sessionId && (
          <div className="flex items-center gap-2 mx-1">
            <span className="text-[0.5rem] text-text-muted">Helpful?</span>
            <FeedbackThumb feedback="up" selected={vote === "up"} disabled={vote === 'up'} onClick={() => submitFeedback("up")} />
            <FeedbackThumb feedback="down" selected={vote === "down"} disabled={vote === 'down'} onClick={() => submitFeedback("down")} />
          </div>
        )}
        <Button btnType="add_to_cart" onClick={handleAddToCart} disabled={isOutOfStock}></Button>
      </div>
    </section>


  )
}

export default SecondaryRecommendedCard;