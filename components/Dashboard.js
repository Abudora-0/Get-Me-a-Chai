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

const inputClass = "w-full px-4 py-2.5 rounded-xl text-slate-800 text-sm bg-rose-50 border border-rose-200 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"

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
      toast.success('Profile updated!', { theme: 'light', position: 'top-right' })
    } catch {
      toast.error('Something went wrong.', { theme: 'light', position: 'top-right' })
    } finally {
      setSaving(false)
    }
  }

  const totalEarned = payments.reduce((s, p) => s + (p.amount || 0), 0)
  const totalSupporters = new Set(payments.map(p => p.name)).size

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} theme="light" />

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back, <span className="font-medium text-rose-500">{form.name || form.username || '...'}</span></p>
          </div>
          <a
            href={`/${form.username || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-400 text-white text-sm font-medium hover:from-rose-600 hover:to-pink-500 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Page
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-rose-50 border border-rose-100 rounded-xl p-1 w-fit mb-8">
          {['overview', 'supporters', 'settings'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                tab === t
                  ? 'bg-white text-rose-600 shadow-sm border border-rose-100'
                  : 'text-slate-500 hover:text-slate-700'
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
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-1">Total Earned</p>
                <p className="text-3xl font-bold text-slate-800">Rs.{totalEarned.toLocaleString()}</p>
                <p className="text-xs text-rose-400 mt-1">from {payments.length} payments</p>
              </div>
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-1">Supporters</p>
                <p className="text-3xl font-bold text-slate-800">{totalSupporters}</p>
                <p className="text-xs text-rose-400 mt-1">unique people</p>
              </div>
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-1">Your Page</p>
                <p className="text-sm font-semibold text-slate-800 mt-2 truncate">/{form.username || '—'}</p>
                <p className="text-xs text-rose-400 mt-1">
                  {form.razorpayid ? '✓ Payments active' : '⚠ Set Razorpay key'}
                </p>
              </div>
            </div>

            {/* Recent supporters */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
              <h2 className="font-semibold text-slate-800 mb-4">Recent Supporters</h2>
              {payments.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl">☕</span>
                  <p className="text-slate-400 mt-3 text-sm">No supporters yet — share your page!</p>
                  <a
                    href={`/${form.username || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-rose-500 text-sm font-medium hover:underline"
                  >
                    getmeachai.com/{form.username || '...'}
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((p, i) => (
                    <div key={p.id || i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-semibold text-sm">
                          {p.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{p.name}</p>
                          {p.message && <p className="text-xs text-slate-400 truncate max-w-xs">{p.message}</p>}
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-rose-500">Rs.{p.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile completeness */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
              <h2 className="font-semibold text-slate-800 mb-4">Profile Completeness</h2>
              <div className="space-y-2">
                {[
                  { label: 'Display Name', done: !!form.name },
                  { label: 'Profile Picture', done: !!form.profilepic },
                  { label: 'Cover Picture', done: !!form.coverpic },
                  { label: 'Razorpay Key ID', done: !!form.razorpayid },
                  { label: 'Razorpay Key Secret', done: !!form.razorpaysecret },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${item.done ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                      {item.done ? '✓' : '○'}
                    </span>
                    <span className={item.done ? 'text-slate-700' : 'text-slate-400'}>{item.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setTab('settings')}
                className="mt-4 text-sm text-rose-500 font-medium hover:underline"
              >
                Complete your profile →
              </button>
            </div>
          </div>
        )}

        {/* SUPPORTERS TAB */}
        {tab === 'supporters' && (
          <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
            <h2 className="font-semibold text-slate-800 mb-6">All Supporters</h2>
            {payments.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-5xl">☕</span>
                <p className="text-slate-400 mt-4">No supporters yet.</p>
                <p className="text-slate-400 text-sm mt-1">Share your page to start receiving chai!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {payments.map((p, i) => (
                  <div key={p.id || i} className="flex items-center justify-between p-4 rounded-xl bg-rose-50 hover:bg-rose-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                        {p.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{p.name}</p>
                        {p.message && <p className="text-sm text-slate-500 mt-0.5">&quot;{p.message}&quot;</p>}
                        <p className="text-xs text-slate-400 mt-0.5">{new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-rose-500">Rs.{p.amount}</span>
                      <p className="text-xs text-slate-400">chai</p>
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
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
                {form.coverpic && (
                  <div className="h-28 bg-rose-100 overflow-hidden">
                    <img src={form.coverpic} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="px-5 pb-4 pt-2 flex items-center gap-3">
                  {form.profilepic && (
                    <img src={form.profilepic} alt="Profile" className="w-12 h-12 rounded-full border-2 border-white shadow -mt-6 object-cover" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-800">{form.name || form.username || 'Your Name'}</p>
                    <p className="text-xs text-slate-400">@{form.username || 'username'}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-7">
              <h2 className="font-semibold text-slate-800 mb-6">Profile Settings</h2>
              <form action={handleSubmit} className="flex flex-col gap-5">
                {fields.map(f => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="block text-sm font-medium text-slate-700 mb-1.5">
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      value={form[f.name] || ''}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className={inputClass}
                      autoComplete="off"
                    />
                    {(f.name === 'razorpayid' || f.name === 'razorpaysecret') && (
                      <p className="text-xs text-slate-400 mt-1">Required to accept payments on your page</p>
                    )}
                  </div>
                ))}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
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
