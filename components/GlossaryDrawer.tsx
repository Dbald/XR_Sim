"use client";

import { useEffect } from "react";
import { glossary } from "@/lib/glossary";

const sorted = Object.entries(glossary).sort(([a], [b]) => a.localeCompare(b));

const letters = [...new Set(sorted.map(([term]) => term[0].toUpperCase()))];

interface Props {
  onClose: () => void;
}

export default function GlossaryDrawer({ onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />

      <div className="relative ml-auto w-full max-w-md h-full bg-[#FAFAF8] border-l border-[#E5E3DC] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E3DC]">
          <div>
            <h2 className="text-base font-semibold text-[#1C1B19]">Glossary</h2>
            <p className="text-xs text-[#9C9A94] mt-0.5">{sorted.length} financial terms</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#9C9A94] hover:text-[#1C1B19] transition-colors text-lg leading-none p-1"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-1 px-6 pt-3 pb-2 flex-wrap">
          {letters.map((l) => (
            <a
              key={l}
              href={`#gl-${l}`}
              className="text-xs font-medium text-[#9C9A94] hover:text-[#1C1B19] transition-colors px-1"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 px-6 pb-10">
          {letters.map((letter) => (
            <div key={letter} id={`gl-${letter}`} className="mb-6">
              <p className="text-xs font-semibold text-[#9C9A94] uppercase tracking-widest mb-3 pt-2">
                {letter}
              </p>
              <div className="space-y-4">
                {sorted
                  .filter(([term]) => term[0].toUpperCase() === letter)
                  .map(([term, definition]) => (
                    <div key={term} className="border-b border-[#E5E3DC] pb-4 last:border-0">
                      <p className="text-sm font-semibold text-[#1C1B19] mb-1">{term}</p>
                      <p className="text-sm text-[#3A3834] leading-relaxed">{definition}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
