import OrderFilters from "../../components/admin/order/OrderFilters";
import OrdersTable from "../../components/admin/order/OrdersTable";
import OrderStats from "../../components/admin/order/OrderStats";
import OrdersSkeleton from "../../components/admin/order/OrdersSkeleton";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../common/ErrorPage";
import EmptyState from "../../common/EmptyState";
import { getOrders } from "../../services/admin.service";

const Orders = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getOrders,
    staleTime: 1 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen px-4 py-12 bg-[#FFF6EC]">
        <div className="max-w-4xl mx-auto">
          <ErrorPage
            title="Unable to load orders"
            message="We couldn’t fetch the latest orders right now. Please refresh the page or return to the admin dashboard."
            buttonText="Go Back"
            redirectLink="/admin"
          />
        </div>
      </div>
    );
  }

  const orders = data?.orders || [];

  if (orders.length === 0) {
    return (
      <div className="min-h-screen px-4 py-12 bg-[#FFF6EC]">
        <div className="max-w-4xl mx-auto">
          <EmptyState
            icon="📦"
            title="No orders yet"
            message="There are no orders to display right now. Once customers place an order, it will appear here."
            buttonText="Back to Dashboard"
            redirectLink="/admin"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="rounded-[28px] border border-[#F3E4D4] bg-linear-to-r from-[#FFF7EC] via-white to-[#FFFDF8] p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#4E342E] sm:text-3xl">
              Orders
            </h1>

            <p className="mt-1 text-sm text-[#7A5C4D] sm:text-base">
              Manage customer orders and update their status.
            </p>
          </div>

          <div className="inline-flex w-fit items-center rounded-full border border-[#F2D8BE] bg-[#FFF8EF] px-3 py-1.5 text-sm font-medium text-[#A15C38]">
            {data.newOrders} new orders
          </div>
        </div>
      </div>

      <OrderStats stats={data.stats} />

      <OrderFilters />

      <OrdersTable orders={data.orders} />
    </div>
  );
};

export default Orders;
