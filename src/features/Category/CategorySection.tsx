import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import { CategoriesProps } from "../../types/types";

function CategorySection() {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<CategoriesProps[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${baseUrl}/category`);
                setCategories(response.data);
                console.log("categories response: ", response.data);

            } catch (error: any) {
                setError(error.message || `Failes to load the categories!`)
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, [])

    return (
        <section className="mt-40">
            <h1 className="text-2xl text-center font-semibold">Find Plants by Category</h1>
            <p className="text-center  m-4 mt-2">Explore our diverse collection of plants organized by type, size, and care requirements to find the perfect green companion for your space.</p>

            {
                categories.map((category) => (
                    <CategoryCard categories={category} />
                ))
            }


        </ section>
    )
}

export default CategorySection;