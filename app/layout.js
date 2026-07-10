import { Marcellus, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/Footer";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});
const jost = Jost({
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
        className={`${marcellus.variable} ${jost.variable} min-h-screen flex flex-col`}
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
