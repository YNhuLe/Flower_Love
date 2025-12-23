

import { PlantRecommendation } from "../../types/types";

function SecondaryRecommendedCard({ secondRecom }: { secondRecom: PlantRecommendation }) {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    return (
        <section className=" border borer-1 h-fit m-4 rounded-2xl overflow-hidden p-4 flex gap-2 cursor-pointer hover:shadow-lg  transition-all duration-300">

            <div className="w-[32rem] h-32 flex flex-col justify-start">
                <img className="rounded-xl w-full h-full object-cover" src={`${cloud_url}/${secondRecom.image_url[0]}`} alt={secondRecom.image_url} />
            </div>


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