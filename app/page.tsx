"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";

export default function Home() {
const router = useRouter();

const [name, setName] = useState("");
const [birthDate, setBirthDate] = useState("");
const [error, setError] = useState("");

const handleReveal = () => {
if (!name.trim()) {
setError("Please enter your name ✨");
return;
}

if (!birthDate) {
  setError("Please select your birth date ✦");
  return;
}

setError("");

router.push(
  `/fortune?name=${encodeURIComponent(
    name.trim()
  )}&birthDate=${encodeURIComponent(birthDate)}`
);

};

return (
<Background>
  <div className="min-h-screen px-5 py-8 md:px-10">
<Navbar />

    {/* ================= HERO ================= */}
    <section className="relative mx-auto flex min-h-[calc(100vh-100px)] max-w-6xl items-center justify-center overflow-hidden py-12">
      {/* Floating Stars */}
      <div className="pointer-events-none absolute left-[8%] top-[15%] text-2xl text-yellow-100/50 moo-float">
        ✦
      </div>

      <div className="pointer-events-none absolute right-[12%] top-[20%] text-sm text-yellow-100/40 moo-pulse">
        ✦
      </div>

      <div className="pointer-events-none absolute bottom-[20%] left-[15%] text-lg text-white/30 moo-float-slow">
        ✧
      </div>

      <div className="pointer-events-none absolute bottom-[15%] right-[18%] text-2xl text-yellow-100/30 moo-float">
        ✦
      </div>

      <div className="w-full max-w-4xl text-center">
        {/* Small Label */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-yellow-100/80 backdrop-blur-md">
          <span>✦</span>
          <span>Personal Fortune</span>
          <span>✦</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl md:text-8xl">
          Your day.
          <br />
          <span className="moo-gradient-text">Your energy.</span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
          Discover what today has in store for you.
          Enter your details and let MOO TODAY reveal
          your personal fortune.
        </p>

        {/* ================= FORM CARD ================= */}
        <div className="mx-auto mt-10 max-w-2xl rounded-[2rem] border border-white/15 bg-white/10 p-6 text-left shadow-2xl backdrop-blur-xl sm:p-8">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-white/50"
            >
              Your Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleReveal();
                }
              }}
              placeholder="What should we call you?"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none placeholder:text-white/25 transition focus:border-yellow-200/50 focus:bg-black/30"
            />
          </div>

          {/* Birth Date */}
          <div className="mt-5">
            <label
              htmlFor="birthDate"
              className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-white/50"
            >
              Date of Birth
            </label>

            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                setError("");
              }}
              className="w-full cursor-pointer rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition focus:border-yellow-200/50 focus:bg-black/30"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          )}

          {/* ================= BUTTONS ================= */}
          <div className="relative z-10">
            <button
              type="button"
              onClick={handleReveal}
              className="moo-shimmer mt-6 w-full cursor-pointer rounded-2xl bg-yellow-200 px-6 py-4 text-base font-black text-black shadow-lg shadow-yellow-900/20 transition duration-300 hover:-translate-y-1 hover:bg-yellow-100 hover:shadow-xl active:translate-y-0"
            >
              Reveal My Fortune ✨
            </button>

            <button
              type="button"
              onClick={() => router.push("/tarot")}
              className="mt-4 w-full cursor-pointer rounded-2xl border border-purple-200/20 bg-purple-200/10 px-6 py-4 text-base font-bold text-purple-100 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-purple-200/20"
            >
              🔮 Explore Tarot Reading
            </button>
          </div>
        </div>

        {/* ================= MINI FEATURES ================= */}
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md">
            <div className="text-xl">♈</div>

            <p className="mt-2 text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
              Zodiac
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md">
            <div className="text-xl">✦</div>

            <p className="mt-2 text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
              Energy
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md">
            <div className="text-xl">♡</div>

            <p className="mt-2 text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
              Fortune
            </p>
          </div>
        </div>

       <Footer />
      </div>
    </section>
    </div>
</Background>
);
}
