import { useEffect, useState } from "react";
import { ProductWithCategory } from "../../types/types";
import axios from "axios";
import NewProductCard from "./NewProductCard";
const baesUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

function NewProductSection() {

    const [newProducts, setNewProducts] = useState<ProductWithCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const response = await axios.get(`${baesUrl}/new_product`);
                setNewProducts(response.data);
            } catch (error: any) {
                setError(error.message || "failed to load the new products!");
            } finally {
                setLoading(false);
            }
        }
        fetchNewProducts();
    }, []);

if( loading) return <p>Loading...</p>
if(error) return <p>Error...</p>

    return (
        <section>
            {

           newProducts.map((newProduct, id) => (
                    <NewProductCard key={id}
                        newProduct={newProduct}
                    />
                ))

            }
        </section>
    )
}

export default NewProductSection;