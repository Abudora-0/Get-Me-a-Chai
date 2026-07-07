import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="border-t border-[#f5a623]/10 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-chai text-xl text-[#f3e9dd]">
          Get Me a <em className="text-[#f5a623]">Chai</em>
        </Link>
        <p className="text-[#7d6a5a] text-sm text-center">
          &copy; {currentYear} Get Me a Chai — brewed with care, one cup at a time
        </p>
        <div className="flex items-center gap-5 text-sm text-[#b39c88]">
          <Link href="/about" className="hover:text-[#f5a623] transition-colors">About</Link>
          <Link href="/login" className="hover:text-[#f5a623] transition-colors">Get Started</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
