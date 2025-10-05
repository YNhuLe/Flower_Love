import { useEffect, useState } from "react";
import { NewProductProps } from "../../types/types";
import axios from "axios";
import NewProductCard from "./NewProductCard";

const baesUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

function NewProductSection() {

    const [newProducts, setNewProducts] = useState<NewProductProps[]>([]);
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

    console.log("New Products: ", newProducts);



    return (
        <section>
            {

                newProducts.map((newProduct) => (
                    <NewProductCard key={newProduct.id}
                        newProducts={newProduct}
                    />
                ))

            }
        </section>
    )
}

export default NewProductSection;