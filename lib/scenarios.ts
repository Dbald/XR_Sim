import { Scenario } from "./types";

export const scenarios: Scenario[] = [
  {
    id: "tax-refund",
    title: "The Tax Refund",
    subtitle: "You just received $2,400 back from the IRS.",
    context:
      "It's April. You filed your taxes and a $2,400 refund just hit your bank account. You carry $4,800 in credit card debt at 22% APR. Your emergency fund has $600 — enough for maybe two weeks. What do you do with the refund?",
    amount: 2400,
    tag: "decision window: 72 hrs",
    tagColor: "amber",
    choices: [
      {
        id: "vacation",
        label: "Book a vacation",
        description: "You've been grinding. Use it for a trip you've put off.",
        tag: "lifestyle",
        tagColor: "blue",
      },
      {
        id: "pay-debt",
        label: "Pay down credit card debt",
        description: "Attack the 22% APR balance. Half the refund gone, half saved.",
        tag: "highest return",
        tagColor: "green",
      },
      {
        id: "emergency-fund",
        label: "Build emergency fund",
        description: "Put it all in a HYSA. Sleep better at night.",
        tag: "risk reduction",
        tagColor: "blue",
      },
      {
        id: "invest",
        label: "Invest in index funds",
        description: "Long-term thinking. Put it in a brokerage account.",
        tag: "growth",
        tagColor: "green",
      },
    ],
  },
  {
    id: "pay-raise",
    title: "The Raise",
    subtitle: "Your salary just went up $500/month.",
    context:
      "Performance review went well. You're getting a $6,000/year raise — $500 more per month after taxes. You're 28. You have a 401(k) but only contribute 3% (enough to get the match). No other investments. $12,000 in student loans at 5.8% APR. How do you allocate the extra?",
    amount: 500,
    tag: "monthly recurring",
    tagColor: "green",
    choices: [
      {
        id: "lifestyle",
        label: "Upgrade your lifestyle",
        description: "Better apartment, nicer car. You earned it.",
        tag: "lifestyle inflation",
        tagColor: "red",
      },
      {
        id: "max-401k",
        label: "Max out 401(k) contributions",
        description: "Go from 3% to the IRS limit. Tax-advantaged compounding.",
        tag: "highest return",
        tagColor: "green",
      },
      {
        id: "student-loans",
        label: "Aggressively pay student loans",
        description: "Eliminate the debt in 2 years. Guaranteed 5.8% return.",
        tag: "debt freedom",
        tagColor: "amber",
      },
      {
        id: "split",
        label: "Split: half invest, half spend",
        description: "Invest $250, use $250 to improve quality of life.",
        tag: "balanced",
        tagColor: "blue",
      },
    ],
  },
  {
    id: "car-breakdown",
    title: "The Emergency",
    subtitle: "Your car just died. Bill: $1,800.",
    context:
      "It's Monday morning. The mechanic says $1,800 to fix your car. You need it for work. Your emergency fund is empty — you spent it six months ago and haven't rebuilt it. You have one credit card with $2,000 available at 24.99% APR. Your next paycheck is in 10 days.",
    amount: 1800,
    tag: "no emergency fund",
    tagColor: "red",
    choices: [
      {
        id: "credit-card",
        label: "Put it on the credit card",
        description: "Pay minimums. Deal with it slowly. Keep cash for now.",
        tag: "most common",
        tagColor: "red",
      },
      {
        id: "personal-loan",
        label: "Get a personal loan",
        description: "Apply online. 11% APR vs 25%. Lower rate, more paperwork.",
        tag: "smarter debt",
        tagColor: "amber",
      },
      {
        id: "family-help",
        label: "Borrow from family",
        description: "Ask a parent or sibling for an interest-free loan.",
        tag: "lowest cost",
        tagColor: "green",
      },
      {
        id: "negotiate",
        label: "Negotiate with the mechanic",
        description: "Ask for a payment plan, shop quotes, fix only what's critical.",
        tag: "underused option",
        tagColor: "blue",
      },
    ],
  },
];
