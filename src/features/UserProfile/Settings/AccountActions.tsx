import {
    User,
    Package,
    Heart,
    MapPin,
    CreditCard,
    Settings,
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
    X,
} from "lucide-react";
import useProfileStore from "../../../hooks/useProfileStore";
import { useAuth0 } from "@auth0/auth0-react";
function AccountActions() {
 const { clearProfile } = useProfileStore();
    const { logout } = useAuth0();
    const handleLogout = async () =>{
        localStorage.clear();
        sessionStorage.clear();
        clearProfile();
        await logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    }
    return (
        <>
            <section className="p-4 flex-col items-center  rounded-md bg-surface-card shadow-md w-full mt-6">
                <h1 className="text-xl font-semibold">Account Actions</h1>
                <div className="flex gap-2  items-center mt-4 border-[.1rem] border-text-primary/20 rounded-xl p-3 hover:bg-text-muted/20 cursor-pointer">
                    <Settings className="w-3 h-3 text-success-800" />
                    <p className="text-xs">Notification Preferences</p>
                </div>
                <div className="flex gap-2  items-center mt-4 border-[.1rem] border-text-primary/20 rounded-xl p-3 hover:bg-text-muted/20 cursor-pointer">
                    <Settings className="w-3 h-3 text-success-800" />
                    <p className="text-xs">Privacy Settings</p>
                </div>

                <div className="flex gap-2  items-center mt-4 border-[.1rem] border-error-700/20 rounded-xl p-3 hover:bg-error-700/20 cursor-pointer"
                onClick={handleLogout}
                >
                    <LogOut className="w-3 h-3 text-error-700" />
                    <p className="text-error-700 text-xs">Log Out</p>
                </div>
            </section>
        </>
    )
}

export default AccountActions;