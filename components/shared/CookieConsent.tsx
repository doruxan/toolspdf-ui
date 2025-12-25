'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-2 border-primary shadow-2xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              We use cookies to improve your experience and for analytics. By using our site, you agree to our use of cookies.{' '}
              <Link href="/privacy" className="text-primary hover:underline font-medium">
                Learn more about our privacy policy
              </Link>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-all"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:opacity-90 transition-all"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

