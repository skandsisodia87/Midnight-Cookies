import { useMemo } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  FaRupeeSign,
  FaShoppingBag,
  FaUsers,
  FaChartLine,
  FaBoxOpen,
  FaArrowUp,
} from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../../services/admin.service";
import ErrorPage from "../../common/ErrorPage";
import StatCard from "../../components/admin/analytics/StatCard";
import OrderStatus from "../../components/admin/analytics/OrderStatus";
import RevenueOverview from "../../components/admin/analytics/RevenueOverview";
import constants from "../../common/constants";

export default function Analytics() {
  const {
    data: analyticsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [constants.ANALYTICS],
    queryFn: getAnalytics,
    staleTime: 5 * 60 * 1000,
  });

  const analyticsData = useMemo(() => {
    if (!analyticsResponse?.data) {
      return null;
    }

    const data = analyticsResponse.data;

    const salesOverview = data.salesOverview || [];
    const orderStatus = data.orderStatus || {};
    const topProducts = data.topProducts || [];
    const customerGrowth = data.customerGrowth || [];

    const totalRevenue = salesOverview.reduce(
      (sum, item) => sum + Number(item.revenue || 0),
      0,
    );

    const totalOrders = Object.values(orderStatus).reduce(
      (sum, value) => sum + Number(value || 0),
      0,
    );

    const totalCustomers = customerGrowth.reduce(
      (sum, item) => sum + Number(item.customers || 0),
      0,
    );

    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const orderStatusData = Object.entries(orderStatus)
      .filter(([, value]) => Number(value) > 0)
      .map(([name, value]) => ({
        name,
        value: Number(value),
      }));

    const bestProduct = topProducts.length
      ? [...topProducts].sort((a, b) => b.sold - a.sold)[0]
      : null;

    const totalUnitsSold = topProducts.reduce(
      (sum, product) => sum + Number(product.sold || 0),
      0,
    );

    return {
      salesOverview,
      orderStatusData,
      topProducts,
      customerGrowth,
      totalRevenue,
      totalOrders,
      totalCustomers,
      averageOrderValue,
      bestProduct,
      totalUnitsSold,
    };
  }, [analyticsResponse]);

  if (isLoading) {
    return (
      <div className="space-y-5 px-3 pb-8 sm:px-4 lg:px-6">
        <div className="h-24 animate-pulse rounded-3xl bg-slate-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="h-100 animate-pulse rounded-3xl bg-slate-200 lg:col-span-8" />
          <div className="h-100 animate-pulse rounded-3xl bg-slate-200 lg:col-span-4" />
        </div>
      </div>
    );
  }

  if (isError || !analyticsData) {
    return (
      <div className="min-h-screen bg-[#FFF6EC] px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <ErrorPage
            title="No Analytics Data"
            message="Analytics data is currently unavailable."
            buttonText="Go Back"
            redirectLink={constants.ROUTES.ADMIN.DASHBOARD}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-3 pb-8 sm:space-y-6 sm:px-4 lg:px-6">
      <div className="rounded-[28px] border border-[#F3E4D4] bg-linear-to-r from-[#FFF7EC] via-white to-[#FFFDF8] p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#4E342E] sm:text-3xl">
              Analytics
            </h1>

            <p className="mt-1 text-sm text-[#7A5C4D] sm:text-base">
              Track your business performance and sales insights
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <FaChartLine className="text-amber-500" />
            <span>Yearly Overview</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`₹${analyticsData.totalRevenue.toLocaleString("en-IN")}`}
          subtitle="Total revenue generated"
          icon={<FaRupeeSign />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />

        <StatCard
          title="Total Orders"
          value={analyticsData.totalOrders}
          subtitle="Orders across all statuses"
          icon={<FaShoppingBag />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title={constants.C_CUSTOMERS}
          value={analyticsData.totalCustomers}
          subtitle="Customers acquired"
          icon={<FaUsers />}
          iconBg="bg-violet-50"
          iconColor="text-violet-600"
        />

        <StatCard
          title="Average Order"
          value={`₹${Math.round(analyticsData.averageOrderValue).toLocaleString(
            "en-IN",
          )}`}
          subtitle="Average revenue per order"
          icon={<FaArrowUp />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
        <RevenueOverview salesOverview={analyticsData.salesOverview} />

        <OrderStatus orderStatusData={analyticsData.orderStatusData} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 lg:col-span-5 lg:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
              Customer Growth
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              New customers by month
            </p>
          </div>

          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData.customerGrowth}
                margin={{
                  top: 10,
                  right: 5,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2E8F0"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#64748B",
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#64748B",
                  }}
                />

                <Tooltip
                  formatter={(value) => [`${value}`, constants.C_CUSTOMERS]}
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid #E2E8F0",
                  }}
                />

                <Bar
                  dataKey={constants.CUSTOMERS}
                  name={constants.C_CUSTOMERS}
                  fill="#8B5CF6"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={34}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 lg:col-span-7 lg:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                Top Selling {constants.C_PRODUCTS}
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {constants.C_PRODUCTS} ranked by units sold
              </p>
            </div>

            <div className="hidden rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 sm:block">
              {analyticsData.totalUnitsSold} units sold
            </div>
          </div>

          <div className="space-y-3">
            {analyticsData.topProducts.map((product, index) => {
              const maxSold = Math.max(
                ...analyticsData.topProducts.map((item) =>
                  Number(item.sold || 0),
                ),
                1,
              );

              const percentage = (Number(product.sold || 0) / maxSold) * 100;

              return (
                <div
                  key={product.productName}
                  className="rounded-2xl border border-slate-100 p-3 transition hover:border-amber-200 hover:bg-amber-50/30 sm:p-4"
                >
                  <div className="flex items-center gap-3">
                    {/* Rank */}

                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                      #{index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {product.productName}
                        </p>

                        <span className="shrink-0 text-sm font-bold text-amber-600">
                          {product.sold} sold
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-amber-500 transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Revenue */}

        <div className="rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 p-5 sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-600">
              <FaRupeeSign />
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Total Revenue
            </p>
          </div>

          <p className="mt-4 text-2xl font-bold text-amber-900 sm:text-3xl">
            ₹{analyticsData.totalRevenue.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-amber-700">
            Generated from {analyticsData.totalOrders} orders
          </p>
        </div>

        {/* Best Product */}

        <div className="rounded-2xl border border-blue-200 bg-linear-to-br from-blue-50 to-sky-50 p-5 sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-blue-600">
              <FaBoxOpen />
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Best Seller
            </p>
          </div>

          <p className="mt-4 line-clamp-2 text-lg font-bold text-blue-900 sm:text-xl">
            {analyticsData.bestProduct?.productName || "No data"}
          </p>

          <p className="mt-1 text-xs text-blue-700">
            {analyticsData.bestProduct?.sold || 0} units sold
          </p>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-linear-to-br from-purple-50 to-violet-50 p-5 sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-100 text-purple-600">
              <FaUsers />
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
              {constants.C_CUSTOMERS}
            </p>
          </div>

          <p className="mt-4 text-2xl font-bold text-purple-900 sm:text-3xl">
            {analyticsData.totalCustomers}
          </p>

          <p className="mt-1 text-xs text-purple-700">
            Customers acquired during the year
          </p>
        </div>
      </div>
    </div>
  );
}
