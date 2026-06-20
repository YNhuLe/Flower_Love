import { useQuery } from "@tanstack/react-query";
import { PlantWithSize } from "../types/types";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const fetchPlantDetails = async (slug: string): Promise<PlantWithSize> => {
  const response = await axios.get(`${baseUrl}/allplants/${slug}`);
  return response.data;
};

/**
 * Custom hook to fetch plant details by slug.
 * @param slug - The slug of the plant to fetch details for.
 * @returns The result of the query, including data, error, and status.
 */
function usePlantDetails(slug: string | undefined) {
  return useQuery<PlantWithSize>({
    queryKey: ["plant", slug],
    queryFn: () => {
      if (!slug) throw new Error("Plant slug is required!");
      return fetchPlantDetails(slug);
    },
    enabled: !!slug, //only run when slug is defined( truthy)
    staleTime: 1000 * 60 * 10,
  });
}
export default usePlantDetails;
