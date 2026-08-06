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

function isTokenValid(token: string): boolean {
  try {
    const payload = token.split(".")[1];

    if (!payload) return false;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");

    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );

    const decoded = JSON.parse(atob(padded));

    const exp = typeof decoded?.exp === "number" ? decoded.exp * 1000 : null;

    if (exp === null) return false;

    return Date.now() < exp - 10_000;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  const hasValidSession = !!token && isTokenValid(token);

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Landing page always resolves to a real destination.
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(hasValidSession ? "/dashboard" : "/login", request.url),
    );
  }

  /**
   * No (valid) session on a protected route: send to login and remember the
   * destination so the user resumes exactly where they intended.
   * An expired/invalid cookie is cleared so it cannot cause a redirect loop.
   */
  if (isProtected && !hasValidSession) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("returnUrl", `${pathname}${search}`);

    const response = NextResponse.redirect(loginUrl);

    if (token) response.cookies.delete("accessToken");

    // Protected HTML must never be cached by a shared proxy.
    response.headers.set("Cache-Control", "no-store, must-revalidate");

    return response;
  }

  // Already signed in: keep the user out of the auth screens.
  if (isAuthRoute && hasValidSession) {
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
