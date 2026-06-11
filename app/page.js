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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-[#fffbf4] -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-6 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-sm font-medium">
            ☕ Crowdfunding for Creators
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight max-w-3xl">
            Let Your Fans<br />
            <span className="bg-gradient-to-r from-rose-500 to-pink-400 bg-clip-text text-transparent">
              Buy You a Chai
            </span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            A crowdfunding platform where your fans directly support your creative work — one chai at a time.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/login">
              <button className="px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 shadow-md hover:shadow-lg transition-all">
                Start Here →
              </button>
            </Link>
            <Link href="/about">
              <button className="px-7 py-3 rounded-full font-semibold text-slate-700 bg-white border border-rose-200 hover:border-rose-400 hover:bg-rose-50 transition-all">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-3">Your Fans Are Ready</h2>
        <p className="text-center text-slate-400 mb-12">Here&apos;s how your community can support your journey</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-7 border border-rose-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-br from-rose-500 to-pink-400 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-3">How It Works</h2>
          <p className="text-center text-rose-100 mb-12">Get started in three simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="bg-white/20 backdrop-blur-sm rounded-2xl p-7 border border-white/30 text-white">
                <div className="text-4xl font-bold text-white/30 mb-3">{s.step}</div>
                <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-rose-100 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn more */}
      <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-slate-800">Learn More About Us</h2>
        <p className="text-slate-400">Watch this quick video to understand how Get Me a Chai works</p>
        <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-lg border border-rose-100">
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
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-3xl p-12 flex flex-col items-center gap-5 text-center">
          <span className="text-5xl">☕</span>
          <h2 className="text-3xl font-bold text-slate-800">Ready to Get Supported?</h2>
          <p className="text-slate-500 max-w-md">Join thousands of creators already using Get Me a Chai to fund their passion projects.</p>
          <Link href="/login">
            <button className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-400 hover:from-rose-600 hover:to-pink-500 shadow-md hover:shadow-lg transition-all">
              Create Your Page &mdash; It&apos;s Free
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
