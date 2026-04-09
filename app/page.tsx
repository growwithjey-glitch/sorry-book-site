"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Choice = "yes" | "no" | null;
type ConfettiMode = "none" | "hearts" | "sad-rain";

const chapters = [
  {
    id: 0,
    label: "Cover",
    title: "A cinematic apology book",
  },
  {
    id: 1,
    label: "Chapter 1",
    title: "The part where I admit I was dumb",
  },
  {
    id: 2,
    label: "Chapter 2",
    title: "The boyfriend oath",
  },
  {
    id: 3,
    label: "Chapter 3",
    title: "The future I still believe in",
  },
  {
    id: 4,
    label: "Final Page",
    title: "The brave question",
  },
];

const photos = ["/couple-photo.jpg", "/photo1.jpg", "/photo2.jpg"];

export default function HomePage() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [showPopup, setShowPopup] = useState<Choice>(null);
  const [heartsBurst, setHeartsBurst] = useState(false);
  const [confettiMode, setConfettiMode] = useState<ConfettiMode>("none");
  const [glowMode, setGlowMode] = useState(false);
  const [dimMode, setDimMode] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [showSong, setShowSong] = useState(false);
  const [turning, setTurning] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!heartsBurst) return;

    const timer = setTimeout(() => {
      setHeartsBurst(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, [heartsBurst]);

  const decorativeItems = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${5 + i * 5}%`,
        delay: `${(i % 6) * 0.5}s`,
        duration: `${5 + (i % 4)}s`,
      })),
    []
  );

  const sendChoice = async (choice: "yes" | "no") => {
    try {
      await fetch("/api/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ choice }),
      });
    } catch (error) {
      console.error("Failed to notify:", error);
    }
  };

  const handleYes = async () => {
    setShowPopup("yes");
    setHeartsBurst(true);
    setConfettiMode("hearts");
    setGlowMode(true);
    setDimMode(false);
    await sendChoice("yes");
  };

  const handleNo = async () => {
    setShowPopup("no");
    setConfettiMode("sad-rain");
    setGlowMode(false);
    setDimMode(true);
    setHeartsBurst(false);
    await sendChoice("no");
  };

  const goToChapter = (index: number) => {
    if (index === activeChapter) return;
    setTurning(true);
    setTimeout(() => {
      setActiveChapter(index);
      setTurning(false);
    }, 300);
  };

  return (
    <main
      className={`min-h-screen overflow-hidden relative ${
        dimMode ? "brightness-90 saturate-75" : ""
      }`}
      style={{
        background:
          "radial-gradient(circle at top, #fff3f7 0%, #fde7ee 35%, #f9dde7 60%, #f7d6e2 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        {decorativeItems.map((item) => (
          <span
            key={item.id}
            className={`absolute text-pink-300 animate-float ${
              confettiMode === "sad-rain" ? "opacity-50" : "opacity-80"
            }`}
            style={{
              left: item.left,
              top: `${10 + (item.id % 5) * 14}%`,
              animationDelay: item.delay,
              animationDuration: item.duration,
              fontSize: item.id % 2 === 0 ? "22px" : "14px",
            }}
          >
            {confettiMode === "sad-rain" ? "💧" : item.id % 3 === 0 ? "💖" : "✨"}
          </span>
        ))}
      </div>

      {heartsBurst && (
        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute animate-burst text-pink-500"
              style={{
                left: "50%",
                top: "62%",
                animationDelay: `${i * 0.02}s`,
                transform: `translate(-50%, -50%) rotate(${i * 17}deg)`,
                fontSize: i % 2 === 0 ? "22px" : "16px",
              }}
            >
              💖
            </span>
          ))}
        </div>
      )}

      {confettiMode === "sad-rain" && (
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute animate-rain text-sky-300"
              style={{
                left: `${(i * 3.3) % 100}%`,
                top: "-10%",
                animationDelay: `${(i % 10) * 0.16}s`,
                animationDuration: `${1.4 + (i % 4) * 0.2}s`,
                fontSize: i % 4 === 0 ? "16px" : "12px",
              }}
            >
              💧
            </span>
          ))}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div
          className={`relative mx-auto rounded-[34px] border border-white/70 bg-white/45 shadow-[0_30px_80px_rgba(125,67,92,0.16)] backdrop-blur-xl ${
            glowMode ? "ring-4 ring-pink-200/60" : ""
          }`}
        >
          <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,220,232,0.45),transparent_35%)]" />

          <div className="relative grid min-h-[780px] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
            <aside className="border-b border-white/60 p-6 lg:border-b-0 lg:border-r lg:border-r-white/60 lg:p-10">
              <div className="mb-6">
                <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-[#9d8b94]">
                  A very serious apology in a very extra package
                </p>
                <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-[#5c2d44] md:text-6xl">
                  Jey + Taran
                </h1>
                <p className="mt-3 max-w-md text-lg leading-8 text-[#7b6170]">
                  from one sorry boyfriend to the girl who is still the whole
                  plot twist of his life
                </p>
              </div>

              <div className="space-y-3">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => goToChapter(chapter.id)}
                    className={`w-full rounded-[22px] border px-5 py-4 text-left transition duration-300 ${
                      activeChapter === chapter.id
                        ? "border-pink-200 bg-[linear-gradient(90deg,rgba(255,236,240,0.95),rgba(255,247,232,0.9))] shadow-lg"
                        : "border-white/70 bg-white/70 hover:bg-white"
                    }`}
                  >
                    <div className="text-sm text-[#8d7482]">{chapter.label}</div>
                    <div className="text-2xl font-black leading-tight text-[#2d1722]">
                      {chapter.title}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,241,245,0.8))] p-5 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#5c2d44]">Memory drawer</h3>
                  <button
                    onClick={() => setShowLoveLetter((prev) => !prev)}
                    className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-semibold text-[#8b2f5e] transition hover:scale-105"
                  >
                    {showLoveLetter ? "Hide secret letter" : "Open secret letter"}
                  </button>
                </div>

                <div className="flex gap-3 overflow-hidden">
                  <div className="relative h-40 w-32 rotate-[-7deg] overflow-hidden rounded-[18px] border-4 border-white bg-white shadow-xl">
                    <Image
                      src={photos[0]}
                      alt="Jey and Taran memory 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative mt-2 h-40 w-28 rotate-[6deg] overflow-hidden rounded-[18px] border-4 border-white bg-white shadow-xl">
                    <Image
                      src={photos[1]}
                      alt="Jey and Taran memory 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-40 w-28 rotate-[-3deg] overflow-hidden rounded-[18px] border-4 border-white bg-white shadow-xl">
                    <Image
                      src={photos[2]}
                      alt="Jey and Taran memory 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {showLoveLetter && (
                  <div className="mt-5 rounded-[22px] border border-pink-100 bg-[#fff8fb] p-5 text-[#6e4b5d] shadow-inner">
                    <h4 className="mb-2 text-lg font-bold text-[#8b2f5e]">
                      Hidden letter for Gori 💌
                    </h4>
                    <p className="leading-7">
                      Taran, I know this cannot be fixed by pretty design alone.
                      I made this because you matter to me, and because I wanted
                      to say sorry in a way that felt as real and big as how I
                      feel about you. I still believe in us. I still believe in
                      healing, building, laughing again, and one day looking back
                      at this as the weird chapter before our better one.
                    </p>
                  </div>
                )}
              </div>
            </aside>

            <section className="relative p-4 md:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-y-6 left-0 hidden w-[18px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(188,160,172,0.18),rgba(255,255,255,0.6),rgba(188,160,172,0.14))] blur-[1px] lg:block" />

              <div
                className={`relative min-h-[690px] rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,252,250,0.96),rgba(255,246,248,0.93))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_25px_60px_rgba(113,64,84,0.14)] transition duration-300 md:p-10 ${
                  turning ? "rotate-y-6 scale-[0.985] opacity-50" : "opacity-100"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top_right,rgba(255,235,242,0.5),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,245,232,0.4),transparent_30%)]" />

                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                    <button
                      onClick={() => setShowSong((prev) => !prev)}
                      className="rounded-full border border-pink-200 bg-white/90 px-4 py-2 text-sm font-semibold text-[#8b2f5e] shadow-sm transition hover:scale-105"
                    >
                      {showSong ? "Hide our song ♫" : "Play our song ♫"}
                    </button>

                    <span className="text-xs uppercase tracking-[0.35em] text-[#8f7c85]">
                      {chapters[activeChapter].label}
                    </span>
                  </div>

                  {showSong && (
                    <div className="mb-6 animate-page">
                      <div className="overflow-hidden rounded-[24px] border border-white/60 bg-white/80 shadow-xl">
                        <iframe
                          src="https://open.spotify.com/embed?uri=spotify%3Atrack%3A2JZKXgq5zsokN01KWyiY6n"
                          width="100%"
                          height="152"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          style={{ border: 0 }}
                        />
                      </div>
                    </div>
                  )}

                  {activeChapter === 0 && (
                    <div className="animate-page">
                      <h2 className="max-w-xl text-5xl font-black leading-[0.95] tracking-tight text-[#411b2d] md:text-7xl">
                        Our Story Isn’t Over
                      </h2>

                      <div className="mt-6 max-w-2xl space-y-6 text-xl leading-10 text-[#6c5562]">
                        <p>
                          Taran, a normal sorry text felt too small, so your
                          dramatic boyfriend built you a whole magical book
                          instead.
                        </p>
                        <p>
                          This is half apology, half love letter, half comedy.
                          Yes, that is three halves. I am emotional, not
                          mathematical.
                        </p>
                        <p>
                          Made by Jey, for Gori, with a full heart and one very
                          serious intention: to do better for real.
                        </p>
                      </div>

                      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_260px]">
                        <div className="relative h-[250px] overflow-hidden rounded-[26px] border-4 border-white bg-white shadow-xl">
                          <Image
                            src={photos[currentPhoto]}
                            alt="Jey and Taran featured memory"
                            fill
                            className="object-cover transition duration-700"
                          />
                        </div>

                        <div className="rounded-[26px] border border-white/75 bg-white/85 p-6 shadow-lg">
                          <p className="text-lg text-[#7d6171]">
                            Nickname:{" "}
                            <span className="font-black text-[#4f2638]">Gori</span>
                          </p>
                          <p className="mt-5 text-lg text-[#7d6171]">
                            Dream place:{" "}
                            <span className="font-black text-[#4f2638]">
                              Rishikesh
                            </span>
                          </p>
                          <p className="mt-5 text-lg text-[#7d6171]">
                            Relationship objective:
                          </p>
                          <p className="mt-2 text-2xl font-black leading-tight text-[#4f2638]">
                            heal, build, win together
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeChapter === 1 && (
                    <div className="animate-page">
                      <h2 className="text-4xl font-black text-[#411b2d] md:text-5xl">
                        The part where I admit I was dumb
                      </h2>

                      <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-5 text-xl leading-10 text-[#6c5562]">
                          <p>
                            I messed up. That part is clear. It was thoughtless,
                            disrespectful, and honestly very stupid.
                          </p>
                          <p>
                            You should not have had to feel hurt because of my
                            nonsense. I am sorry for making you question how much
                            you mean to me.
                          </p>
                          <p>
                            No excuses. No hiding. Just me saying clearly:
                            I was wrong, and I want to become better through
                            action, not just speeches in a fancy website.
                          </p>
                        </div>

                        <div className="rounded-[28px] border border-pink-100 bg-[linear-gradient(180deg,#fff8fb,#fff1f6)] p-6 shadow-lg">
                          <div className="relative h-[260px] overflow-hidden rounded-[22px] border-4 border-white bg-white shadow-md">
                            <Image
                              src="/couple-photo.jpg"
                              alt="Couple memory"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="mt-4 text-lg leading-8 text-[#7d6171]">
                            Official statement from Jey:
                            <span className="block pt-2 text-2xl font-black text-[#8b2f5e]">
                              “That was clown behavior.”
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeChapter === 2 && (
                    <div className="animate-page">
                      <h2 className="text-4xl font-black text-[#411b2d] md:text-5xl">
                        The boyfriend oath
                      </h2>

                      <div className="mt-7 rounded-[28px] border border-[#ead7e0] bg-[linear-gradient(180deg,#fffdf8,#fff5f7)] p-8 shadow-lg">
                        <div className="space-y-5 text-2xl font-bold leading-10 text-[#593144]">
                          <p>✓ No more useless distractions.</p>
                          <p>✓ No more browsing random Insta/TikTok nonsense.</p>
                          <p>✓ More focus on work, discipline, and our future.</p>
                          <p>✓ More peace, honesty, and reassurance for you.</p>
                          <p>✓ Less talking. More proof.</p>
                        </div>

                        <div className="mt-8 rounded-[22px] border border-pink-100 bg-white/80 p-6 text-lg leading-8 text-[#6c5562]">
                          I know promises only matter if they are lived out.
                          This chapter is not me asking you to trust words.
                          It is me saying I want to earn trust back properly.
                        </div>
                      </div>
                    </div>
                  )}

                  {activeChapter === 3 && (
                    <div className="animate-page">
                      <h2 className="text-4xl font-black text-[#411b2d] md:text-5xl">
                        The future I still believe in
                      </h2>

                      <div className="mt-7 grid gap-5 md:grid-cols-3">
                        <div className="rounded-[26px] border border-white/70 bg-white/85 p-6 shadow-lg">
                          <div className="text-4xl">💼</div>
                          <h3 className="mt-4 text-2xl font-black text-[#4f2638]">
                            Build our agency
                          </h3>
                          <p className="mt-3 text-lg leading-8 text-[#6c5562]">
                            Work hard, build something real, and become a power
                            couple that wins together.
                          </p>
                        </div>

                        <div className="rounded-[26px] border border-white/70 bg-white/85 p-6 shadow-lg">
                          <div className="text-4xl">🧘</div>
                          <h3 className="mt-4 text-2xl font-black text-[#4f2638]">
                            Rishikesh energy
                          </h3>
                          <p className="mt-3 text-lg leading-8 text-[#6c5562]">
                            Peace, growth, healing, and one day going there with
                            better hearts and better memories.
                          </p>
                        </div>

                        <div className="rounded-[26px] border border-white/70 bg-white/85 p-6 shadow-lg">
                          <div className="text-4xl">✈️</div>
                          <h3 className="mt-4 text-2xl font-black text-[#4f2638]">
                            Travel the world
                          </h3>
                          <p className="mt-3 text-lg leading-8 text-[#6c5562]">
                            Laugh more, travel more, fight less, and make the
                            kind of story we are actually proud of.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 rounded-[28px] border border-pink-100 bg-[linear-gradient(180deg,#fff9fb,#fff5ef)] p-6 text-xl leading-9 text-[#6c5562] shadow-lg">
                        I still see a bright future with you, Taran. Not because
                        everything is magically perfect, but because I know what
                        I want, and it is you, peace, growth, and a life we build
                        properly.
                      </div>
                    </div>
                  )}

                  {activeChapter === 4 && (
                    <div className="animate-page">
                      <h2 className="text-4xl font-black text-[#411b2d] md:text-5xl">
                        The brave question
                      </h2>

                      <p className="mt-6 max-w-2xl text-xl leading-10 text-[#6c5562]">
                        So here it is, the most dramatic button section in the
                        history of apologies:
                      </p>

                      <div className="mt-8 rounded-[34px] border border-pink-100 bg-[linear-gradient(180deg,#fffdfb,#fff4f7)] p-8 text-center shadow-lg">
                        <h3 className="text-3xl font-black text-[#7c2a57] md:text-5xl">
                          Grant Jey a Re-Do?
                        </h3>
                        <p className="mt-4 text-lg leading-8 text-[#725d69]">
                          You can choose honestly. This site will survive either
                          way. Jey will just be dramatically happier with one of
                          the options.
                        </p>

                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                          <button
                            onClick={handleYes}
                            className="rounded-full bg-[linear-gradient(180deg,#ff78b2,#e7428e)] px-8 py-4 text-xl font-black text-white shadow-[0_18px_40px_rgba(231,66,142,0.35)] transition hover:-translate-y-1 hover:scale-105"
                          >
                            Yes ❤️
                          </button>

                          <button
                            onClick={handleNo}
                            className="rounded-full bg-[linear-gradient(180deg,#9ba1b5,#79809a)] px-8 py-4 text-xl font-black text-white shadow-[0_16px_32px_rgba(80,89,120,0.25)] transition hover:-translate-y-1 hover:scale-105"
                          >
                            No 😔
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {showPopup === "yes" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-[30px] border border-pink-100 bg-[linear-gradient(180deg,#fffdfd,#fff1f7)] p-8 text-center shadow-[0_30px_80px_rgba(130,57,97,0.35)]">
            <div className="text-6xl">💖</div>
            <h2 className="mt-3 text-4xl font-black text-[#a32367]">
              You picked YES
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#6e5260]">
              This is now officially the best plot twist ever. Jey is probably
              smiling like an idiot right now.
            </p>
            <button
              onClick={() => setShowPopup(null)}
              className="mt-6 rounded-full bg-[#e7428e] px-6 py-3 text-lg font-bold text-white transition hover:scale-105"
            >
              Aww okay 💗
            </button>
          </div>
        </div>
      )}

      {showPopup === "no" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f3f4f8)] p-8 text-center shadow-[0_30px_80px_rgba(61,71,94,0.25)]">
            <div className="text-6xl">🌧️</div>
            <h2 className="mt-3 text-4xl font-black text-[#556078]">
              Okay... I understand
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#626b80]">
              No re-do yet. No pressure. I will keep trying through actions, not
              just animations.
            </p>
            <button
              onClick={() => setShowPopup(null)}
              className="mt-6 rounded-full bg-[#7d869b] px-6 py-3 text-lg font-bold text-white transition hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}