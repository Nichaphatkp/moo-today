"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
      <button
        onClick={() => router.push("/")}
        className="text-xl font-bold tracking-[0.25em] text-white transition hover:text-yellow-200 sm:text-2xl"
      >
        MOO TODAY
      </button>

      <nav className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => router.push("/")}
          className="rounded-full px-3 py-2 text-xs text-white/70 transition hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
        >
          Home
        </button>

        <button
          onClick={() => router.push("/fortune")}
          className="rounded-full px-3 py-2 text-xs text-white/70 transition hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
        >
          Fortune
        </button>

        <button
          onClick={() => router.push("/tarot")}
          className="rounded-full px-3 py-2 text-xs text-white/70 transition hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
        >
          Tarot
        </button>

        <button
          onClick={() => router.push("/history")}
          className="rounded-full px-3 py-2 text-xs text-white/70 transition hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
        >
          History
        </button>
      </nav>
    </header>
  );
}