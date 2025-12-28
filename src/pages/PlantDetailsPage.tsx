import Footer from "../common/Footer";
import SearchBar from "../common/SearchBar";
import NavBar from "../components/NavBar";
import PlantDetails from "./PlantDetails";
import BreadCrumbs from "../common/BreadCrumbs"
function PlantDetailsPage(){
    return (
        <section className="">
        <NavBar />
      
        <SearchBar />
          <BreadCrumbs />
        <PlantDetails />
        <Footer />
        </section>
    )
}

export default PlantDetailsPage;