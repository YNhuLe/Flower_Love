import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "./Button";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SearchResult {
    id: number;
    common_name: string;
    scientific_name: string;
    slug: string;
    image_url: string[];
    plantinglevel: string;
    stock_quantity: number;
    is_pet_friendly: boolean;
    isonsale: boolean;
    category_id: number;
    rating: number;
}

/**
 * 
 * @returns The results of the search query, including data, error, and status.
 * The SearchBar component provides a search input for users to search for plants. 
 * It fetches search results from the backend based on the user's query and displays them in a dropdown. 
 * The component handles loading states, empty results, and clicking outside the dropdown to close it.
 */
function SearchBar() {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResult] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {

        if (!searchQuery.trim()) {
            setResult([]);
            setShowDropdown(false);
            return;
        }
        const timer = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showDropdown]);
    const handleSearch = async () => {
        setLoading(true);
        try {
            const responseSearch = await axios.get(`${baseUrl}/search`, {
                params: { q: searchQuery },
            });
            setResult(responseSearch.data.results);
            setShowDropdown(true);
        } catch (error: any) {
            console.error("Error fetching search results:", error);
            setResult([]);
            setShowDropdown(false);
        } finally {
            setLoading(false);
        }
    }
    return (
        <section ref={containerRef} className="border-b-2 w-full relative">
            <form className="mt-[5.5rem] mx-4 pb-4 "
                onSubmit={(e) => e.preventDefault()}>
                <div className="relative">

                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />

                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                        placeholder="Search for plants..."
                        className="w-full bg-surface-raised border rounded-full p-2 pl-10 focus:border-2 focus:bordertext-muted focus:outline-none" />

                </div>
            </form>

            {showDropdown && (
                <div className="absolute z-50 w-max bg-surface-raised border rounded-2xl shadow-lg mx-4 max-h-96 overflow-y-auto">
                    {loading && (
                        <p className="p-4 text-sm text-text-muted">Searching...</p>
                    )}

                    {!loading && result.length === 0 && (
                        <p className="p-4 text-sm text-text-muted">
                            No plants found for "{searchQuery}"
                        </p>
                    )}

                    {!loading &&
                        result.map((plant) => (
                            <Link
                                key={plant.id}
                                to={`/products/${plant.slug}`}
                                onClick={() => setShowDropdown(false)}
                                className="flex items-center gap-3 p-3 hover:bg-surface-hover transition-colors border-b last:border-b-0"
                            >
                                {plant.image_url?.[0] && (
                                    <img
                                        src={`${cloud_url}/${plant.image_url[0]}`}
                                        alt={plant.common_name}
                                        className="w-10 h-10 object-cover rounded-lg"
                                    />
                                )}
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{plant.common_name}</p>
                                    <p className="text-xs text-text-muted italic">
                                        {plant.scientific_name}
                                    </p>
                                </div>
                                {plant.stock_quantity === 0 && (
                                    <span className="text-[.5rem] text-error-500">Out of stock</span>
                                )}
                            </Link>
                        ))}
                </div>
            )}</section>
    )
}
export default SearchBar;