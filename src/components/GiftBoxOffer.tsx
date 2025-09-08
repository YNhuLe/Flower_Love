import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { GiftboxWithItemsProps } from "../types/types";
import { useParams } from "react-router-dom";
import axios from "axios";
import GiftBoxCard from "./GiftBoxCard";
function GiftBoxOffer() {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    const { id } = useParams();
    const [giftboxes, setGiftboxes] = useState<GiftboxWithItemsProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGiftboxes = async () => {
            try {
                const response = await axios.get(`${baseUrl}/products`);
                setGiftboxes(response.data);
                console.log("Reponse gift: ", response.data);

            } catch (error: any) {
                setError(error.message || `Failed to load the giftbox`)
            } finally {
                setLoading(false);
            }
        }

        fetchGiftboxes();
    }, []);
    return (


        <section className="bg-third p-4">
            <div className="m-4 ">
                <h2 className="text-sm uppercase text-cartRed ">Gift Box Offer</h2>
                <div>
                    <h2 className="text-3xl uppercase font-semibold mt-3">Best Plants Gift Box collections.</h2>
                    <p className="text-sm mt-5"> From planter materials to style options, discover which planter is best for your space..</p>
                    <Button btnType="explore" />
                </div>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 gap-2  grid-flow-row-dense">
                <div className="relative  min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center row-span-2"
                    style={{ backgroundImage: `url(${cloud_url}/v1756927884/gift-box_c1mcms.jpg)` }}>
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">26% OFF</div>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className="text-lg font-bold">Best Selling</h3>
                        <p className="text-sm">Modern Geometric Design</p>
                        <Button btnType="shop_now" />
                    </div>
                </div>


                {
                    giftboxes.map((giftbox) => (
                        <GiftBoxCard key={giftbox.id} {...giftbox} />
                    ))
                }




                {/* <div className="relative min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${cloud_url}/v1756927884/gift-box2_w3njnj.jpg)` }}>
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">32% OFF</div>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className="text-lg font-bold">Big Saving</h3>
                        <p className="text-sm">Summer Deal</p>

                        <Button btnType="shop_now" />
                    </div>
                </div>


                <div className="relative  min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${cloud_url}/v1756927883/gb5_zit5ic.webp)` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className="text-md font-bold">Customize</h3>
                        <p className="text-xs">Build Your Own</p>

                        <Button btnType="customize" />
                    </div>
                </div> */}

            </div>










        </section>


    )
}
export default GiftBoxOffer;