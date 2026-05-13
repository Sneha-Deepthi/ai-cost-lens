# USER_INTERVIEWS

# Interview 1

## Person
Aswini — Friend with experience in web development

## Company / Project Stage
Personal freelance and portfolio projects using modern frontend tooling.

## Conversation Notes

This conversation focused primarily on the usability and navigation structure of the platform. At that stage, the application was designed as a single long scrolling page containing:
- landing section
- audit form
- audit results
- recommendations
- sharing features

The feedback was that the application felt visually “too long” and slightly overwhelming.

### Direct Quotes

> “The page keeps going and going. It feels more like a document than a product.”

> “I didn’t immediately understand where the actual audit starts.”

> “Breaking the experience into smaller screens would make it feel more professional.”

### Most Surprising Feedback

The most surprising part of the conversation was that the issue was not about design quality itself, but about perceived product structure. Even though all functionality was already present, the long scrolling layout made the application feel unfinished and less SaaS-like.

### What Changed After This Interview

After this feedback:
- the application flow was redesigned into multiple pages
- dedicated audit report pages were introduced
- public shareable audit routes were added
- the user journey became more structured

This significantly improved the perceived clarity and maturity of the product.

---

# Interview 2

## Person
Jagan — Friend who regularly uses AI tools

## Company / Project Stage
Individual AI tool usage for coding, productivity, and learning workflows.

## Conversation Notes

This discussion focused on audit credibility and pricing consistency. During testing, the application displayed some pricing and savings values in USD while other sections still used rupee formatting.

The inconsistency created confusion about whether the calculations were accurate.

### Direct Quotes

> “I can’t immediately tell whether these savings are in dollars or rupees.”

> “The pricing numbers look inconsistent across different sections.”

> “If the app is doing financial optimization, currency consistency matters a lot.”

### Most Surprising Feedback

The surprising part was how quickly trust breaks when financial values appear inconsistent. Even though the recommendation logic itself was correct, mixed currency formatting made the entire audit feel unreliable.

### What Changed After This Interview

After this discussion:
- all pricing logic was standardized to USD
- UI formatting was updated across all audit cards
- recommendation calculations were aligned with pricing documentation
- savings metrics and recommendation summaries were made consistent

This improved the credibility and readability of the audit results substantially.

---

# Interview 3

## Person
Likhitha — Software developer

## Company / Project Stage
Pre-launch MVP experimentation with multiple AI subscriptions.

## Conversation Notes

This conversation focused on the recommendation engine logic itself. Initially, the system trusted the exact spend values entered by the user without validating them against actual vendor pricing.

The feedback highlighted that users may:
- enter incorrect pricing
- misunderstand subscription tiers
- accidentally over-report spend
- use inconsistent pricing assumptions

### Direct Quotes

> “You probably shouldn’t blindly trust whatever number the user enters.”

> “If someone enters a much higher amount than the actual plan price, the app should detect that.”

> “The interesting part is not just overlap detection — it’s validating whether the pricing itself makes sense.”

### Most Surprising Feedback

The most surprising insight was that the recommendation engine could become significantly smarter by comparing user-entered spend against official vendor pricing data rather than treating all inputs as correct.

### What Changed After This Interview

After this feedback:
- pricing mismatch validation logic was added
- the audit engine began comparing entered spend against official plan pricing
- overpayment detection recommendations were introduced
- the system started generating downgrade and pricing anomaly insights

This shifted the product from a simple overlap detector into a more realistic AI spend optimization engine.

---