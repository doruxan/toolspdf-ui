import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/shared/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleAdSense from "@/components/analytics/GoogleAdSense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rawtools.io'),
  alternates: {
    canonical: './',
  },
  title: "RawTools - Free Online Tools (PDF, Calculators, IBAN)",
  description: "Free online tools that run in your browser: PDF tools (merge, split, compress), e-commerce calculators, and IBAN validation/parsing. Fast, private, and easy to use.",
  keywords: "pdf tools, merge pdf, split pdf, compress pdf, ecommerce calculator, iban validator, iban parser, free online tools",
  authors: [{ name: "RawTools" }],
  openGraph: {
    title: "RawTools - Free Online Tools (PDF, Calculators, IBAN)",
    description: "Free online tools that run in your browser: PDF tools, e-commerce calculators, and IBAN validation/parsing. Fast, private, and easy to use.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RawTools - Free Online Tools",
    description: "Free online tools that run in your browser: PDF tools, e-commerce calculators, and IBAN tools. Fast and private.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="b7OqIkKEhMevyeIBtktOgcFYit7uDdN8br0uH-C" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        
        {/* Analytics - Lazy loaded, production only */}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"} />
        <GoogleAdSense publisherId={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-XXXXXXXXXXXXXXXX"} />
      </body>
    </html>
  );
}
