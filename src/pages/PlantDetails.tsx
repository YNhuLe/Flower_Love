import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Button from "../common/Button";
import StockDisplay from "../common/StockDisplay";
import RatingStatusChecker from "../common/RatingStatusChecker";
import QuantitySelector from "../common/QuantitySelector";
import {
    Share2,
    Droplets,
    Sun,
    Thermometer,
    Wind,
    Sparkles,
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import HeartButton from "../common/HeartButton";
import usePlantDetails from "../hooks/usePlantDetails";
import useCartStore from "../hooks/useCartStore";
function PlantDetails() {
    const { plant_id } = useParams<{ plant_id: string }>();
    const {
        data: plantInfo,
        isLoading,
        isError,
        error
    } = usePlantDetails(Number(plant_id));
    const [quantity, setQuantity] = useState(1);
    const [selectSize, setSelectedSize] = useState(0);
    const [selectImage, setSelectedImage] = useState(0);
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
   
   const {addToCart} = useCartStore();
   const navigate = useNavigate();
   const handleAddToCart = () =>{
    if (!plantInfo?.id) return;
    addToCart({
product_id: plantInfo?.id,
name: plantInfo.common_name,
science_name: plantInfo.scientific_name,
level: plantInfo.plantinglevel,
stock:plantInfo.stock_quantity,
price: plantInfo.sizes[selectSize].discounted_price,
quantity,
size: plantInfo.sizes[selectSize].size,
image: plantInfo.image_url[selectImage]


    })

    navigate("/products/cart");
   }
   
    if (isLoading) {
        return <p>Loading plant information... </p>
    }
    if (isError) { return (<div className="text-center mt-10"> <p className="text-red-600 font-semibold">This plant does not exist.</p> <p className="text-sm text-gray-500">Please choose another plant.</p> </div>); }
    if (isLoading) return <p>Loading...</p>;
    if (isError || !plantInfo) {
        return <p>Loading data!!</p>
    }

    // Parse benefits from the backend
    let formatArr: string[] = [];
    if (Array.isArray(plantInfo.benefits)) {
        formatArr = plantInfo.benefits;
    } else if (typeof plantInfo.benefits === 'string') {
        try {
            formatArr = JSON.parse(plantInfo.benefits);
        } catch (error: any) {
            formatArr = [];
        }
    }
    const currentPrice = plantInfo.sizes[selectSize].original_price
    const discountedPrice = plantInfo.sizes[selectSize].discounted_price;
    const isOutOfStock = plantInfo.stock_quantity <= 0;

    return (plantInfo &&
        <section className="mx-4 mt-[7rem]">
            <div>
                <img className="bg-surface-raised rounded-xl h-[20rem] w-full" src={`${cloud_url}/${plantInfo.image_url[selectImage]}`} alt={plantInfo.common_name} />
                <div className="flex aligns-between gap-1 mt-4 mb-8">

                    {
                        plantInfo.image_url && plantInfo.image_url.length > 0 ? (
                            plantInfo.image_url.map((image, index) => (
                                <button key={index}
                                    onClick={() => { setSelectedImage(index) }}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all 
                                        ${selectImage === index
                                            ? 'border-brand-700 ring-1 ring-brand-700 ring-offset-1'
                                            : 'border-muted hover:border-brand-500'
                                        }`}
                                >
                                    <img className="bg-surface-raised rounded-xl w-[5rem] h-[5rem]" src={`${cloud_url}/${image}`} alt={plantInfo.common_name} />

                                </button>
                            ))
                        ) : (
                            <p>No image available!</p>
                        )
                    }
                </div>

                <div className="flex items-center justify-between">
                    <h2
                        className="font-semibold text-2xl mb-2 text-left"
                    >{plantInfo.common_name}</h2>
                    <div className="flex  gap-2">

                        <HeartButton btnType="product_details" />
                        <Share2 className="text-text-muted w-5 h-5" /></div></div>
                <p className="italic mb-2">{plantInfo.scientific_name}</p>

                <RatingStatusChecker rating={plantInfo.rating} ratingNum={plantInfo.rating} numReviews={plantInfo.num_reviews} />
                <div className="flex items-center gap-2 p-1 bg-surface-raised border rounded-3xl w-fit px-2 mb-6">
                    <Sparkles className="text-text-muted w-5 h-5" />

                    <p className="text-sm">Planting level: {plantInfo.plantinglevel}</p>
                </div>
                <hr className="border-t border-text-muted" ></hr>
                <div className="mt-4 flex gap-2">
                    <p className="text-2xl text-brand-700 font-medium ">${discountedPrice.toFixed(2)}</p>
                    {
                        currentPrice.toFixed(2) > discountedPrice.toFixed(2) ? <p className="line-through">${currentPrice.toFixed(2)}</p> : ""
                    }
                </div>
                <div className="text-success-500 flex gap-1">
                    <StockDisplay stockQuantity={plantInfo.stock_quantity} stockType="plant-details"/>
                </div>
                <hr className="border-t border-text-muted mt-4" ></hr>
                <div className="flex justify-start gap-2 mt-4">
                    <div className=" flex gap-2 mt-4">
                        {
                            plantInfo.sizes && plantInfo.sizes.length > 0 ? (
                                plantInfo.sizes.map((size, index) => (
                                    <button key={index}
                                        onClick={() => setSelectedSize(index)}
                                        className={`p-2 border rounded-xl 
                                ${selectSize === index ? 'border-2 border-text-muted bg-brand-100' :
                                                'border-2 border-text-muted hover:border-brand-500'}`
                                        }>
                                        <p>{size.size}</p>
                                        {
                                            size.original_price.toFixed(2) > size.discounted_price.toFixed(2) ? <p className="line-through text-xs">${size.original_price.toFixed(2)}</p> : ""
                                        }
                                        <p className="text-xxs text-brand-700 font-medium ">${size.discounted_price.toFixed(2)}</p>

                                    </button>
                                ))
                            ) : (
                                <p className="text-sm text-text-muted">No sizes available</p>
                            )
                        }
                    </div>

                </div>
                <p className="text-sm mt-4">Quantity</p>
                <QuantitySelector
                    value={quantity} onChange={setQuantity} min={1} max={plantInfo.stock_quantity}
                    disabled={isOutOfStock} selectorType="plantItem"
                />
                <Button btnType="add" price={(discountedPrice * quantity).toFixed(2)} disabled={isOutOfStock}
                
                onClick={handleAddToCart}></Button>

                <div className="p-6 bg-surface-raised border rounded-3xl w-full my-6">
                    <Sparkles className="text-text-muted w-5 h-5 inline-block" />
                    <h3 className="inline-block ml-2 mb-4">Plant Benefits</h3>
                    {
                        formatArr.map((benefit, index) => (
                            <div className="flex flex-row gap-2" key={index}>
                                <FaCheck className="w-4 h-3 text-success-500 " />
                                <p className="text-xs mb-2 ">{benefit}</p>
                            </div>
                        ))
                    }

                </div>
                <article className="p-6 bg-surface-base border rounded-3xl">
                    <h3 className="text-xxs mb-2 font-semibold">About this Plant</h3>
                    <span className="text-xs leading-[1.5]">{plantInfo.description}</span>
                    <span className="text-xs leading-[1.5]"> {plantInfo.growth_habit}</span>
                    <span className="text-xs leading-[1.5]">{plantInfo.bloom_info}</span>
                </article>

                <div className="my-12">

                    <h2 className="text-center m-4">Care instructions</h2>

                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-blue-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Droplets className="w-6 h-6 text-blue-600" /></div>
                        <h3 className="mb-2">Water</h3>
                        <p className="text-xs text-text-muted">{plantInfo.watering_requirements}</p>
                    </article>
                    <p>{plantInfo.potting_tip}</p>
                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-amber-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Sun className=" w-6 h-6 text-amber-600 bg-yellow-200 rounded-full" />
                        </div>
                        <h3 className="mb-2">Light</h3>
                        <p className="text-xs text-text-muted">{plantInfo.light}</p>
                    </article>
                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-error-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Thermometer className="w-6 h-6 text-error-500" /></div>
                        <h3 className="mb-2">Temperature</h3>
                        <p className="text-xs text-text-muted">{plantInfo.humidity_preference},   <span className="text-xs text-text-muted">{plantInfo.temperature_range}</span></p>
                    </article>

                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-cyan-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Wind className="w-6 h-6 text-cyan-600" /></div>
                        <h3 className="mb-2">Humidity</h3>
                        <p className="text-xs text-text-muted">{plantInfo.humidity}</p>
                    </article>

                    <article className="p-4 border rounded-xl  mb-6">
                        <div className="p-2 bg-emerald-100 rounded-full inline-flex items-center justify-center mb-2">
                            <Sparkles className="w-6 h-6 text-emerald-600" /></div>
                        <h3 className="mb-2">Fertilizer</h3>
                        <p className="text-xs text-text-muted">{plantInfo.fertilizer_info}</p>
                    </article>

                </div>

            </div>
        </section >
    )
}

export default PlantDetails;