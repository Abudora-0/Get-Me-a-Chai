import Link from "next/link"

const features = [
  {
    emoji: "💰",
    title: "Fans Want to Contribute",
    desc: "Your fans are willing to support you financially so you can keep creating what you love.",
  },
  {
    emoji: "🤝",
    title: "Fans Want to Help",
    desc: "Build a community of supporters who are invested in your success and growth.",
  },
  {
    emoji: "🚀",
    title: "Fans Want to Collaborate",
    desc: "Connect with your audience on a deeper level and bring projects to life together.",
  },
]

const steps = [
  { step: "01", title: "Create Your Page", desc: "Sign in with GitHub and set up your creator profile in minutes." },
  { step: "02", title: "Share Your Link", desc: "Share your unique page URL with your audience and community." },
  { step: "03", title: "Receive Support", desc: "Your fans buy you a chai — funds go directly to you via Razorpay." },
]

const BigCup = () => (
  <svg width="120" height="120" viewBox="0 0 64 64" fill="none" className="mx-auto">
    <path className="steam-line" d="M24 22 Q25.5 18 24 14" stroke="#c96f4a" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
    <path className="steam-line" d="M32 22 Q33.5 18 32 14" stroke="#c96f4a" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
    <path className="steam-line" d="M40 22 Q41.5 18 40 14" stroke="#c96f4a" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
    <path d="M14 28h30l-3.2 20a2 2 0 01-2 1.7H19.2a2 2 0 01-2-1.7L14 28z" fill="#f5a623"/>
    <path d="M44 32h4a4 4 0 010 8h-4.6" stroke="#f5a623" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
    <ellipse cx="29" cy="55" rx="16" ry="2" fill="#f5a623" fillOpacity="0.18"/>
  </svg>
)

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* warm glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-[#f5a623]/8 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 pt-20 pb-24 flex flex-col items-center text-center gap-7 fade-in-up">
          <BigCup />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f5a623]/25 bg-[#f5a623]/8 text-[#f5a623] text-xs font-semibold tracking-widest uppercase">
            Crowdfunding for creators
          </div>
          <h1 className="font-chai text-5xl md:text-7xl text-[#f3e9dd] leading-[1.05] max-w-3xl">
            Let your fans<br />
            buy you a <em className="text-[#f5a623]">chai.</em>
          </h1>
          <p className="text-[#b39c88] text-lg max-w-xl leading-relaxed">
            A cozy corner of the internet where your audience directly funds
            your creative work — one warm cup at a time.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/login">
              <button className="btn-chai px-8 py-3.5 text-base">
                Start brewing →
              </button>
            </Link>
            <Link href="/about">
              <button className="btn-chai-ghost px-8 py-3.5 text-base">
                Learn more
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="font-chai text-4xl text-center text-[#f3e9dd] mb-3">Your fans are ready</h2>
        <p className="text-center text-[#7d6a5a] mb-12">Here&apos;s how your community can support your journey</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="chai-card chai-card-hover p-7">
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="font-chai text-2xl text-[#f3e9dd] mb-2">{f.title}</h3>
              <p className="text-[#b39c88] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-[#f5a623]/10 bg-[#191009] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-chai text-4xl text-center text-[#f3e9dd] mb-3">The recipe</h2>
          <p className="text-center text-[#7d6a5a] mb-12">Get started in three simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="chai-card p-7 relative overflow-hidden">
                <div className="font-chai text-7xl text-[#f5a623]/12 absolute -top-2 right-4 select-none">{s.step}</div>
                <div className="font-chai text-lg text-[#f5a623] mb-3">{s.step}</div>
                <h3 className="font-chai text-2xl text-[#f3e9dd] mb-2">{s.title}</h3>
                <p className="text-[#b39c88] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn more */}
      <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center gap-6">
        <h2 className="font-chai text-4xl text-[#f3e9dd]">See it in action</h2>
        <p className="text-[#7d6a5a]">Watch this quick video to understand how Get Me a Chai works</p>
        <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-[#f5a623]/20 shadow-2xl shadow-black/40">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/bp4_7T9J6Fg"
            title="Get Me a Chai - Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="chai-card !rounded-3xl p-12 flex flex-col items-center gap-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5a623]/6 to-transparent pointer-events-none" />
          <span className="text-5xl">☕</span>
          <h2 className="font-chai text-4xl text-[#f3e9dd]">Ready to get supported?</h2>
          <p className="text-[#b39c88] max-w-md">Join thousands of creators already using Get Me a Chai to fund their passion projects.</p>
          <Link href="/login">
            <button className="btn-chai px-9 py-3.5 text-base">
              Create your page — it&apos;s free
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
