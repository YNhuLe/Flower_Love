export interface SaleSummary {
  revenue: number;
  total_orders: number;
  total_items_sold?: number;
  avg_order_value?: number;
  top_category?: string;
  trend?: number;
  kpi?: number;
  date?: string;
}

export interface SaleBreakdown {
  labels: string[];
  trend: number,
  revenue: number;
  values: number[];
  total_orders: (number )[];
  total_items_sold: (number )[];
  avg_order_value: (number )[];
  top_selling_product: string[];
  kpi: number;
  top_plant: string
}

export interface MainChartData{
  date: string[];
  revenueSparkline: number[];
  totalOrdersSparkline: number[];
  labels: string[];
  revenue: number[];
  total_orders: number[];
}
// export interface NormalizedKPI {
//   revenue: number;
//   total_orders: number;
//   total_items_sold: number;
//   avg_order_value: number;
//   top_category: string;
//  revenue_sparkline: number[];
//   total_orders_sparkline: number[]; 
//   total_items_sold_sparkline: number[]; 
//   avg_order_value_sparkline: number[];
//   trend: number;
// }

export type SaleData = SaleSummary | SaleBreakdown;
