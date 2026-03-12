import RecentOrdersCart from "./RecentOrdersCart";
import {
    Package,
    Heart,
    MapPin,
    CreditCard,
    LogOut,
    ChevronRight,
    Sparkles,
    Edit,
    Trash2,
    ShoppingBag,
    Clock,
    CheckCircle,
    Truck,
    Camera,
    Upload,
    X, UserIcon
} from "lucide-react";
function RecentOrders() {

    return (
        <section className="p-4 flex-col items-center  rounded-md bg-surface-card shadow-md w-full mt-6">


            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Recent Orders</h1>
                <button className=" text-success-700 text-xs flex gap-1 cursor-pointer hover:bg-success-700/10 p-2 rounded-md">View All
                    <ChevronRight className="w-4 h-4 text-success-700" />

                </button>

            </div><RecentOrdersCart />
            <RecentOrdersCart />
        </section>

    )
}

export default RecentOrders;