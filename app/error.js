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
      <h1 className="text-3xl font-bold text-slate-800">Something went wrong</h1>
      <p className="text-slate-400 max-w-sm">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-full font-medium text-white bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 transition-all shadow-sm"
        >
          Try Again
        </button>
        <Link href="/">
          <button className="px-6 py-2.5 rounded-full font-medium text-slate-600 border border-rose-200 hover:border-rose-400 hover:bg-rose-50 transition-all">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  )
}
