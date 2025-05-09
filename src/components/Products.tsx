import React from "react";

interface ProductProps {
  id: string;
  step: string;
  action: string;
}
function Products({ id, step, action }: ProductProps) {
  return (
    <div
      className={`${
        id === "01"
          ? "bg-tertiary transform rotate-2"
          : id === "02"
          ? "bg-accent transform -rotate-3"
          : id === "03"
          ? "bg-tertiary transform rotate-2"
          : "bg-accent transform -rotate-3"
      } mt-4 rounded-md p-4  sticky top-[10rem]`}>
      <div className="flex flex-row space-x-4">
        <h2 className="text-left font-semibold text-xl">{step}</h2>
        <p className="text-right font-semibold text-xl">{id}</p>
      </div>
      <p className="text-center text-xs">{action}</p>
    </div>
  );
}

export default Products;
