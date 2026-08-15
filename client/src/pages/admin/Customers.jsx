import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../common/ErrorPage";
import EmptyState from "../../common/EmptyState";
import CustomersSkeleton from "../../components/admin/customer/CustomersSkeleton";
import CustomersTable from "../../components/admin/customer/CustomersTable";
import { getCustomers } from "../../services/admin.service";

const Customers = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: getCustomers,
    staleTime: 1 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  if (isLoading) {
    return <CustomersSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen px-4 py-12 bg-[#FFF6EC]">
        <div className="max-w-4xl mx-auto">
          <ErrorPage
            title="Unable to load customers"
            message="We couldn’t fetch the customer list right now. Please refresh the page or return to the admin dashboard."
            buttonText="Go Back"
            redirectLink="/admin"
          />
        </div>
      </div>
    );
  }

  const customers = data?.customers || [];

  if (customers.length === 0) {
    return (
      <div className="min-h-screen px-4 py-12 bg-[#FFF6EC]">
        <div className="max-w-4xl mx-auto">
          <EmptyState
            icon="👥"
            title="No customers yet"
            message="No customers have registered yet. Check back later or return to the admin dashboard."
            buttonText="Back to Dashboard"
            redirectLink="/admin"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 py-4 h-full">
      <div className="rounded-[28px] border border-[#F3E4D4] bg-linear-to-r from-[#FFF7EC] via-white to-[#FFFDF8] p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#4E342E] sm:text-3xl">
              Customers
            </h1>

            <p className="mt-1 text-sm text-[#7A5C4D] sm:text-base">
              Review registered customers and their contact information.
            </p>
          </div>

          <div className="inline-flex w-fit items-center rounded-full border border-[#F2D8BE] bg-[#FFF8EF] px-3 py-1.5 text-sm font-medium text-[#A15C38]">
            {customers.length} customer{customers.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
};

export default Customers;
