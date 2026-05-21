// =============================================================================
// recommendation-engine.ts
// AI Spend Audit — Recommendation Engine
// =============================================================================

import {
  AuditInput,
  AuditRecommendation,
  AuditResult,
  WorkflowType,
} from "@/types/audit"

import {
  PLAN_CATALOGUE,
  PlanEntry,
  UseCase,
} from "@/data/tools"

// ---------------------------------------------------------------------------
// Local helper types only
// ---------------------------------------------------------------------------


type PerToolBreakdown = {
  toolId: string

  displayName: string

  currentMonthlySpend: number

  recommendation: string

  estimatedSavings: number

  note: string
}



// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function getPlan(
  toolId: string,
  pricingData: Record<string, PlanEntry> = PLAN_CATALOGUE
): PlanEntry | null {
  return pricingData[toolId] ?? null;
}

function getDisplayName(
  toolId: string,
  pricingData = PLAN_CATALOGUE
): string {
  const p = getPlan(toolId,pricingData);
  return p ? `${p.tool} ${p.plan}` : toolId;
}

/** Returns the vendor family prefix, e.g. "cursor" from "cursor_teams" */
function toolFamily(
  toolId: string
) {
  return toolId.split("-")[0]
}

function getPrimaryWorkflow(
  input: AuditInput
): WorkflowType {
  return input.workflows[0] ?? "mixed"
}

function getBestAlternativeTool(
  workflow: WorkflowType
) {
  switch (workflow) {
    case "coding":
      return [
        "copilot_individual",
        "cursor_pro",
        "windsurf_pro",
      ];

    case "writing":
      return [
        "chatgpt_plus",
        "claude_pro",
      ];

    case "research":
      return [
        "claude_pro",
        "chatgpt_plus",
        "gemini_pro",
      ];

    case "data":
      return [
        "chatgpt_plus",
        "gemini_pro",
      ];

    default:
      return [
        "chatgpt_plus",
      ];
  }
}

// ---------------------------------------------------------------------------
// Rule type
// ---------------------------------------------------------------------------

type Rule = (input: AuditInput, pricingData?: Record<string, PlanEntry>) => AuditRecommendation[];

// ---------------------------------------------------------------------------
// RULE A — Small team on a team-tier plan
// ---------------------------------------------------------------------------
// Team plans (Cursor Teams $40, Claude Team $25, ChatGPT Team $30 …) bundle
// SSO, admin consoles, centralized billing, and usage analytics on top of the
// individual plan price.  For ≤ 2 users these governance features have near-zero
// operational value.  The savings = (team price − individual price) × seats.
// ---------------------------------------------------------------------------
export const ruleA_smallTeamOnTeamPlan: Rule = (input,pricingData = PLAN_CATALOGUE) => {
  if (input.teamSize > 2) return [];
  const recs: AuditRecommendation[] = [];

  for (const sub of input.subscriptions) {
    const plan = getPlan(sub.toolId,pricingData);
    if (!plan || plan.tier !== "team") continue;

    const downgradePlan = plan.nextCheaperPlanId
      ? getPlan(plan.nextCheaperPlanId,pricingData)
      : null;
    if (!downgradePlan) continue;

    const savings = (plan.monthlyPerSeat - downgradePlan.monthlyPerSeat) * sub.seats;
    if (savings <= 0) continue;

    recs.push({
      toolId: sub.toolId,
      title: `${plan.tool} ${plan.plan} is overkill for ${input.teamSize} user(s)`,
      reasoning:
        `${plan.plan} costs $${plan.monthlyPerSeat}/seat/mo and bundles centralized billing, ` +
        `SSO, admin consoles, and usage analytics. With only ${input.teamSize} seat(s), ` +
        `none of these governance features justify the ` +
        `$${plan.monthlyPerSeat - downgradePlan.monthlyPerSeat}/seat premium over ` +
        `${plan.tool} ${downgradePlan.plan} ($${downgradePlan.monthlyPerSeat}/seat/mo). ` +
        `Switching saves $${savings}/mo with identical core AI capability.`,
      action: `Downgrade to ${plan.tool} ${downgradePlan.plan}`,
      estimatedMonthlySavings: savings,
      severity: savings >= 50 ? "high" : "medium",
      sourceRule: "A_small_team_on_team_plan",
      confidence: "high",
      category: "governance",
    });
  }

  return recs;
};

