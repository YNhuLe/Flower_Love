import {Link, useLocation, matchPath} from "react-router-dom";
import {
    ChevronLeft,
} from 'lucide-react';

function BreadCrumbs({dynamicLabel}){
const location = useLocation();
const pathname = location.pathname;

const routes = [
    {path: "/", label: "Home"},
    {path: "/products", label:"Plants"},
    {path: "/products/:id", label:dynamicLabel || "Plant Details"}
]

const crumbs = routes
.filter((route) =>matchPath(route.path, pathname))
.map((route) =>{
    const match = matchPath(route.path, pathname);
    return{
        label: typeof route.label === "function"
        ? route.label(match.params)
        : route.label,
        path:match.pathname
    }
});
    return(

        <nav>
        {crumbs.map((crumb, index) =>(
<span key={index}>
    {index !== 0 && <span><ChevronLeft /></span> }
{index === crumbs.length -1 ? (<span>{crumb.label}</span>)
:(<Link to={crumb.path}> {crumb.label}</Link>)
}

</span>
        )

        )
        }
        </nav>
    )
}

export default BreadCrumbs;