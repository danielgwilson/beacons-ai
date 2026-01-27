import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import {
  Fragment_Mono,
  Instrument_Sans,
  Playfair_Display,
} from "next/font/google";
import { PageTransition } from "@/components/brand/page-transition";
import "./globals.css";

const brandSans = Instrument_Sans({
  variable: "--font-brand-sans",
  subsets: ["latin"],
});

const brandDisplay = Playfair_Display({
  variable: "--font-brand-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const brandMono = Fragment_Mono({
  variable: "--font-brand-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sundae",
  description:
    "A creator homepage that turns taps into subscribers and customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${brandSans.variable} ${brandDisplay.variable} ${brandMono.variable} antialiased`}
      >
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