// ---------------------------------------------------------------------------
// RULE B — Premium / Max tier with no evidence of hitting Pro limits
// ---------------------------------------------------------------------------
// Claude Max ($100/mo), Windsurf Max ($200/mo), and Gemini Ultra ($300/mo)
// are designed for users who consistently exhaust the lower plan's usage caps.
// For most teams, Pro-tier limits are never hit.  The savings = the delta
// between the premium and the next cheaper plan × seats.
// ---------------------------------------------------------------------------
export const ruleB_premiumTierOverkill: Rule = (input,pricingData = PLAN_CATALOGUE) => {
  const recs: AuditRecommendation[] = [];

  for (const sub of input.subscriptions) {
    const plan = getPlan(sub.toolId,pricingData);
    if (!plan || plan.tier !== "premium_individual") continue;

    const downgradePlan = plan.nextCheaperPlanId
      ? getPlan(plan.nextCheaperPlanId,pricingData)
      : null;
    if (!downgradePlan) continue;

    const downgradeCost =
      downgradePlan.monthlyPerSeat *
      sub.seats;

    const savings =
      Math.max(
        0,
        sub.monthlySpend -
          downgradeCost
      );
    if (savings <= 0) continue;

    recs.push({
      toolId: sub.toolId,
      title: `${plan.tool} ${plan.plan} — confirm you're consistently hitting ${downgradePlan.plan} limits`,
      reasoning:
        `You're currently spending approximately $${sub.monthlySpend}/mo on ${plan.tool} ${plan.plan}. ` +
        `${downgradePlan.plan} pricing is approximately $${downgradeCost}/mo for ${sub.seats} seat(s), ` +
        `creating a potential savings opportunity of about $${savings}/mo. ` +
        `This tier is cost-justified only when you routinely exhaust ${downgradePlan.plan}'s usage caps. ` +
        `If you haven't hit those caps in the past 30 days, downgrading saves ` +
        `$${savings}/mo with no change in output quality.`,
      action: `Evaluate and downgrade to ${plan.tool} ${downgradePlan.plan} if usage caps aren't hit`,
      estimatedMonthlySavings: savings,
      severity: savings >= 200 ? "high" : "medium",
      sourceRule: "B_premium_tier_overkill",
      confidence: "high",
      category: "governance",
    });
  }

  return recs;
};

// ---------------------------------------------------------------------------
// RULE C — Overlapping conversational AI subscriptions
// ---------------------------------------------------------------------------
// ChatGPT, Claude, and Gemini are general-purpose conversational AI platforms
// with heavily overlapping capability for writing, research, and mixed
// workflows.  Paying for ≥ 2 simultaneously is almost always redundant.
// We keep the cheapest subscription as the "primary" and flag the rest.
// Conservative estimate: 60 % of redundant spend is truly cancellable
// (some teams have genuine workflow divergence across tools).
// ---------------------------------------------------------------------------
export const ruleC_conversationalOverlap: Rule = (input,pricingData = PLAN_CATALOGUE) => {
  const CONVERSATIONAL_FAMILIES = new Set(["chatgpt", "claude", "gemini"]);

  const activeSubs = input.subscriptions.filter((s) =>
    CONVERSATIONAL_FAMILIES.has(toolFamily(s.toolId))
  );

  if (activeSubs.length < 2) return [];

  // Sort descending by spend — the most expensive surplus tools are flagged first
  const sorted = [...activeSubs].sort((a, b) => b.monthlySpend - a.monthlySpend);
  const redundantSpend = sorted.slice(1).reduce((sum, s) => sum + s.monthlySpend, 0);
  const estimatedSavings = Math.round(redundantSpend * 0.6);

  const toolNames = activeSubs.map((s) => getPlan(s.toolId,pricingData)?.tool ?? s.toolId).join(", ");
  const combinedSpend = activeSubs.reduce((s, x) => s + x.monthlySpend, 0);

  return [
    {
      toolId: "cross_tool",
      title: `Overlapping conversational AI tools: ${toolNames}`,
      reasoning:
        `You're paying for ${activeSubs.length} general-purpose AI assistants (${toolNames}). ` +
        `All overlap significantly for ${getPrimaryWorkflow(input)} workflows. ` +
        `Combined spend: $${combinedSpend}/mo. ` +
        `Redundant spend (all but the primary tool): ~$${redundantSpend}/mo. ` +
        `Conservative savings estimate after accounting for any workflow differences: ~$${estimatedSavings}/mo. ` +
        `Pick the one platform that best matches your use case: ` +
        `Claude for writing/research, ChatGPT for data/mixed, Gemini if heavily embedded in Google Workspace.`,
      action: "Consolidate to one conversational AI platform",
      estimatedMonthlySavings: estimatedSavings,
      severity: "high",
      sourceRule: "C_conversational_overlap",
      confidence: "high",
      category: "governance",
    },
  ];
};

