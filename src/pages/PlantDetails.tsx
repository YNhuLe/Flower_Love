import { useEffect, useState } from "react";
import { BestProductProp ,NewProductProps} from "../types/types";
import axios from "axios";
import { useParams } from "react-router-dom";

function PlantDetails(){

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const {id} = useParams();
    const [plantInfo, setPlantInfo] = useState<NewProductProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
 const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
  
    useEffect(() =>{
        const fetchPlantInfo = async() => {
            try{
const response = await axios.get(`${baseUrl}/allplants/${id}`);
setPlantInfo(response.data);
console.log(" Plant info: ", response.data);

            }catch(error: any){
                setError(error.message || "Failed to retrieve plant details!")
            }finally{
                setLoading(false);
            }
        };
        fetchPlantInfo();
    }, [id]);

    if(loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>

    console.log("Plant info: ", plantInfo);
    
    return ( plantInfo &&
        <section>
         <div>   <img src={`${cloud_url}/${plantInfo.image_url}`} alt={plantInfo.common_name} />
        <h2>{plantInfo.common_name}</h2>
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