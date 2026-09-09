"use client";

import { useEffect, useState } from "react";

type HistoryCard = {
  name: string;
  image: string;
  meaning: string;
};

type ReadingHistory = {
  id: string;
  category: string;
  cardCount: number;
  cards: HistoryCard[];
  createdAt: string;
};

const categoryIcon: Record<string, string> = {
  Love: "♡",
  Career: "✦",
  Finance: "◈",
  Health: "☾",
};

export default function HistoryPage() {
  const [history, setHistory] = useState<ReadingHistory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("moo-today-tarot-history");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setHistory(parsed);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all tarot history?"
    );

    if (!confirmed) return;

    localStorage.removeItem("moo-today-tarot-history");
    setHistory([]);
  };

  const deleteReading = (id: string) => {
    const updated = history.filter((reading) => reading.id !== id);

    localStorage.setItem(
      "moo-today-tarot-history",
      JSON.stringify(updated)
    );

    setHistory(updated);
  };

  const totalCards = history.reduce(
    (total, reading) => total + reading.cardCount,
    0
  );

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="min-h-screen bg-black/75 px-4 py-6 sm:px-6 sm:py-8 md:px-10">
        {/* NAVBAR */}
        <nav className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="cursor-pointer text-base font-black tracking-[0.2em] transition hover:opacity-70 sm:text-xl sm:tracking-[0.25em]"
          >
            MOO TODAY
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/tarot";
              }}
              className="cursor-pointer rounded-full border border-purple-200/20 bg-purple-200/10 px-3 py-2 text-xs backdrop-blur-md transition hover:bg-purple-200/20 sm:px-5 sm:text-sm"
            >
              🔮 <span className="hidden xs:inline">Tarot</span>
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur-md transition hover:bg-white/10 sm:px-5 sm:text-sm"
            >
              ← <span className="hidden xs:inline">Home</span>
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="mx-auto max-w-5xl pb-6 pt-16 text-center sm:pt-24 md:pt-28">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200/20 bg-purple-200/10 px-4 py-2 text-[9px] uppercase tracking-[0.25em] text-purple-100/80 backdrop-blur-md sm:gap-3 sm:px-5 sm:text-xs sm:tracking-[0.3em]">
            <span>✦</span>
            <span>Your History</span>
            <span>✦</span>
          </div>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-8xl">
            Your tarot
            <br />
            <span className="text-yellow-200">journey.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl px-3 text-sm leading-6 text-white/50 sm:mt-7 sm:text-base sm:leading-7 md:text-lg">
            Look back at the cards you&apos;ve drawn and revisit the messages
            they revealed.
          </p>

          {/* STATS */}
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md sm:px-4 sm:py-5">
              <p className="text-2xl font-black text-yellow-200 sm:text-3xl">
                {history.length}
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/30 sm:text-[10px] sm:tracking-[0.2em]">
                Readings
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md sm:px-4 sm:py-5">
              <p className="text-2xl font-black text-purple-200 sm:text-3xl">
                {totalCards}
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/30 sm:text-[10px] sm:tracking-[0.2em]">
                Cards Drawn
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md sm:col-span-1 sm:px-4 sm:py-5">
              <p className="text-2xl font-black text-pink-200 sm:text-3xl">
                ✦
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/30 sm:text-[10px] sm:tracking-[0.2em]">
                Your Journey
              </p>
            </div>
          </div>
        </section>

        {/* HISTORY */}
        <section className="mx-auto mt-10 max-w-6xl sm:mt-14">
          <div className="mb-6 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-yellow-200 sm:text-xs sm:tracking-[0.3em]">
                Tarot History
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Previous Readings
              </h2>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={clearHistory}
                className="cursor-pointer self-start rounded-xl border border-red-300/10 bg-red-400/10 px-4 py-2.5 text-xs text-red-200 transition hover:bg-red-400/20 sm:self-auto sm:text-sm"
              >
                Clear History
              </button>
            )}
          </div>

          {/* EMPTY STATE */}
          {history.length === 0 && (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl sm:rounded-[2rem] sm:p-16">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-purple-200/10 bg-purple-200/5 text-4xl sm:h-24 sm:w-24 sm:text-5xl">
                🔮
              </div>

              <h3 className="mt-6 text-2xl font-black sm:mt-7 sm:text-3xl">
                No readings yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40 sm:text-base sm:leading-7">
                Your tarot readings will appear here after you draw your first
                cards.
              </p>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/tarot";
                }}
                className="relative z-10 mt-7 w-full cursor-pointer rounded-2xl bg-yellow-200 px-6 py-4 text-sm font-black text-black shadow-lg transition hover:-translate-y-1 hover:bg-yellow-100 sm:mt-8 sm:w-auto sm:px-7 sm:text-base"
              >
                Draw Your First Cards ✨
              </button>
            </div>
          )}

          {/* READING LIST */}
          {history.length > 0 && (
            <div className="space-y-5 sm:space-y-6">
              {history.map((reading, readingIndex) => {
                const icon = categoryIcon[reading.category] || "✦";

                return (
                  <article
                    key={reading.id}
                    className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl transition duration-300 hover:bg-white/[0.07] sm:rounded-[2rem]"
                  >
                    {/* READING HEADER */}
                    <div className="border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6 md:px-8">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-purple-200/10 bg-purple-200/10 text-lg sm:h-12 sm:w-12 sm:text-xl">
                            {icon}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-purple-200/20 bg-purple-200/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-purple-100 sm:text-[10px]">
                                {reading.category}
                              </span>

                              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] text-white/40 sm:text-[10px]">
                                Reading #{history.length - readingIndex}
                              </span>
                            </div>

                            <p className="mt-2 text-[10px] text-white/30 sm:mt-3 sm:text-xs">
                              {new Date(reading.createdAt).toLocaleString(
                                "en-US",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            deleteReading(reading.id);
                          }}
                          className="cursor-pointer self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/35 transition hover:bg-red-400/10 hover:text-red-200 sm:self-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* CARDS */}
                    <div className="px-4 py-7 sm:px-7 sm:py-8 md:px-8">
                      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                        {reading.cards.map((card, index) => {
                          let position = "Your Card";

                          if (reading.cards.length === 3) {
                            if (index === 0) position = "Past";
                            if (index === 1) position = "Present";
                            if (index === 2) position = "Future";
                          }

                          return (
                            <div
                              key={reading.id + "-" + index}
                              className="text-center"
                            >
                              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.3em] text-purple-200/40 sm:text-[10px]">
                                {position}
                              </p>

                              {/* TAROT IMAGE */}
                              <div className="mx-auto w-fit rounded-[1.25rem] border border-purple-200/10 bg-black/20 p-2 shadow-xl shadow-purple-950/30">
                                <img
                                  src={card.image}
                                  alt={card.name}
                                  className="h-[300px] w-[195px] rounded-xl object-cover sm:h-[340px] sm:w-[220px] md:h-[320px] md:w-[205px] lg:h-[360px] lg:w-[230px]"
                                />
                              </div>

                              <h3 className="mt-5 text-lg font-black sm:text-xl">
                                {card.name}
                              </h3>

                              <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-white/40 sm:text-sm">
                                {card.meaning}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="mx-auto max-w-6xl py-16 text-center sm:py-20">
          <div className="mx-auto mb-6 h-px max-w-md bg-white/10" />

          <p className="text-sm font-semibold tracking-wider text-white/30">
            MOO TODAY
          </p>

          <p className="mt-2 text-xs text-white/20">
            Your little guide to today ✦
          </p>

          <p className="mt-5 px-5 text-[9px] uppercase tracking-[0.15em] text-white/15 sm:text-[10px] sm:tracking-[0.2em]">
            For reflection, entertainment, and a little bit of magic.
          </p>
        </footer>
      </div>
    </main>
  );
}
