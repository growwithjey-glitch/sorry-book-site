"use client";

import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Sparkles, MapPinned, BriefcaseBusiness, Camera, Music2, BookHeart, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Chapter = {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  text: string[];
  punchline: string;
  icon: React.ReactNode;
};

const chapters: Chapter[] = [
  {
    id: "mess-up",
    tab: "Chapter 1",
    eyebrow: "The confession page",
    title: "I messed up, and yes... it was peak idiot behavior.",
    text: [
      "Saving that picture was disrespectful and hurtful. You did not deserve that feeling, especially from me.",
      "I am not here to act clever, defend it, or minimize it. I was wrong, full stop.",
      "This page exists because I want you to feel how serious I am about changing, not just hear another basic sorry."
    ],
    punchline: "Official diagnosis: Jey used 0% brain in that moment.",
    icon: <RotateCcw size={18} />,
  },
  {
    id: "oath",
    tab: "Chapter 2",
    eyebrow: "The boyfriend oath",
    title: "I choose us over distractions, every single time.",
    text: [
      "No more pointless browsing. No more random Insta or TikTok rabbit holes stealing attention from real life.",
      "I want to be locked in on work, peace, growth, and the future we keep talking about.",
      "Not because you forced me. Because I know what kind of man and partner I want to be."
    ],
    punchline: "From now on: less scrolling, more building our empire.",
    icon: <BookHeart size={18} />,
  },
  {
    id: "future",
    tab: "Chapter 3",
    eyebrow: "The future page",
    title: "You and me still have a beautiful story to build.",
    text: [
      "I still see us building an agency, winning together, getting rich the honest way, and becoming that power couple people secretly envy.",
      "I still see us taking a peaceful trip to Rishikesh, resetting our minds, laughing properly again, and feeling close again.",
      "I do not want this mistake to be the thing that ruins something that can still become amazing."
    ],
    punchline: "Future plan: peace, success, travel, love... and me behaving properly.",
    icon: <MapPinned size={18} />,
  },
  {
    id: "chance",
    tab: "Final Page",
    eyebrow: "The last page",
    title: "If your heart still has a little room for me, I will earn it back properly.",
    text: [
      "I know trust is not repaired by one website. It is repaired by consistency, actions, and peace.",
      "But I wanted to make something beautiful because you matter to me that much.",
      "Taran, Gori... I love you, I am sorry, and I hope this is not the end of our story."
    ],
    punchline: "Grant Jey a re-do? I promise this update comes with better behavior.",
    icon: <Heart size={18} />,
  },
];

const photos = [
  { src: "/couple-photo.jpg", label: "Cover photo" },
  { src: "/photo1.jpg", label: "Power couple energy" },
  { src: "/photo2.jpg", label: "Cute memory unlocked" },
];

