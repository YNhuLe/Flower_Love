
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Camera, Edit,
    UserIcon
} from "lucide-react";
import RecentOrders from "../features/UserProfile/Overview/RecentOrders";
import ToggleCate from "../features/UserProfile/ToggleCate";
import Settings from "../features/UserProfile/Settings/SavedAddresses";
import PaymentMethods from "../features/UserProfile/Settings/PaymentMethods";
import AccountActions from "../features/UserProfile/Settings/AccountActions";
import NavBar from "../components/NavBar";
import SearchBar from "../common/SearchBar";
import Footer from "../common/Footer";
import RecentOrdersCart from "../features/UserProfile/Overview/RecentOrdersCart";
import SavedPlantsSection from "../features/UserProfile/SavedPlants/SavedPlantsSection";
import EditUserInfo from "../features/UserProfile/EditUserInfo";
import { toast } from "sonner";
import useProfileStore from "../hooks/useProfileStore";
import useEnsureUserInDatabase from "../hooks/useEnsureUserInDatabase";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * ProfilePage component displays the user's profile information, recent orders, saved plants, and settings. It also allows users to edit their profile picture and information.
 * The component uses Auth0 for authentication and ensures that the user is authenticated before displaying the profile page. If the user is not authenticated, they are redirected to the signup page.
 * The profile picture can be updated by clicking on the camera icon, which opens a file input to select a new image. The selected image is previewed before being uploaded.
 * The component also includes a toggle to switch between different sections of the profile, such as Overview, Orders, Saved Plants, AI History, and Settings.
 * @returns JSX.Element
 * 
 */
function ProfilePage() {

    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { syncing, error } = useEnsureUserInDatabase();
    const category_name = ['Overview', 'Orders', "Saved Plants", 'AI History', 'Settings'];
    const [selectedCate, setSelectedCate] = useState<string>('Overview');
    const [previewUrl, setPreviewUrl] = useState("");
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const profile = useProfileStore((state) => state.profile)
    useEffect(() => {
        console.log("useEffect triggered - isLoading:", isLoading, "isAuthenticated:", isAuthenticated);

        if (!isLoading && !isAuthenticated) {
            navigate("/signup");
            console.log("User is not authenticated, redirecting to signup page.");
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading && syncing) return (<p>Loading...</p>);
    if (!isAuthenticated || !user) return null;

    const sections: Record<string, JSX.Element> = {
        "Overview": (
            <>
                <RecentOrders />
                <SavedPlantsSection />    </>

        ),
        "Orders": (
            <>
            </>
        ),
        "Saved Plants": (
            <>       <SavedPlantsSection />
            </>
        ),
        "AI History": (
            <>
            </>
        ),
        "Settings": (
            <>  <Settings />
                <PaymentMethods />
                <AccountActions />

            </>
        )

    }

    //Changing the images from the image for user profile
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be under 2MB in size.");
            return;
        }
        // setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        console.log("Image changed: ", file);
    };

    //handle to edit user information
    const handleEditUserProfile = () => {
        setShowEditProfileModal(!showEditProfileModal);
        toast.success("Successfully changed the profile.");

    }
    const time = new Date();
    return (
        <>
            <NavBar />
            <SearchBar />
            <article className="bg-surface-base">
                <section className="p-4">
                    <section className="p-4 flex-col items-center  rounded-md bg-surface-card shadow-md w-full">
                        <div className="flex gap-4 items-center relative">
                            <div

                                className=" w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-success-500 to-success-800 flex items-center justify-center shadow-lg">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    hidden
                                    id="avatar-upload"
                                />
                                <button
                                    className="cursor-pointer rounded-full bg-text-primary w-8 h-8 flex justify-center items-center absolute top-14 left-12 hover:bg-text-primary/80"
                                    type="button"

                                    onClick={() => document.getElementById('avatar-upload')?.click()}

                                >
                                    <Camera className="text-surface-raised w-4 h-4" />

                                </button>

                                <div className="w-full h-full flex items-center justify-center">

                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserIcon className="text-surface-base" />
                                    )}
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">

                                    {user?.name && user.name !== user.email
                                        ? user.name
                                        : profile?.name || user?.email}
                                </h1>

                                <p className="text-xs">{user.email}</p>

                                <p className="text-xs">Joined since: {time.toLocaleString("en-US", { month: "short", year: "numeric" })}</p>

                            </div></div>
                        <button
                            onClick={handleEditUserProfile}
                            className="cursor-pointer mt-4 flex gap-2 items-center rounded-md w-fit h-fit p-1 contain  border-success-800 text-success-800 text-xs hover:bg-success-500/30 hover:text-text-primary border-[.02rem]">
                            <Edit className="w-3 h-3 text-center text-success-800 text-xxs" />

                            Edit Profile</button>
                    </section>
                    <ToggleCate selectedCate={selectedCate} setSelectedCate={setSelectedCate} profileCategories={category_name} />
                    <section>
                        {sections[selectedCate]}
                        {showEditProfileModal && <div className="fixed inset-0 bg-text-muted/50 flex items-center justify-center z-50 p-4">
                            <EditUserInfo onClose={() => setShowEditProfileModal(false)}
                            />
                        </div>}
                    </section>
                </section>
                <Footer />
            </article> </>
    )
}

export default ProfilePage;