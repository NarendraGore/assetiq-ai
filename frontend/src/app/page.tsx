import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link
        href="/dashboard"
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}