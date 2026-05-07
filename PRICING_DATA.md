# Pricing Data Reference

Verified:
2026-05-07

---

# Supported AI Tools

| Tool | Plans Supported |
|---|---|
| ChatGPT | Plus, Team, Enterprise, API Direct |
| Claude | Pro, Max, Team, Enterprise, API Direct |
| Cursor | Hobby, Pro, Business, Enterprise |
| GitHub Copilot | Individual, Business, Enterprise |
| Gemini | Pro, Ultra, API |
| Lovable | Free, Pro, Business, Enterprise |

---

# Pricing Notes

- Enterprise pricing is treated as custom pricing when public pricing is unavailable.
- API pricing is simplified for MVP recommendation logic.
- Pricing values are normalized into approximate monthly cost estimates where necessary.
- Some regional pricing may vary depending on billing country.

---

# Data Sources

- https://chatgpt.com/pricing
- https://claude.com/pricing
- https://cursor.com/pricing
- https://github.com/features/copilot/plans
- https://gemini.google/subscriptions
- https://lovable.dev/pricing

---

# MVP Simplifications

The MVP currently:
- uses static pricing snapshots
- does not fetch live pricing dynamically
- does not estimate exact token/API consumption
- uses rule-based recommendation logic instead of ML-based optimization