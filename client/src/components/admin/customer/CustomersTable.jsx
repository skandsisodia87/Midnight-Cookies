import moment from "moment";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";

export default function CustomersTable({ customers }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-[#F3E4D4] bg-white shadow-sm">
      <div className="min-h-0 overflow-auto">
        <div className="overflow-x-auto">
          <table className="min-w-190 w-full">
            <thead className="bg-[#FFF8F2] text-left text-sm text-[#7A5C4D]">
              <tr>
                <th className="px-4 py-4 font-semibold">Name</th>
                <th className="px-4 py-4 font-semibold">Email</th>
                <th className="px-4 py-4 font-semibold">Phone</th>
                <th className="px-4 py-4 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#4E342E]">
              {customers.map((customer) => (
                <tr
                  key={customer._id}
                  className="border-t border-[#F3E4D4] bg-white transition-colors hover:bg-[#FFFDFB]"
                >
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[#A15C38]">
                        <FiUser />
                        <span className="font-semibold">{customer.name}</span>
                      </div>
                      <div className="text-xs text-[#8C6A4B]">{customer._id}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <FiMail />
                      <span>{customer.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex px-3 py-1 text-sm font-medium text-[#A15C38]">
                      {customer.phone}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {moment(customer.createdAt).format("DD MMM YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