// ---------------------------------------------------------------------------
// RULE D — Multiple AI coding assistants
// ---------------------------------------------------------------------------
// Cursor, GitHub Copilot, and Windsurf all provide inline code completion,
// AI chat, and multi-file editing.  No engineering team gets 2× productivity
// from two coding IDEs.  Redundant spend = everything beyond the primary tool.
// ---------------------------------------------------------------------------
export const ruleD_codingAssistantOverlap: Rule = (input,pricingData=PLAN_CATALOGUE) => {
  const CODING_FAMILIES = new Set(["cursor", "copilot", "windsurf"]);

  const activeSubs = input.subscriptions.filter((s) =>
    CODING_FAMILIES.has(toolFamily(s.toolId))
  );

  if (activeSubs.length < 2) return [];

  const sorted = [...activeSubs].sort((a, b) => b.monthlySpend - a.monthlySpend);
  const redundantSpend = sorted.slice(1).reduce((sum, s) => sum + s.monthlySpend, 0);
  const toolNames = activeSubs.map((s) => getPlan(s.toolId,pricingData)?.tool ?? s.toolId).join(" + ");

  return [
    {
      toolId: "cross_tool",
      title: `Duplicate AI coding assistants: ${toolNames}`,
      reasoning:
        `You're paying for ${activeSubs.length} AI coding assistants simultaneously. ` +
        `Cursor, Copilot, and Windsurf all provide code completion, inline chat, and agentic workflows — ` +
        `the core productivity surface is near-identical across all three. ` +
        `Redundant spend (everything beyond the primary tool): ~$${redundantSpend}/mo. ` +
        `Best practice: one IDE-native tool per developer. ` +
        `Cursor or Windsurf for heavy agentic workflows; Copilot if the team is GitHub-centric ` +
        `and prefers lighter-weight completion without switching editors.`,
      action: "Consolidate to one AI coding assistant",
      estimatedMonthlySavings: redundantSpend,
      severity: "high",
      sourceRule: "D_coding_assistant_overlap",
      confidence: "high",
      category: "governance",
    },
  ];
};

// ---------------------------------------------------------------------------
// RULE E — Lovable + IDE coding assistant overlap
// ---------------------------------------------------------------------------
// Lovable (MVP/prototyping) and Cursor/Windsurf (ongoing development) serve
// different phases of the product lifecycle but overlap on "generate a working
// app from a prompt."  Early-stage teams often rely on one for everything.
// Flag as low severity since both can legitimately coexist; advise a usage audit.
// ---------------------------------------------------------------------------
export const ruleE_lovableAndCodingIdeOverlap: Rule = (input) => {
  const lovableSub = input.subscriptions.find(
    (s) => toolFamily(s.toolId) === "lovable" && s.monthlySpend > 0
  );

  const hasActiveIde = input.subscriptions.some((s) =>
    ["cursor", "windsurf"].includes(toolFamily(s.toolId)) && s.monthlySpend > 0
  );

  if (!lovableSub || !hasActiveIde) return [];

  const conservativeSavings = Math.round(lovableSub.monthlySpend * 0.5);

  return [
    {
      toolId: lovableSub.toolId,
      title: "Lovable + IDE coding assistant — audit which phase dominates",
      reasoning:
        `Lovable excels at rapid MVP generation (idea → working app in minutes), ` +
        `while Cursor/Windsurf are optimised for iterative production development. ` +
        `They are complementary but can overlap if one phase isn't active. ` +
        `If Lovable is used only occasionally or prototyping isn't your current focus, ` +
        `pausing it saves ~$${lovableSub.monthlySpend}/mo. ` +
        `Conservative estimate if underused: ~$${conservativeSavings}/mo.`,
      action: "Audit Lovable usage frequency — pause if not actively prototyping",
      estimatedMonthlySavings: conservativeSavings,
      severity: "low",
      sourceRule: "E_lovable_ide_overlap",
      confidence: "high",
      category: "governance",
    },
  ];
};

