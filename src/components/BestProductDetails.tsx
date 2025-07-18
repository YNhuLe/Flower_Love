import React from "react";
interface BestProductProp {
  id: string;
  plantName: string;
  image: string;
  details: string;
  originalPrice: number;
  discountedPrice: number;
}
function BestProductDetails({
  id,
  plantName,
  image,
  originalPrice,
  discountedPrice,
}: BestProductProp) {
  return (
    <div className="best__pro">
      <h2 className="best__pro">{plantName}</h2>
      <img src={`/images/${image}`} alt="best-pro-image" loading="lazy" />
    </div>
  );
}

export default BestProductDetails;
