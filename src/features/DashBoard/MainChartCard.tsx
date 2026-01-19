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
import { useRef, useEffect, useState, useMemo } from "react";
function MainChartCard({date, revenue, total_orders, labels} : {date:string[], revenue: number[], total_orders:number[], labels: string[]}){

    const chartRef = useRef<ChartJS<'line'>>(null);
//     const [chartData, setChartData] = useState({ labels: [], datasets: [] });
//    const [dataChart, setDataChart] = useState<ChartData<'line'>>({labels: [], datasets: []});
console.log("Date: ", date);

console.log("total orders: ", total_orders);
console.log("revenue: ", revenue);


const [chartData, setChartData] = useState<ChartData<'line'>>({
  labels: [],
  datasets: []
});

   useEffect(() =>{
    const chart = chartRef.current;
    if(!chart){
        return;
    }

const ctx = chart.ctx;
const gradient = ctx.createLinearGradient(0,0,0, chart.height || 150);

gradient.addColorStop(0, "rgba(37, 99, 235, 0.4)");
gradient.addColorStop(1, "rgba(37, 99, 235, 0)");

setChartData({
    labels,
    datasets:[
{
    data: revenue, 
    borderColor: "#2563EB",
     backgroundColor: gradient, 
     fill: true,
      tension: 0.4,
      pointRadius: 3,
}

    ]
})
   },[labels, revenue])
   
    return(
        <>
          <div className="h-64">
        <Line ref={chartRef} data={chartData} options={{ responsive: true }} />
      </div>
        </>
    )
}
export default MainChartCard;