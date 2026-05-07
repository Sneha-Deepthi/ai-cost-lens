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