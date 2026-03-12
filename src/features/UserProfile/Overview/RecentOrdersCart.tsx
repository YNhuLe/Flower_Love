import { CheckCircle, } from "lucide-react";

function RecentOrdersCart() {
    const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

    return (
        <section className="border-2 rounded-md hover:border-success-800 hover:shadow-sm p-4 my-6">
            <div className="flex justify-between items-center">

                <div className="my-2"> <h2 className="text-xs font-semibold">Order ORD-2024-001</h2>
                    <p className="text-[.6rem] text-text-muted">Dec 20, 2024</p></div>

                <p className="flex gap-2 p-1 bg-success-300/20 rounded-md">
                    <CheckCircle className="w-3 h-3 text-success-700" />
                    <span className="text-success-700 text-[.6rem]">Delivered</span>
                </p>
            </div>
            <div className="flex gap-4 my-4 items-center">
                <div className="flex gap-2">
                    <img src={`${cloud_url}/v1766044931/s3_ujnlte.jpg`} alt="" className="w-12 h-12 rounded-md" />
                    <img src={`${cloud_url}/v1766044931/s3_ujnlte.jpg`} alt="" className="w-12 h-12 rounded-md" />

                </div>
                <div>

                    <p className="text-xs">2 item(s)</p>
                    <p className="font-semibold">$124.97</p>
                </div></div>
        </section>
    )
}

export default RecentOrdersCart;