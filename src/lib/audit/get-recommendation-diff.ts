export type RecommendationDiff = {
  title: string

  reasoning?: string

  savings?: number

  status:
    | "new"
    | "removed"
    | "updated"
    | "unchanged"
}

export function getRecommendationDiff(
  oldRecommendations: any[] = [],
  newRecommendations: any[] = []
): RecommendationDiff[] {
  const diffs: RecommendationDiff[] = []

  const safeOldRecommendations =
    oldRecommendations || []

  const safeNewRecommendations =
    newRecommendations || []

  const oldMap = new Map(
    safeOldRecommendations.map((rec) => [
      rec.title,
      rec,
    ])
  )

  const newMap = new Map(
    safeNewRecommendations.map((rec) => [
      rec.title,
      rec,
    ])
  )

  for (const newRec of safeNewRecommendations) {
    const oldRec =
      oldMap.get(newRec.title)

    if (!oldRec) {
      diffs.push({
        title: newRec.title,

        reasoning:
          newRec.reasoning,

        savings:
          newRec.monthlySavings,

        status: "new",
      })

      continue
    }

    const changed =
      oldRec.reasoning !==
        newRec.reasoning ||
      oldRec.monthlySavings !==
        newRec.monthlySavings

    diffs.push({
      title: newRec.title,

      reasoning:
        newRec.reasoning,

      savings:
        newRec.monthlySavings,

      status: changed
        ? "updated"
        : "unchanged",
    })
  }

  for (const oldRec of safeOldRecommendations) {
    const exists =
      newMap.has(oldRec.title)

    if (!exists) {
      diffs.push({
        title: oldRec.title,

        reasoning:
          oldRec.reasoning,

        savings:
          oldRec.monthlySavings,

        status: "removed",
      })
    }
  }

  return diffs
}