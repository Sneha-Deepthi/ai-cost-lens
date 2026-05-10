## Overview

The application uses an LLM only for generating personalized audit summaries after the deterministic recommendation engine completes its calculations.

The recommendation engine itself is intentionally rule-based and deterministic.

The LLM is used only for:
- summarization
- personalization
- improving readability of audit results

This separation keeps:
- pricing calculations explainable
- optimization logic deterministic
- recommendations financially defensible
- audit outputs reproducible

---

# Full Prompts Used

## System Prompt

```txt
You are an AI infrastructure financial analyst.
```

---

## User Prompt

```txt
You are generating a concise executive audit summary for a startup reviewing its AI tooling spend.

Audit data:
- Total monthly spend: ₹{totalMonthlySpend}
- Estimated monthly savings: ₹{estimatedMonthlySavings}
- Estimated annual savings: ₹{estimatedAnnualSavings}
- Optimization score: {optimizationScore}/100

Top recommendations:
{recommendations}

Requirements:
- Write approximately 100 words
- Professional but concise tone
- Sound financially credible
- Mention operational efficiency
- Do not exaggerate savings
- Avoid marketing language
- Make the summary feel tailored to the audit
```

---

# Why These Prompts Were Written This Way

## 1. Short System Prompt

The system prompt was intentionally kept minimal:

```txt
You are an AI infrastructure financial analyst.
```

Longer system prompts reduced consistency and sometimes caused:
- repetitive wording
- unnecessary verbosity
- over-structured outputs

A shorter system prompt produced:
- cleaner summaries
- more natural tone
- better consistency

---

## 2. Structured Audit Inputs

The prompt explicitly includes:
- total spend
- monthly savings
- annual savings
- optimization score
- recommendation reasoning

This helps the model generate summaries that feel:
- specific
- financially grounded
- personalized

instead of generic AI-generated business summaries.

---

## 3. Tone Constraints

The prompt explicitly instructs the model to:
- avoid marketing language
- avoid exaggerated savings claims
- sound financially credible

Without these constraints, the model frequently produced:
- overly optimistic language
- unrealistic claims
- startup-marketing style wording

The summaries needed to feel:
- operationally realistic
- trustworthy
- finance-oriented

because the application is an AI spend audit platform.

---

## 4. Length Constraints

The prompt requests:
```txt
approximately 100 words
```

This decision was made because:
- long summaries reduced readability
- dashboards should remain scannable
- concise summaries fit better inside audit reports

Shorter summaries also improved:
- UI clarity
- dashboard balance
- mobile responsiveness

---

# What Was Tried That Didn’t Work

## 1. Extremely Detailed Prompts

Early prompts included:
- raw subscription JSON
- pricing breakdowns
- complete tool metadata
- long behavioral instructions

Problems:
- outputs became inconsistent
- summaries became too verbose
- token usage increased unnecessarily
- recommendations became repetitive

Simplifying the prompt improved:
- clarity
- consistency
- readability

---

## 2. Allowing Creative Freedom

Earlier prompt versions did not constrain tone strongly enough.

This caused outputs like:
- "massive savings opportunity"
- "transform your AI infrastructure"
- "dramatically reduce costs"

These summaries felt:
- unrealistic
- overly promotional
- less trustworthy

Adding explicit realism constraints improved credibility significantly.

---

## 3. Using AI for Recommendation Logic

An early idea was to allow the LLM to:
- generate recommendations
- estimate savings
- decide downgrade paths

This approach was rejected because:
- recommendations became inconsistent
- financial reasoning became difficult to verify
- outputs were not deterministic
- savings estimates varied between runs

The final architecture keeps:
- recommendation logic deterministic
- financial calculations rule-based
- AI usage limited to summarization only

This produced significantly more reliable audit behavior.

---

## 4. Anthropic API Integration

Anthropic Claude was initially evaluated for summary generation because it aligned well with the product domain and produced strong summarization quality during early testing.

However, the implementation was later migrated to OpenAI because:
- OpenAI onboarding was faster during MVP development
- API setup and integration were simpler for rapid iteration
- Anthropic API usage required prepaid billing credits during development
- OpenAI provided a smoother development workflow for testing and iteration

The architecture keeps provider-specific logic isolated so future switching between providers remains straightforward.

---

# Fallback Handling

The application includes deterministic fallback summaries.

Fallback summaries are used when:
- API quota is exceeded
- network failures occur
- the LLM provider is unavailable
- invalid responses are returned

This ensures:
- the audit flow never breaks
- users always receive a summary
- the recommendation engine remains usable even without AI availability

Fallback summaries intentionally remain:
- conservative
- readable
- operationally realistic

---

# Architectural Reasoning

The application intentionally separates:
- deterministic audit logic
- AI-generated summarization

The recommendation engine handles:
- pricing calculations
- downgrade analysis
- overlap detection
- optimization heuristics

The LLM only converts structured audit outputs into:
- concise executive summaries
- human-readable insights

This separation improves:
- explainability
- maintainability
- debugging
- trustworthiness
- reproducibility

---

# Future Improvements

Potential future enhancements include:
- provider abstraction for OpenAI/Anthropic switching
- streaming summary generation
- summary tone customization
- multilingual audit summaries
- benchmark-aware summaries using industry comparison data
- caching generated summaries to reduce API usage