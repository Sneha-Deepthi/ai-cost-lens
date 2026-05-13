# PRICING_DATA.md

Every number used in the recommendation engine traces to an official vendor pricing page.

All pricing values were verified against official pricing documentation between:
- 2026-05-06
- 2026-05-08

All prices are normalized into approximate monthly USD equivalents where required.

Pricing may change over time as vendors update public plans and enterprise offerings.

---

# Cursor

Official Pricing Source:  
https://cursor.com/pricing

Verified: 2026-05-07

| Plan | Price | Billing |
|---|---|---|
| Hobby | $0/month | — |
| Pro | $20/user/month | Monthly |
| Teams | $40/user/month | Monthly |
| Enterprise | Custom (floor estimate: $60/user/month used in engine) | Custom |

Notes:
- Hobby plan has limited AI requests and is not viable for professional daily usage.
- Teams adds RBAC, SAML/OIDC SSO, shared chats, usage analytics, and centralized billing.
- Enterprise adds audit logs, SCIM, invoice billing, and priority support.
- Enterprise pricing is not publicly disclosed; conservative internal estimation values are used in the engine.
- No annual discount documented on the public pricing page as of verification date.

---

# GitHub Copilot

Official Pricing Source:  
https://github.com/features/copilot/plans

Verified: 2026-05-07

| Plan | Price | Billing |
|---|---|---|
| Individual | $10/user/month | Monthly |
| Business | $19/user/month | Monthly |
| Enterprise | $39/user/month | Monthly |

Notes:
- Individual includes AI code completion and chat inside supported IDEs.
- Business adds organization management, policy controls, and centralized billing.
- Enterprise adds advanced governance, enterprise security, and audit controls.
- No annual discount documented on the public pricing page as of verification date.

---

# Claude

Official Pricing Source:  
https://claude.com/pricing

Verified: 2026-05-07

| Plan | Monthly Price | Annual Price (per seat/month) |
|---|---|---|
| Free | $0 | — |
| Pro | $20/month | $17/month (billed annually) |
| Max | $100/month | $100/month |
| Team (Standard) | $25/seat/month | $20/seat/month (billed annually) |
| Team (Premium) | $125/seat/month | $100/seat/month (billed annually) |
| Enterprise | Custom (floor estimate: $150/seat/month used in engine) | Custom |
| API Direct | Usage-based (see API section below) | — |

Notes:
- Pro annual billing saves $3/seat/month ($36/seat/year).
- Team Standard annual billing saves $5/seat/month ($60/seat/year).
- Team Premium annual billing saves $25/seat/month ($300/seat/year).
- Max is designed for users who consistently exhaust Pro usage caps.
- Enterprise pricing is not publicly disclosed; conservative internal estimation values are used in the engine.
- Enterprise adds SCIM, audit logs, compliance APIs, role-based permissions, and admin spend controls.

## Claude API Pricing

Official Pricing Source:  
https://claude.com/pricing#api

Verified: 2026-05-07

| Model | Input | Output |
|---|---|---|
| Claude Opus 4.7 | $5.00 / MTok | $25.00 / MTok |
| Claude Sonnet 4.6 | $3.00 / MTok | $15.00 / MTok |
| Claude Haiku 4.5 | $1.00 / MTok | $5.00 / MTok |

Notes:
- MTok = 1 million tokens.
- Haiku is significantly cheaper than Sonnet and Opus for lightweight workloads.
- Haiku is suitable for summarization, extraction, classification, and formatting tasks.
- Sonnet and Opus are better suited for advanced reasoning workloads.
- The recommendation engine uses conservative API routing optimization assumptions.

---

# ChatGPT

Official Pricing Source:  
https://chatgpt.com/pricing

Verified: 2026-05-07

| Plan | Monthly Price | Annual Price (per seat/month) |
|---|---|---|
| Plus | $20/month | $20/month |
| Team | $30/user/month | $25/user/month (billed annually) |
| Enterprise | Custom (floor estimate: $60/user/month used in engine) | Custom |
| API Direct | Usage-based (see OpenAI API pricing) | — |

Notes:
- Team annual billing saves $5/seat/month ($60/seat/year).
- Team adds shared workspaces, centralized billing, admin controls, SAML SSO, and GPT analytics.
- Enterprise pricing is not publicly disclosed; conservative internal estimation values are used in the engine.
- Enterprise adds SCIM, compliance tooling, regional data controls, and advanced governance features.

## OpenAI API Pricing

Official Pricing Source:  
https://openai.com/api/pricing/

Verified: 2026-05-07

