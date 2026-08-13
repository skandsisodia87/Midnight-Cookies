import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function RevenueOverview({ salesOverview }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 lg:col-span-8 lg:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          Revenue Overview
        </h2>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Monthly revenue performance
        </p>
      </div>

      <div className="h-70 sm:h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={salesOverview}
            margin={{
              top: 10,
              right: 10,
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
              tickLine={false}
              axisLine={false}
              tick={{
                fontSize: 11,
                fill: "#64748B",
              }}
              tickFormatter={(value) => `₹${value}`}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#D97706"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#FFFFFF",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueOverview;
