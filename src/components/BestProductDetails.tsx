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
    <div className="max-w-fit h-50 mt-8 mb-8 p-4 border border-green-900 ml-2 rounded-lg shadow-lg">

      <img className="h-32 w-28 m-auto" src={`/images/${image}`} alt="best-pro-image" loading="lazy" />
            <h2 className="text-center mt-4 text-xs">{plantName}</h2>
            <div className="flex flex-row justify-center gap-2">
              <p className="text-center text-xs text-primary">${originalPrice}</p>
              <p className="text-center text-xs line-through ">${discountedPrice}</p>
              
            </div>
        
    </div>
  );
}

export default BestProductDetails;