// ---------------------------------------------------------------------------
// RULE F — Tool not optimised for primary use case
// ---------------------------------------------------------------------------
// Each plan in the catalogue declares which use cases it fits.  A coding-first
// team paying for Gemini Pro (fit: writing/research/data) is paying for
// capabilities that have minimal overlap with their actual workflow.
// Only flag when spend is ≥ $20/mo to avoid noise on trivial subscriptions.
// ---------------------------------------------------------------------------
export const ruleF_useCaseMismatch: Rule = (input,pricingData = PLAN_CATALOGUE) => {
  const recs: AuditRecommendation[] = [];

  for (const sub of input.subscriptions) {
    const plan = getPlan(sub.toolId,pricingData);
    if (!plan || plan.monthlyPerSeat === 0) continue; // skip free / usage-based
    if (sub.monthlySpend < 20) continue;             // not worth flagging
    if (plan.useCaseFit.includes(getPrimaryWorkflow(input))) continue; // good fit

    recs.push({
      toolId: sub.toolId,
      title: `${plan.tool} ${plan.plan} doesn't align with your primary use case (${getPrimaryWorkflow(input)})`,
      reasoning:
        `${plan.tool} is optimised for ${plan.useCaseFit.join(" / ")} workflows. ` +
        `Your primary use case is "${getPrimaryWorkflow(input)}", where this tool provides ` +
        `limited incremental value beyond tools already in your stack. ` +
        `At $${sub.monthlySpend}/mo, verify it is actively used for tasks no other ` +
        `subscription already covers — if not, cancellation recovers the full $${sub.monthlySpend}/mo.`,
      action: `Review active usage of ${plan.tool} — cancel if underutilised`,
      estimatedMonthlySavings: sub.monthlySpend,
      severity: "medium",
      sourceRule: "F_use_case_mismatch",
      confidence: "high",
      category: "governance",
    });
  }

  return recs;
};

// ---------------------------------------------------------------------------
// RULE G — Enterprise plan for a non-enterprise team
// ---------------------------------------------------------------------------
// Enterprise tiers add SCIM, audit logs, compliance APIs, role-based access
// controls, and enterprise SSO — all justified when IT governance is a real
// requirement.  For teams of ≤ 25, these controls are almost always unused.
// Savings = (enterprise price − next cheaper tier price) × seats.
// ---------------------------------------------------------------------------
export const ruleG_enterprisePlanOverkill: Rule = (input,pricingData = PLAN_CATALOGUE) => {
  if (input.teamSize > 25) return []; // legitimately enterprise; skip
  const recs: AuditRecommendation[] = [];

  for (const sub of input.subscriptions) {
    const plan = getPlan(sub.toolId,pricingData);
    if (!plan || plan.tier !== "enterprise") continue;

    const downgradePlan = plan.nextCheaperPlanId
      ? getPlan(plan.nextCheaperPlanId,pricingData)
      : null;
    if (!downgradePlan) continue;

    const savings = (plan.monthlyPerSeat - downgradePlan.monthlyPerSeat) * sub.seats;
    if (savings <= 0) continue;

    recs.push({
      toolId: sub.toolId,
      title: `${plan.tool} Enterprise — likely overkill for a ${input.teamSize}-person team`,
      reasoning:
        `Enterprise plans bundle SCIM provisioning, audit logs, compliance APIs, and centralized IT governance. ` +
        `With ${input.teamSize} people, these controls almost certainly aren't active requirements yet. ` +
        `${plan.tool} ${downgradePlan.plan} ($${downgradePlan.monthlyPerSeat}/seat/mo) provides ` +
        `the same core AI capability at $${plan.monthlyPerSeat - downgradePlan.monthlyPerSeat}/seat less. ` +
        `Savings: ~$${savings}/mo. Revisit Enterprise when you have active compliance or procurement requirements.`,
      action: `Downgrade to ${plan.tool} ${downgradePlan.plan}`,
      estimatedMonthlySavings: savings,
      severity: savings >= 200 ? "high" : "medium",
      sourceRule: "G_enterprise_overkill",
      confidence: "high",
      category: "governance",
    });
  }

  return recs;
};

