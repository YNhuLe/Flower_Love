import { useQuery } from "@tanstack/react-query";
import { PlantWithSize } from "../types/types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const fetchPlantDetails = async (plantID: number): Promise<PlantWithSize> => {
// console.log("Plant ID:", plantID);

//  console.log("🔍 fetchPlantDetails - Input plantID:", plantID);
//   console.log("🌐 Request URL:", `${baseUrl}/allplants/${plantID}`);
  
  console.log(plantID);
  
  const response = await axios.get(`${baseUrl}/allplants/${plantID}`);
// console.log("📦 Raw response.data:", response.data);
//   console.log("🆔 response.data.id:", response.data.id);
//   console.log("🆔 response.data.plant_id:", response.data.plant_id);
//   console.log("📋 All keys in response:", Object.keys(response.data));
  
  // console.log("response data: ", response.data);
//   console.log("Type of: ", typeof(response.data));
  
  
  return response.data;
};

function usePlantDetails(plantID: number | undefined) {
  return useQuery<PlantWithSize>({
    queryKey: ["plant", plantID],
    queryFn: () => {
      if (!plantID) throw new Error("Plant Id is required!");
      return fetchPlantDetails(plantID!);
    },
    enabled: !!plantID, //only run when plantID is defined( truthy)
    staleTime: 1000 * 60 * 10,
  });
}
export default usePlantDetails;
