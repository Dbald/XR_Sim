"use client";

import { Scenario, Choice } from "@/lib/types";
import TagBadge from "./TagBadge";

interface Props {
  scenario: Scenario;
  onChoose: (choice: Choice) => void;
  onBack: () => void;
}

export default function ChoicePanel({ scenario, onChoose, onBack }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="text-sm text-[#9C9A94] hover:text-[#1C1B19] mb-6 flex items-center gap-1 transition-colors"
      >
        ← Back to scenarios
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1C1B19] mb-2">
          {scenario.title}
        </h2>
        <div className="bg-[#F5F4F0] border border-[#E5E3DC] rounded-lg p-5">
          <p className="text-sm leading-relaxed text-[#3A3834]">
            {scenario.context}
          </p>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-xs font-medium text-[#9C9A94] uppercase tracking-wider">
          What do you do?
        </p>
      </div>

      <div className="space-y-3">
        {scenario.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onChoose(choice)}
            className="w-full text-left border border-[#E5E3DC] rounded-lg p-4 hover:border-[#1C1B19] hover:bg-white hover:shadow-sm transition-all duration-150 group"
          >
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="text-sm font-medium text-[#1C1B19]">
                {choice.label}
              </span>
              <TagBadge label={choice.tag} color={choice.tagColor} />
            </div>
            <p className="text-sm text-[#9C9A94]">{choice.description}</p>
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs text-[#9C9A94] text-center">
        No right or wrong. Just consequences.
      </p>
    </div>
  );
}
