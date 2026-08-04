import { redirect } from "next/navigation";

/**
 * The landing URL is not a page in its own right — middleware already routes
 * "/" to /dashboard or /login depending on the session cookie. This redirect
 * is the fallback for the case middleware is bypassed (e.g. static export).
 */
export default function HomePage() {
  redirect("/login");
}
