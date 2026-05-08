"use client"

import { useState } from "react"

import { AuditForm } from "@/components/forms/audit-form"

import { AuditSummary } from "@/components/audit/audit-summary"

import { RecommendationsList } from "@/components/audit/recommendations-list"

import { generateAudit } from "@/engine/recommendation-engine"

import {
  AuditFormState,
  AuditResult,
} from "@/types/audit"

export default function Home() {
  const [auditResult, setAuditResult] =
    useState<AuditResult | null>(null)

  function handleGenerateAudit(
    formData: AuditFormState
  ) {
    const result = generateAudit({
      companyName: formData.companyName,

      teamSize: formData.teamSize,

      workflows: [formData.primaryUseCase],

      subscriptions: formData.subscriptions,
    })

    setAuditResult(result)
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
        </div>
      )}
    </main>
  )
}