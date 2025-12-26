import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/shared/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleAdSense from "@/components/analytics/GoogleAdSense";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "RawTools - Free PDF, IBAN & Shopify Calculator Tools",
  description: "Free online tools: 16 PDF tools (merge, split, compress), 7 IBAN validators & parsers, 8 Shopify calculators. 100% free, works in your browser, your data never leaves your device.",
  keywords: "pdf tools, merge pdf, split pdf, compress pdf, iban validator, iban parser, shopify calculator, profit calculator, free online tools",
  authors: [{ name: "RawTools" }],
  openGraph: {
    title: "RawTools - Free PDF, IBAN & Shopify Calculator Tools",
    description: "31 free online tools: PDF processing, IBAN validation, and Shopify calculators. Works in your browser, 100% private.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'RawTools - Free PDF, IBAN & Shopify Calculator Tools',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RawTools - Free PDF, IBAN & Shopify Tools",
    description: "31 free tools: merge PDFs, validate IBANs, calculate Shopify profit. Browser-based, private, no signup required.",
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
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="b7OqIkKEhMevyeIBtktOgcFYit7uDdN8br0uH-C" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
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
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"} />
          <GoogleAdSense publisherId={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-XXXXXXXXXXXXXXXX"} />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
