"use client"

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({ name: '', message: '', amount: '' })
  const [currentuser, setCurrentuser] = useState({})
  const [payments, setPayments] = useState([])
  const [paying, setPaying] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast.success('Thanks for your donation! 🎉', { position: 'top-right' })
      router.replace(`/${username}`)
    }
  }, [searchParams])

  const getData = async () => {
    const u = await fetchuser(username)
    setCurrentuser(u || {})
    const dbpayments = await fetchpayments(username)
    setPayments(dbpayments || [])
  }

  const handleChange = (e) => setPaymentform({ ...paymentform, [e.target.name]: e.target.value })

  const pay = async (amount) => {
    if (!currentuser.razorpayid) {
      toast.error('This creator has not set up payments yet.')
      return
    }
    setPaying(true)
    try {
      const order = await initiate(amount, username, paymentform)
      const options = {
        key: currentuser.razorpayid,
        amount,
        currency: "PKR",
        name: "Get Me a Chai",
        description: `Supporting ${username}`,
        order_id: order.id,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        theme: { color: "#123c33" },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch {
      toast.error('Payment failed. Please try again.')
    } finally {
      setPaying(false)
    }
  }

  const totalRaised = payments.reduce((a, b) => a + b.amount, 0)
  const isFormValid = paymentform.name?.length >= 3 && paymentform.message?.length >= 4 && Number(paymentform.amount) > 0

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

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
              {currentuser.profilepic ? (
                <img className="w-full h-full object-cover" src={currentuser.profilepic} alt={username} />
              ) : (
                <span className="text-3xl">☕</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Creator info */}
      <div className="flex flex-col items-center pt-20 pb-4 px-4 text-center gap-2.5">
        <div className="deco-label">— Now Serving —</div>
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
              <p className="text-sm text-[#8fa199]">No donations yet — be the first!</p>
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

        {/* Payment form */}
        <div className="deco-card p-8">
          <div className="deco-label mb-1.5">The Counter</div>
          <h2 className="font-deco text-3xl text-[#123c33] mb-6">Buy a Chai</h2>
          <div className="flex flex-col gap-5">
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
              placeholder="Amount (Rs.)"
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
              onClick={() => pay(Number(paymentform.amount) * 100)}
              disabled={!isFormValid || paying}
              className="btn-deco-gold w-full !py-4"
            >
              {paying ? 'Pouring…' : `Pay Rs.${paymentform.amount || '0'}`}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage
