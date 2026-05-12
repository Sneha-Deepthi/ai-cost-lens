import {
  describe,
  expect,
  it,
} from "vitest"

import {
  generateAudit,
} from "../engine/recommendation-engine"

describe(
  "recommendation engine",
  () => {
    it(
      "detects conversational AI overlap",
      () => {
        const result =
          generateAudit({
            companyName:
              "Test Co",

            teamSize: 5,

            workflows: [
              "mixed",
            ],

            subscriptions: [
              {
                toolId:
                  "chatgpt_plus",

                seats: 5,

                monthlySpend: 100,
              },

              {
                toolId:
                  "claude_pro",

                seats: 5,

                monthlySpend: 100,
              },
            ],
          })

        expect(
          result.recommendations
            .length
        ).toBeGreaterThan(0)
      }
    )

    it(
      "marks optimized stacks correctly",
      () => {
        const result =
          generateAudit({
            companyName:
              "Lean Startup",

            teamSize: 1,

            workflows: [
              "writing",
            ],

            subscriptions: [
              {
                toolId:
                  "chatgpt_plus",

                seats: 1,

                monthlySpend: 20,
              },
            ],
          })

        expect(
          result.isAlreadyOptimal
        ).toBe(true)
      }
    )

    it(
      "calculates savings correctly",
      () => {
        const result =
          generateAudit({
            companyName:
              "Savings Co",

            teamSize: 2,

            workflows: [
              "coding",
            ],

            subscriptions: [
              {
                toolId:
                  "cursor_teams",

                seats: 2,

                monthlySpend: 80,
              },
            ],
          })

        expect(
          result
            .estimatedMonthlySavings
        ).toBeGreaterThan(0)
      }
    )

    it(
      "flags high savings audits",
      () => {
        const result =
          generateAudit({
            companyName:
              "Enterprise Co",

            teamSize: 20,

            workflows: [
              "mixed",
            ],

            subscriptions: [
              {
                toolId:
                  "gemini_ultra",

                seats: 20,

                monthlySpend: 6000,
              },
            ],
          })

        expect(
          result.isHighSavings
        ).toBe(true)
      }
    )

    it(
      "generates per-tool breakdown",
      () => {
        const result =
          generateAudit({
            companyName:
              "Breakdown Co",

            teamSize: 3,

            workflows: [
              "coding",
            ],

            subscriptions: [
              {
                toolId:
                  "cursor_pro",

                seats: 3,

                monthlySpend: 60,
              },
            ],
          })

        expect(
          result
            .perToolBreakdown
            .length
        ).toBe(1)
      }
    )
  }
)