"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ProjectionPoint } from "@/lib/types";

interface Props {
  data: ProjectionPoint[];
  chosenLabel: string;
}

function formatDollar(val: number) {
  if (Math.abs(val) >= 1000) {
    return `${val < 0 ? "-" : ""}$${(Math.abs(val) / 1000).toFixed(1)}k`;
  }
  return `${val < 0 ? "-" : ""}$${Math.abs(val).toLocaleString()}`;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#E5E3DC] rounded-lg p-3 shadow-sm text-xs">
        <p className="font-medium text-[#9C9A94] mb-2">
          Month {label}
        </p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-[#3A3834]">{p.name}:</span>
            <span className="font-semibold" style={{ color: p.color }}>
              {p.value >= 0 ? "+" : ""}
              {formatDollar(p.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProjectionChart({ data, chosenLabel }: Props) {
  const hasNegative = data.some((d) => d.chosen < 0 || d.optimal < 0);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#1C1B19]">
          Net Worth Projection
        </h3>
        <span className="text-xs text-[#9C9A94]">24 months</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E3DC" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#9C9A94" }}
            tickLine={false}
            axisLine={{ stroke: "#E5E3DC" }}
            tickFormatter={(v) => (v === 0 ? "Now" : `M${v}`)}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9C9A94" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatDollar}
            width={52}
          />
          {hasNegative && (
            <ReferenceLine y={0} stroke="#E5E3DC" strokeDasharray="4 2" />
          )}
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
            formatter={(value) => (
              <span style={{ color: "#3A3834" }}>{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="chosen"
            name={chosenLabel}
            stroke="#1C1B19"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="optimal"
            name="Optimal path"
            stroke="#16A34A"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-[#9C9A94] mt-2 text-center">
        Projections are illustrative. Based on general financial principles.
      </p>
    </div>
  );
}