// ---------------------------------------------------------------------------
// RULE H — API direct spend: model tier optimisation
// ---------------------------------------------------------------------------
// For Claude API: Haiku 4.5 costs $1/MTok input vs Sonnet 4.6 at $3/MTok
// and Opus 4.7 at $5/MTok.  Most high-volume tasks (summarisation, classification,
// extraction, formatting) run equally well on Haiku.  Only complex reasoning
// genuinely requires Sonnet or Opus.
// Conservative estimate: 60 % of API spend is on tasks a cheaper model handles
// equally well.  Only fire when monthly API spend ≥ $100.
// ---------------------------------------------------------------------------
export const ruleH_apiModelOptimization: Rule = (input,pricingData = PLAN_CATALOGUE) => {
  const recs: AuditRecommendation[] = [];

  for (const sub of input.subscriptions) {
    if (!sub.toolId.endsWith("_api")) continue;
    if (sub.monthlySpend < 100) continue; // below noise threshold

    const plan = getPlan(sub.toolId,pricingData);
    const toolName = plan?.tool ?? sub.toolId;
    const potentialSavings = Math.round(sub.monthlySpend * 0.6);

    recs.push({
      toolId: sub.toolId,
      title: `${toolName} API — $${sub.monthlySpend}/mo spend, check model routing`,
      reasoning:
        `API costs are almost entirely driven by model selection. ` +
        `For ${toolName}: Opus 4.7 costs $5/MTok input + $25/MTok output; ` +
        `Sonnet 4.6 costs $3/$15; Haiku 4.5 costs $1/$5 — a 5–25× price range. ` +
        `High-volume lightweight tasks (summarisation, classification, formatting, extraction) ` +
        `run equally well on Haiku. Only route to Sonnet/Opus when deep reasoning is genuinely required. ` +
        `Conservative estimate: 60 % of your $${sub.monthlySpend}/mo is on tasks Haiku handles fine. ` +
        `Potential monthly saving from model routing: ~$${potentialSavings}.`,
      action: "Audit API call patterns and route lightweight tasks to Haiku 4.5",
      estimatedMonthlySavings: potentialSavings,
      severity: potentialSavings >= 200 ? "high" : "medium",
      sourceRule: "H_api_model_optimization",
      confidence: "high",
      category: "governance",
    });
  }

  return recs;
};

// ---------------------------------------------------------------------------
// RULE I — Annual billing discount opportunity
// ---------------------------------------------------------------------------
// Claude Pro: $20/mo monthly → $17/mo annually  (saves $3/seat/mo = $36/seat/yr)
// ChatGPT Team: $30/mo monthly → $25/mo annually (saves $5/seat/mo = $60/seat/yr)
// Claude Team Standard: $25/mo → $20/mo annually (saves $5/seat/mo)
// Only fire when savings ≥ $5/mo (below that it's noise).
// ---------------------------------------------------------------------------
export const ruleI_annualBillingOpportunity: Rule = (input,pricingData = PLAN_CATALOGUE) => {
  const recs: AuditRecommendation[] = [];

  for (const sub of input.subscriptions) {
    const plan = getPlan(sub.toolId,pricingData);
    if (!plan || plan.monthlyPerSeat === 0) continue;
    if (plan.annualPerSeat >= plan.monthlyPerSeat) continue; // no discount available

    const discountPerSeat = plan.monthlyPerSeat - plan.annualPerSeat;
    const monthlySavings = discountPerSeat * sub.seats;
    if (monthlySavings < 5) continue;

    recs.push({
      toolId: sub.toolId,
      title: `Switch ${plan.tool} ${plan.plan} to annual billing`,
      reasoning:
        `${plan.tool} ${plan.plan} costs $${plan.monthlyPerSeat}/seat/mo on monthly billing ` +
        `vs $${plan.annualPerSeat}/seat/mo annually — a $${discountPerSeat}/seat/mo discount ` +
        `($${Math.round(discountPerSeat * 12)}/seat/yr) for committing to a year. ` +
        `With ${sub.seats} seat(s), switching to annual saves $${monthlySavings}/mo ` +
        `($${monthlySavings * 12}/yr) with zero change in features or functionality.`,
      action: `Switch ${plan.tool} ${plan.plan} to annual billing`,
      estimatedMonthlySavings: monthlySavings,
      severity: monthlySavings >= 20 ? "medium" : "low",
      sourceRule: "I_annual_billing_opportunity",
      confidence: "high",
      category: "governance",
    });
  }

  return recs;
};

