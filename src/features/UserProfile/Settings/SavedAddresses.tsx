import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
    MapPin, Edit,
    Trash2,
} from "lucide-react";
import useProfileStore from "../../../hooks/useProfileStore";
import { auth } from "../../../firebase/config"

function Settings() {

    // const { profile, loadProfile } = useProfileStore();
    const profile = useProfileStore((state) => state.profile);
const loadProfile = useProfileStore((state) => state.loadProfile);
    const { firebaseUser, isAuthReady } = useAuth();

    useEffect(() => {
        if (!isAuthReady) return;
        if (!firebaseUser) return;
        // if (!auth.currentUser) return;
        loadProfile();
    }, [firebaseUser, isAuthReady]);
    // useEffect(() =>{
    //     if(!isAuthReady) return;
    //     loadProfile();

    // }, [isAuthReady])
    console.log("Profile: ", profile)


    return (

        <>
            <section className="p-4 flex-col items-center  rounded-md bg-surface-card shadow-md w-full mt-6">


                <div><h1 className="text-xl font-semibold">Account Information</h1>
                    <div className=" mb-2 mt-4">
                        <label className="mb-2 text-xs">FULL NAME</label>

                        <p
                            className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-full border-none `} >
                            {firebaseUser?.displayName?.trim() ? firebaseUser.displayName : profile?.name} 
                       
                             </p>

                    </div>

                    <div>
                        <label className="mb-2 text-xs">EMAIL</label>

                        <p className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-full border-none `}>

                            {firebaseUser?.email}

                        </p>

                    </div>

                    <div>
                        <label className="mb-2 text-xs">PHONE</label>

                        <p
                            className={`text-xs bg-text-muted/10 w-full p-2 pl-8 rounded-full border-none `} >

                            {profile?.phone_number}
                        </p>

                    </div>
                </div>




            </section>

            {/* Saved Addresses */}
            <section className="p-4 flex-col items-center  rounded-md bg-surface-card shadow-md mt-6">

                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">Saved Addresses</h1>



                    <button className="cursor-pointer flex gap-1 items-center rounded-md w-[7rem] h-fit p-1 border-success-800 text-success-800 text-xs hover:bg-success-500/30 hover:text-text-primary border-[.02rem]">

                        <MapPin className="w-3 h-3 text-success-800" />

                        <p className="min-w-fit"> Add address</p>
                    </button>

                </div>
                {/* Addresses */}
                <div className="mt-4 border-[.1rem] border-text-primary/20 rounded-xl p-6">

                    <div className="flex justify-between">

                        <div className="flex gap-2 justify-center items-center">
                            <MapPin className="w-4 h-4 text-success-800" />
                            <h2 className="text-xxs font-medium">Home</h2>
                            <p className="p-1 bg-success-300/20 rounded-md text-success-300 text-[.5rem]">Default</p></div>

                        <div className="flex gap-0">
                            <button className="cursor-pointer border-text-muted border-1 hover:bg-text-muted/10 p-2 rounded-md">
                                <Edit className="w-4 h-4 text-success-800 cursor-pointer" /></button>
                            <button className="cursor-pointer border-text-muted border-1 hover:bg-text-muted/10 p-2 rounded-md">
                                <Trash2 className="w-4 h-4 rounded-md text-error-700 " />
                            </button>
                        </div>

                    </div>

                    <p className="text-xs px-6 mt-4 text-text-primary/50">123 Garden Street

                        San Francisco, CA 94102</p>

                </div>


                <div className="mt-4 border-[.1rem] border-text-primary/20 rounded-xl p-6">

                    <div className="flex justify-between">

                        <div className="flex gap-2 justify-center items-center">
                            <MapPin className="w-4 h-4 text-success-800" />
                            <h2 className="text-xxs font-medium">Home</h2>
                            <p className="p-1 bg-success-300/20 rounded-md text-success-300 text-[.5rem]">Default</p></div>

                        <div className="flex gap-0">
                            <button className="cursor-pointer border-text-muted border-1 hover:bg-text-muted/10 p-2 rounded-md">
                                <Edit className="w-4 h-4 text-success-800 cursor-pointer" /></button>
                            <button className="cursor-pointer border-text-muted border-1 hover:bg-text-muted/10 p-2 rounded-md">
                                <Trash2 className="w-4 h-4 text-error-700 cursor-pointer" /></button></div>

                    </div>

                    <p className="text-xs px-6 mt-4 text-text-primary/50">123 Garden Street

                        San Francisco, CA 94102</p>

                </div>

            </section>
        </>
    )
}

export default Settings;