Notes:
- API pricing is usage-based and varies significantly by model tier.
- Recommendation logic treats API subscriptions as workload-based spend.
- API optimization recommendations are triggered when spend exceeds predefined thresholds.

---

# Gemini

Official Pricing Source:  
https://gemini.google/subscriptions/

Verified: 2026-05-07

Prices converted to approximate USD equivalents where applicable.

| Plan | Price | Notes |
|---|---|---|
| Pro | ~$20/month ($1,950/month in India) | Individual |
| Ultra | ~$300/month ($24,500/month in India) | Heavy multimodal usage |
| API Direct | Usage-based | See Google AI Dev pricing |

Official API Pricing Source:  
https://ai.google.dev/gemini-api/docs/pricing

Verified: 2026-05-07

Notes:
- Gemini Ultra pricing converted using approximate exchange-rate normalization.
- Gemini Pro is strongly positioned for Google Workspace-integrated teams.
- No annual discount documented on the public pricing page as of verification date.

---

# Windsurf

Official Pricing Source:  
https://windsurf.com/pricing

Verified: 2026-05-07

| Plan | Price | Billing |
|---|---|---|
| Free | $0/month | — |
| Pro | ~$20/month | Monthly |
| Teams | ~$40/user/month | Monthly |
| Max | ~$200/month | Monthly |
| Enterprise | Custom (floor estimate: $60/user/month used in engine) | Custom |

Notes:
- Pro includes expanded Cascade AI usage and agentic coding workflows.
- Teams adds centralized billing, collaboration tooling, and admin workflows.
- Max is designed for extremely high AI usage environments.
- Enterprise pricing is not publicly disclosed; conservative internal estimation values are used in the engine.
- Enterprise includes SSO, RBAC, and advanced governance tooling.
- Windsurf pricing marked as approximate due to evolving public pricing information.

---

# Lovable

Official Pricing Source:  
https://lovable.dev/pricing

Verified: 2026-05-07

| Plan | Price | Credits |
|---|---|---|
| Free | $0/month | 5 daily / 30 monthly |
| Pro | $25/month | 100 monthly credits |
| Business | $50/month | Collaboration features included |
| Enterprise | Custom platform pricing | Volume-based |

Notes:
- Lovable uses a credit-based pricing model rather than seat-based pricing.
- Pro is optimized for solo founders and indie builders.
- Business adds publishing controls, collaboration features, and SSO support.
- Credit consumption varies based on AI generation complexity.

---

# Engine Estimation Methodology

## Enterprise Plan Floor Estimates

Several vendors do not publicly disclose exact enterprise pricing.

The engine uses conservative floor estimates for:
- Cursor Enterprise
- ChatGPT Enterprise
- Claude Enterprise
- Windsurf Enterprise

These values are intentionally conservative to avoid exaggerated savings projections.

---

## Redundant Subscription Savings

### Conversational AI Overlap

Applies to:
- ChatGPT
- Claude
- Gemini

The engine assumes:
- 60% of overlapping spend may be recoverable
- 40% operational overlap buffer remains for legitimate workflow differences

---

### Coding Assistant Overlap

Applies to:
- Cursor
- GitHub Copilot
- Windsurf

The engine assumes:
- secondary coding assistant subscriptions may represent redundant engineering spend
- overlap recommendations remain conservative and workflow-aware

---

## API Model Routing Savings

API optimization recommendations are triggered when:
- monthly API spend exceeds operational thresholds

The engine assumes:
- lightweight workloads may not require premium reasoning models
- routing simpler tasks to cheaper model tiers can significantly reduce spend

---

## Annual Billing Savings

Documented annual discounts currently modeled:

| Tool | Monthly | Annual Equivalent | Savings |
|---|---|---|---|
| Claude Pro | $20 | $17 | $3/month |
| Claude Team Standard | $25 | $20 | $5/month |
| Claude Team Premium | $125 | $100 | $25/month |
| ChatGPT Team | $30 | $25 | $5/month |

---

## Savings Cap

Total estimated savings are capped at 90% of total monthly spend.

The engine intentionally avoids unrealistic:
- full-elimination assumptions
- exaggerated optimization claims
- impossible operational savings

---

# Recommendation Engine Philosophy

The recommendation engine is designed to produce:
- explainable recommendations
- realistic savings estimates
- financially defensible optimization logic
- maintainable pricing intelligence
- trustworthy SaaS audit reasoning

The engine intentionally favors:
- conservative estimates
- operational realism
- workflow-aware optimization
- pricing traceability
- transparent financial assumptions

---