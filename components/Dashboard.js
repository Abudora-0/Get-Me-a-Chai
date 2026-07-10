"use client"

import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, fetchpayments, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const fields = [
  { name: 'name',           label: 'Display Name',        type: 'text',     placeholder: 'Your full name' },
  { name: 'email',          label: 'Email',               type: 'email',    placeholder: 'your@email.com' },
  { name: 'username',       label: 'Username',            type: 'text',     placeholder: 'your-username' },
  { name: 'profilepic',     label: 'Profile Picture URL', type: 'url',      placeholder: 'https://example.com/photo.jpg' },
  { name: 'coverpic',       label: 'Cover Picture URL',   type: 'url',      placeholder: 'https://example.com/cover.jpg' },
  { name: 'jazzcashMerchantId', label: 'JazzCash Merchant ID',    type: 'text',     placeholder: 'MC12345' },
  { name: 'jazzcashPassword',   label: 'JazzCash Password',       type: 'password', placeholder: '••••••••••••••••' },
  { name: 'jazzcashSalt',       label: 'JazzCash Integrity Salt', type: 'password', placeholder: '••••••••••••••••' },
]

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [tab, setTab] = useState('overview')
  const [form, setForm] = useState({})
  const [payments, setPayments] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push('/login')
    } else {
      fetchuser(session.user.name).then(u => setForm(u || {}))
      fetchpayments(session.user.name).then(p => setPayments(p || []))
    }
  }, [session])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (formData) => {
    setSaving(true)
    try {
      await updateProfile(formData, session.user.name)
      toast.success('Profile updated!', { position: 'top-right' })
    } catch {
      toast.error('Something went wrong.', { position: 'top-right' })
    } finally {
      setSaving(false)
    }
  }

  const totalEarned = payments.reduce((s, p) => s + (p.amount || 0), 0)
  const totalSupporters = new Set(payments.map(p => p.name)).size

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} theme="light" />

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="deco-label mb-2">— The Proprietor&apos;s Office —</div>
            <h1 className="font-deco text-4xl md:text-5xl text-[#123c33]">Dashboard</h1>
            <p className="text-[#4a6b60] mt-2">Welcome back, <span className="text-[#a8841c] font-semibold">{form.name || form.username || '...'}</span></p>
          </div>
          <a
            href={`/${form.username || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deco flex items-center gap-2 !px-5 !py-2.5 !text-[0.68rem]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Page
          </a>
        </div>

        {/* Tabs */}
        <div className="flex border border-[#a8841c]/35 w-fit mb-10 bg-[#fffdf6]">
          {['overview', 'supporters', 'settings'].map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all capitalize ${
                i > 0 ? 'border-l border-[#a8841c]/35' : ''
              } ${
                tab === t
                  ? 'bg-[#123c33] text-[#c9a227]'
                  : 'text-[#4a6b60] hover:text-[#123c33]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div className="space-y-7">
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="deco-card p-6 text-center">
                <p className="deco-label mb-2">Total Earned</p>
                <p className="font-deco text-4xl text-[#123c33]">Rs.{totalEarned.toLocaleString()}</p>
                <p className="text-xs text-[#a8841c] mt-1.5">from {payments.length} payments</p>
              </div>
              <div className="deco-card p-6 text-center">
                <p className="deco-label mb-2">Supporters</p>
                <p className="font-deco text-4xl text-[#123c33]">{totalSupporters}</p>
                <p className="text-xs text-[#a8841c] mt-1.5">unique people</p>
              </div>
              <div className="deco-card p-6 text-center">
                <p className="deco-label mb-2">Your Page</p>
                <p className="font-deco text-2xl text-[#123c33] mt-1 truncate">/{form.username || '—'}</p>
                <p className="text-xs mt-1.5" style={{ color: form.jazzcashMerchantId ? '#3d7a4f' : '#7a2e2e' }}>
                  {form.jazzcashMerchantId ? '✓ Payments active' : '⚠ Set JazzCash details'}
                </p>
              </div>
            </div>

            {/* Recent supporters */}
            <div className="deco-card p-7">
              <h2 className="font-deco text-2xl text-[#123c33] mb-5">Recent Supporters</h2>
              {payments.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl opacity-50">☕</span>
                  <p className="text-[#8fa199] mt-3 text-sm">No supporters yet — share your page!</p>
                  <a
                    href={`/${form.username || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-[#a8841c] text-sm font-semibold hover:underline underline-offset-4"
                  >
                    getmeachai.com/{form.username || '...'}
                  </a>
                </div>
              ) : (
                <div className="space-y-1">
                  {payments.map((p, i) => (
                    <div key={p.id || i} className="flex items-center justify-between py-3.5 border-b border-[#a8841c]/15 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rotate-45 border border-[#c9a227] flex items-center justify-center">
                          <span className="-rotate-45 font-deco text-[#a8841c] text-sm">{p.name?.[0]?.toUpperCase() || '?'}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#123c33]">{p.name}</p>
                          {p.message && <p className="text-xs text-[#4a6b60] truncate max-w-xs italic">{p.message}</p>}
                        </div>
                      </div>
                      <span className="font-deco text-lg text-[#a8841c]">Rs.{p.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile completeness */}
            <div className="deco-card p-7">
              <h2 className="font-deco text-2xl text-[#123c33] mb-5">Profile Completeness</h2>
              <div className="space-y-2.5">
                {[
                  { label: 'Display Name', done: !!form.name },
                  { label: 'Profile Picture', done: !!form.profilepic },
                  { label: 'Cover Picture', done: !!form.coverpic },
                  { label: 'JazzCash Merchant ID', done: !!form.jazzcashMerchantId },
                  { label: 'JazzCash Password', done: !!form.jazzcashPassword },
                  { label: 'JazzCash Integrity Salt', done: !!form.jazzcashSalt },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <span className={`w-5 h-5 flex items-center justify-center text-xs border ${item.done ? 'border-[#3d7a4f] text-[#3d7a4f]' : 'border-[#a8841c]/30 text-[#8fa199]'}`}>
                      {item.done ? '✓' : ''}
                    </span>
                    <span className={item.done ? 'text-[#123c33]' : 'text-[#8fa199]'}>{item.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setTab('settings')}
                className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8841c] hover:underline underline-offset-4"
              >
                Complete your profile →
              </button>
            </div>
          </div>
        )}

        {/* SUPPORTERS TAB */}
        {tab === 'supporters' && (
          <div className="deco-card p-7">
            <h2 className="font-deco text-2xl text-[#123c33] mb-6">All Supporters</h2>
            {payments.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-5xl opacity-50">☕</span>
                <p className="text-[#4a6b60] mt-4">No supporters yet.</p>
                <p className="text-[#8fa199] text-sm mt-1">Share your page to start receiving chai!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {payments.map((p, i) => (
                  <div key={p.id || i} className="flex items-center justify-between p-5 border border-[#a8841c]/20 hover:border-[#c9a227]/60 transition-colors bg-[#f7f3e8]/60">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rotate-45 bg-[#123c33] border border-[#c9a227] flex items-center justify-center">
                        <span className="-rotate-45 font-deco text-[#c9a227]">{p.name?.[0]?.toUpperCase() || '?'}</span>
                      </div>
                      <div>
                        <p className="font-medium text-[#123c33]">{p.name}</p>
                        {p.message && <p className="text-sm text-[#4a6b60] mt-0.5 italic">&quot;{p.message}&quot;</p>}
                        <p className="text-xs text-[#8fa199] mt-0.5">{new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-deco text-2xl text-[#a8841c]">Rs.{p.amount}</span>
                      <p className="deco-label !text-[0.5rem]">chai</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === 'settings' && (
          <div className="space-y-7">
            {/* Profile preview */}
            {(form.profilepic || form.coverpic) && (
              <div className="deco-card overflow-hidden !p-0">
                {form.coverpic && (
                  <div className="h-28 bg-[#123c33] overflow-hidden">
                    <img src={form.coverpic} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="px-6 pb-5 pt-3 flex items-center gap-4">
                  {form.profilepic && (
                    <img src={form.profilepic} alt="Profile" className="w-12 h-12 rounded-full border-2 border-[#c9a227] shadow -mt-6 object-cover" />
                  )}
                  <div>
                    <p className="font-deco text-lg text-[#123c33]">{form.name || form.username || 'Your Name'}</p>
                    <p className="text-xs text-[#8fa199]">@{form.username || 'username'}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="deco-card p-8">
              <h2 className="font-deco text-2xl text-[#123c33] mb-7">Profile Settings</h2>
              <form action={handleSubmit} className="flex flex-col gap-6">
                {fields.map(f => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="deco-label block mb-1">
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      value={form[f.name] || ''}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="deco-input"
                      autoComplete="off"
                    />
                    {f.name.startsWith('jazzcash') && (
                      <p className="text-xs text-[#8fa199] mt-1.5">Required to accept payments on your page</p>
                    )}
                  </div>
                ))}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-deco-gold w-full !py-3.5"
                  >
                    {saving ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
