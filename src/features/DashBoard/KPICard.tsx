import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';
import useSaleData from '../../hooks/useSaleData';
import {NormalizedKPI} from "../../types/dataTypes";
import {
  TrendingUp,
  TrendingDown,
  Download,
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  Eye,
  AlertTriangle,
  icons,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
function KPICard({ label, value, sparkline, icon:Icon, color, bgColor }: {label:string, value: number, sparkline:number[], icon?:React.ElementType, color?:string, bgColor?:string }) {

// console.log("KPI: ", kpi)

const chartData = useMemo(() => ({
  labels:sparkline.map(() => ""),
  datasets: [{
    data: sparkline,
    borderColor:color,
    backgroundColor:bgColor,
    fill: true,
    tension: 0.4,
    pointRadius: 0
  }]
}), [sparkline, color]);

const chartOptions = useMemo(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  scales: {
    x: { display: false },
    y: { display: false }
  }
}), []);




  return (<>
    <div className="rounded-md bg-text-inverse p-4 shadow-md w-ful ml-4 mr-4">
      <div className={`p-1 bg-${bgColor} rounded-md w-fit`}>
      {Icon && <Icon />}</div>
       <p className="text-text-muted text-sm">{label}</p>
        <h2 className="text-xl font-bold">${value}</h2>
        <div className={`h-32 mt-2 ${bgColor}`}>
  <Line  key={JSON.stringify(sparkline)} data={chartData} options={chartOptions} />
</div>
  </div>
  </>
  

)
}

export default KPICard;
