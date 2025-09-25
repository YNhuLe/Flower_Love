
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
interface QuantitySelectorProps {
    value: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number
}
function QuantitySelector({ value, onChange, min = 0, max = Infinity }: QuantitySelectorProps) {

    const increment = () => {
        if (value < max) {
            onChange(value + 1)
        }
    }
    const decrement = () => {
        if (value >= min) {
            onChange(value - 1)
        }
    }
    return (
        <div className="flex flex-row  items-center ml-2 mb-6">
            <div className="p-2 rounded-md">

                <button className="border border-cartRed p-2 rounded-md" onClick={decrement}>
                    <MinusIcon className="h-4 w-4 color-secondary" /></button>
            </div>

            <div className="text-center w-14 flex justify-center items-center ">
                <p>{value}</p>
            </div>

            <div className="p-2 rounded-md">

                <button className="bg-cartRed p-2 rounded-md" onClick={increment}>
                    <PlusIcon className="h-4 w-4  text-third" /></button>
            </div>

        </div >
    )
}
export default QuantitySelector;