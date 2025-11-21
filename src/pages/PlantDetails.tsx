import { useEffect, useState } from "react";
import { NewProductProps } from "../types/types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Button from "../common/Button";
import StockDisplay from "../common/StockDisplay";
import RatingStatusChecker from "../common/RatingStatusChecker";
import QuantitySelector from "../common/QuantitySelector";
import {
    ShoppingCart,
    Heart,
    Share2,
    Star,
    Droplets,
    Sun,
    Thermometer,
    Wind,
    Sparkles,
    ChevronLeft,
    Check,
    AlertCircle
} from 'lucide-react';

function PlantDetails() {

    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    const { id } = useParams();
    const [plantInfo, setPlantInfo] = useState<NewProductProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(0);
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";


    useEffect(() => {
        const fetchPlantInfo = async () => {
            try {
                const response = await axios.get(`${baseUrl}/allplants/${id}`);
                setPlantInfo(response.data);
                console.log(" Plant info: ", response.data);

            } catch (error: any) {
                setError(error.message || "Failed to retrieve plant details!")
            } finally {
                setLoading(false);
            }
        };
        fetchPlantInfo();
    }, [id]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>
    let formatArr: string[] = [];
    try {
        const benefitArray: string[] = JSON.parse(plantInfo?.benefits || "[]");
        formatArr = benefitArray.map(benefitArr => `${benefitArr}`)
    } catch (error: any) {
        console.log("Error: Could not parse benefit data.", error);

    }

    return (plantInfo &&
        <section className="mx-4">
            <div>
                <img className="bg-surface-raised rounded-xl" src={`${cloud_url}/${plantInfo.image_url}`} alt={plantInfo.common_name} />
                <div className="flex flex-row aligns-between gap-1 mt-4 mb-8">
                    <img className="w-20 h-20 border border-text-muted rounded-xl" src={`${cloud_url}/${plantInfo.image_url}`} alt={plantInfo.common_name} />
                    <img className="w-20 h-20 border border-text-muted rounded-xl" src={`${cloud_url}/${plantInfo.image_url}`} alt={plantInfo.common_name} />
                    <img className="w-20 h-20 border border-text-muted rounded-xl" src={`${cloud_url}/${plantInfo.image_url}`} alt={plantInfo.common_name} />
                </div>
                <h2
                    className="font-semibold text-2xl mb-2"
                >{plantInfo.common_name}</h2>
                <p className="italic mb-2">{plantInfo.scientific_name}</p>

                <RatingStatusChecker rating={plantInfo.rating} ratingNum={plantInfo.rating} numReviews={plantInfo.num_reviews} />
                <div className="flex flex-row items-center gap-2 p-1 bg-surface-raised border rounded-3xl w-fit px-2 mb-6">
                    <Sparkles className="text-text-muted w-5 h-5" />

                    <p className="text-sm">Planting level: {plantInfo.plantinglevel}</p>
                </div>
                <hr className="border-t border-text-muted" ></hr>
                <div className="flex flex-row justify-start gap-2 mt-4">

                    <p className="text-xl text-brand-700 font-semibold">${plantInfo.discounted_price.toFixed(2)}</p>
                    
                    <p className="text-xs line-through"> $ {plantInfo.original_price.toFixed(2)}</p></div>
                <div className="text-success-500 flex flex-row gap-1">


                    <StockDisplay stockQuantity={plantInfo.stock_quantity} />

                </div>
                <hr className="border-t border-text-muted mt-4" ></hr>
                <p className="text-sm mt-4">Quantity</p>
                <QuantitySelector
                    value={quantity} onChange={setQuantity} min={1} max={200}
                />
                <Button btnType="add" price={plantInfo.discounted_price}></Button>

                <div className="p-6 bg-surface-raised border rounded-3xl w-fit my-6">
                    <Sparkles className="text-text-muted w-5 h-5 inline-block" />
                    <h3 className="inline-block ml-2 mb-4">Plant Benefits</h3>
                    {
                        formatArr.map((benefit, index) => (
                            <div className="flex flex-row gap-2">
                                <FaCheck className="w-4 h-3 text-success-500 " />
                                <p key={index} className="text-xs mb-2 ">{benefit}</p></div>
                        ))
                    }

                </div>
                <article className="p-6 bg-surface-base border rounded-3xl">
                    <h3 className="text-xxs mb-2 font-semibold">About this Plant</h3>
                    <span className="text-xs leading-[1.5]">{plantInfo.description}</span>
                    <span className="text-xs leading-[1.5]"> {plantInfo.growth_habit}</span>
                    <p className="text-xs leading-[1.5]">{plantInfo.bloom_info}</p>
                </article>

                <div className="my-12">

                    <h2 className="text-center m-4">Care instructions</h2>

                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-blue-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Droplets className="w-6 h-6 text-blue-600" /></div>
                        <h3 className="mb-2">Water</h3>
                        <p className="text-xs text-text-muted">{plantInfo.watering_requirements}</p>
                        {/* <p>{plantInfo.soil_type}</p> */}
                    </article>
                    <p>{plantInfo.potting_tip}</p>
                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-amber-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Sun className=" w-6 h-6 text-amber-600 bg-yellow-200 rounded-full" />
                        </div>
                        <h3 className="mb-2">Light</h3>
                        <p className="text-xs text-text-muted">{plantInfo.light}</p>

                    </article>



                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-error-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Thermometer className="w-6 h-6 text-error-500" /></div>
                        <h3 className="mb-2">Temperature</h3>
                        <p className="text-xs text-text-muted">{plantInfo.humidity_preference},   <span className="text-xs text-text-muted">{plantInfo.temperature_range}</span></p>
                      

                    </article>

                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-cyan-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Wind className="w-6 h-6 text-cyan-600" /></div>
                        <h3 className="mb-2">Humidity</h3>
                        <p className="text-xs text-text-muted">{plantInfo.humidity}</p>
                    </article>

                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-emerald-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Sparkles className="w-6 h-6 text-emerald-600" /></div>
                        <h3 className="mb-2">Fertilizer</h3>
                         <p className="text-xs text-text-muted">{plantInfo.fertilizer_info}</p>
                    </article>

                </div>

                <p>{plantInfo.mature_width}</p>
                <p>{plantInfo.mature_height}</p></div>
            <div>
                <p>{plantInfo.shipping_info}</p>
                <p>{plantInfo.stock_quantity}</p>
                <p>{plantInfo.size_available}</p>
                <p></p>
            </div>
        </section>
    )
}

export default PlantDetails;