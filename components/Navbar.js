"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const CupLogo = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
    <path d="M8 14h13l-1.5 9a1 1 0 01-1 .9H10.5a1 1 0 01-1-.9L8 14z" fill="#f5a623"/>
    <path d="M21 16h2a2 2 0 010 4h-2" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path className="steam-line" d="M12 11 Q12.6 9.4 12 8" stroke="#c96f4a" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <path className="steam-line" d="M15.5 11 Q16.1 9.4 15.5 8" stroke="#c96f4a" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <path className="steam-line" d="M19 11 Q19.6 9.4 19 8" stroke="#c96f4a" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
  </svg>
)

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="bg-[#201512]/90 backdrop-blur-md border-b border-[#f5a623]/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity">
          <CupLogo />
          <span className="font-chai text-2xl text-[#f3e9dd] tracking-wide">
            Get Me a <em className="text-[#f5a623] not-italic font-chai italic">Chai</em>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {session && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(v => !v)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="btn-chai-ghost flex items-center gap-2 px-4 py-2 text-sm"
              >
                {session.user?.image && (
                  <img src={session.user.image} alt="" className="w-6 h-6 rounded-full border border-[#f5a623]/30" />
                )}
                {session.user?.name || 'Account'}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-12 w-48 chai-card !rounded-xl py-1.5 z-50 shadow-2xl shadow-black/50">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#b39c88] hover:bg-[#35251c] hover:text-[#f5a623] transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    Dashboard
                  </Link>
                  <Link
                    href={`/${session.user?.name}`}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#b39c88] hover:bg-[#35251c] hover:text-[#f5a623] transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    Your Page
                  </Link>
                  <hr className="my-1 border-[#f5a623]/10" />
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-[#c96f4a] hover:bg-[#35251c] transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {session ? (
            <button onClick={() => signOut()} className="btn-chai px-4 py-2 text-sm">
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="btn-chai px-5 py-2 text-sm">
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
