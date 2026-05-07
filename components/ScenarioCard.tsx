"use client";

import { Scenario } from "@/lib/types";
import TagBadge from "./TagBadge";

interface Props {
  scenario: Scenario;
  onSelect: (scenario: Scenario) => void;
}

export default function ScenarioCard({ scenario, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(scenario)}
      className="w-full text-left border border-[#E5E3DC] rounded-lg p-5 hover:border-[#1C1B19] hover:shadow-sm transition-all duration-150 bg-white group"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-base font-semibold text-[#1C1B19] group-hover:underline">
          {scenario.title}
        </h3>
        <TagBadge label={scenario.tag} color={scenario.tagColor} />
      </div>
      <p className="text-sm text-[#9C9A94] leading-relaxed">
        {scenario.subtitle}
      </p>
      <div className="mt-4 pt-3 border-t border-[#E5E3DC] flex items-center justify-between">
        <span className="text-xs text-[#9C9A94]">
          {scenario.choices.length} choices
        </span>
        <span className="text-xs font-medium text-[#1C1B19] opacity-0 group-hover:opacity-100 transition-opacity">
          Begin simulation →
        </span>
      </div>
    </button>
  );
}
