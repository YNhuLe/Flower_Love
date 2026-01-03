import React from "react";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";

interface StockStatusProps {
    stockQuantity?: number;
    stockType: "cart" | "plant-details"
}
const getStockStatus = (stockQuantity: number) => {


    if (stockQuantity > 10) {
        return {
            text: 'In Stock',
            Icon: FaCheck,
            stockColor: 'text-success-500',
        }
    } else if (stockQuantity >0 && stockQuantity <= 10) {
        return {
            text: 'Low In Stock',
            Icon: FaExclamationTriangle,
            stockColor: 'text-warning-500',
          
        }
    } else {
        return {
            text: 'Out of Stock',
            Icon: FaTimes,
            stockColor: 'text-error-500',
        
        }
    }

}

function ShowStockQuantity({stockQuantity = 0, stockType} : StockStatusProps){

    const status = getStockStatus(stockQuantity);
    const StatusIcon = status.Icon;
return (
  <>
    {
       ( stockType === "plant-details") && (
<>

    <StatusIcon 
        className={`w-3 h-4 mt-[.1rem] ${status.stockColor}`}
      />
      
      <p
      className={`font-medium ${status.stockColor}`}
      >
        {status.text}
      </p></>
       )

    }

        {
       ( stockType === "cart") && (
<>


      
      <p
      className={`px-2 bg-success-300/30 rounded-full py-1 w-fit text-success-700 text-[.6rem] ${status.stockColor}`}
      >
        {status.text}
      </p></>
       )

    }

    </>
)
}

export default ShowStockQuantity;