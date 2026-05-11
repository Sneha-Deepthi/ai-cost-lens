"use client"

import { useState } from "react"

import { AuditForm } from "@/components/forms/audit-form"

import { AuditSummary } from "@/components/audit/audit-summary"

import { PerToolBreakdown } from "@/components/audit/per-tool-breakdown"

import { RecommendationsList } from "@/components/audit/recommendations-list"

import { MetricCard } from "@/components/dashboard/metric-card"

import { LeadCapture } from "@/components/lead-capture"

import { generateAudit } from "@/engine/recommendation-engine"

import {AuditFormState, AuditResult} from "@/types/audit"

export default function Home() {
  const [auditResult, setAuditResult] =
    useState<AuditResult | null>(null)

    const [summary, setSummary] =
        useState("")

    const [summaryLoading,setSummaryLoading,] = useState(false)

    const [shareUrl,setShareUrl] = useState("")

    const [shareMessage,setShareMessage] = useState("")

  async function handleGenerateAudit(
    formData: AuditFormState
  ) {
    const result = generateAudit({
      companyName: formData.companyName,

      teamSize: formData.teamSize,

      workflows: [formData.primaryUseCase],

      subscriptions: formData.subscriptions,
    })

    setAuditResult(result)
    setSummaryLoading(true)

    try {
      const response =
        await fetch(
          "/api/generate-summary",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              result
            ),
          }
        )

      const data =
        await response.json()

      setSummary(data.summary)
    } catch (error) {
      console.error(error)
    } finally {
      setSummaryLoading(false)
    }
  }

  async function handleShareAudit() {
    if (!auditResult) {
      return
    }

    const response =
      await fetch(
        "/api/save-audit",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            auditResult
          ),
        }
      )

    const data =
      await response.json()

    if (data.id) {
      const shareUrl =
        `${window.location.origin}/audit/${data.id}`

      setShareUrl(shareUrl)


    }
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          AI Cost Lens
        </h1>

        <p className="mt-2 text-muted-foreground">
          Audit AI subscription spend and identify optimization opportunities.
        </p>
      </div>

      <AuditForm
        onSubmit={handleGenerateAudit}
      />

      {auditResult && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Monthly Spend"
            value={`₹${auditResult.totalMonthlySpend.toLocaleString()}`}
          />

          <MetricCard
            title="Estimated Monthly Savings"
            value={`₹${auditResult.estimatedMonthlySavings.toLocaleString()}`}
          />

          <MetricCard
            title="Estimated Annual Savings"
            value={`₹${auditResult.estimatedAnnualSavings.toLocaleString()}`}
          />

          <MetricCard
            title="Optimization Score"
            value={`${auditResult.optimizationScore}/100`}
            subtitle="Higher is better"
          />
        </div>
      )}

      {auditResult && (
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-semibold">
            AI Audit Summary
          </h2>

          {summaryLoading ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Generating personalized audit insights...
            </p>
          ) : (
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {summary}
            </p>
          )}
        </div>
      )}

      {auditResult && (
        <div className="mt-10 space-y-8">
          <AuditSummary
            totalMonthlySpend={
              auditResult.totalMonthlySpend
            }
            estimatedMonthlySavings={
              auditResult.estimatedMonthlySavings
            }
          />

          <div>
            <h2 className="mb-4 text-2xl font-semibold">
              Recommendations
            </h2>

            <RecommendationsList
              recommendations={
                auditResult.recommendations
              }
            />
          </div>

          <PerToolBreakdown
            breakdown={
              auditResult.perToolBreakdown
            }
          />

          {auditResult && (
            <LeadCapture
              estimatedMonthlySavings={
                auditResult.estimatedMonthlySavings
              }
              estimatedAnnualSavings={
                auditResult.estimatedAnnualSavings
              }
              optimizationScore={
                auditResult.optimizationScore
              }
            />
          )}

          <button
            onClick={handleShareAudit}
            className="rounded-xl bg-black px-6 py-3 text-white"
          >
            Generate Share Link
          </button>
          {shareUrl && (
          <div className="rounded-2xl border bg-muted/30 p-4">
            <p className="mb-2 text-sm font-medium">
              Public Audit URL
            </p>

            <div className="flex items-center gap-3">
              <input
                value={shareUrl}
                readOnly
                className="flex-1 rounded-lg border bg-white px-3 py-2 text-sm"
              />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    shareUrl
                  )

                  setShareMessage(
                    "Share link copied successfully"
                  )
                }}
                className="rounded-lg bg-black px-4 py-2 text-sm text-white"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {shareMessage && (
          <p className="text-sm font-medium text-green-600">
            {shareMessage}
          </p>
        )}
          
        </div>
      )}
    </main>
  )
}