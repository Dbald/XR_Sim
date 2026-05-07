"use client";

import { SimulationResult, Scenario, Choice } from "@/lib/types";
import ProjectionChart from "./ProjectionChart";
import TagBadge from "./TagBadge";

interface Props {
  result: SimulationResult;
  scenario: Scenario;
  choice: Choice;
  onReset: () => void;
}

function ImpactStat({ label, value }: { label: string; value: number }) {
  const positive = value >= 0;
  return (
    <div className="text-center">
      <p className="text-xs text-[#9C9A94] mb-1">{label}</p>
      <p
        className={`text-lg font-semibold ${
          positive ? "text-green-700" : "text-red-600"
        }`}
      >
        {positive ? "+" : ""}
        {value >= 1000 || value <= -1000
          ? `$${(Math.abs(value) / 1000).toFixed(1)}k`
          : `$${Math.abs(value)}`}
        {value < 0 && value > -1000 ? "" : ""}
      </p>
    </div>
  );
}

const qualityConfig = {
  excellent: { label: "Excellent choice", color: "text-green-700", bg: "bg-green-50 border-green-200" },
  good: { label: "Good choice", color: "text-green-600", bg: "bg-green-50 border-green-200" },
  fair: { label: "Fair choice", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  poor: { label: "Poor choice", color: "text-red-600", bg: "bg-red-50 border-red-200" },
};

export default function ResultPanel({ result, scenario, choice, onReset }: Props) {
  const quality = qualityConfig[result.choiceQuality] ?? qualityConfig.fair;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-[#9C9A94] mb-1">{scenario.title}</p>
          <h2 className="text-xl font-semibold text-[#1C1B19]">{choice.label}</h2>
        </div>
        <TagBadge label={choice.tag} color={choice.tagColor} />
      </div>

      <div className={`border rounded-lg px-4 py-2.5 inline-flex items-center gap-2 ${quality.bg}`}>
        <span className={`text-sm font-medium ${quality.color}`}>{quality.label}</span>
      </div>

      <div className="bg-[#F5F4F0] border border-[#E5E3DC] rounded-lg p-5">
        <p className="text-sm leading-relaxed text-[#3A3834]">{result.consequence}</p>
      </div>

      <div className="border border-[#E5E3DC] rounded-lg p-5 bg-white">
        <ProjectionChart
          data={result.projectionPoints}
          chosenLabel={choice.label}
        />
      </div>

      <div className="border border-[#E5E3DC] rounded-lg p-5 bg-white">
        <p className="text-xs font-medium text-[#9C9A94] uppercase tracking-wider mb-4">
          Net worth impact
        </p>
        <div className="grid grid-cols-3 divide-x divide-[#E5E3DC]">
          <ImpactStat label="6 months" value={result.impact.month6} />
          <ImpactStat label="1 year" value={result.impact.year1} />
          <ImpactStat label="5 years" value={result.impact.year5} />
        </div>
      </div>

      <div className="border border-[#E5E3DC] rounded-lg p-5">
        <p className="text-xs font-medium text-[#9C9A94] uppercase tracking-wider mb-2">
          Financial insight
        </p>
        <p className="text-sm text-[#3A3834] leading-relaxed">{result.insight}</p>
      </div>

      <div className="border border-[#E5E3DC] rounded-lg p-5">
        <p className="text-xs font-medium text-[#9C9A94] uppercase tracking-wider mb-2">
          What if you had chosen differently?
        </p>
        <p className="text-sm text-[#3A3834] leading-relaxed">{result.alternativeOutcome}</p>
      </div>

      <div className="bg-[#F5F4F0] border border-[#E5E3DC] rounded-lg p-5">
        <p className="text-xs font-medium text-[#9C9A94] uppercase tracking-wider mb-2">
          Reflection
        </p>
        <p className="text-sm text-[#1C1B19] font-medium leading-relaxed">
          {result.reflection}
        </p>
      </div>

      <div className="pt-2 pb-8">
        <button
          onClick={onReset}
          className="w-full border border-[#1C1B19] rounded-lg py-3 text-sm font-medium text-[#1C1B19] hover:bg-[#1C1B19] hover:text-white transition-colors duration-150"
        >
          Try another scenario
        </button>
      </div>
    </div>
  );
}
