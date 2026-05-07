import { AuditInput } from "@/types/audit"

export const mockAudit: AuditInput = {
  companyName: "Acme AI Labs",

  teamSize: 2,

  workflows: [
    "coding",
    "research",
    "writing",
  ],

  subscriptions: [
    {
      toolId: "chatgpt-team",
      seats: 2,
      monthlySpend: 3600,
    },

    {
      toolId: "claude-max",
      seats: 1,
      monthlySpend: 8500,
    },

    {
      toolId: "gemini-ultra",
      seats: 1,
      monthlySpend: 24500,
    },

    {
      toolId: "cursor-business",
      seats: 2,
      monthlySpend: 8000,
    },

    {
      toolId: "copilot-business",
      seats: 2,
      monthlySpend: 3800,
    },
  ],
}