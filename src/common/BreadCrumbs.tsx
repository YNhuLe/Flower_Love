import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import usePlantDetails from "../hooks/usePlantDetails";


function BreadCrumbs() {

    const location = useLocation();
    const pathname = location.pathname;


    //split path into segments, filter(Boolean) returns falsy to remove the empty string
    const segments = pathname.split("/").filter(Boolean);

    //look through the segments, check individual seg and only return seg that contains digits 
    const isNumericId = segments.find((seg) => /^\d+$/.test(seg));
    //match ID from the seg with the plant'id from hook
    const { data: plantInfo } = usePlantDetails(isNumericId || undefined);

    const crumbs = segments.map((segment, index) => {
        const path = "/" + segments.slice(0, index + 1).join("/");
        let label = segment;

        if (isNumericId) {

            if (/^\d+$/.test(segment) && plantInfo?.common_name) {
                label = plantInfo?.common_name
            }
        }


        return { label, path };
    });

    return (

        <div className="flex items-center gap-2 m-4 text-xs">
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
                                <span className="font-semibold capitalize text-xs">{crumb.label}</span>
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