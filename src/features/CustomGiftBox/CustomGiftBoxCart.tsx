import { FiGift } from "react-icons/fi";

export default function CustomGiftBoxCart(){

    return(
         <section className=" bg-text-muted/5 border-[1px] border-text-muted/20 rounded-md m-4">
            <h1 className="text-sm p-4 font-semibold">Your gift box</h1>
            <div className="flex flex-col gap-2 p-24 items-center ">
                <FiGift className="text-text-muted inline w-8 h-8" />
                <p className="text-[8px] text-text-muted"> Start building your gift box by selecting items above</p>

            </div>
        </section>
    )
}