"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center gap-5">
      <div className="deco-label">— A Spill in the Parlour —</div>
      <h1 className="font-deco text-4xl text-[#123c33]">Something Went Wrong</h1>
      <div className="deco-divider max-w-[200px] w-full text-xs">◆</div>
      <p className="text-[#8fa199] max-w-sm">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-4 mt-2">
        <button onClick={reset} className="btn-deco-gold">
          Try Again
        </button>
        <Link href="/">
          <button className="btn-deco-outline">Go Home</button>
        </Link>
      </div>
    </div>
  )
}
