import Link from "next/link"

const features = [
  {
    numeral: "I",
    title: "Fans Want to Contribute",
    desc: "Your fans are willing to support you financially so you can keep creating what you love.",
  },
  {
    numeral: "II",
    title: "Fans Want to Help",
    desc: "Build a community of supporters who are invested in your success and growth.",
  },
  {
    numeral: "III",
    title: "Fans Want to Collaborate",
    desc: "Connect with your audience on a deeper level and bring projects to life together.",
  },
]

const steps = [
  { step: "01", title: "Create Your Page", desc: "Sign in with GitHub and set up your creator profile in minutes." },
  { step: "02", title: "Share Your Link", desc: "Share your unique page URL with your audience and community." },
  { step: "03", title: "Receive Support", desc: "Your fans buy you a chai — funds go directly to you via JazzCash." },
]

const Sunburst = () => (
  <svg width="150" height="150" viewBox="0 0 100 100" fill="none" className="mx-auto">
    {/* rotating rays */}
    <g className="sunburst-slow" stroke="#c9a227" strokeWidth="1" opacity="0.55">
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180
        return (
          <line
            key={i}
            x1={50 + 30 * Math.cos(a)} y1={50 + 30 * Math.sin(a)}
            x2={50 + 46 * Math.cos(a)} y2={50 + 46 * Math.sin(a)}
          />
        )
      })}
    </g>
    <circle cx="50" cy="50" r="27" stroke="#c9a227" strokeWidth="1.2"/>
    <circle cx="50" cy="50" r="24" stroke="#c9a227" strokeWidth="0.6" opacity="0.5"/>
    {/* cup */}
    <path d="M40 46h20l-2.3 13a1.6 1.6 0 01-1.6 1.3H43.9a1.6 1.6 0 01-1.6-1.3L40 46z" fill="#123c33"/>
    <path d="M60 48.5h3a3 3 0 010 6h-3.7" stroke="#123c33" strokeWidth="1.8" fill="none"/>
    <path d="M45.5 42.5c.8-1.6.8-2.6 0-4.2M50 42.5c.8-1.6.8-2.6 0-4.2M54.5 42.5c.8-1.6.8-2.6 0-4.2" stroke="#a8841c" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#a8841c]/35">
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-20 flex flex-col items-center text-center gap-7 fade-in-up">
          <Sunburst />
          <div className="deco-label">— Patronage for the modern creator —</div>
          <h1 className="font-deco text-5xl md:text-7xl text-[#123c33] leading-[1.08] max-w-3xl">
            Let Your Fans<br />
            Buy You a <span className="text-[#a8841c]">Chai</span>
          </h1>
          <p className="text-[#4a6b60] text-lg max-w-xl leading-relaxed">
            A grand little corner of the internet where your audience funds your
            creative work — served one golden cup at a time.
          </p>
          <div className="flex gap-4 flex-wrap justify-center mt-2">
            <Link href="/login">
              <button className="btn-deco-gold">Begin Here</button>
            </Link>
            <Link href="/about">
              <button className="btn-deco-outline">The Details</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="deco-label mb-3">The Patrons</div>
          <h2 className="font-deco text-4xl text-[#123c33]">Your Fans Are Ready</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {features.map((f) => (
            <div key={f.title} className="deco-card deco-card-hover p-9 text-center">
              <div className="font-deco text-3xl text-[#c9a227] mb-4">{f.numeral}</div>
              <div className="deco-divider mb-5 text-[0.6rem]">◆</div>
              <h3 className="font-deco text-2xl text-[#123c33] mb-3">{f.title}</h3>
              <p className="text-[#4a6b60] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — emerald band */}
      <section className="bg-[#123c33] border-y border-[#c9a227]/40 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="deco-label !text-[#c9a227] mb-3">The Ceremony</div>
            <h2 className="font-deco text-4xl text-[#f7f3e8]">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {steps.map((s) => (
              <div key={s.step} className="border border-[#c9a227]/50 p-8 relative" style={{ boxShadow: 'inset 0 0 0 4px #123c33, inset 0 0 0 5px rgba(201,162,39,0.4)' }}>
                <div className="font-deco text-5xl text-[#c9a227] mb-4">{s.step}</div>
                <h3 className="font-deco text-2xl text-[#f7f3e8] mb-2">{s.title}</h3>
                <p className="text-[#f7f3e8]/65 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn more */}
      <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center gap-6">
        <div className="deco-label">A Brief Screening</div>
        <h2 className="font-deco text-4xl text-[#123c33]">See It in Action</h2>
        <p className="text-[#4a6b60]">Watch this quick video to understand how Get Me a Chai works</p>
        <div className="w-full max-w-2xl aspect-video overflow-hidden deco-card !p-0">
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
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="deco-card p-12 md:p-16 flex flex-col items-center gap-5 text-center">
          <div className="deco-divider w-full max-w-xs text-xs">◆ ◆ ◆</div>
          <h2 className="font-deco text-4xl md:text-5xl text-[#123c33]">Ready to Be Supported?</h2>
          <p className="text-[#4a6b60] max-w-md">Join thousands of creators already using Get Me a Chai to fund their passion projects.</p>
          <Link href="/login" className="mt-2">
            <button className="btn-deco-gold">Create Your Page — It&apos;s Free</button>
          </Link>
          <div className="deco-divider w-full max-w-xs text-xs">◆ ◆ ◆</div>
        </div>
      </section>
    </>
  )
}
