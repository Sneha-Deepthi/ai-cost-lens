import { generateAudit } from "@/engine/recommendation-engine"
import { mockAudit } from "@/data/mock-audit"

export default function Home() {
  const result = generateAudit(mockAudit)

  console.log(result)

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        AI Cost Lens
      </h1>

      <pre className="mt-6 rounded bg-black p-4 text-sm text-white">
        {JSON.stringify(result, null, 2)}
      </pre>
    </main>
  )
}