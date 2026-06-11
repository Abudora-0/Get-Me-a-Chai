import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-white border-t border-rose-100 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-700 text-base">
          <span className="text-xl">☕</span>
          <span>Get Me a <span className="text-rose-500">Chai</span></span>
        </Link>
        <p className="text-slate-400 text-sm text-center">
          &copy; {currentYear} Get Me a Chai — All rights reserved
        </p>
        <div className="flex items-center gap-5 text-sm text-slate-500">
          <Link href="/about" className="hover:text-rose-500 transition-colors">About</Link>
          <Link href="/login" className="hover:text-rose-500 transition-colors">Get Started</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