// ---------------------------------------------------------------------------
// RULE J — Coding-only tools for non-coding teams
// ---------------------------------------------------------------------------
// Cursor, Copilot, and Windsurf are IDE-native coding assistants.  Their core
// value — inline completions, agent workflows, codebase understanding — is
// irrelevant to writing, research, or data teams.  These teams are paying a
// coding-specialist price for a need that ChatGPT Plus or Claude Pro already
// covers at equal or lower cost.  Savings = full subscription cost.
// ---------------------------------------------------------------------------
export const ruleJ_codingToolForNonCodingTeam: Rule = (input,pricingData = PLAN_CATALOGUE) => {
  const NON_CODING_USE_CASES = new Set<UseCase>(["writing", "research", "data"]);
  if (!NON_CODING_USE_CASES.has(getPrimaryWorkflow(input))) return [];

  const CODING_IDE_FAMILIES = new Set(["cursor", "copilot", "windsurf"]);
  const recs: AuditRecommendation[] = [];

  for (const sub of input.subscriptions) {
    const plan = getPlan(sub.toolId,pricingData);
    if (!plan || !CODING_IDE_FAMILIES.has(toolFamily(sub.toolId))) continue;
    if (sub.monthlySpend === 0) continue;

    recs.push({
      toolId: sub.toolId,
      title: `${plan.tool} — low utilisation expected for a ${getPrimaryWorkflow(input)}-focused team`,
      reasoning:
        `${plan.tool} is an IDE-native coding assistant. Its core value is code completion, ` +
        `debugging, and AI-assisted software development. Your primary use case is "${getPrimaryWorkflow(input)}", ` +
        `which this tool is not designed for. A ${getPrimaryWorkflow(input)} team likely uses less than ` +
        `20 % of this tool's actual capabilities. At $${sub.monthlySpend}/mo, you're paying a ` +
        `coding-specialist price for a workflow that ChatGPT Plus ($20/mo) or Claude Pro ($20/mo) ` +
        `already handles at equal or lower cost.`,
      action: `Cancel ${plan.tool} — ${getPrimaryWorkflow(input)} workflows don't require an IDE coding assistant`,
      estimatedMonthlySavings: sub.monthlySpend,
      severity: "high",
      sourceRule: "J_coding_tool_for_noncoding_team",
      confidence: "high",
      category: "governance",
    });
  }

  return recs;
};

// ---------------------------------------------------------------------------
// RULE K — Subscription pricing mismatch
// ---------------------------------------------------------------------------
// Compare reported spend vs expected vendor pricing.
// Helps detect:
// - pricing misconfiguration
// - overpayment
// - incorrect plan assumptions
// - annual billing inconsistencies
// ---------------------------------------------------------------------------

