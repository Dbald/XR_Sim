"use client";

const colorMap = {
  green: "bg-green-50 text-green-700 border-green-200",
  red: "bg-red-50 text-red-700 border-red-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function TagBadge({
  label,
  color,
}: {
  label: string;
  color: "green" | "red" | "amber" | "blue";
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colorMap[color]}`}
    >
      {label}
    </span>
  );
}
