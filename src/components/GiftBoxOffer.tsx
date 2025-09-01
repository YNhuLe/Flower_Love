import React from "react";
function GiftBoxOffer(){
      const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,w_800,h_600,f_auto,q_auto";

    return (
        

        <section className="bg-green-300 m-4">
            <h2 className="text-sm">Gift Box Offer</h2>
<div>
    <h2 className="text-lg">Best Plants Gift Box collections.</h2>
    <p> Make your days feeling good with beautiful plant. Make your days feeling good with beautiful plant.</p>
</div>
<div >
    <img src="/images/" alt="" />
</div>
        </section>
       
       
    )
}
export default GiftBoxOffer;