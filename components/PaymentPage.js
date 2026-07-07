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
      toast.success('Thanks for your donation! 🎉', { theme: 'dark', position: 'top-right' })
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
      toast.error('This creator has not set up payments yet.', { theme: 'dark' })
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
        theme: { color: "#f5a623" },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch {
      toast.error('Payment failed. Please try again.', { theme: 'dark' })
    } finally {
      setPaying(false)
    }
  }

  const totalRaised = payments.reduce((a, b) => a + b.amount, 0)
  const isFormValid = paymentform.name?.length >= 3 && paymentform.message?.length >= 4 && Number(paymentform.amount) > 0

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Cover + Profile */}
      <div className="relative">
        <div className="w-full h-52 md:h-72 bg-gradient-to-br from-[#35251c] to-[#191009] overflow-hidden border-b border-[#f5a623]/15">
          {currentuser.coverpic && (
            <img className="w-full h-full object-cover" src={currentuser.coverpic} alt="Cover" />
          )}
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="w-24 h-24 rounded-full border-4 border-[#f5a623] shadow-2xl shadow-black/50 bg-[#2b1d16] overflow-hidden">
            {currentuser.profilepic ? (
              <img className="w-full h-full object-cover" src={currentuser.profilepic} alt={username} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">☕</div>
            )}
          </div>
        </div>
      </div>

      {/* Creator info */}
      <div className="flex flex-col items-center pt-16 pb-4 px-4 text-center gap-2">
        <h1 className="font-chai text-4xl text-[#f3e9dd]">@{username}</h1>
        <p className="text-[#b39c88]">Let&apos;s help {username} get a chai ☕</p>
        <div className="flex items-center gap-4 text-sm text-[#b39c88] mt-1">
          <span className="flex items-center gap-1">
            <span className="font-bold text-[#f5a623]">{payments.length}</span> supporters
          </span>
          <span className="w-1 h-1 rounded-full bg-[#7d6a5a]" />
          <span className="flex items-center gap-1">
            <span className="font-bold text-[#f5a623]">Rs.{totalRaised}</span> raised
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Supporters */}
        <div className="chai-card p-7">
          <h2 className="font-chai text-2xl text-[#f3e9dd] mb-5 flex items-center gap-2">
            <span>🏆</span> Top Supporters
          </h2>
          {payments.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <span className="text-5xl opacity-40">☕</span>
              <p className="text-sm text-[#7d6a5a]">No donations yet — be the first!</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {payments.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f5a623]/15 border border-[#f5a623]/30 flex items-center justify-center shrink-0 text-[#f5a623] font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm text-[#f3e9dd]">
                      <span className="font-semibold">{p.name}</span> donated{" "}
                      <span className="font-bold text-[#f5a623]">Rs.{p.amount}</span>
                    </p>
                    {p.message && (
                      <p className="text-xs text-[#b39c88] mt-0.5 italic">&ldquo;{p.message}&rdquo;</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Payment form */}
        <div className="chai-card p-7">
          <h2 className="font-chai text-2xl text-[#f3e9dd] mb-5 flex items-center gap-2">
            <span>☕</span> Buy a Chai
          </h2>
          <div className="flex flex-col gap-4">
            <input
              onChange={handleChange}
              value={paymentform.name}
              name="name"
              type="text"
              placeholder="Your name"
              className="chai-input"
            />
            <input
              onChange={handleChange}
              value={paymentform.message}
              name="message"
              type="text"
              placeholder="Leave a warm message..."
              className="chai-input"
            />
            <input
              onChange={handleChange}
              value={paymentform.amount}
              name="amount"
              type="number"
              placeholder="Amount (Rs.)"
              min="1"
              className="chai-input"
            />

            {/* Quick amounts */}
            <div className="flex gap-2">
              {[10, 20, 50, 100].map(amt => (
                <button
                  key={amt}
                  onClick={() => setPaymentform({ ...paymentform, amount: String(amt) })}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold text-[#f5a623] bg-[#f5a623]/8 border border-[#f5a623]/25 hover:bg-[#f5a623]/15 hover:border-[#f5a623]/50 transition-all"
                >
                  Rs.{amt}
                </button>
              ))}
            </div>

            <button
              onClick={() => pay(Number(paymentform.amount) * 100)}
              disabled={!isFormValid || paying}
              className="btn-chai w-full py-3.5 text-base !rounded-xl"
            >
              {paying ? 'Brewing...' : `Pay Rs.${paymentform.amount || '0'} ☕`}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage
