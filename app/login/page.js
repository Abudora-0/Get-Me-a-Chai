"use client"

import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push('/dashboard')
  }, [session])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl">☕</span>
          <h1 className="text-3xl font-bold text-slate-800 mt-4 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to manage your creator page</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-8 flex flex-col gap-4">

          {/* GitHub — functional */}
          <button
            onClick={() => signIn("github", { callbackUrl: '/dashboard' })}
            className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Continue with GitHub
          </button>

          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-slate-400">More options coming soon</span>
            </div>
          </div>

          {/* Google — coming soon */}
          <button disabled className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl bg-slate-50 text-slate-400 font-medium border border-slate-200 cursor-not-allowed">
            <svg className="w-5 h-5 shrink-0" viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path d="M9.827 24c0-1.524.253-2.985.705-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.736.867 7.26 2.406 10.388l7.904-6.05A14.17 14.17 0 019.827 24" fill="#FBBC05"/>
                <path d="M23.714 10.133c3.311 0 6.302 1.173 8.652 3.093l6.836-6.827C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.909 6.04c1.822-5.532 7.017-9.511 13.182-9.511" fill="#EB4335"/>
                <path d="M23.714 37.867c-6.165 0-11.36-3.979-13.182-9.511l-7.909 6.038c3.822 7.761 11.804 13.072 21.091 13.072 5.732 0 11.204-2.035 15.312-5.847l-7.507-5.804c-2.082 1.334-4.749 2.052-7.805 2.052" fill="#34A853"/>
                <path d="M46.145 24c0-1.387-.213-2.873-.533-4.267H23.714v9.067h12.604c-.631 3.091-2.347 5.468-4.8 7.014l7.507 5.804c4.314-3.986 7.12-9.951 7.12-17.618" fill="#4285F4"/>
              </g>
            </svg>
            Continue with Google
            <span className="ml-auto text-xs bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">Soon</span>
          </button>

          {/* Twitter — coming soon */}
          <button disabled className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl bg-slate-50 text-slate-400 font-medium border border-slate-200 cursor-not-allowed">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Continue with X (Twitter)
            <span className="ml-auto text-xs bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">Soon</span>
          </button>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          By signing in, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  )
}

export default Login
