import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import {
    Camera, Edit,
    UserIcon, X
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
function ProfilePage() {

    const navigate = useNavigate();
    const category_name = ['Overview', 'Orders', "Saved Plants", 'AI History', 'Settings'];
    const [firebaseUser, setFirebaseUser] = useState<User>();
    const [selectedCate, setSelectedCate] = useState<string>('Overview');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const profile = useProfileStore((state) => state.profile)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/signup");
                return;
            }
            setFirebaseUser(user);
        });
        return unsubscribe;
    }, []);

    if (!firebaseUser) return <p> Loading...</p>;
    const time = new Date(firebaseUser.metadata.creationTime || "");

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
    const handleImageChange = (e: any) => {
        const file = e.target;
        if (!file) return;
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleAddImage = (e: any) => {
        const file = e.target;
        if (!file) return;
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        console.log("Add more images")
    }

    //handle to edit user information
    const handleEditUserProfile = () => {
        setShowEditProfileModal(!showEditProfileModal);
        // toast.success("Successfully changed the profile.");

    }
    return (
        <>
            <NavBar />
            <SearchBar />
            <article className="bg-surface-base">
                <section className="p-4">
                    <section className="p-4 flex-col items-center  rounded-md bg-surface-card shadow-md w-full">
                        <div className="flex justify-between items-center relative">
                            <div
                                onClick={handleAddImage}
                                className=" w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-success-500 to-success-800 flex items-center justify-center shadow-lg">

                                <UserIcon className="text-surface-base w-10 h-10" />
                                <button
                                    className="cursor-pointer rounded-full bg-text-primary w-8 h-8 flex justify-center items-center absolute top-14 left-12 hover:bg-text-primary/80">
                                    <Camera className="text-surface-raised w-4 h-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                </button>
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="profile__img" />
                                ) : (
                                    <span className="profile__text"> Add Profile Picture</span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-semibold"> {firebaseUser?.displayName?.trim() ? firebaseUser.displayName : profile?.name}
                                </h1>

                                <p className="text-xs">{firebaseUser.email}</p>

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