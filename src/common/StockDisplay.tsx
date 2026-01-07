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
           
            bgColor: 'bg-success-500/30'
        }
    } else if (stockQuantity > 0 && stockQuantity <= 10) {
        return {
            text: 'Low In Stock',
            Icon: FaExclamationTriangle,
            stockColor: 'text-warning-500',
bgColor: 'bg-warning-500/30'
        }
    } else {
        return {
            text: 'Out of Stock',
            Icon: FaTimes,
            stockColor: 'text-error-500',

bgColor: 'bg-error-500/30'
        }
    }

}

function ShowStockQuantity({ stockQuantity = 0, stockType }: StockStatusProps) {

    const status = getStockStatus(stockQuantity);
    const StatusIcon = status.Icon;

    return (
        <>
            {
                stockType === "plant-details" && (
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
                stockType === "cart" && (

             


                        <div className={`px-2 ${status.bgColor} rounded-full py-1 w-fit `}>
                            <p
                                className={`text-[.6rem] ${status.stockColor}`}
                            >
                                {status.text}
                            </p>

                        </div>
                    )

               

            }

        </>
    )
};



export default ShowStockQuantity;