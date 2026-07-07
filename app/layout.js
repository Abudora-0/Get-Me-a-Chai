import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/Footer";

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
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
      <body
        className={`${instrument.variable} ${dmSans.variable} min-h-screen flex flex-col`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
        suppressHydrationWarning
      >
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