function FloatingSparkles() {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${5 + ((i * 13) % 90)}%`,
        top: `${4 + ((i * 17) % 80)}%`,
        delay: i * 0.25,
        duration: 3.4 + (i % 4),
      })),
    []
  );

  return (
    <div className="sparkles" aria-hidden>
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="sparkle"
          style={{ left: item.left, top: item.top }}
          animate={{ y: [0, -12, 0], opacity: [0.3, 1, 0.35], scale: [0.8, 1.15, 0.85] }}
          transition={{
            duration: item.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: item.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        left: `${8 + i * 10}%`,
        delay: i * 0.55,
        size: 14 + (i % 3) * 8,
      })),
    []
  );

  return (
    <div className="hearts" aria-hidden>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="heart-float"
          style={{ left: heart.left, width: heart.size, height: heart.size }}
          animate={{ y: [40, -460], x: [0, heart.id % 2 === 0 ? 16 : -18], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 7 + (heart.id % 4),
            repeat: Number.POSITIVE_INFINITY,
            delay: heart.delay,
            ease: "easeOut",
          }}
        >
          <Heart fill="currentColor" size={heart.size} />
        </motion.div>
      ))}
    </div>
  );
}

function PhotoStack() {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="photo-side">
      <div className="photo-caption">
        <Camera size={15} />
        <span>Little proof that we look too good together to give up easily.</span>
      </div>
      <div className="stack-wrap">
        {photos.map((photo, index) => {
          const offset = (index - activePhoto + photos.length) % photos.length;
          const isFront = offset === 0;
          const rotation = isFront ? -5 : offset === 1 ? 6 : -11;
          const translate = isFront ? 0 : offset === 1 ? 26 : -18;
          const scale = isFront ? 1 : 0.92;

          return (
            <motion.div
              key={photo.src}
              className={`photo-card ${isFront ? "front" : ""}`}
              animate={{ rotate: rotation, x: translate, scale, zIndex: isFront ? 5 : 2, y: isFront ? 0 : 12 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              <div className="photo-frame">
                <Image src={photo.src} alt={photo.label} fill sizes="(max-width: 768px) 80vw, 26vw" className="photo-img" priority={index === 0} />
              </div>
              <div className="photo-label">{photo.label}</div>
            </motion.div>
          );
        })}
      </div>
      <div className="dots">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`dot ${activePhoto === i ? "active" : ""}`}
            onClick={() => setActivePhoto(i)}
            aria-label={`Show photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Book3D({ activeIndex, onChange }: { activeIndex: number; onChange: (index: number) => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 160, damping: 18 });

  const current = chapters[activeIndex];

  return (
    <motion.section
      className="book-scene"
      style={{ rotateX, rotateY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <div className="book-shadow" />
      <div className="book-spine" />
      <div className="book-pages">
        <div className="page left-page">
          <motion.div
            key={`left-${current.id}`}
            initial={{ opacity: 0, x: -24, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.45 }}
            className="page-content"
          >
            <div className="eyebrow">{current.eyebrow}</div>
            <h1>{activeIndex === 0 ? "Our Story Isn’t Over" : current.title}</h1>
            <p className="lead">
              {activeIndex === 0
                ? "A heartfelt apology from Jey to Taran (a.k.a. Gori), written with love, regret, hope, and one tiny amount of dramatic cinema."
                : current.text[0]}
            </p>

            {activeIndex === 0 ? (
              <>
                <div className="name-line">Jey ❤️ Taran</div>
                <button className="chapter-button" onClick={() => onChange(1)}>
                  Start Chapter 1
                </button>
                <div className="mini-note">Made because plain sorry messages were not enough for someone this special.</div>
              </>
            ) : (
              <>
                <div className="paragraphs">
                  {current.text.slice(1).map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <div className="quote-box">{current.punchline}</div>
              </>
            )}
          </motion.div>
        </div>

        <div className="page right-page">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${current.id}`}
              initial={{ opacity: 0, x: 24, rotateY: 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45 }}
              className="page-content right-inner"
            >
              <div className="scroll-title">{activeIndex === 0 ? "Tap the tabs" : current.tab}</div>
              <div className="tab-stack">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    className={`side-tab ${index === activeIndex ? "active" : ""}`}
                    onClick={() => onChange(index)}
                  >
                    <span className="tab-icon">{chapter.icon}</span>
                    <span>
                      <strong>{chapter.tab}</strong>
                      <small>{chapter.id === "chance" ? "Grant Jey a re-do" : chapter.title.split(" ").slice(0, 3).join(" ")}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="oath-card">
                <div className="oath-title">My promise, properly said</div>
                <ul>
                  <li>No more nonsense scrolling.</li>
                  <li>More focus on work, peace, and us.</li>
                  <li>More respect, consistency, and effort.</li>
                  <li>More love, less stupidity.</li>
                </ul>
              </div>

              <div className="future-strip">
                <span><BriefcaseBusiness size={14} /> Build our agency</span>
                <span><MapPinned size={14} /> Rishikesh reset</span>
                <span><Sparkles size={14} /> Power couple era</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [musicOn, setMusicOn] = useState(false);

  return (
    <main className="page-wrap">
      <FloatingSparkles />
      <FloatingHearts />

      <div className="top-bar">
        <div className="badge-pill"><Sparkles size={14} /> Romantic + funny apology edition</div>
        <button className={`music-toggle ${musicOn ? "on" : ""}`} onClick={() => setMusicOn((prev) => !prev)}>
          <Music2 size={16} /> {musicOn ? "Music mood: on" : "Music mood: off"}
        </button>
      </div>

      <section className="hero-grid">
        <Book3D activeIndex={activeIndex} onChange={setActiveIndex} />
        <PhotoStack />
      </section>

      <section className="bottom-panels">
        <motion.div className="panel" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3>What I am really saying</h3>
          <p>
            I am sorry. I know I hurt you. I want to rebuild trust the right way, with actions that feel calm, mature, and real.
          </p>
        </motion.div>

        <motion.div className="panel" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3>What I still dream about</h3>
          <p>
            Building our agency, making good money, traveling, laughing a lot, and taking that peaceful Rishikesh trip together.
          </p>
        </motion.div>

        <motion.div className="panel special" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3>Final question</h3>
          <p>Will you give me a chance to prove this is not just words?</p>
          <button className="heart-button" onClick={() => setActiveIndex(3)}>
            <Heart fill="currentColor" size={16} /> Grant Jey a Re-Do?
          </button>
        </motion.div>
      </section>
    </main>
  );
}
