import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import SalesChart from "../../components/admin/dashboard/SalesChart";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";
import LowStockProducts from "../../components/admin/dashboard/LowStockProducts";
import OrderStatus from "../../components/admin/dashboard/OrderStatus";
import WelcomeCard from "../../components/admin/dashboard/WelcomeCard";
import DashboardSkeleton from "../../components/admin/dashboard/DashboardSkeleton";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../common/ErrorPage";
import { getDashboard } from "../../services/admin.service";
import constants from "../../common/constants";
import TopSellingCookies from "../../components/admin/dashboard/TopSellingCookies ";

export default function Dashboard() {
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [constants.DASHBOARD_DATA],
    queryFn: getDashboard,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen px-4 py-12 bg-[#FFF6EC]">
        <div className="max-w-4xl mx-auto">
          <ErrorPage
            title="Unable to load dashboard"
            message="There was an issue fetching your admin data. Please try again or return to the admin home page."
            buttonText="Go Back"
            redirectLink={constants.ROUTES.ADMIN.DASHBOARD}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-5">
      <WelcomeCard stats={dashboardData.data.welcomeCard} />

      <DashboardStats stats={dashboardData.data.dashboardStats} />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SalesChart />
        </div>

        <div className="lg:col-span-4">
          <OrderStatus stats={dashboardData.data.orderStats} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <RecentOrders recentOrders={dashboardData.data.recentOrders} />
        <LowStockProducts products={dashboardData.data.lowStockProducts} />
      </div>
      <TopSellingCookies
        topSellingCookies={dashboardData.data.topSellingProducts}
      />
    </div>
  );
}
