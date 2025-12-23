'use client';

import Script from 'next/script';

interface GoogleAdSenseProps {
  publisherId: string;
}

export default function GoogleAdSense({ publisherId }: GoogleAdSenseProps) {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  // Don't load if no valid ID
  if (!publisherId || publisherId === 'ca-pub-XXXXXXXXXXXXXXXX') {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}

