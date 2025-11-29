import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import { PlantWithSize } from "../types/types";
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

//have the useEffect outside of the function to ensure stability and prevent unescessary re-creations on every renders.
const fetchPlant = async (plantId: string): Promise<PlantWithSize> => {
  if (!plantId) {
    throw new Error("Plant ID is required for fetching details!");
  }
  const response = await axios.get(`${baseUrl}/allplants/${plantId}`);
  return response.data;
};
function usePlantDetails(id: string | undefined) {
  return useQuery({
    //querykey MMUST include the ID so React Query caches data separately for each plant
    //queryFn is only called if the ID is defined
    queryKey: ["plant", id],
    queryFn: () => fetchPlant(id!), // id! use non-null assertion since we check enabled(to make sure that fetchPlant only be called if id has a number defined value)
    enabled: !!id, //only run the query if the id is truthy
    staleTime: 1000 * 60 * 10,//data considered fresh for 10 mins
  });
}

export default usePlantDetails;
