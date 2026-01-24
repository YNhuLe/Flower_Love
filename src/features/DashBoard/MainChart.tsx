import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,

  type ChartData
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);
import useSaleData from "../../hooks/useSaleData";
import {SaleSummary, SaleBreakdown} from "../../types/dataTypes";
import MainChartCard from "./MainChartCard";
import { useState } from "react";


function MainChart(){
const [ activeMetric, setActiveMetric] = useState<"revenue" | "orders">("revenue")
     const saleData = useSaleData();
   const labels = saleData && "labels" in saleData ? saleData.labels : saleData ? [saleData.date] : [];
   const revenue = saleData && "values" in saleData ? saleData.values : saleData ? [saleData.revenue] : [];
   const totalOrders = saleData && "total_orders" in saleData ? saleData.total_orders : saleData ? [saleData.total_orders] : [];
   const revenueSparkline = [revenue, revenue * .15, revenue * 1.14, revenue * 1.14, revenue * 1.17];
const totalOrdersSparkline = [total_orders, total_orders * 1.2, total_orders * 1.1, total_orders * .92, total_orders * .95];

const chartData = activeMetric === "revenue" ? revenueSparkline : totalOrdersSparkline;

    return (
      <section className="rounded-md bg-text-inverse p-4 shadow-md w-ful ml-4 mr-4 mt-12">
<div className="flex flex-col ">
        <div className="m-2 mb-4">
<h1>Sales Over Time</h1>
<h2  className="text-xs">Revenue and orders by day</h2></div>
<div className="flex gap-1 mb-4">
  <button 
  onClick={() => setActiveMetric("revenue")}
  className="p-1 border borer-1 rounded-md text-xs">Revenue</button>
<button 
onClick={() => setActiveMetric("orders")}
className="p-1 border borer-1 rounded-md text-xs">Orders</button></div></div>
       <MainChartCard
       labels={date}
      date={date}
       revenue={chartData}
total_orders={totalOrdersSparkline}
>


       </MainChartCard>
      </section>
    )
}

export default MainChart;