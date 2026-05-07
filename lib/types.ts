export interface Choice {
  id: string;
  label: string;
  description: string;
  tag: string;
  tagColor: "green" | "red" | "amber" | "blue";
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  amount: number;
  tag: string;
  tagColor: "green" | "red" | "amber" | "blue";
  choices: Choice[];
}

export interface ProjectionPoint {
  month: number;
  chosen: number;
  optimal: number;
}

export interface SimulationResult {
  consequence: string;
  insight: string;
  reflection: string;
  projectionPoints: ProjectionPoint[];
  impact: {
    month6: number;
    year1: number;
    year5: number;
  };
  alternativeOutcome: string;
  choiceQuality: "poor" | "fair" | "good" | "excellent";
}

export type AppPhase =
  | "landing"
  | "scenario"
  | "deciding"
  | "simulating"
  | "result";
