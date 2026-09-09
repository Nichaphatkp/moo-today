"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fortunes = {
  Career: {
    icon: "💼",
    title: "Career",
    score: 88,
    message:
      "Your career energy is moving in a positive direction. This is a good time to take initiative, show your ideas, and step into opportunities that challenge you.",
    advice:
      "Trust your abilities and don't be afraid to start something new. Small actions today can create meaningful progress.",
  },

  Finance: {
    icon: "💰",
    title: "Finance",
    score: 82,
    message:
      "Your financial energy suggests steady progress rather than sudden changes. Good planning and thoughtful decisions can help you build greater stability.",
    advice:
      "Focus on managing your resources wisely and avoid unnecessary spending. Consistency will work in your favor.",
  },

  Love: {
    icon: "💗",
    title: "Love",
    score: 91,
    message:
      "Your love energy is warm and open. Meaningful conversations and genuine connections may become more important during this period.",
    advice:
      "Be honest about what you feel and give people the chance to understand the real you.",
  },

  Health: {
    icon: "🌿",
    title: "Health",
    score: 85,
    message:
      "Your energy encourages balance and recovery. Creating small healthy routines can help you feel more refreshed and focused.",
    advice:
      "Give yourself enough rest, move your body regularly, and remember that consistency matters more than perfection.",
  },
};

const zodiacSigns = [
  { name: "Aries", start: "03-21", end: "04-19" },
  { name: "Taurus", start: "04-20", end: "05-20" },
  { name: "Gemini", start: "05-21", end: "06-20" },
  { name: "Cancer", start: "06-21", end: "07-22" },
  { name: "Leo", start: "07-23", end: "08-22" },
  { name: "Virgo", start: "08-23", end: "09-22" },
  { name: "Libra", start: "09-23", end: "10-22" },
  { name: "Scorpio", start: "10-23", end: "11-21" },
  { name: "Sagittarius", start: "11-22", end: "12-21" },
  { name: "Capricorn", start: "12-22", end: "01-19" },
  { name: "Aquarius", start: "01-20", end: "02-18" },
  { name: "Pisces", start: "02-19", end: "03-20" },
];

function getZodiac(dateString: string) {
  if (!dateString) {
    return {
      name: "Mystery",
      symbol: "✦",
    };
  }

  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const current = month * 100 + day;

  const found = zodiacSigns.find((sign) => {
    const startMonth = Number(sign.start.split("-")[0]);
    const startDay = Number(sign.start.split("-")[1]);

    const endMonth = Number(sign.end.split("-")[0]);
    const endDay = Number(sign.end.split("-")[1]);

    const start = startMonth * 100 + startDay;
    const end = endMonth * 100 + endDay;

    if (start > end) {
      return current >= start || current <= end;
    }

    return current >= start && current <= end;
  });

  const symbols: Record<string, string> = {
    Aries: "♈",
    Taurus: "♉",
    Gemini: "♊",
    Cancer: "♋",
    Leo: "♌",
    Virgo: "♍",
    Libra: "♎",
    Scorpio: "♏",
    Sagittarius: "♐",
    Capricorn: "♑",
    Aquarius: "♒",
    Pisces: "♓",
  };

  return {
    name: found?.name || "Mystery",
    symbol: found ? symbols[found.name] : "✦",
  };
}

function FortuneContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name") || "Star";
  const birthDate = searchParams.get("birthDate") || "";

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof fortunes>("Career");

  const zodiac = useMemo(
    () => getZodiac(birthDate),
    [birthDate]
  );

  const fortune = fortunes[selectedCategory];

  const luckyNumber = useMemo(() => {
    let total = 0;

    for (const char of name) {
      total += char.charCodeAt(0);
    }

    if (birthDate) {
      for (const char of birthDate) {
        if (!Number.isNaN(Number(char))) {
          total += Number(char);
        }
      }
    }

    return (total % 9) + 1;
  }, [name, birthDate]);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
     
  <div className="min-h-screen bg-black/30 px-5 py-10 md:px-10">
        <div className="mx-auto max-w-6xl">

         <Navbar />

          {/* ================= HERO ================= */}

          <section className="mb-10 rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-12">

            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">

              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.35em] text-yellow-200">
                  Your personal reading
                </p>

                <h1 className="text-4xl font-black md:text-6xl">
                  Hello, {name} ✨
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                  The stars have something interesting to say about your
                  journey. Explore your fortune below.
                </p>
              </div>

              {/* Zodiac */}

              <div className="flex flex-col items-center justify-center rounded-3xl border border-yellow-100/20 bg-yellow-100/10 px-10 py-8">

                <div className="text-6xl">
                  {zodiac.symbol}
                </div>

                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-yellow-100/70">
                  Zodiac
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {zodiac.name}
                </p>

              </div>

            </div>

          </section>

          {/* ================= QUICK STATS ================= */}

          <section className="mb-10 grid gap-4 sm:grid-cols-2">

            {/* Lucky Number */}

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

              <p className="text-sm text-white/50">
                Lucky Number
              </p>

              <p className="mt-2 text-4xl font-black text-yellow-200">
                {luckyNumber}
              </p>

            </div>

            {/* Today's Energy */}

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">

              <p className="text-sm text-white/50">
                Today's Energy
              </p>

              <p className="mt-2 text-4xl font-black text-yellow-200">
                {fortune.score}%
              </p>

            </div>

          </section>

          {/* ================= CATEGORY ================= */}

          <section>

            <div className="mb-5">

              <p className="text-sm uppercase tracking-[0.3em] text-yellow-200">
                Choose your focus
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                What would you like to explore?
              </h2>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {(Object.keys(fortunes) as Array<keyof typeof fortunes>).map(
                (category) => {

                  const item = fortunes[category];

                  const active =
                    selectedCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(category)
                      }
                      className={`relative z-10 cursor-pointer rounded-3xl border p-6 text-left transition duration-300 hover:-translate-y-1 ${
                        active
                          ? "border-yellow-200/60 bg-yellow-100/15 shadow-xl shadow-yellow-900/20"
                          : "border-white/10 bg-white/10 hover:bg-white/15"
                      }`}
                    >

                      <div className="text-4xl">
                        {item.icon}
                      </div>

                      <h3 className="mt-5 text-xl font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-white/50">
                        Explore your{" "}
                        {category.toLowerCase()} energy
                      </p>

                    </button>
                  );
                }
              )}

            </div>

          </section>

          {/* ================= FORTUNE RESULT ================= */}

          <section className="mt-8 rounded-[2rem] border border-yellow-100/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-10">

            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

              {/* Fortune Content */}

              <div className="flex-1">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100/10 text-3xl">
                    {fortune.icon}
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-yellow-200">
                      Your fortune
                    </p>

                    <h2 className="mt-1 text-3xl font-black">
                      {fortune.title}
                    </h2>

                  </div>

                </div>

                <div className="mt-8 h-px bg-white/10" />

                <p className="mt-8 text-xl leading-9 text-white/85">
                  {fortune.message}
                </p>

                {/* Advice */}

                <div className="mt-8 rounded-2xl border border-yellow-100/10 bg-yellow-100/5 p-6">

                  <p className="text-xs uppercase tracking-[0.25em] text-yellow-200">
                    ✦ Today's advice
                  </p>

                  <p className="mt-3 leading-7 text-white/70">
                    {fortune.advice}
                  </p>

                </div>

              </div>

              {/* ================= ENERGY METER ================= */}

              <div className="w-full shrink-0 rounded-3xl border border-white/10 bg-black/10 p-6 backdrop-blur-md md:w-80">

                {/* Energy Header */}

                <div className="flex items-end justify-between gap-4">

                  <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                      Energy
                    </p>

                    <p className="mt-2 text-5xl font-black text-yellow-200">
                      {fortune.score}%
                    </p>

                  </div>

                  <span className="mb-2 whitespace-nowrap rounded-full border border-yellow-200/20 bg-yellow-100/10 px-3 py-1 text-xs font-semibold text-yellow-100">
                    HIGH ENERGY
                  </span>

                </div>

                {/* Energy Bar */}

                <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/10">

                  <div
                    className="h-full rounded-full bg-yellow-200 transition-all duration-1000"
                    style={{
                      width: `${fortune.score}%`,
                    }}
                  />

                </div>

                {/* Energy Labels */}

                <div className="mt-3 flex justify-between text-xs text-white/30">

                  <span>LOW</span>

                  <span>ENERGY LEVEL</span>

                  <span>MAX</span>

                </div>

              </div>

            </div>

          </section>

          <Footer />

        </div>
      </div>
    </main>
  );
}
export default function FortunePage() {
  return (
    <Suspense fallback={null}>
      <FortuneContent />
    </Suspense>
  );
}