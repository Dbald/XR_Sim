import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { Scenario, Choice } from "@/lib/types";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { scenario, choice }: { scenario: Scenario; choice: Choice } =
    await req.json();

  const prompt = `You are a financial literacy simulator. A user just made a financial decision and you need to simulate the realistic outcome.

SCENARIO: ${scenario.title}
Context: ${scenario.context}
Amount involved: $${scenario.amount.toLocaleString()}

USER'S CHOICE: "${choice.label}" — ${choice.description}

Generate a simulation result as a JSON object with EXACTLY this structure (return ONLY valid JSON, no other text, no markdown):

{
  "consequence": "2-3 sentences describing the immediate and near-term consequence of this specific choice. Be concrete with dollar amounts and realistic outcomes.",
  "insight": "1-2 sentences about the hidden financial cost or benefit that most people don't immediately see when making this type of decision.",
  "reflection": "A single thought-provoking question that challenges how they think about this decision. Make it personal and specific to their situation.",
  "projectionPoints": [
    { "month": 0, "chosen": 0, "optimal": 0 },
    { "month": 1, "chosen": <number>, "optimal": <number> },
    { "month": 2, "chosen": <number>, "optimal": <number> },
    { "month": 3, "chosen": <number>, "optimal": <number> },
    { "month": 6, "chosen": <number>, "optimal": <number> },
    { "month": 9, "chosen": <number>, "optimal": <number> },
    { "month": 12, "chosen": <number>, "optimal": <number> },
    { "month": 18, "chosen": <number>, "optimal": <number> },
    { "month": 24, "chosen": <number>, "optimal": <number> }
  ],
  "impact": {
    "month6": <net worth difference between chosen and optimal at 6 months, as a number>,
    "year1": <net worth difference at 12 months, as a number>,
    "year5": <estimated net worth difference at 5 years, as a number>
  },
  "alternativeOutcome": "1-2 sentences describing the concrete financial outcome if they had made the optimal choice instead.",
  "choiceQuality": "<one of: poor, fair, good, excellent>"
}

For projectionPoints:
- "chosen" represents the cumulative net worth change (positive or negative) from THIS decision over time
- "optimal" represents the cumulative net worth change from the BEST financial choice for this scenario
- Use realistic dollar amounts based on the $${scenario.amount.toLocaleString()} involved
- Month 0 is always 0 for both (starting point)
- Show compounding effects, interest costs, and opportunity costs realistically

For choiceQuality:
- "poor": high cost, lifestyle inflation, or predatory debt
- "fair": not optimal but reasonable
- "good": solid financial thinking
- "excellent": maximizes financial wellbeing`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 2000,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thinking: { type: "adaptive" } as any,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from model" },
        { status: 500 }
      );
    }

    let jsonText = textBlock.text.trim();
    // Strip markdown code fences if present
    jsonText = jsonText.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "");

    const result = JSON.parse(jsonText);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Simulation error:", error);
    return NextResponse.json(
      { error: "Failed to generate simulation" },
      { status: 500 }
    );
  }
}
