
import {
  CheckCircle, ArrowRight
} from 'lucide-react';
import { useMemo } from 'react';
import { PlantRecommendation } from "../../types/types";
import { Link } from "react-router-dom";
function SecondaryRecommendedCard({ secondRecom }: { secondRecom: PlantRecommendation }) {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

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
    return (
        <section className=" border borer-1 h-fit m-4 rounded-2xl overflow-hidden p-4 flex gap-2 cursor-pointer hover:shadow-lg  transition-all duration-300">

            {/* <div className="w-[32rem] h-32 flex flex-col justify-start">
                <img className="rounded-xl w-full h-full object-cover" src={`${cloud_url}/${secondRecom.image_url[0]}`} alt={secondRecom.image_url} />
            </div> */}

 <Link to={`/products/${secondRecom.id}`}
      className="group w-full h-full  cursor-pointer m-4  shadow-sm hover:shadow-2xl transition-all duration-500"
      >
            <div className="relative overflow-hidden h-[15rem] m-4">
              <img
                className="w-full h-full object-cover transition-all  duration-700 ease-in-out opacity-100 group-hover:scale-110 group-hover:backdrop-blur-sm "

                src={`${cloud_url}/${secondRecom.image_url[0]}`}
                alt={secondRecom.common_name} />
              <div
                className={`absolute  rounded-xl w-full h-full inset-0 z-10 bg-gradient-to-br ${selectedGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`}
          />
              <div className="absolute inset-0 z-20 flex gap-0 items-center justify-center  opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                <span className="flex  bg-text-inverse/30 py-2 px-3 text-text-inverse font-bold rounded-full text-xs uppercase tracking-[0.2em] shadow-2xl m-0       
            ">
                  Explore

             <ArrowRight className="w-4 h-4 text-text-inverse transition-tranform duration-300 ease-out transform group-hover:translate-x-1.5" />     </span> </div>

            </div>

     
          </Link>

            <div>

                <div className="flex gap-2 mb-2 justify-between">
                    <div>
                        <h1 className="text-xxs mb-1">{secondRecom.common_name}</h1>
                        <p className="italic text-xs text-text-muted">{secondRecom.scientific_name}</p>
                    </div>

                    <div className="w-fit h-fit p-2 py-1 bg-amber-600/40 rounded-3xl flex  items-center">
                        <p className="text-amber-800 text-[.7rem]">{Math.round(secondRecom.scoreMatch * 100)}%</p></div>
                </div>


                <p className="text-[.75rem] mb-2">{secondRecom.reasoning}</p>
                <div className="flex justify-between w-full">
                <p className="text-text-muted text-xs">{secondRecom.plantinglevel}</p>
                <p className="text-amber-600 text-xs">${secondRecom.original_price}</p>
            </div>
            </div>
        </section>
    )
}

export default SecondaryRecommendedCard;