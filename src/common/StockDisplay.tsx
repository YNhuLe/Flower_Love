import React from "react";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";

interface StockStatusProps {
    stockQuantity?: number;
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

function ShowStockQuantity({stockQuantity = 0} : StockStatusProps){

    const status = getStockStatus(stockQuantity);
    const StatusIcon = status.Icon;
return (
    <>
    <StatusIcon 
        className={`w-3 h-4 mt-[.1rem] ${status.stockColor}`}
      />
      
      <p
      className={`font-medium ${status.stockColor}`}
      >
        {status.text}
      </p>
    </>
)
}

export default ShowStockQuantity;