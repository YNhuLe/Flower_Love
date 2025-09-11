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


            <div className="grid grid-cols-2 md:grid-cols-3 gap-2  grid-flow-row-dense bg-white blur-xs">               

                

             {
                    giftboxes.map((giftbox, index) => (
                        <GiftBoxCard key={index} {...giftbox} 
                        isFirst={index===0} customize={index % 2 === 1}
                        />
                    ))
                }

            </div>
        </section>
    )
}
export default GiftBoxOffer;