# Claude Research

Source:
https://claude.com/pricing

Verified:
2026-05-07

---

# Overview

Claude is a conversational AI assistant optimized for writing, reasoning, research, long-context workflows, and collaborative AI productivity.

Claude supports both direct subscription plans and API-based developer usage.

---

# Primary Use Case Fit

| Use Case | Fit | Notes |
|---|---|---|
| Coding | Moderate | Useful for coding assistance and reasoning |
| Writing | Excellent | Strong long-form writing and editing capabilities |
| Research | Excellent | Strong reasoning and long-context support |
| Data Analysis | Moderate | Useful for analytical workflows |
| Mixed Team Usage | Excellent | Suitable for broad organizational productivity |

---

# Claude Plans

## Free

Price:
- $0

Best For:
- casual users
- evaluation
- lightweight AI usage

Features:
- chat access
- content generation
- web/mobile/desktop usage
- basic AI workflows

Limitations:
- lower usage limits
- reduced priority access

---

## Pro

Price:
- $17/month billed annually
- $20/month billed monthly

Best For:
- professionals
- researchers
- writers
- power users

Features:
- increased usage limits
- Claude Code
- Claude Cowork
- unlimited projects
- access to advanced Claude models

Potential Audit Insights:
- Strong value for heavy writing/research workflows
- Often sufficient for individual professional usage

---

## Max

Price:
- Starts at $100/month

Best For:
- extremely heavy AI users
- advanced productivity workflows
- organizations with intensive AI usage

Features:
- 5x or 20x more usage than Pro
- higher output limits
- priority access during peak traffic
- early feature access

Potential Overkill Indicators:
- casual or moderate users
- startups with inconsistent usage patterns

Potential Audit Insights:
- Heavy spend should be justified by clear productivity dependence

---

## Team

Price:
- Standard seat:
  - $20/seat monthly billed annually
  - $25/seat billed monthly

- Premium seat:
  - $100/seat monthly billed annually
  - $125/seat billed monthly

Best For:
- collaborative teams
- startups
- organizations needing centralized management

Features:
- Claude Code and Claude Cowork
- Microsoft 365 integration
- Slack integrations
- enterprise search
- centralized billing
- SSO
- administration tooling

Potential Overkill Indicators:
- teams under 3 users
- no collaboration workflows
- no admin requirements

Possible Downgrade Path:
- Claude Pro

Potential Audit Insights:
- Small teams may not fully utilize enterprise collaboration capabilities

---

## Enterprise

Price:
- Custom pricing
- Seat pricing + API usage pricing

Best For:
- large organizations
- compliance-heavy enterprises
- regulated environments

Features:
- admin spend limits
- role-based permissions
- SCIM
- audit logs
- compliance APIs
- advanced observability

Potential Overkill Indicators:
- early-stage startups
- organizations without governance requirements

Potential Audit Insights:
- Enterprise governance costs should align with actual compliance requirements

---

# API Direct Pricing

Source:
https://claude.com/pricing#api

---

## Opus 4.7

Input:
- $5 / MTok

Output:
- $25 / MTok

Best For:
- advanced reasoning
- coding agents
- premium intelligence workloads

---

## Sonnet 4.6

Input:
- $3 / MTok

Output:
- $15 / MTok

Best For:
- balanced intelligence and cost optimization

Potential Audit Insights:
- Often the best balance for production applications

---

## Haiku 4.5

Input:
- $1 / MTok

Output:
- $5 / MTok

Best For:
- lightweight high-volume workloads
- cost-sensitive applications

Potential Audit Insights:
- Organizations using expensive models for lightweight tasks may reduce costs significantly

---

# Workflow Insights

## Writing Workflows

Claude performs exceptionally well for:
- long-form writing
- editing
- summarization
- documentation

---

## Research Workflows

Strong capabilities:
- reasoning
- document analysis
- contextual understanding

---

## Coding Workflows

Moderate-to-strong capabilities:
- debugging
- code generation
- reasoning-heavy engineering tasks

However:
- less IDE-native than Cursor or Copilot

---

# Audit Logic Ideas

## Rule 1

If:
- Team size <= 2
- Using Claude Team

Recommendation:
- Consider Claude Pro

Reason:
- Collaboration and administration tooling may be underutilized for very small teams.

---

## Rule 2

If:
- Using Max plan
- Moderate AI usage patterns

Recommendation:
- Evaluate Claude Pro

Reason:
- Premium usage limits may exceed current operational requirements.

---

## Rule 3

If:
- Using expensive API models for lightweight workflows

Recommendation:
- Evaluate Haiku models

Reason:
- Lower-cost models may sufficiently support high-volume lightweight operations.

---

## Rule 4

If:
- Paying for multiple writing-focused AI subscriptions

Recommendation:
- Review workflow overlap between Claude and ChatGPT subscriptions

Reason:
- Multiple conversational AI subscriptions may create redundant spend.