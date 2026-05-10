## Day 1 - 2026-05-06

**Hours worked:** 3

**What I did:**
- Read the full assignment requirements and evaluation rubric carefully
- Planned the application architecture and feature breakdown
- Initialized the Next.js + TypeScript project
- Configured Tailwind CSS and shadcn/ui
- Created the initial repository structure and required markdown documentation files
- Started researching pricing models for tools like ChatGPT, Claude, Cursor, and GitHub Copilot
- Setup the public GitHub repository and pushed initial commits

**What I learned:**
- The assignment emphasizes product thinking, execution discipline, and decision-making as much as programming ability.
- A defensible audit engine with clear reasoning is more important than overly complex AI integrations.

**Blockers / what I'm stuck on:**
- Designing recommendation logic that feels financially reasonable instead of arbitrary.
- Deciding how detailed the pricing comparison system should be for the MVP.

**Plan for tomorrow:**
- Build the landing page UI
- Implement the audit input form
- Add localStorage persistence for form state
- Begin implementing rule-based audit recommendations

## Day 2 - 2026-05-07

**Hours worked:** 5

**What I did:**
- Completed detailed pricing and feature research for AI tools including ChatGPT, Claude, Gemini, Cursor, GitHub Copilot, and Lovable
- Structured research findings into reusable markdown documentation files
- Designed the initial application domain models using TypeScript
- Created a structured AI tools pricing dataset for recommendation analysis
- Implemented the first version of the rule-based audit recommendation engine
- Added audit logic for:
  - small-team overspend detection
  - overlapping AI subscription detection
  - premium tier downgrade recommendations
  - overlapping coding assistant detection
- Created mock audit data to simulate realistic organization spend scenarios
- Built the initial audit dashboard UI to display recommendations and savings estimates

**What I learned:**
- Structuring pricing intelligence into reusable datasets makes recommendation logic significantly easier to maintain.
- Rule-based recommendations need to remain explainable and financially defensible to feel trustworthy.

**Blockers / what I'm stuck on:**
- Comparing plans across different AI tools is becoming complex because pricing models, features, and usage limits vary significantly between platforms.
- Designing recommendation logic that feels financially reasonable instead of arbitrary for different organization sizes and workflows.

**Plan for tomorrow:**
- Build the audit input form UI
- Connect form inputs to the recommendation engine
- Add localStorage persistence
- Improve dashboard polish and recommendation presentation
- Begin adding unit tests for recommendation logic

## Day 3 - 2026-05-08

**Hours worked:** 6

**What I did:**
- Built the complete audit input form UI for collecting AI subscription details
- Added support for multiple AI tools and plans including ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and Lovable
- Implemented dynamic subscription management with add/remove functionality
- Added form validation for required fields and invalid subscription inputs
- Implemented localStorage persistence for the entire audit form state across page reloads
- Fixed hydration and client-side persistence issues related to Next.js rendering behavior
- Refactored form state management to improve scalability and maintainability
- Improved recommendation card presentation with:
  - severity badges
  - formatted monthly savings display
  - cleaner visual hierarchy
  - improved spacing and responsiveness
- Added empty recommendation state handling for optimized audit scenarios
- Improved audit dashboard readability and overall product polish

**What I learned:**
- Persisting complex dynamic form state in Next.js requires careful handling of client-side hydration and localStorage restoration.
- Small UI improvements like severity indicators, formatting, and layout hierarchy significantly improve perceived product quality.

**Blockers / what I'm stuck on:**
- Recommendation savings estimates currently feel inflated for some scenarios and require more realistic financial modeling.
- Recommendation logic still needs better calibration to produce consistently defensible optimization suggestions.

**Plan for tomorrow:**
- Refine recommendation savings estimation logic
- Improve realism of audit recommendations and optimization calculations
- Add realistic demo scenarios and mock datasets
- Improve mobile responsiveness and UI polish
- Begin adding unit tests for recommendation engine behavior

## Day 4 - 2026-05-09

**Hours worked:** 7

**What I did:**
- Refactored the recommendation engine into a modular rule-based audit system
- Added advanced audit rules for:
  - conversational AI overlap detection
  - coding assistant overlap detection
  - premium tier overprovisioning
  - governance/team-plan overspend
  - workflow mismatch detection
  - API optimization opportunities
  - annual billing savings recommendations
