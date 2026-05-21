## 2026-05-20 10:30 — Started reviewing Round 2 requirements

Read the complete Round 2 assignment documentation carefully before touching the codebase.

Focused on understanding:
- what qualifies as a proper “re-audit”
- how reviewers expect the diff experience to behave
- required deliverables and repo structure
- expectations around commits and documentation quality

Initially assumed this would mainly be a cron/email task, but after reading the requirements realized the core challenge was preserving historical audit state and generating meaningful comparisons.

---

## 2026-05-20 13:00 — Began implementation planning

Started actual implementation work.

Decided to extend the existing Round 1 architecture instead of rebuilding the audit system.

Main architectural decisions:
- keep Supabase as the persistence layer
- preserve historical pricing snapshots
- store full audit outputs
- build re-audit generation as a backend workflow
- avoid introducing unnecessary infrastructure

Also decided early to prioritize:
- believable product UX
- end-to-end completeness
- reviewer clarity

instead of adding overly complex systems.

---

## 2026-05-20 13:20 — Refactored pricing architecture

Realized pricing definitions existed in multiple places:
- frontend
- recommendation engine
- utility logic

This would make pricing diff detection inconsistent.

Refactored pricing into a centralized shared source:
- migrated `PLAN_CATALOGUE` into `tools.ts`
- removed duplicated frontend pricing structures
- removed separate engine-side pricing definitions
- updated recommendation engine to consume the shared pricing catalogue

This became the foundation for reliable pricing snapshot comparison.

Commit references:
- `refactor: prepare audit engine for pricing snapshot support`
- `refactor: migrate audit pages to canonical audit_result snapshot structure`

---

## 2026-05-20 14:05 — Updated audit persistence model

Modified database persistence flow to support future re-audits.

Added support for:
- `pricing_snapshot`
- persisted recommendation snapshots
- canonical `audit_result`
- historical pricing comparison support

Also updated audit pages to render from persisted snapshots instead of dynamically recomputing recommendations.

This ensured old audits remained historically accurate after future pricing changes.

Commit reference:
- `feat: add pricing snapshot persistence and audit change detection`

---

## 2026-05-20 14:30 — Took a break

Paused after completing the initial architecture migration and schema changes.

---

## 2026-05-20 16:00 — Implemented pricing change detection workflow

Started building the actual re-audit pipeline.

Created:
- pricing comparison utilities
- change detection helpers
- re-audit workflow endpoint

Built:
`POST /api/detect-changes`

The endpoint:
1. loads stored audits
2. compares historical pricing snapshots against latest pricing
3. identifies affected audits
4. reruns recommendations
5. stores regenerated audits

Initially regenerated audits incorrectly because the recommendation engine expected normalized input structures.

Spent significant time debugging regeneration inconsistencies.

Commit reference:
- `feat: add automated re-audit generation for pricing changes`

---

## 2026-05-20 17:05 — Fixed re-audit regeneration accuracy

Discovered regenerated audits were not faithfully reproducing original user inputs.

Root cause:
- stored `input_stack` structure differed slightly from runtime recommendation-engine expectations

Fixed by reconstructing the original request shape using:
- companyName
- teamSize
- workflows
- subscriptions

from persisted audit input data.

This significantly improved re-audit correctness.

Also added:
- regenerated audit persistence
- latest audit linking

Commit reference:
- `feat: persist regenerated audits and link emails to latest audit reports`

---

## 2026-05-20 18:00 — Implemented notification pipeline

Integrated Resend email notifications.

Initial implementation sent one email per affected audit, but this would spam users if multiple audits changed simultaneously.

Refactored notification flow to:
- group notifications by user email
- send consolidated pricing update summaries
- include re-audit comparison links
- highlight updated savings impact

Commit reference:
- `feat: implement automated re-audit email notification pipeline`
- `feat: consolidate re-audit notifications and enrich pricing update emails`

---

## 2026-05-20 18:40 — Added scheduling support

Implemented automated workflow triggering.

