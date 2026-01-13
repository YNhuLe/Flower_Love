export interface SaleSummary {
  revenue: number;
  total_orders: number;
  total_items_sold: number;
  avg_order_value: number;
  top_category?: string | null;
}

export interface SaleBreakdown {
  labels: string[];
  values: number[];
  total_orders: number[];
  total_items_sold: number[];
  avg_order_value: number[];
  top_selling_product: string[];
}

export type SaleData = SaleSummary | SaleBreakdown;