export const ruleK_pricingMismatch: Rule = (input,pricingData = PLAN_CATALOGUE) => {
  const recs: AuditRecommendation[] = [];

  for (const sub of input.subscriptions) {
    const plan = getPlan(sub.toolId,pricingData);

    if (!plan) continue;

    // Skip usage-based API plans
    if (sub.toolId.endsWith("_api")) continue;

    const expectedSpend =
      plan.monthlyPerSeat * sub.seats;

    // Ignore free plans
    if (expectedSpend === 0) continue;

    const difference =
      sub.monthlySpend -
      expectedSpend;

    const differencePercent =
      Math.abs(difference) /
      expectedSpend;

    // Ignore tiny mismatches
    if (differencePercent < 0.2)
      continue;

    // User paying MORE than expected
    if (difference > 0) {
      recs.push({
        toolId: sub.toolId,

        title:
          `${plan.tool} pricing appears higher than expected`,

        reasoning:
          `Based on official pricing, ${plan.tool} ${plan.plan} should cost approximately ` +
          `$${expectedSpend}/mo for ${sub.seats} seat(s) ` +
          `($${plan.monthlyPerSeat}/seat). ` +
          `Your reported spend is $${sub.monthlySpend}/mo, which is ~$${difference}/mo higher than expected. ` +
          `This may indicate unnecessary add-ons, duplicate billing, unused seats, or incorrect plan allocation.`,

        action:
          `Review ${plan.tool} billing configuration and active seat allocation`,

        estimatedMonthlySavings:
          Math.round(difference),

        severity:
          difference >= 100
            ? "high"
            : "medium",

        sourceRule:
          "K_pricing_mismatch",

        confidence: "medium",

        category: "billing",
      });
    }

    // User paying LESS than expected
    else {
      recs.push({
        toolId: sub.toolId,

        title:
          `${plan.tool} spend differs from standard pricing`,

        reasoning:
          `Official pricing for ${plan.tool} ${plan.plan} is approximately ` +
          `$${expectedSpend}/mo for ${sub.seats} seat(s), but your reported spend is ` +
          `$${sub.monthlySpend}/mo. ` +
          `This may reflect annual billing discounts, promotional credits, regional pricing, or inconsistent reporting.`,

        action:
          `Verify billing accuracy and pricing assumptions`,

        estimatedMonthlySavings: 0,

        severity: "low",

        sourceRule:
          "K_pricing_mismatch",

        confidence: "low",

        category: "billing",
      });
    }
  }

  return recs;
};

// ---------------------------------------------------------------------------
// RULE L — Cheaper better-fit alternative exists
// ---------------------------------------------------------------------------

export const ruleL_betterAlternativeExists: Rule = (
  input,pricingData = PLAN_CATALOGUE
) => {
  const recs: AuditRecommendation[] = [];

  const workflow =
    getPrimaryWorkflow(input);

  const alternatives =
    getBestAlternativeTool(
      workflow
    );

  for (const sub of input.subscriptions) {
    const currentPlan =
      getPlan(sub.toolId,pricingData);

    if (!currentPlan) continue;

    if (
      currentPlan.useCaseFit.includes(
        workflow
      )
    ) {
      continue;
    }

    for (const altToolId of alternatives) {
      const altPlan =
        getPlan(altToolId,pricingData);

      if (!altPlan) continue;

      const altCost =
        altPlan.monthlyPerSeat *
        sub.seats;

      if (
        altCost >=
        sub.monthlySpend
      ) {
        continue;
      }

      const savings =
        sub.monthlySpend -
        altCost;

      recs.push({
        toolId: sub.toolId,

        title:
          `${altPlan.tool} may be a better fit than ${currentPlan.tool}`,

        reasoning:
          `${currentPlan.tool} is not strongly optimized for ${workflow} workflows. ` +
          `${altPlan.tool} ${altPlan.plan} aligns more closely with your primary workflow and would cost approximately ` +
          `$${altCost}/mo for ${sub.seats} seat(s) instead of your current ` +
          `$${sub.monthlySpend}/mo spend. ` +
          `Potential savings: ~$${savings}/mo while maintaining similar or better workflow alignment.`,

        action:
          `Evaluate replacing ${currentPlan.tool} with ${altPlan.tool} ${altPlan.plan}`,

        estimatedMonthlySavings:
          Math.round(savings),

        severity:
          savings >= 100
            ? "high"
            : "medium",

        sourceRule:
          "L_better_alternative",

        confidence: "medium",

        category: "api-optimization",
      });

      break;
    }
  }

  return recs;
};

// ---------------------------------------------------------------------------
// De-duplication
// ---------------------------------------------------------------------------
// If multiple rules fire on the same toolId, keep only the recommendation with
// the highest estimated savings.  This prevents double-counting a single
// subscription's spend across overlapping rules.
// "cross_tool" recommendations are never deduplicated against each other since
// they represent distinct overlap patterns (conversational vs coding).
// ---------------------------------------------------------------------------
function deduplicateRecommendations(
  recs: AuditRecommendation[]
): AuditRecommendation[] {
  const byKey = new Map<string, AuditRecommendation>();

  for (const rec of recs) {
    // Give cross_tool recs a unique key so they're never collapsed together
    const key =
      rec.toolId === "cross_tool" ? `cross_tool_${rec.sourceRule}` : rec.toolId;

    const existing = byKey.get(key);
    if (!existing || rec.estimatedMonthlySavings > existing.estimatedMonthlySavings) {
      byKey.set(key, rec);
    }
  }

  return Array.from(byKey.values());
}

