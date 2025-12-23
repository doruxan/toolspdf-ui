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
  metadataBase: new URL('https://toolspdf.io'),
  alternates: {
    canonical: './',
  },
  title: "Free Online PDF Tools - Merge, Split, Compress & Convert PDFs",
  description: "Free online PDF tools to merge, split, compress, convert, rotate, protect, and watermark PDFs. 100% free, no limits, works in your browser. Your files never leave your device.",
  keywords: "pdf tools, merge pdf, split pdf, compress pdf, pdf to jpg, jpg to pdf, free pdf tools online",
  authors: [{ name: "PDF Tools" }],
  openGraph: {
    title: "Free Online PDF Tools - Merge, Split, Compress & Convert PDFs",
    description: "Free online PDF tools. 100% free, no limits, works in your browser. Your files never leave your device.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online PDF Tools",
    description: "Free online PDF tools. 100% free, no limits, works in your browser.",
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
        <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
        <GoogleAdSense publisherId="ca-pub-XXXXXXXXXXXXXXXX" />
      </body>
    </html>
  );
}
