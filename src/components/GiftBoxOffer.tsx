import React from "react";
import Button from "../common/Button";
function GiftBoxOffer() {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    return (


        <section className="bg-third p-4">
            <div className="m-4 ">  <h2 className="text-sm uppercase text-cartRed ">Gift Box Offer</h2>
                <div>
                    <h2 className="text-3xl uppercase font-semibold mt-3">Best Plants Gift Box collections.</h2>
                    <p className="text-sm mt-5"> From planter materials to style options, discover which planter is best for your space..</p>
                    <Button btnType="explore" />
                </div>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 gap-2  grid-flow-row-dense">
                {/* Card 1 */}
                <div className="relative  min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center row-span-2"
                    style={{ backgroundImage: `url(${cloud_url}/v1756927884/gift-box_c1mcms.jpg)` }}>
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">26% OFF</div>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className="text-lg font-bold">Best Selling</h3>
                        <p className="text-sm">Modern Geometric Design</p>
                        {/* <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Shop Now</button>  */}
                        <Button btnType="shop_now" />

                    </div>
                </div>

                {/* Card 2 https://res.cloudinary.com/dvdr5bwc7/image/upload/v1756927875/gb-3_xqiepd.jpg*/ }
                <div className="relative  min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center hover:scale-2"
                    style={{ backgroundImage: `url(${cloud_url}/v1756927875/gb-3_xqiepd.jpg)` }}>
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">30% OFF</div>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className="text-md font-bold">Get 30% Off</h3>
                        <p className="text-sm mb-6">Classic Style</p>
                        {/* <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Shop Now</button> */}
                        <Button btnType="shop_now" />
                    </div>
                </div>

                {/* Card 3 https://res.cloudinary.com/dvdr5bwc7/image/upload/v1756927884/gb4_ob6vep.jpg*/}
                <div className="relative  min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${cloud_url}/v1756927884/gb4_ob6vep.jpg)` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className="text-lg font-bold">Customize</h3>
                        <p className="text-sm">Build Your Own</p>
                        {/* <button className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Customize Now</button> */}
                        <Button btnType="customize" />
                    </div>
                </div>

                {/* Card 4 https://res.cloudinary.com/dvdr5bwc7/image/upload/v1756927884/gift-box2_w3njnj.jpg */}
                <div className="relative min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${cloud_url}/v1756927884/gift-box2_w3njnj.jpg)` }}>
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">32% OFF</div>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className="text-lg font-bold">Big Saving</h3>
                        <p className="text-sm">Summer Deal</p>
                        {/* <button className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Shop Now</button> */}
                        <Button btnType="shop_now" />
                    </div>
                </div>

                {/* Card 5 https://res.cloudinary.com/dvdr5bwc7/image/upload/v1756927883/gb5_zit5ic.webp */}
                <div className="relative  min-h-[150px] rounded-lg overflow-hidden shadow-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${cloud_url}/v1756927883/gb5_zit5ic.webp)` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
                        <h3 className="text-md font-bold">Customize</h3>
                        <p className="text-xs">Build Your Own</p>
                        {/* <button className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Customize Now</button> */}
                        <Button btnType="customize" />
                    </div>
                </div>

            </div>





        </section>


    )
}
export default GiftBoxOffer;