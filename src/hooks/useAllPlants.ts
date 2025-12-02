import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PlantWithSize } from "../types/types";
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

//have the useEffect outside of the function to ensure stability and prevent unescessary re-creations on every renders.
const fetchPlant = async (): Promise<PlantWithSize[]> => {

  const response = await axios.get(`${baseUrl}/allplants`);
  // return response.data;

  return Array.isArray(response.data) ? response.data : [];
};



function useAllPlants() {
  return useQuery<PlantWithSize[]>({
    queryKey: ["allPlant"],
    queryFn: fetchPlant,   
       staleTime: 1000 * 60 * 10,//data considered fresh for 10 mins
  });
}

export default useAllPlants;
