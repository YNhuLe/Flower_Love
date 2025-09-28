import {CategoriesProps} from "../../types/types";


function CategoryCard({categories} : {categories:CategoriesProps }){
 const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
   console.log("CATEGORIES:", categories);
   
   if ( !categories){
    return <p>Loading product categories...</p>

   }
    return (
        <section>
            <img 
            className="h-60 w-60 m-auto transform transition-transform duration-300 hover:scale-105"
            // src={`${cloud_url}/${categories}`} alt="categories-pictures"
           src="https://res.cloudinary.com/dvdr5bwc7/image/upload/v1758511648/glasses_tupu5g.jpg"
            loading="lazy"
            />
            <h2>{categories.name}</h2>
            <p>{categories.description}</p>
            <p>{categories.quantity}+ plants</p>
        </section>
    )
}

export default CategoryCard;