'use client';

import dynamic from 'next/dynamic';

// Dynamically import analytics components in client component
const GoogleAnalytics = dynamic(() => import('./GoogleAnalytics'), {
  ssr: false,
});

const GoogleAdSense = dynamic(() => import('./GoogleAdSense'), {
  ssr: false,
});

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => ({ default: mod.SpeedInsights })),
  {
    ssr: false,
  }
);

interface AnalyticsProviderProps {
  measurementId?: string;
  publisherId?: string;
}

export default function AnalyticsProvider({
  measurementId,
  publisherId,
}: AnalyticsProviderProps) {
  return (
    <>
      {measurementId && <GoogleAnalytics measurementId={measurementId} />}
      {publisherId && <GoogleAdSense publisherId={publisherId} />}
      <SpeedInsights />
    </>
  );
}

