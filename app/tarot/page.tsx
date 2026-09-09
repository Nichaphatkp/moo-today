"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import { tarotCards } from "@/data/tarot";

const categories = [
{
key: "Love",
label: "Love",
icon: "💕",
description: "Relationships & emotions",
},
{
key: "Career",
label: "Career",
icon: "💼",
description: "Work & opportunities",
},
{
key: "Finance",
label: "Finance",
icon: "💰",
description: "Money & stability",
},
{
key: "Health",
label: "Health",
icon: "🌿",
description: "Balance & wellbeing",
},
] as const;

const positions = ["Past", "Present", "Future"];

type Category = (typeof categories)[number]["key"];
type TarotCard = (typeof tarotCards)[number];

const categoryAdvice: Record<Category, Record<string, string>> = {
Love: {
  Past:
    "Your past experiences have shaped how you understand connection and trust. Take the lessons with you, but don't let old patterns control your future.",
  Present:
    "Your emotional energy is active right now. Be honest about your feelings and give meaningful connections room to grow.",
  Future:
    "A new emotional direction may be opening for you. Stay open, communicate clearly, and allow relationships to develop naturally.",
  "Your Card":
    "Your emotional energy is active right now. Be honest about your feelings and give meaningful connections room to grow.",
},

Career: {
Past:
"Your previous efforts and experiences have built a foundation for where you are today. Use what you have learned to make smarter choices.",
Present:
"This is a good moment to take initiative. Your ideas, skills, and willingness to act can create meaningful progress.",
Future:
"New opportunities may appear ahead. Keep learning, stay adaptable, and don't be afraid to step outside your comfort zone.",
"Your Card":
"This card offers guidance about your career direction. Trust your abilities, take initiative, and stay open to opportunities that can help you grow.",
},

Finance: {
Past:
"Past financial decisions offer useful lessons. Understanding what worked and what didn't can help you build better habits.",
Present:
"Focus on stability and thoughtful decisions. Avoid unnecessary risks and pay attention to where your resources are going.",
Future:
"Financial improvement can come through patience and consistency. Plan ahead and give your goals enough time to grow.",
"Your Card":
"This card highlights your current financial energy. Focus on stability, thoughtful choices, and building a stronger foundation for the future.",
},

Health: {
Past:
"Your previous routines have influenced your current energy. Notice which habits support you and which ones may need to change.",
Present:
"Balance is especially important now. Give yourself enough rest while maintaining small, sustainable healthy routines.",
Future:
"A healthier rhythm can develop through consistency. Small positive changes may have a bigger impact than dramatic ones.",
"Your Card":
"This card reflects your current wellbeing energy. Listen to your body, protect your balance, and focus on sustainable healthy habits.",
},
};

function shuffleCards(cards: TarotCard[]) {
const shuffled = [...cards];

for (let i = shuffled.length - 1; i > 0; i--) {
const randomIndex = Math.floor(Math.random() * (i + 1));

[shuffled[i], shuffled[randomIndex]] = [
  shuffled[randomIndex],
  shuffled[i],
];


}

return shuffled;
}

