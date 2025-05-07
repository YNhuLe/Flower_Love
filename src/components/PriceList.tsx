import React, { useState } from "react";
import PriceCard from "./PriceCard";
import { monthlyPlans, yearlyPlans } from "../constants";

function PriceList() {
  const [planType, setPlanType] = useState<"monthly" | "yearly">("monthly");
  const activePlan = planType === "monthly" ? monthlyPlans : yearlyPlans;
  return (
    <div className="flex flex-col m-4 mt-32">
      <p className="text-center">Choose the perfect plan for you</p>
      <h2 className="text-4xl text-center font-semibold m-8 ml-4 mr-4">
        Pricing plan
      </h2>
      <p className="text-center mb-8">
        The perfect plan that works great for you
      </p>
      <div className="flex flex-row justify-center border border-primary rounded-3xl mx-6 w-[13rem]">
        <button
          className={`px-6 py-4 rounded-3xl ${
            planType === "monthly" ? "bg-primary text-white" : "text-primary"
          }`}
          onClick={() => setPlanType("monthly")}>
          Monthly
        </button>
        <button
          className={`px-6 py-4 rounded-3xl text-center ${
            planType === "yearly" ? "bg-primary text-white" : "text-primary"
          }`}
          onClick={() => setPlanType("yearly")}>
          Yearly
        </button>
      </div>

      {activePlan.map(({ id, title, price, sub_price, features }) => (
        <PriceCard
          id={id}
          key={id}
          title={title}
          price={price}
          sub_price={sub_price}
          features={features}
        />
      ))}
    </div>
  );
}

export default PriceList;
