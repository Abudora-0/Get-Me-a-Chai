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
  { name: 'razorpayid',     label: 'Razorpay Key ID',     type: 'text',     placeholder: 'rzp_live_...' },
  { name: 'razorpaysecret', label: 'Razorpay Key Secret', type: 'password', placeholder: '••••••••••••••••' },
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
      toast.success('Profile updated!', { theme: 'dark', position: 'top-right' })
    } catch {
      toast.error('Something went wrong.', { theme: 'dark', position: 'top-right' })
    } finally {
      setSaving(false)
    }
  }

  const totalEarned = payments.reduce((s, p) => s + (p.amount || 0), 0)
  const totalSupporters = new Set(payments.map(p => p.name)).size

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-chai text-4xl text-[#f3e9dd]">Dashboard</h1>
            <p className="text-[#b39c88] mt-1">Welcome back, <span className="text-[#f5a623] font-semibold">{form.name || form.username || '...'}</span></p>
          </div>
          <a
            href={`/${form.username || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-chai flex items-center gap-2 px-4 py-2 text-sm !rounded-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Page
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 chai-card !rounded-xl p-1 w-fit mb-8">
          {['overview', 'supporters', 'settings'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                tab === t
                  ? 'bg-[#f5a623] text-[#201512]'
                  : 'text-[#b39c88] hover:text-[#f3e9dd]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div className="space-y-6">
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="chai-card p-6">
                <p className="text-sm text-[#b39c88] mb-1">Total Earned</p>
                <p className="font-chai text-4xl text-[#f3e9dd]">Rs.{totalEarned.toLocaleString()}</p>
                <p className="text-xs text-[#f5a623] mt-1">from {payments.length} payments</p>
              </div>
              <div className="chai-card p-6">
                <p className="text-sm text-[#b39c88] mb-1">Supporters</p>
                <p className="font-chai text-4xl text-[#f3e9dd]">{totalSupporters}</p>
                <p className="text-xs text-[#f5a623] mt-1">unique people</p>
              </div>
              <div className="chai-card p-6">
                <p className="text-sm text-[#b39c88] mb-1">Your Page</p>
                <p className="text-sm font-semibold text-[#f3e9dd] mt-2 truncate">/{form.username || '—'}</p>
                <p className="text-xs mt-1" style={{ color: form.razorpayid ? '#8faa5e' : '#c96f4a' }}>
                  {form.razorpayid ? '✓ Payments active' : '⚠ Set Razorpay key'}
                </p>
              </div>
            </div>

            {/* Recent supporters */}
            <div className="chai-card p-6">
              <h2 className="font-chai text-2xl text-[#f3e9dd] mb-4">Recent Supporters</h2>
              {payments.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl opacity-40">☕</span>
                  <p className="text-[#7d6a5a] mt-3 text-sm">No supporters yet — share your page!</p>
                  <a
                    href={`/${form.username || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-[#f5a623] text-sm font-semibold hover:underline underline-offset-4"
                  >
                    getmeachai.com/{form.username || '...'}
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((p, i) => (
                    <div key={p.id || i} className="flex items-center justify-between py-3 border-b border-[#f5a623]/8 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#f5a623]/15 border border-[#f5a623]/30 flex items-center justify-center text-[#f5a623] font-bold text-sm">
                          {p.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#f3e9dd]">{p.name}</p>
                          {p.message && <p className="text-xs text-[#b39c88] truncate max-w-xs italic">{p.message}</p>}
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#f5a623]">Rs.{p.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile completeness */}
            <div className="chai-card p-6">
              <h2 className="font-chai text-2xl text-[#f3e9dd] mb-4">Profile Completeness</h2>
              <div className="space-y-2">
                {[
                  { label: 'Display Name', done: !!form.name },
                  { label: 'Profile Picture', done: !!form.profilepic },
                  { label: 'Cover Picture', done: !!form.coverpic },
                  { label: 'Razorpay Key ID', done: !!form.razorpayid },
                  { label: 'Razorpay Key Secret', done: !!form.razorpaysecret },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${item.done ? 'bg-[#8faa5e]/20 text-[#8faa5e]' : 'bg-[#35251c] text-[#7d6a5a]'}`}>
                      {item.done ? '✓' : '○'}
                    </span>
                    <span className={item.done ? 'text-[#f3e9dd]' : 'text-[#7d6a5a]'}>{item.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setTab('settings')}
                className="mt-4 text-sm text-[#f5a623] font-semibold hover:underline underline-offset-4"
              >
                Complete your profile →
              </button>
            </div>
          </div>
        )}

        {/* SUPPORTERS TAB */}
        {tab === 'supporters' && (
          <div className="chai-card p-6">
            <h2 className="font-chai text-2xl text-[#f3e9dd] mb-6">All Supporters</h2>
            {payments.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-5xl opacity-40">☕</span>
                <p className="text-[#b39c88] mt-4">No supporters yet.</p>
                <p className="text-[#7d6a5a] text-sm mt-1">Share your page to start receiving chai!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {payments.map((p, i) => (
                  <div key={p.id || i} className="flex items-center justify-between p-4 rounded-xl bg-[#191009] border border-[#f5a623]/8 hover:border-[#f5a623]/25 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f5a623] flex items-center justify-center text-[#201512] font-bold">
                        {p.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-[#f3e9dd]">{p.name}</p>
                        {p.message && <p className="text-sm text-[#b39c88] mt-0.5 italic">&quot;{p.message}&quot;</p>}
                        <p className="text-xs text-[#7d6a5a] mt-0.5">{new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-chai text-2xl text-[#f5a623]">Rs.{p.amount}</span>
                      <p className="text-xs text-[#7d6a5a]">chai</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === 'settings' && (
          <div className="space-y-6">
            {/* Profile preview */}
            {(form.profilepic || form.coverpic) && (
              <div className="chai-card overflow-hidden">
                {form.coverpic && (
                  <div className="h-28 bg-[#35251c] overflow-hidden">
                    <img src={form.coverpic} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="px-5 pb-4 pt-2 flex items-center gap-3">
                  {form.profilepic && (
                    <img src={form.profilepic} alt="Profile" className="w-12 h-12 rounded-full border-2 border-[#f5a623] shadow -mt-6 object-cover" />
                  )}
                  <div>
                    <p className="font-semibold text-[#f3e9dd]">{form.name || form.username || 'Your Name'}</p>
                    <p className="text-xs text-[#7d6a5a]">@{form.username || 'username'}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="chai-card p-7">
              <h2 className="font-chai text-2xl text-[#f3e9dd] mb-6">Profile Settings</h2>
              <form action={handleSubmit} className="flex flex-col gap-5">
                {fields.map(f => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="block text-sm font-medium text-[#b39c88] mb-1.5">
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      value={form[f.name] || ''}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="chai-input"
                      autoComplete="off"
                    />
                    {(f.name === 'razorpayid' || f.name === 'razorpaysecret') && (
                      <p className="text-xs text-[#7d6a5a] mt-1">Required to accept payments on your page</p>
                    )}
                  </div>
                ))}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-chai w-full py-3 !rounded-xl"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
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
