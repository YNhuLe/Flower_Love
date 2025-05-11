import React from "react";
import { product } from "../constants";
import Products from "./Products";
function ProductList() {
  return (
    <div className="mx-4 mt-16 text-center tablet:mx-8  tablet:mt-32">
      <h2 className="text-4xl text-center font-semibold m-8 ml-4 mr-4 tablet:text-5xl tablet:mt-32">
        Discover the Power of Our Products
      </h2>
      <p className="text-center tablet:text-xl tablet:mb-8">
        Join a thriving community of plant lovers. Create an account, browse
        unique plants, connect with buyers and sellers, and complete secure
        transactions — all in one place. Grow your passion with us.
      </p>
      <button
        className="bg-primary  text-white w-full max-sm:w-[15rem] hover:text-primary  hover:bg-white border
          
          transition-all duration-300 hover:border-primary  font-semibold rounded-3xl cursor-pointer h-10 my-8 
          tablet:w-[20rem] tablet:text-xl tablet:mx-8 tablet:h-12 tablet:mb-14">
        Main action
      </button>

      <div>
        {product.map(({ id, step, action }) => (
          <Products id={id} key={id} step={step} action={action} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
