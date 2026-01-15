import { Line } from 'react-chartjs-2';
import { useMemo, useState, useRef , useEffect} from 'react';
import useSaleData from '../../hooks/useSaleData';
import { NormalizedKPI, SaleData } from "../../types/dataTypes";
import type { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
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
function KPICard({ labels, value, sparkline, icon: Icon, color, bgColor, bgColorFade }: { labels: string, value: number, sparkline: number[], icon?: React.ElementType, color?: string, bgColor: string , bgColorFade: string}) {

const chartRef = useRef<ChartJS<'line'>>(null);
const [dataChart, setDataChart] = useState<ChartData<'line'>>({ labels: [], datasets: [] });

  const safeSparkLine = useMemo(() => (Array.isArray(sparkline) ? sparkline : []), [sparkline]);

useEffect(() =>{
  const chart = chartRef.current;
  if( !chart){
     return;
  }

const ctx = chart.ctx;

const gradient = ctx.createLinearGradient(0,0, 0,chart.height || 50);

gradient.addColorStop(0, bgColor);
// gradient.addColorStop(0.1, bgColor);
gradient.addColorStop(1, bgColorFade);


setDataChart({
  labels: safeSparkLine.map(() =>""),
  datasets: [
    {
      data: safeSparkLine,
      borderColor: color,
      backgroundColor: gradient,
      fill: true,
      pointRadius: 0, 
      borderWidth: 2,
      tension:(.7),
      hoverBorderWidth:5
    }
  ]
})
}, [safeSparkLine, color])


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
  }), [safeSparkLine]);




  return (
    <div className="rounded-md bg-text-inverse p-4 shadow-md w-ful ml-4 mr-4  cursor-pointer">
      <div className="p-1 mb-2 rounded-md w-fit" style={{ backgroundColor: bgColor }}>
        {Icon && <Icon style={{ color }}/>}</div>

      <h2 className="text-lg font-bold">{(labels.toLowerCase().includes('revenue') || labels.toLowerCase().replace(/[_\s]/g, '').includes('avgordervalue')) ? `$${value}` : `${value}`}</h2>
      <p className="text-text-muted  text-xs">{labels}</p>
      <div className="h-24 mt-2"
 

      >

        {
         dataChart ? ( <Line ref={chartRef}
          key={JSON.stringify(sparkline)} 
          options={chartOptions}
       data={dataChart}
        />) : (
          <div className="h-full w-full bg-slate-50 flex items-center justify-center text-slate-300 text-xs italic">
            No data available
          </div>
        )
        }
       
      </div>
    </div>
 


  )
}

export default KPICard;
