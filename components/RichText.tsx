import { glossary, glossaryTerms } from "@/lib/glossary";
import TermTooltip from "./TermTooltip";
import { Fragment } from "react";

interface Props {
  text: string;
  className?: string;
}

const escaped = glossaryTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const termRegex = new RegExp(`(${escaped.join("|")})`, "gi");

export default function RichText({ text, className }: Props) {
  const parts = text.split(termRegex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const key = glossaryTerms.find((t) => t.toLowerCase() === part.toLowerCase());
        if (key) {
          return <TermTooltip key={i} term={part} definition={glossary[key]} />;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </span>
  );
}
