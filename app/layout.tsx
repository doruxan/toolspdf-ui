import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/shared/CookieConsent";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
  title: "RawTools - Free PDF, JSON, IBAN, Shopify & String Tools",
  description: "65+ free online tools: 16 PDF, 9 JSON, 7 IBAN, 8 Shopify, 25 String tools (case converter, base64, hash generator, regex tester). 100% free, works in your browser, your data never leaves your device.",
  keywords: "pdf tools, json tools, string tools, case converter, base64 encoder, csv to json, json formatter, iban validator, shopify calculator, free online tools",
  authors: [{ name: "RawTools" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.svg',
      },
    ],
  },
  openGraph: {
    title: "RawTools - Free PDF, JSON, IBAN, Shopify & String Tools",
    description: "65+ free online tools: PDF processing, JSON converters, IBAN validation, Shopify calculators, and String manipulation. Works in your browser, 100% private.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'RawTools - Free PDF, JSON, IBAN, Shopify & String Tools',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RawTools - Free PDF, JSON, IBAN, Shopify & String Tools",
    description: "65+ free tools: PDFs, JSON, IBAN, Shopify, String tools. Browser-based, private, no signup.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon - Explicit declaration for better Google indexing */}
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="mask-icon" href="/logo.svg" color="#2563eb" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="b7OqIkKEhMevyeIBtktOgcFYit7uDdN8br0uH-C" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Performance: Preconnect to third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        
        {/* Prevent flash of unstyled content (FOUC) for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'system';
                let resolvedTheme = 'light';
                if (theme === 'dark') {
                  resolvedTheme = 'dark';
                } else if (theme === 'system') {
                  resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.classList.add(resolvedTheme);
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          
          {/* Analytics - Lazy loaded, production only */}
          <AnalyticsProvider 
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"}
            publisherId={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
