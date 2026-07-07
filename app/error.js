"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center gap-5">
      <span className="text-6xl">☕</span>
      <h1 className="font-chai text-4xl text-[#f3e9dd]">Something spilled</h1>
      <p className="text-[#7d6a5a] max-w-sm">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="btn-chai px-7 py-2.5 text-sm">
          Try Again
        </button>
        <Link href="/">
          <button className="btn-chai-ghost px-7 py-2.5 text-sm">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  )
}
