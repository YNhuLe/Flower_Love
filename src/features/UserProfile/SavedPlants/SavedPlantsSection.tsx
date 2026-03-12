import SavedPlantsCart from "./SavedPlantsCart";
import { ChevronRight } from "lucide-react"
function SavedPlantsSection() {

    return (
        <section className="p-4 flex-col items-center  rounded-md bg-surface-card shadow-md w-full mt-6">


            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Saved Plants</h1>
                <button className=" text-success-700 text-xs flex gap-1 cursor-pointer hover:bg-success-700/10 p-2 rounded-md">View All
                    <ChevronRight className="w-4 h-4 text-success-700" />

                </button>

            </div>
            <div className="grid grid-rows-2 grid-cols-2 gap-2">

                <SavedPlantsCart /> <SavedPlantsCart /> <SavedPlantsCart /> <SavedPlantsCart />

            </div>


        </section>
    )
}

export default SavedPlantsSection;