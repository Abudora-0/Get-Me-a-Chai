"use client"

import { useEffect, useState } from 'react'
import { fetchuser, fetchpayments, submitSupport } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BankIcon } from '@/components/PaymentIcons'

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({ name: '', message: '', amount: '' })
  const [currentuser, setCurrentuser] = useState({})
  const [payments, setPayments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const u = await fetchuser(username)
    setCurrentuser(u || {})
    const dbpayments = await fetchpayments(username)
    setPayments(dbpayments || [])
  }

  const handleChange = (e) => setPaymentform({ ...paymentform, [e.target.name]: e.target.value })

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value)
    toast.success('Copied to clipboard!')
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      await submitSupport(Number(paymentform.amount), username, paymentform)
      setSubmitted(true)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const totalRaised = payments.reduce((a, b) => a + b.amount, 0)
  const isFormValid = paymentform.name?.length >= 3 && paymentform.message?.length >= 4 && Number(paymentform.amount) > 0
  const hasPaymentMethod = !!(currentuser.paymentPhone || (currentuser.paymentBankName && currentuser.paymentBankAccountNumber))

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} theme="light" />

      {/* Cover + Profile */}
      <div className="relative">
        <div className="w-full h-52 md:h-72 bg-[#123c33] overflow-hidden border-b border-[#c9a227]/50 relative">
          {currentuser.coverpic ? (
            <img className="w-full h-full object-cover" src={currentuser.coverpic} alt="Cover" />
          ) : (
            /* deco fan pattern fallback */
            <svg className="w-full h-full opacity-25" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 200">
              {Array.from({ length: 8 }).map((_, r) =>
                Array.from({ length: 16 }).map((_, c) => (
                  <path
                    key={`${r}-${c}`}
                    d={`M${c * 25 + 12.5} ${r * 25 + 25} a12.5 12.5 0 0125 0z`}
                    transform={`translate(${(r % 2) * 12.5 - 12.5}, 0)`}
                    fill="none"
                    stroke="#c9a227"
                    strokeWidth="0.8"
                  />
                ))
              )}
            </svg>
          )}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="w-24 h-24 rotate-45 border-2 border-[#c9a227] bg-[#fffdf6] shadow-xl overflow-hidden flex items-center justify-center">
            <div className="-rotate-45 w-[136%] h-[136%] flex items-center justify-center shrink-0">
              <img
                className="w-full h-full object-cover"
                src={currentuser.profilepic || '/avatar.gif'}
                onError={(e) => { e.currentTarget.src = '/avatar.gif' }}
                alt={username}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Creator info */}
      <div className="flex flex-col items-center pt-20 pb-4 px-4 text-center gap-2.5">
        <div className="deco-label">◆ Now Serving ◆</div>
        <h1 className="font-deco text-4xl md:text-5xl text-[#123c33]">@{username}</h1>
        <p className="text-[#4a6b60]">Let&apos;s help {username} get a chai</p>
        <div className="flex items-center gap-5 text-sm text-[#4a6b60] mt-1">
          <span>
            <span className="font-deco text-lg text-[#a8841c]">{payments.length}</span> supporters
          </span>
          <span className="text-[#c9a227]">◆</span>
          <span>
            <span className="font-deco text-lg text-[#a8841c]">Rs.{totalRaised}</span> raised
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Supporters */}
        <div className="deco-card p-8">
          <div className="deco-label mb-1.5">The Honour Roll</div>
          <h2 className="font-deco text-3xl text-[#123c33] mb-6">Top Supporters</h2>
          {payments.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <span className="text-4xl opacity-50">☕</span>
              <p className="text-sm text-[#8fa199]">No donations yet, be the first!</p>
            </div>
          ) : (
            <ul className="space-y-5">
              {payments.map((p, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rotate-45 border border-[#c9a227] flex items-center justify-center shrink-0">
                    <span className="-rotate-45 font-deco text-[#a8841c] text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm text-[#123c33]">
                      <span className="font-semibold">{p.name}</span> donated{" "}
                      <span className="font-deco text-[#a8841c]">Rs.{p.amount}</span>
                    </p>
                    {p.message && (
                      <p className="text-xs text-[#4a6b60] mt-0.5 italic">&ldquo;{p.message}&rdquo;</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Payment */}
        <div className="deco-card p-8">
          <div className="deco-label mb-1.5">The Counter</div>
          <h2 className="font-deco text-3xl text-[#123c33] mb-6">Buy a Chai</h2>

          {!hasPaymentMethod ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="text-4xl opacity-50">☕</span>
              <p className="text-sm text-[#8fa199]">{username} hasn&apos;t set up a payment method yet.</p>
            </div>
          ) : submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="text-4xl">🎉</span>
              <p className="text-[#123c33] font-semibold">Thanks for your support!</p>
              <p className="text-sm text-[#8fa199] max-w-xs">
                {`Once ${username} confirms they've received your transfer, you'll show up on the honour roll above.`}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* How to pay */}
              <div className="border border-[#a8841c]/40 p-5 flex flex-col gap-3">
                <p className="deco-label !text-[0.6rem]">Send payment to</p>
                {currentuser.paymentPhone && (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#8fa199] uppercase tracking-wider">JazzCash / Easypaisa</p>
                      <p className="font-deco text-xl text-[#123c33]">{currentuser.paymentPhone}</p>
                      {currentuser.paymentAccountTitle && (
                        <p className="text-xs text-[#4a6b60]">{currentuser.paymentAccountTitle}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentuser.paymentPhone)}
                      className="btn-deco-outline !px-3 !py-1.5 !text-[0.6rem] shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                )}
                {currentuser.paymentBankName && currentuser.paymentBankAccountNumber && (
                  <div className={`flex items-center justify-between gap-3 ${currentuser.paymentPhone ? 'pt-3 border-t border-[#a8841c]/20' : ''}`}>
                    <div className="flex items-center gap-3">
                      <BankIcon className="text-[#a8841c]" />
                      <div>
                        <p className="text-xs text-[#8fa199] uppercase tracking-wider">{currentuser.paymentBankName}</p>
                        <p className="font-deco text-lg text-[#123c33]">{currentuser.paymentBankAccountNumber}</p>
                        {currentuser.paymentAccountTitle && (
                          <p className="text-xs text-[#4a6b60]">{currentuser.paymentAccountTitle}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(currentuser.paymentBankAccountNumber)}
                      className="btn-deco-outline !px-3 !py-1.5 !text-[0.6rem] shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                )}
                <p className="text-xs text-[#8fa199]">
                  Send the amount below, then fill in your details and submit so {username} knows to look out for it.
                </p>
              </div>

              <input
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                type="text"
                placeholder="Your name"
                className="deco-input"
              />
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                placeholder="Leave a kind word..."
                className="deco-input"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="number"
                placeholder="Amount you sent (Rs.)"
                min="1"
                className="deco-input"
              />

              {/* Quick amounts */}
              <div className="flex gap-2.5">
                {[10, 20, 50, 100].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setPaymentform({ ...paymentform, amount: String(amt) })}
                    className="flex-1 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#a8841c] border border-[#a8841c]/40 hover:border-[#c9a227] hover:bg-[#c9a227]/10 transition-all"
                  >
                    Rs.{amt}
                  </button>
                ))}
              </div>

              <button
                onClick={submit}
                disabled={!isFormValid || submitting}
                className="btn-deco-gold w-full !py-4"
              >
                {submitting ? 'Submitting…' : `I've Sent Rs.${paymentform.amount || '0'}`}
              </button>
              <p className="text-center text-[#8fa199] text-[0.65rem] uppercase tracking-[0.18em]">
                Manual transfer, confirmed by {username}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PaymentPage
