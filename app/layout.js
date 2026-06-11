import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Get Me a Chai — Support Your Favourite Creators",
  description: "A crowdfunding platform where fans can support their favourite creators by buying them a chai.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans bg-[#fff5f7] text-slate-800 min-h-screen flex flex-col`} suppressHydrationWarning>
        <SessionWrapper>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
