import Footer from "../common/Footer";
import SearchBar from "../common/SearchBar";
import NavBar from "../components/NavBar";
import PlantDetails from "./PlantDetails";
import BreadCrumbs from "../common/BreadCrumbs"
function PlantDetailsPage(){
    return (
        <>
        <NavBar />
      
        <SearchBar />
          <BreadCrumbs />
        <PlantDetails />
        <Footer />
        </>
    )
}

export default PlantDetailsPage;