import { Heart, } from "lucide-react";

function SavedPlantsCart() {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    return (
        <section className="my-6">

            <div className="relative w-fit">
                <img src={`${cloud_url}/v1766044931/s3_ujnlte.jpg`} alt="" className="w-[6rem] h-[6rem] rounded-md" />
                <p className="p-[.2rem] rounded-md bg-text-inverse/50 w-fit absolute top-2 right-2">

                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill={"#b12a2a"}
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="#b12a2a" className="w-6 h-6 p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>                </p>
            </div>
            <p className="text-xs mt-2">Bird of Paradise</p>
            <p className="text-xs text-success-700 font-semibold">$90.33</p>
        </section>
    )
}

export default SavedPlantsCart;