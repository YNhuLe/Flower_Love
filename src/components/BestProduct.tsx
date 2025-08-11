import React from "react";
import BestProductDetails from "./BestProductDetails";
import { dis_plants } from "../constants";
function BestProduct() {
  return (
    <div className=" w-full overflow-x-auto">
    <div className="flex flex-nowrap gap-4 p-4">
      {dis_plants.map(
        ({ id, plantName, image, details, originalPrice, discountedPrice }) => (
          <BestProductDetails
            key={id}
            id={id}
            image={image}
            plantName={plantName}
            details={details}
            originalPrice={originalPrice}
            discountedPrice={discountedPrice}
          />
        )
      )}
    </div></div>
  );
}

export default BestProduct;
