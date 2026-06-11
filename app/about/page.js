import Link from 'next/link'

export const metadata = {
  title: 'About — Get Me a Chai',
}

const benefits = [
  {
    icon: "💰",
    title: "Direct Financial Support",
    desc: "Fans contribute directly to your work — no middlemen, no complicated tiers.",
  },
  {
    icon: "🤝",
    title: "Community Collaboration",
    desc: "Connect with your audience, get feedback, and build projects together.",
  },
  {
    icon: "🌐",
    title: "Global Reach",
    desc: "Share your page with anyone worldwide and grow your supporter base.",
  },
  {
    icon: "⚡",
    title: "Instant Setup",
    desc: "Sign in with GitHub, add your Razorpay credentials, and you're live in minutes.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "Powered by Razorpay — India's most trusted payment gateway.",
  },
  {
    icon: "📊",
    title: "Track Your Support",
    desc: "See your top supporters and total funds raised right on your creator page.",
  },
]

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-5xl">☕</span>
          <h1 className="text-4xl font-bold text-slate-800 mt-4 mb-4">About Get Me a Chai</h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Get Me a Chai is a crowdfunding platform built for creators — writers, developers, designers, educators, and anyone who makes things people love. We make it easy for your fans to support your work by buying you a chai.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-3">How It Works</h2>
        <p className="text-slate-400 text-center mb-12">Simple, transparent, creator-first</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Sign In", desc: "Create your account instantly with GitHub. No long forms, no waiting." },
            { step: "2", title: "Set Up Your Page", desc: "Add a profile photo, cover image, and connect your Razorpay account to receive payments." },
            { step: "3", title: "Share & Earn", desc: "Share your unique page link. Fans visit and buy you a chai — money lands in your account." },
          ].map(s => (
            <div key={s.step} className="bg-white rounded-2xl p-7 border border-rose-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-400 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-br from-rose-500 to-pink-400 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Why Get Me a Chai?</h2>
          <p className="text-rose-100 text-center mb-12">Everything a creator needs</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(b => (
              <div key={b.title} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-white">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-lg mb-1">{b.title}</h3>
                <p className="text-rose-100 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Start?</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Join creators already using Get Me a Chai to fund their passion.</p>
        <Link href="/login">
          <button className="px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 shadow-md hover:shadow-lg transition-all">
            Create Your Page &mdash; It&apos;s Free
          </button>
        </Link>
      </section>
    </>
  )
}

export default About
