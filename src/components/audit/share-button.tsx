"use client"

import { useState }
from "react"

export function ShareButton({
  auditId,
}: {
  auditId: string
}) {
  const [copied, setCopied] =
    useState(false)

  async function handleCopy() {
    const shareUrl =
      `${window.location.origin}/share/${auditId}`

    await navigator.clipboard.writeText(
      shareUrl
    )

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleCopy}
        className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]"
      >
        Copy Share Link
      </button>

      <div
        className={`text-sm font-medium text-green-600 transition-opacity duration-300 ${
          copied
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        Link copied successfully
      </div>
    </div>
  )
}