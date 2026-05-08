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