// Per-tool breakdown

function buildPerToolBreakdown(
  input: AuditInput,
  recommendations: AuditRecommendation[],
  pricingData=PLAN_CATALOGUE
): PerToolBreakdown[] {
  

  return input.subscriptions.map((sub) => {
    const plan = getPlan(sub.toolId,pricingData);
    const directRecommendation =
      recommendations.find(
        (recommendation) =>
          recommendation.toolId ===
          sub.toolId
      )

    const overlapRecommendation =
      recommendations.find(
        (recommendation) =>
          recommendation.toolId === "cross_tool" &&
          recommendation.reasoning
            .toLowerCase()
            .includes(
              toolFamily(sub.toolId)
            )
      )

    const rec =
      directRecommendation ||
      overlapRecommendation
    const displayName = getDisplayName(sub.toolId);

    if (!rec) {
      return {
        toolId: sub.toolId,
        displayName,
        currentMonthlySpend: sub.monthlySpend,
        recommendation: "Keep as-is",
        estimatedSavings: 0,
        note: plan
          ? `${plan.tool} ${plan.plan} appears well-suited for your team's profile.`
          : "No optimisation identified.",
      };
    }

    // Use only the first sentence of reasoning as the short note
    const shortNote = rec.reasoning.split(".")[0] + ".";

    return {
      toolId: sub.toolId,
      displayName,
      currentMonthlySpend: sub.monthlySpend,
      recommendation: rec.action,
      estimatedSavings: rec.estimatedMonthlySavings,
      note: shortNote,
    };
  });
}

// ---------------------------------------------------------------------------
// generateAudit — main export
// ---------------------------------------------------------------------------

const ALL_RULES: Rule[] = [
  ruleA_smallTeamOnTeamPlan,
  ruleB_premiumTierOverkill,
  ruleC_conversationalOverlap,
  ruleD_codingAssistantOverlap,
  ruleE_lovableAndCodingIdeOverlap,
  ruleF_useCaseMismatch,
  ruleG_enterprisePlanOverkill,
  ruleH_apiModelOptimization,
  ruleI_annualBillingOpportunity,
  ruleJ_codingToolForNonCodingTeam,
  ruleK_pricingMismatch,
  ruleL_betterAlternativeExists,
];

export function generateAudit(input: AuditInput,pricingData=PLAN_CATALOGUE): AuditResult {
  // 1. Run every rule and collect raw recommendations
  const rawRecs = ALL_RULES.flatMap((rule) =>
    rule(input, pricingData)
  );

  // 2. De-duplicate: same toolId → keep highest-savings rec
  const recommendations = deduplicateRecommendations(rawRecs);

  // 3. Sort descending by savings — highest impact appears first
  recommendations.sort((a, b) => b.estimatedMonthlySavings - a.estimatedMonthlySavings);

  // 4. Aggregate totals
  const totalMonthlySpend = input.subscriptions.reduce(
    (sum, s) => sum + s.monthlySpend,
    0
  );

  const rawMonthlySavings = recommendations.reduce(
    (sum, r) => sum + r.estimatedMonthlySavings,
    0
  );

  const estimatedMonthlySavings =rawMonthlySavings

  const estimatedAnnualSavings = estimatedMonthlySavings * 12;

  const savingsPercent =
    totalMonthlySpend > 0
      ? Math.round((estimatedMonthlySavings / totalMonthlySpend) * 100)
      : 0;

  // 5. Per-tool breakdown for the results table
  const perToolBreakdown = buildPerToolBreakdown(input, recommendations);

  const optimizationScore = Math.max(0, 100 - savingsPercent);

  return {
    totalMonthlySpend,
    estimatedMonthlySavings,
    estimatedAnnualSavings,
    savingsPercent,
    optimizationScore,
    perToolBreakdown,
    recommendations,
    isAlreadyOptimal: estimatedMonthlySavings < 100,
    isHighSavings: estimatedMonthlySavings > 500,
  };
}