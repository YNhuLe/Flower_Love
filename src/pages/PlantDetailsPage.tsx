import Footer from "../common/Footer";
import SearchBar from "../common/SearchBar";
import NavBar from "../components/NavBar";
import PlantDetails from "./PlantDetails";
import BreadCrumbs from "../common/BreadCrumbs"
function PlantDetailsPage(){
    return (
        <>
        <NavBar />
        <BreadCrumbs dynamicLabel="/products/2"/>
        <SearchBar />
        <PlantDetails />
        <Footer />
        </>
    )
}

export default PlantDetailsPage;