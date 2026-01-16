import { DollarSign, Package, TrendingDown, TrendingUp, ShoppingCart } from "lucide-react";
import useSaleData from "../../hooks/useSaleData";
import { SaleSummary, SaleBreakdown } from "../../types/dataTypes";
import KPICard from "./KPICard";
import { calculateTrend } from "../../utils/chart";
function normalizeBreakdown(b: SaleBreakdown) {
    const revenue = b.values.reduce((a, v) => a + v, 0);
    const totalOrders = b.total_orders.reduce((a, v) => a + v, 0);
    const totalItems = b.total_items_sold.reduce((a, v) => a + v, 0);
    const avgOrderValues = totalOrders ? revenue / totalOrders : 0;
    // const topCategory = b.top_selling_product[0] || "N/A";

    return {


        revenue, total_orders: totalOrders,
        total_items_sold: totalItems,
        avg_order_value: avgOrderValues,
        // top_category: topCategory,
        revenue_sparkline: [12, 13, 14, 16, 15, 14],
        total_orders_sparkline: b.total_orders,

        total_items_sold_sparkline: b.total_items_sold,
        avg_order_value_sparkline: b.avg_order_value,

    }
}


function normalizeSummary(s: SaleSummary) {
    const revenue = s.revenue;
    const totalOrders = s.total_orders;
    const totalItems = s.total_items_sold;
    const avgOrderValues = totalOrders ? revenue / totalOrders : 0;
    const topCategory = s.top_category || "N/A";
    const revenueSparkline = [revenue * .9, revenue * .98, revenue * .97, revenue * .99];
    const kpiValue = ((revenueSparkline[revenueSparkline.length - 1] - revenueSparkline[0]) / revenueSparkline[0]) * 100;

    const totalOrdersSparkline = [totalOrders, totalOrders * .12, totalOrders * .14];
    const kpiOrders = ((totalOrdersSparkline[totalOrdersSparkline.length - 1] - totalOrdersSparkline[0]) / totalOrdersSparkline[0]) * 100;
    const totalItemsSparkline = [totalItems * .1, totalItems * .15, totalItems * .14];

    const kpiItemsSold = ((totalItemsSparkline[totalItemsSparkline.length - 1] - totalItemsSparkline[0]) / totalItemsSparkline[0]) * 100;
    const avgOrder = [avgOrderValues * .1, avgOrderValues * .12, avgOrderValues * .23, avgOrderValues * .2]

    const kpiAvgOrders = ((avgOrder[avgOrder.length - 1] - avgOrder[0])/avgOrder[0]) * 100
    const revenueTrend =
        (revenueSparkline.length - 1) - revenueSparkline[0];
    const ordersTrend = (totalOrdersSparkline.length - 1) - totalOrdersSparkline[0];
    const itemsSoldOrdersTrend = (totalItemsSparkline.length - 1) - totalItemsSparkline[0];
    const avg = (avgOrder.length - 1) - avgOrder[0];

    return {

        revenue, total_orders: totalOrders,

        total_items_sold: totalItems,
        avg_order_value: avgOrderValues,
        top_category: topCategory,

        revenue_sparkline: revenueSparkline,
        kpi_value: kpiValue,
        revenue_trend: revenueTrend,
        itemsSoldTrend: itemsSoldOrdersTrend,
        avgTrend: avg,
        total_orders_sparkline: totalOrdersSparkline,
        order_trend: ordersTrend,
        total_items_sold_sparkline: totalItemsSparkline,
        kpi_total: calculateTrend(totalItemsSparkline),
        avg_order_value_sparkline: avgOrder,
        kpi_avg_orders: calculateTrend(avgOrder),
        kpi_items_sold: calculateTrend(totalItemsSparkline),
  
    }
}



function OverallAnalysticCard({ range, category }: { range: string, category: string }) {


    const saleData = useSaleData(range, category);
    if (!saleData) return null;

    if ("labels" in saleData) {
        const breakdown = saleData;
        const kpi = normalizeBreakdown(breakdown);
        return (
            <div className="flex flex-col gap-4">
                <KPICard
                    labels="Revenue"
                    value={kpi.revenue}
                    sparkline={kpi.revenue_sparkline}
                    icon={DollarSign}
                    color="#287d0b"
                    bgColor="rgba(40, 125, 11, 0.2)"
                    bgColorFade="rgba(40, 125, 11, 0.02)"

                />

                <KPICard
                    labels="Total Orders"
                    value={kpi.total_orders}
                    sparkline={kpi.total_orders_sparkline}
                    icon={ShoppingCart}
                    color="#7C3AED"
                    bgColor="rgba(124, 58, 237, 0.2)"
                    bgColorFade="rgba(124, 58, 237, 0.02)"

                />

                <KPICard labels="Items Sold"
                    value={kpi.total_items_sold}
                    sparkline={kpi.total_items_sold_sparkline}
                    icon={Package}
                    color="#2563EB"
                    bgColor="rgba(37, 99, 235, 0.2)"
                    bgColorFade="rgba(37, 99, 235, 0.02)"

                />

                <KPICard labels="Avg Order Value"
                    value={kpi.avg_order_value}
                    sparkline={kpi.avg_order_value_sparkline}
                    icon={DollarSign}
                    color="#D97706"
                    bgColor="rgba(217, 119, 6, 0.2)"
                    bgColorFade="rgba(217, 119, 6, 0.02)"

                />

            </div>
        );
    }

    const summary = saleData;

    const kpi = normalizeSummary(summary);
    return (
        <div className="flex flex-col gap-4 ">

            <KPICard
                labels="Revenue"
                value={kpi.revenue}
                sparkline={kpi.revenue_sparkline}
                icon={DollarSign}
                color="#287d0b"
                bgColor="rgba(40, 125, 11, 0.2)"
                bgColorFade="rgba(40, 125, 11, 0.02)"
                top_category={kpi.top_category}
                trend={kpi.revenue_trend}
                kpi={kpi.kpi_value}
            />

            <KPICard

                labels="Total Orders"
                value={kpi.total_orders}
                sparkline={kpi.total_orders_sparkline}
                icon={ShoppingCart}
                color="#7C3AED"
                bgColor="rgba(124, 58, 237, 0.2)"
                bgColorFade="rgba(124, 58, 237, 0.02)"
                top_category={kpi.top_category}
                kpi={kpi.kpi_total}

        trend={kpi.order_trend}
            />

            <KPICard labels="Items Sold"
                value={kpi.total_items_sold}
                sparkline={kpi.total_items_sold_sparkline}
                icon={Package}
                color="#2563EB"
                bgColor="rgba(37, 99, 235, 0.2)"
                bgColorFade="rgba(37, 99, 235, 0.02)"
                top_category={kpi.top_category}
trend={kpi.itemsSoldTrend}
kpi={kpi.kpi_items_sold}
            />

            <KPICard labels="Avg Order Value"
                value={kpi.avg_order_value}
                sparkline={kpi.avg_order_value_sparkline}
                icon={DollarSign}

                color="#D97706"
                bgColor="rgba(217, 119, 6, 0.2)"
                bgColorFade="rgba(217, 119, 6, 0.02)"
                top_category={kpi.top_category}
trend={kpi.avgTrend}
kpi={kpi.kpi_avg_orders}
            />


            <KPICard labels="Top Category"

                icon={DollarSign}

                color="#D97706"
                bgColor="rgba(217, 119, 6, 0.2)"
                bgColorFade="rgba(217, 119, 6, 0.02)"
                top_category={kpi.top_category}

            />

        </div>
    )


}

export default OverallAnalysticCard;