- Added recommendation prioritization and deduplication logic
- Improved savings estimation realism using conservative financial modeling
- Added optimization score calculation and annual savings projections
- Expanded recommendation metadata with:
  - confidence levels
  - recommendation categories
  - reasoning and action fields
  - source rule traceability
- Added per-tool audit breakdown generation
- Centralized pricing intelligence and SaaS pricing assumptions inside the engine
- Fixed tool-family detection issues caused by inconsistent tool ID parsing
- Updated UI components to support the enhanced recommendation schema
- Improved recommendation presentation and empty-state handling
- Created detailed `PRICING_DATA.md` documentation with:
  - verified vendor pricing references
  - enterprise pricing assumptions
  - annual billing discounts
  - API pricing notes
  - engine estimation methodology
  - optimization logic explanations

**What I learned:**
- Recommendation systems feel significantly more trustworthy when every optimization suggestion is financially explainable.
- Conservative savings estimates improve credibility more than aggressive optimization claims.
- SaaS pricing models vary heavily between seat-based, usage-based, and credit-based systems, which impacts audit logic design.
- Explainability and traceability are critical when building recommendation-driven systems.

**Blockers / what I'm stuck on:**
- Designing recommendation heuristics that remain realistic across both small startups and large enterprise organizations is still challenging.
- Some enterprise pricing assumptions require conservative estimation because vendors do not publicly disclose exact pricing.

**Plan for tomorrow:**
- Add realistic demo company scenarios and mock audit presets
- Begin adding unit tests for recommendation engine behavior
- Improve dashboard summary presentation and audit insights
- Add recommendation confidence/category badges to the UI
- Continue mobile responsiveness and layout polish

## Day 5 - 2026-05-10

**Hours worked:** 6

**What I did:**
- Implemented AI-generated personalized audit summaries using OpenAI
- Added graceful API failure handling with deterministic fallback summaries
- Created a dedicated API route for audit summary generation
- Refactored AI summary generation into a reusable utility layer
- Created detailed `PROMPTS.md` documentation containing:
  - full prompts used
  - prompt engineering reasoning
  - failed prompt experiments
  - architectural decisions
  - fallback handling strategy
- Initially evaluated Anthropic Claude for summary generation but later switched to OpenAI during MVP development due to faster onboarding and simpler API setup
- Expanded the recommendation engine architecture with:
  - recommendation confidence modeling
  - recommendation category modeling
  - optimization score calculation
  - annual savings projections
  - improved overlap detection
  - workflow mismatch detection
  - governance overspend heuristics
  - realistic savings caps
  - recommendation deduplication
- Refactored shared audit types into a centralized schema to eliminate duplicate interfaces and inconsistent return structures
- Improved dashboard presentation with:
  - hero metric cards
  - optimization score visualization
  - annual savings metrics
  - AI audit summary section
  - improved recommendation hierarchy
  - cleaner layout spacing and structure
- Improved recommendation metadata structure to support:
  - confidence levels
  - recommendation categories
  - richer audit presentation
  - future UI extensibility
- Fixed multiple TypeScript architecture issues related to:
  - duplicated types
  - mismatched recommendation schemas
  - inconsistent tool-family parsing
  - audit result structure alignment

**What I learned:**
- Separating deterministic audit logic from AI-generated summarization significantly improves explainability and trustworthiness.
- Recommendation systems become more maintainable when recommendation metadata and pricing intelligence are centralized into shared schemas.
- Conservative, financially realistic recommendations feel substantially more credible than aggressive optimization estimates.
- Dashboard presentation quality heavily impacts perceived product sophistication, especially for audit-style products.

**Blockers / what I'm stuck on:**
- The dashboard UI still requires additional refinement to feel fully production-grade and visually polished.
- Lead capture backend integration, transactional email flow, and shareable audit URLs are still pending implementation.
- Some enterprise pricing assumptions still require conservative estimation because vendors do not publicly expose detailed pricing structures.

**Plan for tomorrow:**
- Build the per-tool audit breakdown table
- Implement lead capture backend
- Add shareable public audit URLs
- Continue dashboard UI polish