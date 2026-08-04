import { NextRequest, NextResponse } from "next/server";

/**
 * Routes that require a session. Kept in sync with the (app) route group.
 * Anything under these prefixes is gated before the page renders.
 */
const protectedRoutes = [
  "/dashboard",
  "/products",
  "/categories",
  "/suppliers",
  "/reports",
  "/orders",
  "/users",
];

/** Auth screens an already-signed-in user should not see. */
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Landing page always resolves to a real destination.
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/dashboard" : "/login", request.url),
    );
  }

  /**
   * No session on a protected route: send to login and remember the
   * destination so the user resumes exactly where they intended.
   * This is what makes a copied URL work in a second browser.
   */
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("returnUrl", `${pathname}${search}`);

    const response = NextResponse.redirect(loginUrl);

    // Protected HTML must never be cached by a shared proxy.
    response.headers.set("Cache-Control", "no-store, must-revalidate");

    return response;
  }

  // Already signed in: keep the user out of the auth screens.
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const response = NextResponse.next();

  if (isProtected) {
    response.headers.set("Cache-Control", "no-store, must-revalidate");
  }

  return response;
}

export const config = {
  /**
   * Run on everything except Next internals, the API proxy and static assets.
   * A prefix list would silently miss new routes; this fails closed instead.
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
