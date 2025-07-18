import React from "react";
import BestProductDetails from "./BestProductDetails";
import { dis_plants } from "../constants";
function BestProduct() {
  return (
    <div className="">
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
    </div>
  );
}

export default BestProduct;
