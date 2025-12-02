import { useQuery } from "@tanstack/react-query";
import { PlantWithSize } from "../types/types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const fetchPlantDetails = async (plantID: string): Promise<PlantWithSize> => {
  const response = await axios.get(`${baseUrl}/allplants/${plantID}`);

//   console.log(`${baseUrl}/allplants/${plantID}`);
//   console.log("response data: ", response.data);
//   console.log("Type of: ", typeof(response.data));
  
  
  return response.data;
};

function usePlantDetails(plantID: string | undefined) {
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
