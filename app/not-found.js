import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center gap-5">
      <span className="text-6xl">☕</span>
      <h1 className="font-chai text-7xl text-[#f3e9dd]">4<em className="text-[#f5a623]">0</em>4</h1>
      <p className="text-[#b39c88] text-lg">Oops — this cup is empty.</p>
      <p className="text-[#7d6a5a] max-w-sm text-sm">
        The creator page you&apos;re looking for may have moved or the username is incorrect.
      </p>
      <Link href="/">
        <button className="btn-chai px-7 py-2.5 text-sm">
          Back to Home
        </button>
      </Link>
    </div>
  )
}
