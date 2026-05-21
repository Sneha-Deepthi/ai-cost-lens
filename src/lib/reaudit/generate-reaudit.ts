import { PLAN_CATALOGUE } from "@/data/tools"

import { generateAudit } from "@/engine/recommendation-engine"
import { AuditInput } from "@/types/audit"

export function generateReaudit(
  inputStack: AuditInput
) {
  return generateAudit(
    inputStack,
    PLAN_CATALOGUE
  )
}