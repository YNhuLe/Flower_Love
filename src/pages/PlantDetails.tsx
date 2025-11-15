import { useEffect, useState } from "react";
import { BestProductProp, NewProductProps } from "../types/types";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuantitySelector from "../common/QuantitySelector";
import AddToCart from "../common/AddToCart";
import Button from "../common/Button";
import { MdOutlineAutoAwesome } from "react-icons/md";

function PlantDetails() {

    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    const { id } = useParams();
    const [plantInfo, setPlantInfo] = useState<NewProductProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
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

    console.log("Plant info: ", plantInfo);

    return (plantInfo &&
        <section className="mx-4">
            <div>

                <img className="bg-lightGrey rounded-xl" src={`${cloud_url}/${plantInfo.image_url}`} alt={plantInfo.common_name} />
                <div className="flex flex-row aligns-between gap-1 mt-4 mb-8">
                    <img className="w-20 h-20 border border-grey rounded-xl" src={`${cloud_url}/${plantInfo.image_url}`} alt={plantInfo.common_name} />
                    <img className="w-20 h-20 border border-grey rounded-xl" src={`${cloud_url}/${plantInfo.image_url}`} alt={plantInfo.common_name} />
                    <img className="w-20 h-20 border border-grey rounded-xl" src={`${cloud_url}/${plantInfo.image_url}`} alt={plantInfo.common_name} />
                </div>
                <h2
                    className="font-semibold text-2xl"
                >{plantInfo.common_name}</h2>

                              <div className="flex flex-row items-center gap-2 p-1 bg-lightGrey border rounded-3xl w-fit px-2">
                        <MdOutlineAutoAwesome className="text-grey text-2xl" />

                        <p className="text-sm">Planting level: {plantInfo.plantinglevel}</p>
                    </div>
                       <hr className="border-t border-grey" ></hr>
                <div className="flex flex-row justify-start gap-2 m-2">

                    <p className=" text-xxs text-primary font-semibold">$ {plantInfo.discounted_price}</p>
                    <p className="text-xs line-through"> $ {plantInfo.original_price}</p></div>
<p>in Stock</p>
      <hr className="border-t border-grey" ></hr>

                {/* <QuantitySelector /> */}
                <Button btnType="add" price={plantInfo.discounted_price}></Button>
                <p>{plantInfo.description}</p>
                <p>{plantInfo.growth_habit}</p>
                <p>{plantInfo.bloom_info}</p>
                <p>{plantInfo.fertilizer_info}</p>
                <p>{plantInfo.humidity_preference}</p>
                <p>{plantInfo.watering_requirements}</p>
                <p>{plantInfo.potting_tip}</p>

                <p>{plantInfo.soil_type}</p>
                <p>{plantInfo.tempareture_range}</p>

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