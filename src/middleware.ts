import { NextResponse } from "next/server";

export default function middleware() {
  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(fr|en)/:path*",
    // Skip all paths that should not be internationalized
    "/((?!api|_next|.*\\..*).*)",
    // '/((?!api|!_next/static!|_next/image|!favicon.ico|!sitemap.xml|!robots.txt).*)',
  ],
};
