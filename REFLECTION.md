# Reflection

## 1. The hardest bug I hit this week, and how I debugged it

The hardest bug I encountered involved the AI-generated audit summary flow. The audit pages were rendering correctly, but the summary section was either missing entirely or causing runtime failures. The main error was:

```text
Cannot read properties of undefined (reading 'slice')
```

and later:

```text
Cannot read properties of undefined (reading 'toLocaleString')
```

At first, I assumed the issue was caused by the OpenAI API response shape changing unexpectedly. I inspected the API payloads and added logging around the response parsing logic, but the OpenAI responses were actually valid. My next hypothesis was that the audit object being passed into the summary generation utility was incomplete.

I traced the request flow from:
- homepage form submission
- recommendation engine
- `/api/save-audit`
- summary generation route
- database persistence

Eventually I discovered that the summary generation utility expected fields such as:
- `recommendations`
- `estimatedMonthlySavings`

but the audit object being passed into the function did not always include them consistently. In one path, summary generation was triggered before the full audit object had been normalized.

To fix it, I:
- added safer fallback handling
- normalized audit object structures
- added optional chaining and default values
- implemented fallback summary generation logic

The issue taught me that AI integrations often fail because of surrounding application state assumptions rather than the AI response itself.

---

## 2. A decision I reversed mid-week, and what made me reverse it

One major decision I reversed was how public audit sharing should work.

Initially, I planned to keep everything inside a single audit page and simply allow users to copy the current URL as a share link. This approach seemed simpler because it avoided maintaining separate routes and separate rendering logic.

However, after implementing it, I realized several problems:
- private lead information could accidentally become coupled with public data
- metadata previews would not work cleanly
- shareability felt incomplete
- the UX was confusing between editable and public states

I eventually redesigned the flow into:
- homepage
- internal/generated audit page
- dedicated public shareable audit page

This separation dramatically improved the architecture. Public reports became cleaner, easier to cache, safer from a privacy standpoint, and more aligned with how real SaaS reporting products behave.

The reversal happened after noticing that “simple now” would create larger structural problems later. It was a good reminder that architectural shortcuts often become expensive when features expand.

---

## 3. What I would build in week 2 if I had it

If I had an additional week, I would focus heavily on transforming the project from a polished prototype into a more production-oriented SaaS platform.

The first major improvement would be real pricing intelligence integration. Currently, the recommendation engine uses manually verified pricing data and rule-based heuristics. I would build automated pricing ingestion pipelines or integrations with vendor APIs so recommendations remain continuously updated.

Second, I would add authentication and organization dashboards. Right now audits are mostly stateless and shareable. In week 2, I would introduce:
- user accounts
- audit history
- organization workspaces
- saved recommendations
- recurring audits

Third, I would redesign the recommendation engine into a more explainable system. I would like each optimization recommendation to show:
- confidence scores
- reasoning traces
- overlap explanations
- estimated risk levels

I would also add PDF export support because many teams would want downloadable reports for procurement or finance discussions.

On the infrastructure side, I would move AI summary generation into asynchronous background jobs and introduce caching to reduce response latency and API costs.

Finally, I would improve analytics and experimentation support using PostHog or a similar tool to track:
- audit completion rates
- share conversions
- lead capture performance
- most common tooling overlaps

That would help evolve the project from a technical demo into a more measurable product.

---

## 4. How I used AI tools

I used AI tools extensively throughout the project, primarily for acceleration, debugging assistance, documentation drafting, and UI iteration.

The main tools I used were:
- ChatGPT
- GitHub Copilot
- Cursor AI assistance

I used them for:
- debugging runtime errors
- brainstorming architecture approaches
- refining UI copy
- generating Tailwind layout variations
- improving TypeScript typing
- drafting markdown documentation
- reviewing edge cases in recommendation logic
- helping structure entrepreneurial and GTM-focused documentation
- learning how to properly write automated tests using Vitest
- accelerating unfamiliar workflows due to time constraints

I was significantly less experienced with entrepreneurial writing compared to frontend and backend engineering work, so I used ChatGPT heavily while drafting files such as:
- GTM strategy
- economics reasoning
- metrics planning
- landing page positioning

I also relied on AI assistance while writing automated tests because I had very limited prior experience writing formal test suites with Vitest. In those situations, I used AI primarily as a learning and acceleration tool while still validating the logic, assertions, and overall behavior manually.

However, I did not fully trust AI-generated code blindly. I especially avoided trusting:
- database schema assumptions
- environment variable handling
- API response typing
- routing behavior
- deployment configuration

One specific example where AI was wrong involved the public audit sharing flow. An AI-generated suggestion mixed client-side event handlers into a server component, which caused:

```text
Event handlers cannot be passed to Client Component props
```

At first glance the suggestion looked correct, but after reviewing the component boundaries carefully, I realized the issue came from incorrectly placing interactive logic inside a server-rendered component.

I fixed it by:
- separating the interactive share button into a dedicated client component
- keeping the page itself server-rendered

That moment reinforced the importance of understanding the framework deeply instead of relying on generated code mechanically.

I treated AI primarily as an accelerator and collaborator, not as an autonomous engineer.

---

## 5. Self-rating

## Discipline — 8/10

I maintained consistent progress across the week, documented development daily, and kept commits structured, although some days involved longer debugging cycles than planned.

---

## Code Quality — 7/10

The codebase is modular and reasonably organized, but some parts were optimized for rapid iteration rather than long-term maintainability or scalability.

---

## Design Sense — 8/10

I invested significant effort into visual polish, hierarchy, spacing, gradients, and report presentation to make the product feel closer to a real SaaS application.

---

## Problem Solving — 9/10

Most blockers involved debugging framework behavior, architecture restructuring, or integration issues, and I was able to systematically isolate and resolve them.

---

## Entrepreneurial Thinking — 8/10

I tried to think beyond just building features by considering:
- viral sharing loops
- lead capture
- public report UX
- product credibility
- scalability opportunities

rather than treating the project purely as a coding exercise.

---