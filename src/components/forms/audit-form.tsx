"use client"

import { useEffect, useState } from "react"

import { toolPlans } from "@/data/tools"

import {
  AuditFormState,
  SubscriptionFormItem,
} from "@/types/audit"

const STORAGE_KEY = "ai-cost-lens-audit-form"

const PRIMARY_USE_CASES = [
  "coding",
  "writing",
  "research",
  "data",
  "mixed",
] as const

type Props = {
  onSubmit: (data: AuditFormState) => void
}

function createSubscription(): SubscriptionFormItem {
  return {
    id: Date.now().toString(),
    toolId: "",
    monthlySpend: 0,
    seats: 1,
  }
}

function getInitialFormState(): AuditFormState {
  return {
    companyName: "",
    teamSize: 1,
    primaryUseCase: "coding",
    subscriptions: [createSubscription()],
  }
}

export function AuditForm({
  onSubmit,
}: Props) {
  const [formState, setFormState] =
  useState<AuditFormState>(() => {
    if (typeof window === "undefined") {
      return getInitialFormState()
    }

    try {
      const savedState =
        localStorage.getItem(STORAGE_KEY)

      return savedState
        ? JSON.parse(savedState)
        : getInitialFormState()
    } catch {
      localStorage.removeItem(STORAGE_KEY)

      return getInitialFormState()
    }
  })

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(formState)
    )
  }, [formState])

  function updateSubscription(
    index: number,
    field: keyof SubscriptionFormItem,
    value: string | number
  ) {
    setFormState((prev) => ({
      ...prev,

      subscriptions:
        prev.subscriptions.map(
          (subscription, i) =>
            i === index
              ? {
                  ...subscription,
                  [field]: value,
                }
              : subscription
        ),
    }))
  }

  function addSubscription() {
    setFormState((prev) => ({
      ...prev,

      subscriptions: [
        ...prev.subscriptions,
        createSubscription(),
      ],
    }))
  }

  function removeSubscription(
    index: number
  ) {
    setFormState((prev) => {
      if (
        prev.subscriptions.length === 1
      ) {
        return prev
      }

      return {
        ...prev,

        subscriptions:
          prev.subscriptions.filter(
            (_, i) => i !== index
          ),
      }
    })
  }

  function handleSubmit(
    e: React.SyntheticEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    const hasInvalidSubscription =
      formState.subscriptions.some(
        (subscription) =>
          !subscription.toolId ||
          subscription.seats <= 0 ||
          subscription.monthlySpend < 0
      )

    if (
      !formState.companyName.trim() ||
      hasInvalidSubscription
    ) {
      alert(
        "Please complete all required fields."
      )

      return
    }

    onSubmit(formState)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Company Name
          </label>

          <input
            required
            type="text"
            value={formState.companyName}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                companyName:
                  e.target.value,
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Team Size
          </label>

          <input
            required
            type="number"
            min={1}
            step={1}
            value={formState.teamSize}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                teamSize: Number(
                  e.target.value
                ),
              }))
            }
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Primary Use Case
        </label>

        <select
          required
          value={formState.primaryUseCase}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,

              primaryUseCase:
                e.target
                  .value as typeof PRIMARY_USE_CASES[number],
            }))
          }
          className="w-full rounded-lg border p-3"
        >
          {PRIMARY_USE_CASES.map(
            (useCase) => (
              <option
                key={useCase}
                value={useCase}
              >
                {useCase
                  .charAt(0)
                  .toUpperCase() +
                  useCase.slice(1)}
              </option>
            )
          )}
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Subscriptions
          </h2>

          <button
            type="button"
            onClick={addSubscription}
            className="rounded-lg border px-4 py-2"
          >
            Add Subscription
          </button>
        </div>

        {formState.subscriptions.map(
          (subscription, index) => (
            <div
              key={subscription.id}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-all hover:bg-white hover:shadow-md md:grid-cols-4"
            >
              <div>
                <label className="mb-2 block text-sm">
                  Tool Plan
                </label>

                <select
                  required
                  value={
                    subscription.toolId
                  }
                  onChange={(e) =>
                    updateSubscription(
                      index,
                      "toolId",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border p-3"
                >
                  <option value="">
                    Select Tool
                  </option>

                  {toolPlans.map(
                    (tool) => (
                      <option
                        key={tool.id}
                        value={tool.id}
                      >
                        {tool.tool}{" "}
                        {tool.plan}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm">
                  Seats
                </label>

                <input
                  required
                  type="number"
                  placeholder="Seats"
                  min={1}
                  step={1}
                  value={subscription.seats}
                  onChange={(e) =>
                    updateSubscription(
                      index,
                      "seats",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">
                  Monthly Spend
                </label>

                <input
                  required
                  type="number"
                  placeholder="Monthly Spend"
                  min={0}
                  step={1}
                  value={
                    subscription.monthlySpend
                  }
                  onChange={(e) =>
                    updateSubscription(
                      index,
                      "monthlySpend",
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  disabled={
                    formState
                      .subscriptions
                      .length === 1
                  }
                  onClick={() =>
                    removeSubscription(
                      index
                    )
                  }
                  className="w-full rounded-lg border border-red-500 px-4 py-3 text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <button
        type="submit"
        className="rounded-xl bg-black px-6 py-3 text-white"
      >
        Generate Audit
      </button>
    </form>
  )
}