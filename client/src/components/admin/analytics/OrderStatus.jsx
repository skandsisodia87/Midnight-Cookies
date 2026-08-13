import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const STATUS_COLORS = [
  "#F59E0B",
  "#3B82F6",
  "#8B5CF6",
  "#06B6D4",
  "#22C55E",
  "#EF4444",
  "#64748B",
];

function OrderStatus({ orderStatusData }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-5 lg:col-span-4 lg:p-6">
      <div className="mb-3">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          Order Status
        </h2>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Current order distribution
        </p>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={orderStatusData}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
            >
              {orderStatusData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [
                `${value} orders`,
                String(name).charAt(0).toUpperCase() + String(name).slice(1),
              ]}
              contentStyle={{
                borderRadius: 14,
                border: "1px solid #E2E8F0",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {orderStatusData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: STATUS_COLORS[index % STATUS_COLORS.length],
                }}
              />

              <span className="truncate text-xs font-medium capitalize text-slate-600 sm:text-sm">
                {item.name}
              </span>
            </div>

            <span className="text-sm font-bold text-slate-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderStatus;
