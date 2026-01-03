
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
interface QuantitySelectorProps {
    value: number;
    onChange: (newValue: number) => void;
    min?: number;
    max?: number;
    disabled?: boolean;
    selectorType?: "plantItem" | "cartItem"
}
function QuantitySelector({ value, onChange, min = 0, max = value, disabled, selectorType }: QuantitySelectorProps) {

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

        <>
            {
                selectorType === 'plantItem' && (
                    <div className="flex flex-row  items-center ml-2 mb-6">
                        <div className="p-2 rounded-md">

                            <button className="border border-cart-500 p-2 rounded-md" onClick={decrement}>
                                <MinusIcon className="h-4 w-4 text-secondary" /></button>
                        </div>

                        <div className="text-center w-14 flex justify-center items-center ">
                            <p>{value}</p>
                        </div>

                        <div className="p-2 rounded-md">

                            <button className="bg-cart-500 p-2 rounded-md"
                                // disabled
                                onClick={increment}>
                                <PlusIcon className="h-4 w-4  text-surface-base" /></button>
                        </div>

                    </div >
                )

            }

            {
                selectorType === 'cartItem' && (
                    <div className="flex flex-row  items-center">
                        <div className="p-2 rounded-md">

                            <button className="border border-cart-500 p-1 rounded-md" onClick={decrement}>
                                <MinusIcon className="h-3 w-3 text-secondary" /></button>
                        </div>

                        <div className="text-center w-4 flex justify-center items-center ">
                            <p className="text-xs">{value}</p>
                        </div>

                        <div className="p-2 rounded-md">

                            <button className="bg-cart-500 p-1 rounded-md"
                                // disabled
                                onClick={increment}>
                                <PlusIcon className="h-3 w-3  text-surface-base" /></button>
                        </div>

                    </div >
                )
            }
        </>
    )

}
export default QuantitySelector;