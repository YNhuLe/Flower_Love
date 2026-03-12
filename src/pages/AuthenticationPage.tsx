import { useNavigate } from "react-router-dom";
import SignupPage from "../features/Authentication/SignupPage";
import { ArrowLeft } from "lucide-react";
import SearchBar from "../common/SearchBar";
import NavBar from "../components/NavBar";
import SigninPage from "../features/Authentication/SigninPage";
import Footer from "../common/Footer";
function AuthenticationPage() {

    const navigate = useNavigate();
    return (
        <>

            <NavBar />
            <SearchBar />
            <section className="bg-surface-base pb-1">
                <SignupPage />
                <div className="flex gap-2 items-center justify-center m-8 group"
                    onClick={() => navigate("/")} >
                    <ArrowLeft className="w-5 h-5 cursor-pointer transition-transform ease-out transform duration-200 group-hover:-translate-x-1 group-hover:text-success-500"
                    />
                    <p className="group-hover:text-success-500">Go back home</p></div>

            </section>

            <Footer />
        </>
    )
}

export default AuthenticationPage;