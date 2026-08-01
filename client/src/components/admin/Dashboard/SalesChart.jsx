import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", sales: 6000 },
  { month: "Feb", sales: 8500 },
  { month: "Mar", sales: 7200 },
  { month: "Apr", sales: 9100 },
  { month: "May", sales: 10200 },
  { month: "Jun", sales: 13400 },
];

export default function SalesChart() {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-lg text-slate-900">Monthly Revenue</h2>
          <p className="mt-2 text-sm text-slate-500">Trends from last 6 months</p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-800">
          <span>+12.4%</span>
          <span className="h-2 w-2 rounded-full bg-amber-800" />
        </div>
      </div>

      <div className="mt-6 h-[280px] sm:h-[340px] md:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: 18, borderColor: "#F8B62C" }} />
            <Line dataKey="sales" stroke="#D97706" strokeWidth={4} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
