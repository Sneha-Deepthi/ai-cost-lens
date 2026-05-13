# Metrics

## North Star Metric

### Qualified Audit Leads Per Month

A “qualified audit lead” is defined as:
- a completed audit
- with meaningful AI tooling spend
- where the user submits lead information
- and matches the target ICP (startup engineering or AI-focused teams)

This is the most important metric because AI Cost Lens is fundamentally a B2B lead-generation and qualification product rather than a traditional engagement product.

The goal is not maximizing page views or daily active users.

The goal is identifying startups with:
- real AI infrastructure spend,
- optimization pain,
- and high likelihood of converting into Credex customers.

A smaller number of highly qualified audit leads is significantly more valuable than large amounts of low-intent traffic.

---

# Input Metrics

## 1. Audit Completion Rate

```text
Completed Audits / Audit Starts
```

This measures:
- landing page clarity,
- onboarding friction,
- and recommendation engine usability.

If users begin audits but fail to complete them, the acquisition funnel becomes inefficient regardless of traffic quality.

Target:
```text
> 60%
```

---

## 2. Lead Capture Rate

```text
Lead Submissions / Completed Audits
```

This measures whether the generated audit feels valuable enough for users to exchange contact information.

Strong lead capture suggests:
- recommendations feel credible,
- savings appear meaningful,
- and the report experience creates trust.

Target:
```text
15–25%
```

---

## 3. Public Share Rate

```text
Public Share Links Generated / Completed Audits
```

This measures whether users perceive the audit as:
- useful,
- credible,
- and worth sharing internally or publicly.

This is especially important because the shareable report system acts as the primary organic growth loop.

Target:
```text
20%+
```

---

# What I Would Instrument First

The first instrumentation priorities would be:

## Funnel Events

Track:
- audit started
- audit completed
- lead form viewed
- lead form submitted
- public share button clicked
- public report opened

This would help identify:
- drop-off points,
- weak recommendation experiences,
- and whether users actually engage with public reports.

---

## Recommendation Analytics

Track:
- most common overlapping tools
- average estimated savings
- high-savings audit frequency
- most frequently triggered recommendations

This would help improve:
- recommendation quality,
- pricing assumptions,
- and positioning strategy.

---

## Distribution Attribution

Track where users originated from:
- Reddit
- X
- Discord
- Slack
- direct shares

This is critical because the product relies heavily on community-driven acquisition.

---

# Pivot Threshold

The clearest pivot signal would be:

```text
Lead capture rate below 5%
```

after:
- at least 500 completed audits.

That would suggest one of several problems:
- users do not trust the recommendations,
- savings are not compelling,
- the product solves a weak pain point,
- or the report quality is insufficient.

Another strong negative signal would be:

```text
Public share rate below 10%
```

because the viral distribution loop is central to the product strategy.

If users do not share reports internally or externally, acquisition costs become much harder to scale organically.

At that point, I would likely pivot toward:
- deeper infrastructure optimization tooling,
- direct billing integrations,
- or internal procurement dashboards

instead of lightweight public audits.

---