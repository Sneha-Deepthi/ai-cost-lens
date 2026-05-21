"use client"

import { useRouter } from "next/navigation"

import { AuditForm } from "@/components/forms/audit-form"

import { generateAudit } from "@/engine/recommendation-engine"

import { AuditFormState } from "@/types/audit"

import {
  createPricingSnapshot,
} from "@/lib/pricing/pricing-provider"

export default function Home() {
  const router = useRouter()

  async function handleGenerateAudit(
    formData: AuditFormState
  ) {
    const pricingSnapshot =
      createPricingSnapshot()

    const auditInput = {
      companyName: formData.companyName,

      teamSize: formData.teamSize,

      workflows: [
        formData.primaryUseCase,
      ],

      subscriptions:
        formData.subscriptions,
    }

    const result =
      generateAudit(
        auditInput,
        pricingSnapshot
      )

    const summaryResponse =
      await fetch(
        "/api/generate-summary",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(result),
        }
      )

    const summaryData =
      await summaryResponse.json()

    const response = await fetch(
      "/api/save-audit",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email: formData.email,

          inputStack: auditInput,

          auditResult: result,

          pricingSnapshot,

          summary:
            summaryData.summary,
        }),
      }
    )

    const data =
      await response.json()

    if (data.id) {
      router.push(
        `/audit/${data.id}`
      )
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-6xl space-y-10 p-8">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-16 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_35%)]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur">
              Free AI Spend Audit
            </div>

            <h1 className="mt-8 text-5xl font-black tracking-tight md:text-7xl">
              Stop Overpaying

              <span className="block bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                For AI Tools
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Instantly audit your AI tooling stack,
              uncover overlapping subscriptions,
              and identify optimization opportunities
              across ChatGPT, Claude, Cursor,
              Gemini, Copilot, and more.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
                <p className="text-sm text-slate-400">
                  Supported Platforms
                </p>

                <p className="mt-1 font-semibold">
                  ChatGPT · Claude · Cursor · Gemini
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
                <p className="text-sm text-slate-400">
                  No Login Required
                </p>

                <p className="mt-1 font-semibold">
                  Instant Audit Results
                </p>
              </div>
            </div>
          </div>
        </section>

        <AuditForm
          onSubmit={handleGenerateAudit}
        />
      </div>
    </main>
  )
}