"use client"

import { useState } from "react"

import { supabase }
from "@/lib/supabase"

type Props = {
  estimatedMonthlySavings: number

  estimatedAnnualSavings: number

  optimizationScore: number
}

export function LeadCapture({
  estimatedMonthlySavings,
  estimatedAnnualSavings,
  optimizationScore,
}: Props) {
  const [email, setEmail] =
    useState("")

  const [companyName, setCompanyName] =
    useState("")

  const [role, setRole] =
    useState("")

  const [teamSize, setTeamSize] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    const { error } =
      await supabase
        .from("leads")
        .insert([
          {
            email,

            company_name:
              companyName,

            role,

            team_size:
              Number(teamSize),

            estimated_monthly_savings:
              estimatedMonthlySavings,

            estimated_annual_savings:
              estimatedAnnualSavings,

            optimization_score:
              optimizationScore,
          },
        ])

    setLoading(false)

    if (!error) {
      setSuccess(true)

      setEmail("")
      setCompanyName("")
      setRole("")
      setTeamSize("")
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold">
          Audit submitted successfully
        </h3>

        <p className="mt-3 text-muted-foreground">
          We’ll notify you when new optimization opportunities apply to your AI stack.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Save Your Audit
        </h2>

        <p className="mt-2 text-muted-foreground">
          Get notified about future
          AI spend optimization
          opportunities.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          required
          placeholder="Work email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="text"
          placeholder="Company name"
          value={companyName}
          onChange={(e) =>
            setCompanyName(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Team size"
          value={teamSize}
          onChange={(e) =>
            setTeamSize(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-6 py-3 text-white"
        >
          {loading
            ? "Saving..."
            : "Save Audit"}
        </button>
      </form>
    </div>
  )
}