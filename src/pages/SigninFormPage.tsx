import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import SearchBar from "../common/SearchBar";
import NavBar from "../components/NavBar";
import SigninPage from "../features/Authentication/SigninPage";
import SocialAuth from "../features/Authentication/SocialAuth";
import Footer from "../common/Footer";
function SigninFormPage(){

 const navigate = useNavigate();
    return (
        <>
       
<NavBar />
<SearchBar />
 <section className="bg-surface-base pt-4  pb-1">
           
  <h1 className="text-center text-xl m-4  mb-1 font-semibold">Welcome back</h1>
            <h2 className="text-center mb-6">Sign in to continue your journey.</h2>
            <SocialAuth />
            <SigninPage />

                <div className="flex gap-2 items-center justify-center m-8 group"
                
                   onClick={() => navigate(-1)} >
                    <ArrowLeft className="w-5 h-5 cursor-pointer transition-transform ease-out transform duration-200 group-hover:-translate-x-1 group-hover:text-success-500"

                     />

                    <p className="group-hover:text-success-500">Go back home</p></div>
      
        </section>  <Footer /></>
    )
}

export default SigninFormPage;