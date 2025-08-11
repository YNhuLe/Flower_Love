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
    <div className="w-40 h-50 mt-16 mb-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-center mb-4">{plantName}</h2>
      <img className="h-32 w-32" src={`/images/${image}`} alt="best-pro-image" loading="lazy" />
    </div>
  );
}

export default BestProductDetails;
