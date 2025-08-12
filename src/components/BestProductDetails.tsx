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
    <div className="max-w-fit h-50 mt-16 mb-8 p-4 border border-green-900 rounded-lg shadow-lg">
      <h2 className="text-center mb-4 text-xs">{plantName}</h2>
      <img className="h-32 w-28 m-auto" src={`/images/${image}`} alt="best-pro-image" loading="lazy" />
    </div>
  );
}

export default BestProductDetails;