export default function TarotPage() {
const [category, setCategory] = useState<Category>("Love");
const [cardCount, setCardCount] = useState<1 | 3>(3);
const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
const [revealedCount, setRevealedCount] = useState(0);
const [isDrawing, setIsDrawing] = useState(false);

const drawCards = () => {
if (isDrawing) return;


setIsDrawing(true);
setSelectedCards([]);
setRevealedCount(0);

const shuffled = shuffleCards(tarotCards);
const drawn = shuffled.slice(0, cardCount);

setSelectedCards(drawn);

try {
  const savedHistory = localStorage.getItem(
    "moo-today-tarot-history"
  );

  const history = savedHistory ? JSON.parse(savedHistory) : [];

  history.unshift({
    id: crypto.randomUUID(),
    category,
    cardCount,
    cards: drawn,
    createdAt: new Date().toISOString(),
  });

  localStorage.setItem(
    "moo-today-tarot-history",
    JSON.stringify(history)
  );
} catch (error) {
  console.error(error);
}

setTimeout(() => setRevealedCount(1), 500);

if (cardCount === 3) {
  setTimeout(() => setRevealedCount(2), 1000);

  setTimeout(() => {
    setRevealedCount(3);
    setIsDrawing(false);
  }, 1500);
} else {
  setTimeout(() => {
    setIsDrawing(false);
  }, 700);
}

};

const resetReading = () => {
setSelectedCards([]);
setRevealedCount(0);
setIsDrawing(false);
};

return (
  <Background>
    <div className="min-h-screen bg-black/20 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">

    <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-4xl text-center">

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200/20 bg-purple-200/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-purple-100/80 backdrop-blur-md sm:mb-6 sm:gap-3 sm:px-5 sm:text-xs sm:tracking-[0.3em]">
          <span>✦</span>
          <span>Tarot Reading</span>
          <span>✦</span>
        </div>

        <h1 className="text-4xl font-black leading-tight sm:text-6xl md:text-8xl">
          Ask the cards.
          <br />
          <span className="text-yellow-200">
            Discover your path.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:mt-7 sm:text-lg sm:leading-8">
          Choose what you want to explore and let the
          cards reveal a message for you.
        </p>
      </section>

      {/* CATEGORY */}
      <section className="mt-10 sm:mt-12">

        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-200">
            Step 01
          </p>

          <h2 className="mt-2 text-xl font-bold sm:text-2xl">
            What would you like to know?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">

          {categories.map((item) => {
            const active = category === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setCategory(item.key)}
                className={`relative z-10 cursor-pointer rounded-3xl border p-5 text-left transition duration-300 hover:-translate-y-1 sm:p-6 ${
                  active
                    ? "border-yellow-200/60 bg-yellow-100/15 shadow-xl shadow-yellow-900/20"
                    : "border-white/10 bg-white/10 hover:bg-white/15"
                }`}
              >
                <div className="text-3xl sm:text-4xl">
                  {item.icon}
                </div>

                <h3 className="mt-4 text-lg font-bold sm:mt-5 sm:text-xl">
                  {item.label}
                </h3>

                <p className="mt-2 text-sm text-white/45">
                  {item.description}
                </p>

                {active && (
                  <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-yellow-200">
                    Selected ✦
                  </div>
                )}
              </button>
            );
          })}

        </div>
      </section>

      {/* CARD COUNT */}
      <section className="mt-10 sm:mt-12">

        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-200">
            Step 02
          </p>

          <h2 className="mt-2 text-xl font-bold sm:text-2xl">
            How many cards?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

          {/* ONE CARD */}
          <button
            type="button"
            onClick={() => {
              setCardCount(1);
              resetReading();
            }}
            className={`relative z-10 cursor-pointer rounded-3xl border p-5 text-left transition duration-300 hover:-translate-y-1 sm:p-6 ${
              cardCount === 1
                ? "border-yellow-200/60 bg-yellow-100/15"
                : "border-white/10 bg-white/10 hover:bg-white/15"
            }`}
          >
            <div className="text-3xl">🃏</div>

            <h3 className="mt-4 text-lg font-bold sm:text-xl">
              One Card
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/45">
              A quick message for your current situation.
            </p>
          </button>

          {/* THREE CARDS */}
          <button
            type="button"
            onClick={() => {
              setCardCount(3);
              resetReading();
            }}
            className={`relative z-10 cursor-pointer rounded-3xl border p-5 text-left transition duration-300 hover:-translate-y-1 sm:p-6 ${
              cardCount === 3
                ? "border-yellow-200/60 bg-yellow-100/15"
                : "border-white/10 bg-white/10 hover:bg-white/15"
            }`}
          >
            <div className="text-3xl">🔮</div>

            <h3 className="mt-4 text-lg font-bold sm:text-xl">
              Three Cards
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/45">
              Past, Present, and Future for a deeper reading.
            </p>
          </button>

        </div>
      </section>

      {/* DRAW BUTTON */}
      <section className="mt-8 text-center sm:mt-10">

        <button
          type="button"
          onClick={drawCards}
          disabled={isDrawing}
          className="moo-shimmer relative z-10 w-full max-w-md cursor-pointer rounded-2xl bg-yellow-200 px-6 py-4 text-sm font-black text-black shadow-xl shadow-yellow-900/20 transition duration-300 hover:-translate-y-1 hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10 sm:py-5 sm:text-base"
        >
          {isDrawing
            ? "Reading the cards... ✦"
            : "Draw My Cards ✨"}
        </button>

      </section>

      {/* RESULTS */}
      {selectedCards.length > 0 && (
        <section className="mt-14 sm:mt-16">

          <div className="mb-8 text-center sm:mb-10">

            <p className="text-xs uppercase tracking-[0.3em] text-yellow-200">
              ✦ Your Tarot Reading ✦
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">
              {category} Reading
            </h2>

            <p className="mt-3 text-sm text-white/45 sm:text-base">
              {cardCount === 3
                ? "Past · Present · Future"
                : "Your message for today"}
            </p>

          </div>

         {/* CARDS */}
<div
  className={`grid gap-12 sm:gap-14 ${
    cardCount === 1
      ? "mx-auto max-w-xl grid-cols-1"
      : "grid-cols-1 md:grid-cols-3 md:gap-8 lg:gap-10"
  }`}
>
  {selectedCards.map((card, index) => {
    const revealed = index < revealedCount;

    const position =
      cardCount === 3
        ? positions[index]
        : "Your Card";

    return (
      <div
        key={card.id}
        className="min-w-0 text-center"
      >
        {/* POSITION */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-200/60">
            {position}
          </p>
        </div>

        {/* CARD */}
        <div
          className="tarot-card-float mx-auto h-[300px] w-[195px] sm:h-[360px] sm:w-[230px] md:h-[320px] md:w-[205px] lg:h-[360px] lg:w-[230px]"
          style={{
            perspective: "1200px",
          }}
        >
          <div
            className="relative h-full w-full transition-transform duration-1000"
            style={{
              transformStyle: "preserve-3d",
              transform: revealed
                ? "rotateY(180deg)"
                : "rotateY(0deg)",
            }}
          >
            {/* CARD BACK */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl border border-purple-200/30 bg-black shadow-2xl shadow-purple-950/40 sm:rounded-3xl"
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <img
                src="/tarot/card-back.jpg"
                alt="Tarot card back"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-purple-900/10" />
            </div>

            {/* CARD FRONT */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl border border-purple-200/30 bg-black shadow-2xl shadow-purple-950/40 sm:rounded-3xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <img
                src={card.image}
                alt={card.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CARD INFO */}
        {revealed && (
          <div className="mt-6 px-1">
            <h3 className="text-xl font-black sm:text-2xl">
              {card.name}
            </h3>

            {/* CARD MEANING */}
            <div className="mx-auto mt-4 max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-md sm:p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-200 sm:tracking-[0.25em]">
                ✦ Card Meaning
              </p>

              <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
                {card.meaning}
              </p>
            </div>

            {/* CATEGORY READING */}
            <div className="mx-auto mt-4 max-w-md rounded-2xl border border-purple-200/10 bg-purple-200/5 p-4 text-left sm:p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-purple-200 sm:tracking-[0.25em]">
                ✦ {category} Reading
              </p>

              <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">
                {categoryAdvice[category][position]}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  })}
</div>

          {/* FINAL SUMMARY */}
          {revealedCount === cardCount && (
            <div className="mx-auto mt-12 max-w-3xl rounded-[1.5rem] border border-yellow-100/15 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl sm:mt-14 sm:rounded-[2rem] sm:p-8 md:p-10">

              <p className="text-xs uppercase tracking-[0.3em] text-yellow-200">
                ✦ Final Message
              </p>

              <h3 className="mt-3 text-2xl font-black sm:text-3xl">
                Trust your journey.
              </h3>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                The cards offer guidance, but you are
                the one who creates your path. Take
                what resonates with you and use it as
                a moment to reflect, understand, and
                move forward.
              </p>

              <button
                type="button"
                onClick={drawCards}
                className="relative z-10 mt-7 w-full max-w-xs cursor-pointer rounded-xl border border-yellow-200/20 bg-yellow-100/10 px-6 py-3 text-sm font-bold text-yellow-100 transition hover:bg-yellow-100/20 sm:w-auto"
              >
                Draw Again ✨
              </button>

            </div>
          )}

        </section>
      )}

  <Footer />
      </div>
    </Background>
  );
}