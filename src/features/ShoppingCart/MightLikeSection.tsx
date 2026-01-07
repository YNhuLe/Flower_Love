
import { useState, useEffect } from "react";
import useCartStore from "../../hooks/useCartStore";
import useAllPlants from "../../hooks/useAllPlants";
import { PlantWithSize } from "../../types/types";
import { Link } from "react-router-dom";




function MightLikeSection() {
  const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

  const { data: plantList,
    isLoading,
    isError, error }
    = useAllPlants();

  const [randomPlants, setRandomPlants] = useState<PlantWithSize[]>([]);

  useEffect(() => {
    if (!plantList) return;

    const shuffles = [...plantList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    setRandomPlants(shuffles);

  }, [plantList])
  return (

    <section className=" bg-surface-raised/80 p-4 m-4 rounded-xl">
      <h1>You Might Also Like</h1>
      <div className="grid grid-cols-2 gap-3 ">

        {
          randomPlants.map((random, id) => (
            <div key={id} className="rounded-xl w-full mb-4">
<Link to={`/products/${random.id}`} >
              <img className="rounded-2xl w-full object-cover h-32 bg-text-muted/10 p-2"
                src={`${cloud_url}/${random.image_url[0]}`} alt={random.common_name} /> </Link>
              <p className="mt-2 text-xxs">{random.common_name}</p>
              <p className="text-amber-600 mt-1 text-xs">${random.sizes[0].original_price}</p>
            </div>
          ))
        }

      </div>
    </section>
  );
}

export default MightLikeSection;