import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import usePlantDetails from "../hooks/usePlantDetails";


function BreadCrumbs() {

    const location = useLocation();
    const pathname = location.pathname;
    

    //split path into segments, ignoring empty ones
    const segments = pathname.split("/").filter(Boolean);

    //detect if that last segment is ID
    const lastSegment = segments[segments.length - 1];
    const isProductsDetail = segments[0] === 'products' && lastSegment;

    //fetch products details if we are on the /products/:id
    const { data: plantInfo} = usePlantDetails(isProductsDetail || undefined);

    const crumbs = segments.map((segment, index) => {
        const path = "/" + segments.slice(0, index + 1).join("/");

        //replace ID with the product name if available
        let label = segment;
        if( index === segments.length - 1 && plantInfo?.common_name){
label = plantInfo?.common_name
        }
        
        return { label, path };
    });

    return (

        <div className="flex items-center gap-2 m-4 text-xxs">
            <span>
                <Link className="cursor-pointer hover:text-brand-700 hover:font-semibold
   " to="/">Home</Link>
            </span>

            {
                crumbs.map((crumb, index) => (
                    <span key={index} className="flex items-center gap-1">
                        <ChevronRight size={16} />
                            {
                                index === crumbs.length - 1 ? (
                                    <span className="font-semibold capitalize text-xxs">{crumb.label}</span>
                                ) : (
                                    <Link to={crumb.path} className="capitalize cursor-pointer hover:text-brand-700 hover:font-semibold ">{crumb.label}</Link>
                                )
                            }
               
                    </span>
                ))
            }
        </div>
    )
};

export default BreadCrumbs;