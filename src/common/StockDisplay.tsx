import React from "react";
import { FaCheck, FaStar, FaExclamationTriangle, FaTimes } from "react-icons/fa";

interface StockStatusProps {
    stockQuantity?: number;
}
const getStockStatus = (stockQuantity: number) => {


    if (stockQuantity > 10) {
        return {
            text: 'In Stock',
            Icon: FaCheck,
            stockColor: 'text-lightGreen',
        

        }
    } else if (stockQuantity >0 && stockQuantity <= 10) {
        return {
            text: 'Low In Stock',
            Icon: FaExclamationTriangle,
            stockColor: 'text-lowStock',
          
        }
    } else {
        return {
            text: 'Out of Stock',
            Icon: FaTimes,
            stockColor: 'text-red',
        
        }
    }

}

function ShowStockQuantity({stockQuantity = 0} : StockStatusProps){

    const status = getStockStatus(stockQuantity);
    const StatusIcon = status.Icon;
return (
    <>
    <StatusIcon 
   
        className={`w-4 h-4 mt-[.1rem] [${status.stockColor}]`}
      
      />
      
      <p
      className={`font-semibold [${status.stockColor}]`}
      >
        {status.text}
      </p>
    </>
)
}

export default ShowStockQuantity;