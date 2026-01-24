import { DollarSign, Package, ShoppingCart, LeafyGreen } from "lucide-react";
import useSaleData from "../../hooks/useSaleData";
import { SaleSummary, SaleBreakdown } from "../../types/dataTypes";
import KPICard from "./KPICard";
import { calculateKPI, calculateTrend } from "../../utils/chart";

function normalizeBreakdown(b: SaleBreakdown) {
    const revenue = b.values.reduce((a, v) => a + v, 0);
    const totalOrders = b.total_orders.reduce((a, v) => a + v, 0);
    const totalItems = b.total_items_sold.reduce((a, v) => a + v, 0);
    const avgOrderValues = totalOrders ? revenue / totalOrders : 0;
    const topSelling = b.top_selling_product[0] || "N/A";

    const revenueSparkline = [revenue * 1.1, revenue * .9, revenue * 1.2]
    const totalOrderSparkline = [totalOrders * 1.2, totalOrders * .9, totalOrders * 1.3, totalOrders * 1.5]
    const totalItemsSparkline = [totalItems * 1.1, totalItems * .9, totalItems * .98, totalItems * 1.2]
    const avgOrdersValueSparkline = [avgOrderValues * 1.2, avgOrderValues * .98, avgOrderValues * 1.2, avgOrderValues * 1.18]
    return {


        revenue, total_orders: totalOrders,
        total_items_sold: totalItems,
        avg_order_value: avgOrderValues,
        revenue_sparkline: revenueSparkline,
        kpi_value: Number(calculateKPI(revenueSparkline)),
        trend_value: Number(calculateTrend(revenueSparkline)),

        total_orders_sparkline: totalOrderSparkline,
        kpi_total_order: Number(calculateKPI(totalOrderSparkline)),
        trend_total_orders: Number(calculateTrend(totalOrderSparkline)),

        total_items_sold_sparkline: totalItemsSparkline,
        trend_total_items: Number(calculateTrend(totalItemsSparkline)),
        kpi_total_items: Number(calculateKPI(totalItemsSparkline)),

        avg_order_value_sparkline: avgOrdersValueSparkline,
        trend_avg_order_value: Number(calculateTrend(avgOrdersValueSparkline)),
        kpi_avg_order_value: Number(calculateKPI(avgOrdersValueSparkline)),
        top_selling: topSelling
    }
}


function normalizeSummary(s: SaleSummary) {
    const revenue = s.revenue;
    const totalOrders = s.total_orders;
    const totalItems = s.total_items_sold || 0;
    const avgOrderValues = totalOrders ? revenue / totalOrders : 0;
    const topCategory = s.top_category || "N/A";
    const revenueSparkline = [revenue, revenue * .15, revenue * 1.14];

    const totalOrdersSparkline = [totalOrders, totalOrders * 1.2, totalOrders * 1.1, totalOrders * .92];
    const totalItemsSparkline = [totalItems * .11, totalItems * .1, totalItems * .13, totalItems * .14];

    const avgOrder = [avgOrderValues, avgOrderValues * .12, avgOrderValues * .13, avgOrderValues * 1.2]


    return {

        revenue, total_orders: totalOrders,

        total_items_sold: totalItems,
        avg_order_value: avgOrderValues,
        top_category: topCategory,

        revenue_sparkline: revenueSparkline,
        kpi_value: Number(calculateKPI(revenueSparkline)),
        revenue_trend: Number(calculateTrend(revenueSparkline)),
        itemsSoldTrend: Number(calculateTrend(totalItemsSparkline)),
        avgTrend: Number(calculateTrend(avgOrder)),
        total_orders_sparkline: totalOrdersSparkline,
        order_trend: Number(calculateTrend(totalOrdersSparkline)),
        total_items_sold_sparkline: totalItemsSparkline,
        kpi_total: Number(calculateKPI(totalOrdersSparkline)),
        avg_order_value_sparkline: avgOrder,
        kpi_avg_orders: Number(calculateKPI(avgOrder)),
        kpi_items_sold: Number(calculateKPI(totalItemsSparkline)),

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
                    trend={kpi.trend_value}
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
                    trend={kpi.total_orders}
                    kpi={kpi.kpi_total_order}
                />

                <KPICard labels="Items Sold"
                    value={kpi.total_items_sold}
                    sparkline={kpi.total_items_sold_sparkline}
                    icon={Package}
                    color="#2563EB"
                    bgColor="rgba(37, 99, 235, 0.2)"
                    bgColorFade="rgba(37, 99, 235, 0.02)"
                    trend={kpi.trend_total_items}
                    kpi={kpi.kpi_total_items}
                />

                <KPICard labels="Avg Order Value"
                    value={kpi.avg_order_value}
                    sparkline={kpi.avg_order_value_sparkline}
                    icon={DollarSign}
                    color="#D97706"
                    bgColor="rgba(217, 119, 6, 0.2)"
                    bgColorFade="rgba(217, 119, 6, 0.02)"
                    trend={kpi.trend_avg_order_value}
                    kpi={kpi.kpi_avg_order_value}
                />

                <KPICard labels="Top Selling Product"
                    icon={LeafyGreen}
                    sparkline={kpi.total_items_sold_sparkline}
                    color="#287d0b"
                    bgColor="rgba(40, 125, 11, 0.2)"
                    bgColorFade="rgba(40, 125, 11, 0.02)"
                    top_selling={kpi.top_selling}
                    trend={kpi.trend_total_items}
                    kpi={kpi.kpi_total_items}
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
                trend={kpi.avgTrend}
                kpi={kpi.kpi_avg_orders}
            />


            <KPICard labels="Top Category"
                icon={LeafyGreen}
                sparkline={kpi.total_items_sold_sparkline}
                color="#287d0b"
                bgColor="rgba(40, 125, 11, 0.2)"
                bgColorFade="rgba(40, 125, 11, 0.02)"
                top_category={kpi.top_category}
                trend={kpi.itemsSoldTrend}
                kpi={kpi.kpi_items_sold}
            />



        </div>
    )


}

export default OverallAnalysticCard;