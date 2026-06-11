"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-800 text-lg hover:opacity-80 transition-opacity">
          <span className="text-2xl">☕</span>
          <span>Get Me a <span className="text-rose-500">Chai</span></span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {session && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(v => !v)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-700 border border-rose-200 hover:border-rose-400 hover:bg-rose-50 transition-all"
              >
                {session.user?.image && (
                  <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
                )}
                {session.user?.name || 'Account'}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-rose-100 py-1.5 z-50">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    Dashboard
                  </Link>
                  <Link
                    href={`/${session.user?.name}`}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    Your Page
                  </Link>
                  <hr className="my-1 border-rose-100" />
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
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
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 transition-all shadow-sm"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 transition-all shadow-sm">
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
