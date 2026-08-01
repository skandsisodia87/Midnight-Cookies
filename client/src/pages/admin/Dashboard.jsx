import DashboardStats from "../../components/admin/Dashboard/DashboardStats";
import SalesChart from "../../components/admin/Dashboard/SalesChart";
import RecentOrders from "../../components/admin/Dashboard/RecentOrders";
import LowStockProducts from "../../components/admin/Dashboard/LowStockProducts";
import OrderStatus from "../../components/admin/Dashboard/OrderStatus";
import WelcomeCard from "../../components/admin/Dashboard/WelcomeCard";
import DashboardSkeleton from "../../components/admin/Dashboard/DashboardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../services/admin/dashboard.service";
import ErrorPage from "../../common/ErrorPage";

export default function Dashboard() {
  const { data:dashboardData, isLoading, isError } = useQuery({
    queryKey: ["dashboard-data"],
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
            redirectLink="/admin"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <WelcomeCard />

      <DashboardStats stats={dashboardData.data.dashboardStats}/>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SalesChart />
        </div>

        <div className="lg:col-span-4">
          <OrderStatus stats={dashboardData.data.orderStats}/>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <RecentOrders recentOrders={dashboardData.data.recentOrders} />
        <LowStockProducts />
      </div>
    </div>
  );
}
