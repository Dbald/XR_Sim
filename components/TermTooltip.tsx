"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  term: string;
  definition: string;
}

export default function TermTooltip({ term, definition }: Props) {
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setAbove(rect.top > 140);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <span ref={ref} className="relative inline">
      <span
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="border-b border-dashed border-[#9C9A94] cursor-help"
      >
        {term}
      </span>

      {open && (
        <span
          className={`absolute z-50 w-64 bg-[#1C1B19] text-white text-xs rounded-lg p-3 leading-relaxed shadow-lg pointer-events-none
            left-1/2 -translate-x-1/2 ${above ? "bottom-full mb-2" : "top-full mt-2"}`}
          style={{ whiteSpace: "normal" }}
        >
          <strong className="font-semibold block mb-1">{term}</strong>
          {definition}
          <span
            className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent
              ${above ? "top-full border-t-[#1C1B19]" : "bottom-full border-b-[#1C1B19]"}`}
          />
        </span>
      )}
    </span>
  );
}
