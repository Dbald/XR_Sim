"use client";

import { useState } from "react";
import { AppPhase, Scenario, Choice, SimulationResult } from "@/lib/types";
import { scenarios } from "@/lib/scenarios";
import ScenarioCard from "@/components/ScenarioCard";
import ChoicePanel from "@/components/ChoicePanel";
import ResultPanel from "@/components/ResultPanel";

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>("landing");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSelectScenario(scenario: Scenario) {
    setSelectedScenario(scenario);
    setPhase("deciding");
  }

  async function handleChoose(choice: Choice) {
    if (!selectedScenario) return;
    setSelectedChoice(choice);
    setPhase("simulating");
    setError(null);

    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: selectedScenario, choice }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Request failed: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
      setPhase("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setPhase("deciding");
    }
  }

  function handleReset() {
    setPhase("landing");
    setSelectedScenario(null);
    setSelectedChoice(null);
    setResult(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <header className="border-b border-[#E5E3DC] bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-sm font-semibold tracking-tight text-[#1C1B19] hover:opacity-70 transition-opacity"
          >
            XR Sim
          </button>
          <span className="text-xs text-[#9C9A94]">Financial Decision Simulator</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {phase === "landing" && (
          <div>
            <div className="mb-10">
              <h1 className="text-3xl font-semibold text-[#1C1B19] mb-3 leading-tight">
                What would you actually do?
              </h1>
              <p className="text-base text-[#9C9A94] max-w-lg leading-relaxed">
                Financial literacy is not a reading problem. It&apos;s a simulation problem.
                Choose a scenario and make a real decision — then see where it leads.
              </p>
            </div>

            <div className="mb-3">
              <p className="text-xs font-medium text-[#9C9A94] uppercase tracking-wider">
                Choose a scenario
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-1">
              {scenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  onSelect={handleSelectScenario}
                />
              ))}
            </div>

            <p className="mt-8 text-xs text-[#9C9A94] text-center">
              Simulations are powered by Claude AI and are illustrative.
            </p>
          </div>
        )}

        {phase === "deciding" && selectedScenario && (
          <>
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <ChoicePanel
              scenario={selectedScenario}
              onChoose={handleChoose}
              onBack={handleReset}
            />
          </>
        )}

        {phase === "simulating" && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-8 h-8 border-2 border-[#1C1B19] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[#9C9A94]">Simulating your financial future…</p>
          </div>
        )}

        {phase === "result" && result && selectedScenario && selectedChoice && (
          <ResultPanel
            result={result}
            scenario={selectedScenario}
            choice={selectedChoice}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
