import axios from "axios";
import { SaleData } from "../types/dataTypes";
import { useState, useEffect } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";




function useSaleData(range?: string, category?: string): SaleData | null {
    const [data, setData] = useState<SaleData | null>(null);
    // console.log("useSaleData called with range:", range, "and category:", category, data);
    useEffect(() => {
            const fetchSaleData = async () =>{
        try {
       
            const response = await axios.get(`${baseUrl}/sales`, {
                params: {range, category}
            })
            setData(response.data)
           }
        catch (error) {
            console.error("Error fetching sale data:", error);
        } }
        fetchSaleData();
    }, [range, category]);
    return data;
}

export default useSaleData;

