
import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

interface StarRatingProps {
    rating: number;
    maxStar?: number;
    iconSize?: string;
    ratingNum: number;
    numReviews: number;
}
function RatingStatusChecker({ numReviews, rating, maxStar = 5, iconSize = "w-4 h-4" }: StarRatingProps) {

    const starArray = Array.from({ length: maxStar }, (_, index) => index + 1)
    return (
        <div className="flex items-center space-x-[2px] mb-4">
            {starArray.map((starPosition) => {
                let StarComponent;
                if (rating >= starPosition) {
                    StarComponent = FaStar;

                } else if (rating >= starPosition - 0.5) {
                    StarComponent = FaStarHalfAlt;
                } else {
                    StarComponent = FaRegStar;
                }

                return (

                    <StarComponent key={starPosition} className={`${iconSize} text-warning-500`} />
                )
            })}
            <p className="pl-1 text-xs">{rating}/5</p>
            <p className="text-xs">({numReviews} reviews)</p>
        </div>
    )
}
export default RatingStatusChecker;