import { useState } from "react";
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
} from "lucide-react";
import Select from "../../src/ui/select";
import Button from "../common/Button";
import NavBar from "../components/NavBar";
import SearchBar from "../common/SearchBar";
import OverallAnalysticCard from "../features/DashBoard/OverallAnalysticCard";

import MainChart from "../features/DashBoard/MainChart";
function DashBoardPage() {
  const [dateRange, setDateRange] = useState('Last 7 days');
  const [categories, setCategories] = useState('All Categories');
  const mapRange: Record<string, string> = {
    "Last 7 days": "7",
    "Last 30 days": "30",
    "Last 90 days": "90",
    "Year to Date": "365"
  }

  const mapCategory: Record<string, string> = {
    'All Categories' : "all",
     'Herbs' :"Herbs",
      'Succulents': 'Succulents',
       'Air Purifying':   'Air Purifying',
        'Indoor Plants': 'Indoor Plants', 
        'Flowering Plants':'Flowering Plants',
  }
  return (

    <>
      <NavBar />
      <SearchBar />
      <section className="m-4 mt-8">
        <h1 className="text-2xl font-bold">Plant Sales & Inventory Report</h1>
        <h2 className="text-sm">Business analytics overview</h2>

        <div className="flex items-center gap-4 mt-4 h-10">

          <Select
            label="Date Range"
            options={["Last 7 days", "Last 30 days", "Last 90 days", "Year to Date"]}
            value={dateRange}
            onChange={setDateRange}

          />

          <Select
            label="Categories"
            options={['All Categories', 'Herbs', 'Succulents', 'Air Purifying', 'Indoor Plants', 'Flowering Plants']}
            value={categories}
            onChange={setCategories}

          />



        </div>
        <Button btnType="export" />



      </section>


      <section className="bg-text-muted/20 w-full h-full py-8">

        <OverallAnalysticCard range={mapRange[dateRange]} category={mapCategory[categories]} />
      {/* <MainChart revenue={120} date={["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5"]} total_orders={20} /> */}
      
      </section>
    </>
  )
}
export default DashBoardPage;