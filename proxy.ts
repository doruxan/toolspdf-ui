import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // Restrict access to /test route in production
  if (
    request.nextUrl.pathname.startsWith('/test') &&
    process.env.NODE_ENV === 'production'
  ) {
    // Return 404 for production
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/test/:path*',
};

