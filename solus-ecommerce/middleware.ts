import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Default locale for the app
  defaultLocale: 'ro',
  // Supported locales
  locales: ['ro'],
  // Don't redirect to locale prefix (since we only have Romanian)
  localePrefix: 'never'
});

export const config = {
  // Match all paths except API routes, static files, and internal Next.js routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
