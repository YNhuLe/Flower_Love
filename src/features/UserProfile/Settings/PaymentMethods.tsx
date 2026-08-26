import {
    MapPin, Edit,
    Trash2, CreditCard,
} from "lucide-react";
function PaymentMethods() {

    return (
        <>

            <section className="p-4 flex-col items-center  rounded-md bg-surface-card shadow-md w-full mt-6">


                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">Payment Methods</h1>

                    <button className="cursor-pointer flex gap-1 items-center rounded-md w-[7rem] h-fit p-1 border-success-800 text-success-800 text-xs hover:bg-success-500/30 hover:text-text-primary border-[.02rem]">

                        <CreditCard className="w-3 h-3 text-success-800" />

                        <p className="min-w-fit"> Add Card</p>
                    </button>

                </div>
                <div className="mt-4 border-[.1rem] border-text-primary/20 rounded-xl p-6">
                    <div className="flex justify-between">

                        <div className="flex gap-3 justify-center items-center">


                            <p className="bg-icon-blue-600 p-3 rounded-md">
                                <CreditCard className="w-5 h-5 text-text-inverse" /></p>
                            <div className="flex flex-col gap-0">
                                <p className="text-xs">**** **** ****</p>
                                <p className="text-xs">4563</p>
                                <p className="text-xs">Expires 12/25</p>
                            </div>

                        </div>
                        <div className="flex gap-0">
                            <button className="cursor-pointer border-text-muted border-1 hover:bg-text-muted/10 p-2 rounded-md max-h-fit">
                                <Edit className="w-4 h-4 text-success-800 cursor-pointer" /></button>
                            <button className="cursor-pointer border-text-muted border-1 hover:bg-text-muted/10 p-2 rounded-md  max-h-fit">
                                <Trash2 className="w-4 h-4 rounded-md text-error-700 " />
                            </button>
                        </div>

                    </div>


                </div>
            </section>
        </>
    )
}

export default PaymentMethods;