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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#f5a623]/8 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-5xl">☕</span>
          <h1 className="font-chai text-5xl md:text-6xl text-[#f3e9dd] mt-5 mb-5">
            About Get Me a <em className="text-[#f5a623]">Chai</em>
          </h1>
          <p className="text-[#b39c88] text-lg leading-relaxed">
            Get Me a Chai is a crowdfunding platform built for creators — writers, developers, designers, educators, and anyone who makes things people love. We make it easy for your fans to support your work by buying you a chai.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-chai text-4xl text-[#f3e9dd] text-center mb-3">How it works</h2>
        <p className="text-[#7d6a5a] text-center mb-12">Simple, transparent, creator-first</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Sign In", desc: "Create your account instantly with GitHub. No long forms, no waiting." },
            { step: "2", title: "Set Up Your Page", desc: "Add a profile photo, cover image, and connect your Razorpay account to receive payments." },
            { step: "3", title: "Share & Earn", desc: "Share your unique page link. Fans visit and buy you a chai — money lands in your account." },
          ].map(s => (
            <div key={s.step} className="chai-card chai-card-hover p-7 text-center">
              <div className="w-12 h-12 rounded-full bg-[#f5a623] text-[#201512] font-chai text-2xl flex items-center justify-center mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-chai text-2xl text-[#f3e9dd] mb-2">{s.title}</h3>
              <p className="text-[#b39c88] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-[#f5a623]/10 bg-[#191009] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-chai text-4xl text-[#f3e9dd] text-center mb-3">Why Get Me a Chai?</h2>
          <p className="text-[#7d6a5a] text-center mb-12">Everything a creator needs</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(b => (
              <div key={b.title} className="chai-card p-6">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-chai text-xl text-[#f3e9dd] mb-1">{b.title}</h3>
                <p className="text-[#b39c88] text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="font-chai text-4xl text-[#f3e9dd] mb-4">Ready to start?</h2>
        <p className="text-[#b39c88] mb-8 max-w-md mx-auto">Join creators already using Get Me a Chai to fund their passion.</p>
        <Link href="/login">
          <button className="btn-chai px-9 py-3.5 text-base">
            Create your page — it&apos;s free
          </button>
        </Link>
      </section>
    </>
  )
}

export default About
