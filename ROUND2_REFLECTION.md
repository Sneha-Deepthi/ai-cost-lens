## 1. What was the most uncomfortable trade-off you made because of the time pressure?

The most uncomfortable trade-off was choosing implementation completeness over production-grade infrastructure. I intentionally kept the pricing update workflow manually triggered through a centralized `PLAN_CATALOGUE` instead of building automated pricing ingestion or scraping.

Another difficult trade-off was around GitHub Actions and deployment orchestration. Triggering scheduled re-audit workflows without merging into production initially became more complicated than expected. I spent a noticeable amount of time debugging branch-triggered workflows, deployment URLs, and scheduled execution behavior. Under normal circumstances I would have built a cleaner environment-aware workflow setup, but due to time pressure I prioritized getting a stable working pipeline first.

The diff view was also more complex than expected. Maintaining both historical and regenerated audit states side-by-side required changing the persistence model itself instead of simply building a frontend comparison component. That forced database schema changes, snapshot persistence, and recommendation comparison logic adjustments late into implementation.

I consciously avoided over-engineering and focused on delivering a believable, end-to-end user experience that fully satisfied the assignment requirements.

---

## 2. If we extended the deadline by another 24 hours right now, what’s the first thing you’d do?

The very first thing I would do is implement automated pricing ingestion and normalization.

Right now pricing updates are manually controlled through the shared `PLAN_CATALOGUE`, which works for the assignment but would eventually become difficult to maintain in production. I would build a small ingestion pipeline that periodically fetches pricing updates from trusted sources, validates the structure, and stores versioned pricing snapshots automatically.

That would significantly improve the realism of the re-audit system because the workflow would become fully autonomous:
- pricing changes occur externally
- ingestion detects updates
- audits regenerate automatically
- users receive updated recommendations without any manual intervention

I would also add queue-based processing for re-audit generation and email delivery because the current synchronous flow inside `/api/detect-changes` could become expensive at scale.

Finally, I would improve recommendation diff intelligence so comparisons are based on semantic matching instead of recommendation titles alone.

---

## 3. Looking back at your Round 1 codebase as a now-experienced user of it, what’s one thing your Round 1 self made harder for your Round 2 self?

The biggest issue from Round 1 was not centralizing pricing and recommendation-related data structures early enough.

Pricing definitions existed in multiple places:
- frontend display logic
- recommendation engine
- helper utilities

This became a major problem during Round 2 because re-audit accuracy depends heavily on historical pricing consistency. I had to refactor the architecture mid-implementation by migrating everything into a shared `tools.ts` pricing catalogue and removing duplicated pricing sources.

Another thing that made Round 2 harder was that audits were initially treated more like generated frontend views rather than immutable historical records. For the re-audit workflow, I needed:
- persisted audit snapshots
- historical pricing state
- recommendation snapshots
- consistent regeneration inputs

That required modifying the database schema and restructuring how audit pages rendered data.

If I redesigned Round 1 today, I would treat every audit as a versioned immutable snapshot from the beginning because it makes historical comparisons, diffs, and regeneration workflows dramatically simpler.