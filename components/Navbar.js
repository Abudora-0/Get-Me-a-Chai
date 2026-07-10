"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const DecoCup = () => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
    <rect x="1" y="1" width="30" height="30" fill="#123c33"/>
    <rect x="2.5" y="2.5" width="27" height="27" stroke="#c9a227" strokeWidth="1"/>
    <path d="M16 6v4M11 7.5l1.8 3.4M21 7.5l-1.8 3.4" stroke="#c9a227" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M10 16h12l-1.4 8a1 1 0 01-1 .8h-7.2a1 1 0 01-1-.8L10 16z" fill="#c9a227"/>
    <path d="M22 17.5h1.8a1.8 1.8 0 010 3.6H21.4" stroke="#c9a227" strokeWidth="1.2" fill="none"/>
  </svg>
)

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="bg-[#f7f3e8]/95 backdrop-blur-sm border-b border-[#a8841c]/35 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-[70px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
          <DecoCup />
          <div className="leading-none">
            <span className="font-deco text-xl text-[#123c33] tracking-wide block">Get Me a Chai</span>
            <span className="deco-label !text-[0.52rem]">Est. for creators</span>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {session && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(v => !v)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#123c33] border border-[#a8841c]/35 hover:border-[#c9a227] transition-all"
              >
                {session.user?.image && (
                  <img src={session.user.image} alt="" className="w-6 h-6 rounded-full border border-[#c9a227]" />
                )}
                {session.user?.name || 'Account'}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-12 w-52 deco-card py-2 z-50">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#4a6b60] hover:text-[#a8841c] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    Dashboard
                  </Link>
                  <Link
                    href={`/${session.user?.name}`}
                    className="flex items-center gap-2.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#4a6b60] hover:text-[#a8841c] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    Your Page
                  </Link>
                  <hr className="my-1.5 border-[#a8841c]/25 mx-4" />
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2.5 w-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#7a2e2e] hover:text-[#a03c3c] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {session ? (
            <button onClick={() => signOut()} className="btn-deco !px-5 !py-2.5 !text-[0.68rem]">
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="btn-deco !px-6 !py-2.5 !text-[0.68rem]">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
