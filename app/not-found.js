import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center gap-5">
      <span className="text-6xl">☕</span>
      <h1 className="text-5xl font-bold text-slate-800">404</h1>
      <p className="text-slate-500 text-lg">Oops — this page doesn&apos;t exist.</p>
      <p className="text-slate-400 max-w-sm text-sm">
        The creator page you&apos;re looking for may have moved or the username is incorrect.
      </p>
      <Link href="/">
        <button className="px-6 py-2.5 rounded-full font-medium text-white bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 transition-all shadow-sm">
          Back to Home
        </button>
      </Link>
    </div>
  )
}
