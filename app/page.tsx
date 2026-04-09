'use client'

import { useMemo, useState } from 'react'

type Chapter = {
  id: number
  short: string
  title: string
  kicker: string
  quote?: string
  body: string[]
  cardTitle?: string
  list?: string[]
}

const chapters: Chapter[] = [
  {
    id: 1,
    short: 'Cover',
    title: 'Our Story Isn’t Over',
    kicker: 'A tiny magical book from Jey to Taran (aka Gori)',
    quote: 'This is me using 100% of my brain power for apology and 0% for nonsense.',
    body: [
      'Gori, I know I hurt you and I hate that I am the reason you felt disrespected.',
      'So instead of sending a boring sorry text, I made you a whole little love-book website because you deserve effort, honesty, and something that makes you smile at least once.',
    ],
    cardTitle: 'What this book contains',
    list: ['A real apology', 'A funny boyfriend oath', 'Our future plans', 'A soft request for one more chance'],
  },
  {
    id: 2,
    short: 'Chapter 1',
    title: 'Chapter 1 — I Messed Up',
    kicker: 'No excuses. No “but”. Just truth.',
    quote: 'Saving random girl pictures: 0/10 decision making. Absolutely tragic performance by me.',
    body: [
      'You saw something that made you feel hurt, and that is on me. I understand why it upset you. It was stupid, unnecessary, and not the kind of boyfriend I want to be for you.',
      'I am sorry for making you question my respect, my focus, and my love. You should feel secure with me, not stressed because of me.',
    ],
  },
  {
    id: 3,
    short: 'Chapter 2',
    title: 'Chapter 2 — The Official Boyfriend Oath',
    kicker: 'Signed by Jey, under full emotional supervision.',
    quote: 'Effective immediately: less scrolling, more growing.',
    body: [
      'I will stop feeding dumb distractions and start acting like a man building something real.',
      'I want my energy to go into work, discipline, us, and the future we keep talking about together.',
    ],
    cardTitle: 'My oath to you',
    list: [
      'No pointless browsing on Insta and TikTok',
      'More focus on work and real goals',
      'More peace, honesty, and reassurance for you',
      'More effort from me in actions, not just words',
    ],
  },
  {
    id: 4,
    short: 'Chapter 3',
    title: 'Chapter 3 — Our Future Is Too Good To Throw Away',
    kicker: 'This part is my favorite because it still has us in it.',
    quote: 'I still see us becoming that annoyingly cute power couple.',
    body: [
      'I still see us building our agency, working hard, making big money, and laughing later about how dramatic this chapter was in the “before we became rich” season.',
      'I still see us taking trips, especially to Rishikesh, healing, growing, eating good food, taking photos, and building a peaceful life that feels exciting and safe at the same time.',
    ],
    cardTitle: 'The dream board',
    list: ['Build our agency', 'Become stupidly successful', 'Travel to Rishikesh together', 'Turn this into a comeback story'],
  },
  {
    id: 5,
    short: 'Final Page',
    title: 'Final Page — Grant Jey A Re-Do?',
    kicker: 'No pressure. Just my heart, respectfully knocking.',
    quote: 'I love you, Gori. And I want to do better for real.',
    body: [
      'I know one website cannot fix everything. But I hope it shows you that I care enough to try, to reflect, and to put effort into making you smile again.',
      'If you can give me another chance, I want to make the next chapters softer, safer, funnier, and full of real loyalty.',
    ],
    cardTitle: 'Tiny emergency recovery plan',
    list: ['One hug', 'One smile', 'One reset date', 'One more chance for your very sorry boyfriend'],
  },
]

export default function HomePage() {
  const [current, setCurrent] = useState(0)
  const chapter = chapters[current]

  const progress = useMemo(() => ((current + 1) / chapters.length) * 100, [current])

  return (
    <main className="page-shell">
      <div className="floating floating-1">💖</div>
      <div className="floating floating-2">✨</div>
      <div className="floating floating-3">🫶</div>
      <div className="floating floating-4">🌸</div>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A romantic + funny apology website</p>
          <h1>Jey’s Interactive Sorry Book for Taran</h1>
          <p className="subcopy">
            Designed for one very important person, also known as <strong>Gori</strong>.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => setCurrent(0)}>Open the Book</button>
            <button className="ghost-btn" onClick={() => setCurrent(4)}>Skip to the Final Page</button>
          </div>
        </div>

        <div className="photo-frame">
          <div className="photo-glow" />
          <img src="/couple-photo.jpg" alt="Jey and Taran" className="couple-photo" />
          <div className="photo-note">
            <span>📸</span>
            Replace <strong>public/couple-photo.jpg</strong> with your real photo
          </div>
        </div>
      </section>

      <section className="book-wrap">
        <div className="book-topbar">
          <div>
            <p className="top-mini">Love Book Progress</p>
            <h2>Our Story Isn’t Over</h2>
          </div>
          <div className="progress-wrap" aria-label="Book progress">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>{current + 1} / {chapters.length}</span>
          </div>
        </div>

        <div className="chapter-tabs">
          {chapters.map((item, index) => (
            <button
              key={item.id}
              className={`chapter-tab ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
            >
              {item.short}
            </button>
          ))}
        </div>

        <div className="book-stage">
          <div className="book-shadow" />
          <article className="storybook">
            <div className="page left-page">
              <span className="page-label">{chapter.kicker}</span>
              <h3>{chapter.title}</h3>
              {chapter.quote ? <blockquote>{chapter.quote}</blockquote> : null}
              <div className="body-copy">
                {chapter.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="spine" />

            <div className="page right-page">
              {chapter.cardTitle ? (
                <div className="promise-card">
                  <p className="mini-tag">Special page insert</p>
                  <h4>{chapter.cardTitle}</h4>
                  <ul>
                    {chapter.list?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mini-scene">
                  <div className="scene-badge">Jey + Gori</div>
                  <h4>Important reminder</h4>
                  <p>
                    Even this page is empty because my excuses are empty. I just want honesty,
                    healing, and us.
                  </p>
                </div>
              )}

              <div className="bottom-note">
                <span>💌</span>
                Made with maximum regret, hope, and dramatic boyfriend energy.
              </div>
            </div>
          </article>
        </div>

        <div className="nav-row">
          <button className="ghost-btn" disabled={current === 0} onClick={() => setCurrent((p) => Math.max(0, p - 1))}>
            ← Previous Page
          </button>
          <button className="primary-btn" disabled={current === chapters.length - 1} onClick={() => setCurrent((p) => Math.min(chapters.length - 1, p + 1))}>
            Next Page →
          </button>
        </div>
      </section>

      <section className="future-strip">
        <div className="future-card">
          <span>💼</span>
          <h3>Build the agency</h3>
          <p>Less scrolling. More building. More winning together.</p>
        </div>
        <div className="future-card">
          <span>💸</span>
          <h3>Get very rich</h3>
          <p>In a peaceful, hardworking, non-chaotic, power-couple way.</p>
        </div>
        <div className="future-card">
          <span>🛕</span>
          <h3>Rishikesh trip</h3>
          <p>Healing energy, mountain views, river vibes, and us doing better.</p>
        </div>
      </section>

      <section className="footer-plea">
        <p className="eyebrow">Last line of the book</p>
        <h2>Gori, I love you. I want to protect what we have, not damage it.</h2>
        <p>
          This website is my way of saying I am sorry, I am aware, and I still believe our story has
          a beautiful next chapter.
        </p>
      </section>
    </main>
  )
}