Initially explored Vercel Cron but switched approach because of plan limitations.

Configured:
- endpoint-based workflow triggering
- deploy-safe re-audit endpoint handling
- branch/deployment testing support

Also tested simulated pricing changes manually.

Commit references:
- `feat: add scheduled pricing re-audit workflow automation`
- `chore: configure deployed re-audit workflow endpoint`
- `chore: enable branch-triggered re-audit workflow`
- `test: simulate pricing change for automated re-audit flow`

---

## 2026-05-20 19:00 — Took a short break

Paused briefly before beginning the diff UI implementation.

---

## 2026-05-20 19:30 — Started diff page implementation

Built:
`/audit/diff/[oldId]/[newId]`

Initial implementation only displayed changed recommendation text.

After reviewing the assignment wording again, realized the requirement strongly implied:
- side-by-side comparisons
- visually obvious differences
- clear savings delta emphasis

Pivoted toward building a full audit comparison experience instead of a lightweight text diff.

---

## 2026-05-20 20:20 — Reworked audit comparison experience

Implemented:
- side-by-side audit rendering
- pricing change cards
- recommendation highlighting
- old vs updated metric comparisons
- savings delta emphasis

Preserved the original audit card styling to keep the diff experience visually consistent with the existing product.

Also muted unchanged states and highlighted changed recommendations using colors instead of excessive labels.

Commit reference:
- `feat: improve re-audit comparison workflow and audit diff experience`

---

## 2026-05-20 21:10 — Fixed diff rendering edge cases

Encountered several rendering issues:
- null recommendation arrays
- NaN savings values
- missing diff states
- incorrect recommendation comparisons

Added defensive handling and fallback rendering for incomplete audit states.

Improved:
- recommendation diff logic
- recommendation comparison matching
- side-by-side rendering stability

---

## 2026-05-20 22:00 — Took another short break

Paused briefly after stabilizing the first working diff experience.

---

## 2026-05-20 22:30 — Connected full end-to-end flow

Verified complete workflow:

1. Create audit
2. Persist pricing snapshot
3. Modify pricing
4. Trigger detect-changes endpoint
5. Generate updated audit
6. Persist pricing changes
7. Send consolidated email
8. Open diff page
9. Compare audits visually

This was the first fully working end-to-end version of the feature.

---

## 2026-05-21 00:30 — Finished implementation for the night

Stopped implementation after stabilizing:
- audit regeneration
- pricing detection
- notification grouping
- diff rendering
- comparison UX

Remaining work was mostly:
- cleanup
- testing
- documentation

---

## 2026-05-21 10:30 — Continued testing and refinement

Resumed work.

Performed:
- manual workflow testing
- Supabase validation
- diff verification
- email routing checks
- pricing comparison testing

Also cleaned:
- unstable comparison states
- duplicated rendering logic
- inconsistent metric cards

---

## 2026-05-21 11:15 — Improved visual comparison UX

Adjusted the comparison experience to better match assignment expectations.

Changes:
- reused original audit page styling
- rendered old/new audits side-by-side
- emphasized total savings delta
- simplified recommendation change indicators
- relied more on visual highlighting than textual explanation

This made the diff page feel substantially more product-like.

Commit reference:
- `feat: improve re-audit comparison workflow and audit diff experience`

---

## 2026-05-21 12:30 — Took a break

Paused before starting required documentation deliverables.

---

## 2026-05-21 13:30 — Started documentation work

Prepared:
- PR summary
- implementation walkthrough
- testing instructions
- tradeoff explanations
- open risks
- reflection notes

Also reviewed commit history carefully to ensure:
- commits reflected actual development progression
- commit names matched implementation stages
- timeline remained believable and accurate

---

## 2026-05-21 14:15 — Final review and cleanup

Performed final pass over:
- diff rendering
- pricing comparison
- re-audit persistence
- email links
- testing instructions
- markdown formatting

Verified repo structure matched assignment expectations and ensured required files existed at repository root.