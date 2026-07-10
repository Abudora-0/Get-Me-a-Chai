import Link from 'next/link'

export const metadata = {
  title: 'About — Get Me a Chai',
}

const benefits = [
  {
    numeral: "I",
    title: "Direct Financial Support",
    desc: "Fans contribute directly to your work — no middlemen, no complicated tiers.",
  },
  {
    numeral: "II",
    title: "Community Collaboration",
    desc: "Connect with your audience, get feedback, and build projects together.",
  },
  {
    numeral: "III",
    title: "Global Reach",
    desc: "Share your page with anyone worldwide and grow your supporter base.",
  },
  {
    numeral: "IV",
    title: "Instant Setup",
    desc: "Sign in with GitHub or Google, add your JazzCash details, and you're live in minutes.",
  },
  {
    numeral: "V",
    title: "Secure Payments",
    desc: "Powered by JazzCash — Pakistan's most widely used payment service.",
  },
  {
    numeral: "VI",
    title: "Track Your Support",
    desc: "See your top supporters and total funds raised right on your creator page.",
  },
]

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#a8841c]/35 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="deco-label mb-4">— The House Story —</div>
          <h1 className="font-deco text-5xl md:text-6xl text-[#123c33] mb-6">
            About Get Me a <span className="text-[#a8841c]">Chai</span>
          </h1>
          <div className="deco-divider max-w-xs mx-auto mb-6 text-xs">◆</div>
          <p className="text-[#4a6b60] text-lg leading-relaxed">
            Get Me a Chai is a crowdfunding platform built for creators — writers, developers, designers, educators, and anyone who makes things people love. We make it easy for your fans to support your work by buying you a chai.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="deco-label mb-3">The Ceremony</div>
          <h2 className="font-deco text-4xl text-[#123c33]">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {[
            { step: "1", title: "Sign In", desc: "Create your account instantly with GitHub or Google. No long forms, no waiting." },
            { step: "2", title: "Set Up Your Page", desc: "Add a profile photo, cover image, and connect your JazzCash merchant account to receive payments." },
            { step: "3", title: "Share & Earn", desc: "Share your unique page link. Fans visit and buy you a chai — money lands in your account." },
          ].map(s => (
            <div key={s.step} className="deco-card deco-card-hover p-8 text-center">
              <div className="w-12 h-12 border border-[#c9a227] text-[#a8841c] font-deco text-2xl flex items-center justify-center mx-auto mb-5 rotate-45">
                <span className="-rotate-45">{s.step}</span>
              </div>
              <h3 className="font-deco text-2xl text-[#123c33] mb-2">{s.title}</h3>
              <p className="text-[#4a6b60] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits — emerald band */}
      <section className="bg-[#123c33] border-y border-[#c9a227]/40 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="deco-label !text-[#c9a227] mb-3">The Amenities</div>
            <h2 className="font-deco text-4xl text-[#f7f3e8]">Why Get Me a Chai?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="border border-[#c9a227]/50 p-7" style={{ boxShadow: 'inset 0 0 0 4px #123c33, inset 0 0 0 5px rgba(201,162,39,0.4)' }}>
                <div className="font-deco text-2xl text-[#c9a227] mb-3">{b.numeral}</div>
                <h3 className="font-deco text-xl text-[#f7f3e8] mb-2">{b.title}</h3>
                <p className="text-[#f7f3e8]/65 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="deco-label mb-3">Reservations Open</div>
        <h2 className="font-deco text-4xl text-[#123c33] mb-4">Ready to Start?</h2>
        <p className="text-[#4a6b60] mb-8 max-w-md mx-auto">Join creators already using Get Me a Chai to fund their passion.</p>
        <Link href="/login">
          <button className="btn-deco-gold">Create Your Page — It&apos;s Free</button>
        </Link>
      </section>
    </>
  )
}

export default About
