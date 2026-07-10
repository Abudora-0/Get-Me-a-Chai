import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="border-t border-[#a8841c]/35 py-10 mt-16 bg-[#123c33]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="deco-divider mb-7 !text-[#c9a227]">◆</div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-deco text-xl text-[#f7f3e8]">
            Get Me a <span className="text-[#c9a227]">Chai</span>
          </Link>
          <p className="text-[#f7f3e8]/50 text-xs uppercase tracking-[0.22em]">
            &copy; {currentYear} — patronage, poured properly
          </p>
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.18em] text-[#f7f3e8]/70">
            <Link href="/about" className="hover:text-[#c9a227] transition-colors">About</Link>
            <Link href="/login" className="hover:text-[#c9a227] transition-colors">Get Started</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
