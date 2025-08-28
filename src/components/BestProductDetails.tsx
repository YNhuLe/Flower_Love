import React, {useEffect, useState} from "react";
import axios from "axios";
import { BestProductProp } from "../types/types";
function BestProductDetails({products}: {products: BestProductProp})

{
  console.log(products);
  return (
    <div className="max-w-fit h-50 mt-8 mb-8 p-4 border ml-2 mr-2 border-green-900 rounded-lg shadow-lg">

      <img className="h-32 w-28 m-auto" src={`/images/${products.image_url}`} alt="best-pro-image" loading="lazy" />
            <h2 className="text-center mt-4 text-xs">{products.common_name}</h2>
            <div className="flex flex-row justify-center gap-2">
              <p className="text-center text-xs text-primary font-semibold">${products.original_price}</p>
              <p className="text-center text-xs line-through ">${products.discounted_price}</p>
              
            </div>
        
    </div>
  );
}

export default BestProductDetails;
