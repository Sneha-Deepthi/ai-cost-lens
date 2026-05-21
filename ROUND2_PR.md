## What this PR does

This PR adds an automated AI tooling re-audit system that detects pricing changes and re-evaluates previously submitted audits against updated plan pricing.

When pricing changes are detected, affected users receive a consolidated email containing updated savings estimates and a clickable re-audit comparison link. The comparison page shows the original audit and updated audit side-by-side with highlighted recommendation differences and pricing impact.

The feature includes:
- pricing snapshot persistence
- pricing diff detection
- re-audit generation
- consolidated notifications
- side-by-side audit diff UI

---

## Why

AI tooling pricing changes frequently, especially for products like ChatGPT, Claude, Cursor, and other subscription-based developer tooling.

A recommendation that was optimal when the user originally ran the audit may no longer be optimal weeks later after pricing changes. This system ensures recommendations stay current without requiring users to manually re-run audits.

I assumed users primarily care about:
- clear savings impact
- actionable recommendation changes
- seeing exactly what changed
- avoiding notification spam

---

## How it works

### Audit Creation

When a user submits an audit:
- current pricing data is stored as `pricing_snapshot`
- the audit result is stored in Supabase
- recommendation output is persisted

### Pricing Change Detection

A scheduled/manual trigger calls:

```bash
POST /api/detect-changes
```

This endpoint:
1. loads all previous audits
2. compares stored pricing snapshots against the latest `PLAN_CATALOGUE`
3. detects affected tools and pricing deltas
4. reruns the recommendation engine using the original audit inputs
5. creates a new audit record
6. stores pricing change metadata
7. groups notifications by user email
8. sends one consolidated re-audit email per user

### Re-Audit Diff View

The email contains a clickable diff link:

```txt
/audit/diff/[oldId]/[newId]
```

The diff page:
- displays pricing changes detected
- shows savings delta as the primary headline
- renders previous and updated audits side-by-side
- visually highlights recommendation differences
- keeps unchanged metrics muted

### Flow

```txt
User Audit
    ↓
Store pricing snapshot
    ↓
Pricing changes occur
    ↓
Detect changes endpoint runs
    ↓
Recommendation engine reruns
    ↓
New audit created
    ↓
Consolidated email sent
    ↓
User opens side-by-side diff view
```

---

## What I cut

- Did not implement unsubscribe links yet because I prioritized completing the full diff workflow and consolidated notification system first.
- Did not build a public pricing change dashboard due to time constraints.
- Did not implement a dedicated admin dashboard for monitoring re-audits.
- Skipped automated pricing scraping/crawling and used centralized pricing configuration instead.
- Did not implement background queue processing for large-scale email delivery.

If I had more time, unsubscribe support and automated pricing ingestion would be next.

---

## How to test it manually

1. Submit an audit using tools like ChatGPT Plus or Cursor Pro.
2. Verify the audit is stored in Supabase.
3. Modify pricing values inside `PLAN_CATALOGUE`.
4. Run:

```bash
POST /api/detect-changes
```

5. Verify:
- pricing changes are detected
- a new audit row is created
- `pricing_changes` is persisted
- consolidated email is sent

6. Open the email.
7. Click the re-audit comparison link.
8. Verify:
- pricing changes display correctly
- savings delta is highlighted
- old and updated audits render side-by-side
- recommendation differences are visually highlighted

---

## What's tested

### Manually tested

- audit persistence
- pricing snapshot storage
- pricing diff detection
- consolidated notifications
- re-audit generation
- diff page rendering
- recommendation comparison logic
- pricing change visualization
- email link routing
- Supabase insert/update flow

### Edge cases tested

- audits with no pricing changes
- users with multiple affected audits
- missing recommendations
- empty diff states

No automated test suite was added in this PR due to time constraints.

---

## Open questions / risks

- Large-scale email delivery may require queueing or batching if audit volume grows significantly.
- Recommendation comparison currently relies heavily on recommendation titles matching consistently.
- Pricing updates are currently manual and could become stale without automated ingestion.
- Re-running audits synchronously inside the detection route may become expensive at scale.