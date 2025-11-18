import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  // Security Headers (additional layer)
  const securityHeaders = {
    "X-DNS-Prefetch-Control": "on",
    "X-Download-Options": "noopen",
    "X-Permitted-Cross-Domain-Policies": "none",
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // 'unsafe-eval' needed for Next.js
    "style-src 'self' 'unsafe-inline'", // 'unsafe-inline' needed for Tailwind CSS
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://www.youtube.com https://youtube.com",
    "frame-src 'self' https://www.youtube.com https://youtube.com", // Allow YouTube embeds
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     * - .well-known (well-known files for verification)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|\\.well-known).*)",
  ],
};

