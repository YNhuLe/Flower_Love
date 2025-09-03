import React from "react";
import Button from "../common/Button";
function GiftBoxOffer(){
      const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    return (
        

        <section className="m-4">
            <h2 className="text-sm uppercase text-cartRed ">Gift Box Offer</h2>
<div>
    <h2 className="text-3xl uppercase font-semibold mt-3">Best Plants Gift Box collections.</h2>
    <p className="text-sm mt-5"> From planter materials to style options, discover which planter is best for your space..</p>
    <Button btnType="explore" />
</div>
<div >



    <img  className="h-32 w-full m-auto mt-10"
        src={`${cloud_url}/v1756387955/plant-5_dmifhn.jpg`}
        alt="best-pro-image"
        loading="lazy"/>
    </div>
        </section>
       
       
    )
}
export default GiftBoxOffer;