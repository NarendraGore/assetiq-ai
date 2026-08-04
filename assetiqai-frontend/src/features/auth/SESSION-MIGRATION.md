# Session storage: current model and the migration to httpOnly cookies

## Why this document exists

The session hardening in this codebase was done in two parts. Everything
described under "Current model" is implemented and working today. Everything
under "Target model" is the recommended next step, and it needs a backend change,
so it is written down rather than half-built.

## Current model

Tokens live in `localStorage`, written by `features/auth/utils/token.ts`:

| Key            | Contents                       |
| -------------- | ------------------------------ |
| `accessToken`  | JWT sent in `Authorization`    |
| `refreshToken` | Used by the axios refresh flow |
| `user`         | Serialised `User` for first paint |
| `auth-event`   | Cross-tab broadcast marker     |

The access token is additionally **mirrored into a non-httpOnly cookie** of the
same name. That mirror exists for exactly one reason: `middleware.ts` runs on the
server and cannot read `localStorage`, so without a cookie there is no way to
gate a route before the page renders. The cookie is `Path=/`, `SameSite=Lax`,
`Secure` on https, and expires at the token's own `exp`.

The mirror is a **routing hint, not the credential**. The API still authenticates
on the `Authorization` header. A forged cookie gets you a rendered shell and
nothing else — every data request 401s.

### What this model already handles correctly

**Landing on `/`** — `middleware.ts` redirects to `/dashboard` or `/login`
depending on the cookie, and `app/page.tsx` redirects to `/login` as the
no-JS/no-middleware fallback.

**Session expiry** — `AuthProvider` decodes `exp` and schedules a `setTimeout`
that ends the session the moment the token dies. There is also a 10s clock-skew
guard in `isTokenExpired` and an idle timeout in `constants/session.ts`. The user
is sent to `/login?reason=expired|idle` so the screen can explain *why*.

**Copying a URL into a second browser** — this is the standard flow and it works:

1. Browser B has no `accessToken` cookie.
2. `middleware.ts` sees a protected path with no token and redirects to
   `/login?returnUrl=/reports?page=3`.
3. `LoginForm` reads `returnUrl`, runs it through `sanitizeReturnUrl`, and after
   a successful sign-in pushes the user to that exact path.
4. If the user is already signed in in browser B, the cookie is present and the
   deep link renders directly — no redirect at all.

`sanitizeReturnUrl` rejects anything that is not a same-origin absolute path
(`//evil.com` and `https://evil.com` both fall back to `/dashboard`), which
closes the open-redirect hole that a naive `returnUrl` introduces.

**Cross-tab consistency** — `clearAuthData`/`saveAuthData` bump `auth-event`, and
`AuthProvider` listens for `storage`. Signing out in one tab signs out every tab;
signing in as a different user drops the previous user's React Query cache.

**Protected pages are never cached** — the middleware sets
`Cache-Control: no-store, must-revalidate` on protected responses so a shared
proxy or the browser's back-forward cache cannot serve one user's page to
another.

### The one weakness that remains

`localStorage` is readable by any JavaScript running on the origin. If an XSS
bug ever lands — an unescaped `dangerouslySetInnerHTML`, a compromised npm
dependency, a malicious browser extension — the attacker can read both tokens and
replay them from their own machine. No amount of frontend code fixes this,
because the frontend is the thing that has been compromised. The only real
mitigation is to make the tokens unreadable to JavaScript.

## Target model: httpOnly cookies

Move both tokens into cookies the browser will not hand to JavaScript.

### Backend changes (required first)

1. `POST /auth/login` stops returning tokens in the JSON body. It sets them as
   cookies instead:

   ```
   Set-Cookie: accessToken=<jwt>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=900
   Set-Cookie: refreshToken=<token>; HttpOnly; Secure; SameSite=Strict; Path=/auth/refresh; Max-Age=604800
   ```

   The refresh token gets a narrower `Path` and `SameSite=Strict` because it is
   the higher-value credential and is only ever needed on one endpoint.

   The response body keeps the `user` object — that is not a secret and the UI
   needs it for first paint.

2. `POST /auth/refresh` reads the refresh cookie rather than a body field, and
   rotates both cookies on success.

3. `POST /auth/logout` clears both cookies with `Max-Age=0` in addition to
   revoking the refresh token server-side.

4. CORS must send `Access-Control-Allow-Credentials: true` and a specific
   `Access-Control-Allow-Origin` (a wildcard is rejected once credentials are in
   play).

5. **CSRF protection becomes mandatory.** Cookies are sent automatically, which
   is the whole point, but it also means a third-party page can trigger an
   authenticated request. `SameSite=Lax` blocks the cross-site cases that matter
   for state-changing verbs, and the double-submit cookie pattern is the belt to
   that suspenders: issue a readable `csrfToken` cookie at login, have the client
   echo it in an `X-CSRF-Token` header, and reject any mutation where the two
   disagree.

### Frontend changes

1. **`lib/axios.ts`** — set `withCredentials: true` and delete the
   `Authorization` header interceptor. The refresh-queue logic stays exactly as
   it is; only the place the token comes from changes. Add the `X-CSRF-Token`
   header from the readable CSRF cookie.

2. **`features/auth/utils/token.ts`** — delete `saveAuthData`, `getAccessToken`,
   `getRefreshToken`, `writeCookie` and `deleteCookie`. Keep `decodeToken`,
   `getTokenExpiry`, `isTokenExpired`, `buildLoginUrl` and `sanitizeReturnUrl` —
   the URL helpers are storage-agnostic, and the decode helpers stay useful if
   you keep a non-sensitive expiry hint (see below).

3. **`features/auth/context/AuthProvider.tsx`** — the provider can no longer read
   the token, so it cannot schedule expiry from `exp` directly. Two options:

   - *Preferred*: bootstrap from `GET /auth/me` on mount. One request, always
     authoritative, and it doubles as a "is this session still alive" check.
     `loading` already exists to cover the round trip.
   - *Cheaper*: have the backend also set a readable, non-httpOnly
     `sessionExpiresAt` cookie holding just the epoch millis. No credential
     value, so it is safe to expose, and `scheduleExpiry` keeps working unchanged.

   The idle timer, the `storage` cross-tab listener and `clearQueryCache` all
   work as-is. Keep writing `auth-event` to `localStorage` on login/logout — it
   carries no secret and it is still the simplest cross-tab signal.

4. **`middleware.ts`** — unchanged. It already reads `request.cookies`, and it
   does not care whether the cookie is httpOnly.

5. **`app/(app)/layout.tsx` and `ProtectedRoute`** — unchanged.

### Migration sequencing

Ship it so no one gets logged out mid-flight:

1. Backend sets the httpOnly cookies **and** keeps returning tokens in the body.
   Nothing breaks; the frontend ignores the new cookies.
2. Deploy the frontend changes. It now authenticates by cookie. Old sessions
   still work because their `localStorage` tokens are still valid until `exp`.
3. After the longest access-token lifetime has elapsed, remove the tokens from
   the login response body and delete any leftover `localStorage` keys on next
   boot.

### What you gain, and what you give up

XSS can no longer exfiltrate a token — that is the entire payoff, and it is a
large one. The costs are real but modest: you take on CSRF as a threat you must
actively defend against, cookies are awkward if you ever add a native mobile
client (which would want header auth), and local development across different
ports needs care because cookie scoping ignores the port. For a browser-only
dashboard like this one, the trade is clearly worth making.
