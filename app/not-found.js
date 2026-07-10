import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center gap-5">
      <div className="deco-label">— Table Not Found —</div>
      <h1 className="font-deco text-8xl text-[#123c33]">4<span className="text-[#a8841c]">0</span>4</h1>
      <div className="deco-divider max-w-[200px] w-full text-xs">◆</div>
      <p className="text-[#4a6b60] text-lg">This page isn&apos;t on the menu.</p>
      <p className="text-[#8fa199] max-w-sm text-sm">
        The creator page you&apos;re looking for may have moved or the username is incorrect.
      </p>
      <Link href="/">
        <button className="btn-deco mt-2">Back to the Lobby</button>
      </Link>
    </div>
  )
}
