'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'

type Chapter = {
  id: string
  nav: string
  eyebrow: string
  title: string
  text: string[]
  sticker: string
}

const chapters: Chapter[] = [
  {
    id: 'cover',
    nav: 'Cover',
    eyebrow: 'A cinematic apology book',
    title: 'Our Story Isn’t Over',
    text: [
      'Taran, a normal sorry text felt too small, so your dramatic boyfriend built you a whole magical book instead.',
      'This is half apology, half love letter, half comedy. Yes, that is three halves. I am emotional, not mathematical.',
      'Made by Jey, for Gori, with a full heart and one very serious intention: to do better for real.'
    ],
    sticker: '🌙'
  },
  {
    id: 'messup',
    nav: 'Chapter 1',
    eyebrow: 'The part where I admit I was dumb',
    title: 'I hurt you, and I own that fully.',
    text: [
      'What I did was disrespectful. I am not going to shrink it, dodge it, or act like your hurt was somehow too much.',
      'You deserved to feel secure, chosen, protected, and proud to be with me. Instead, I gave you something ugly to carry.',
      'So here is the truth with zero excuses: I messed up, and I hate that I made the girl I love feel less than priceless.'
    ],
    sticker: '🥺'
  },
  {
    id: 'oath',
    nav: 'Chapter 2',
    eyebrow: 'The boyfriend oath',
    title: 'No more foolish distractions. Only respect, loyalty, and real focus.',
    text: [
      'I want my habits to match my words. No more mindless scrolling nonsense that disrespects us or weakens what we are building.',
      'I want to move like a man who is serious about his girl, his work, his future, and the peace inside his relationship.',
      'Not just romantic speeches. Better discipline. Better boundaries. Better choices. Better me.'
    ],
    sticker: '🫶'
  },
  {
    id: 'future',
    nav: 'Chapter 3',
    eyebrow: 'The future I still believe in',
    title: 'I still see us building something beautiful.',
    text: [
      'I still see us building our agency, locking in, getting rich the honest way, and laughing through the stressful parts together.',
      'I still see us going to Rishikesh one day, calmer and wiser, looking back at this moment like something we survived and grew from.',
      'I still see us as a real team — love, ambition, peace, travel, inside jokes, and a life we can both be proud of.'
    ],
    sticker: '🏔️'
  },
  {
    id: 'final',
    nav: 'Final Page',
    eyebrow: 'The brave question',
    title: 'Would you grant Jey a re-do?',
    text: [
      'I know a website cannot rebuild trust by itself. That part only happens through actions, consistency, and real change.',
      'But I wanted to show you effort, tenderness, honesty, and the fact that I am not casual about losing you.',
      'If there is even a little space left in your heart, I would love the chance to earn us back properly.'
    ],
    sticker: '💌'
  }
]

const gallery = [
  '/couple-photo.jpg',
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
  '/photo4.jpg'
]

const promises = [
  'No more feeding disrespectful distractions',
  'Protect your peace in the small things too',
  'Focus on work, discipline, and our future',
  'Give reassurance with actions, not only words',
  'Be the safe place you deserve'
]

const cartoonClouds = ['☁️', '💗', '✨', '🎈', '🤍', '🕊️']

function useAmbientMusic(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<{ gain: GainNode; lfo: OscillatorNode; osc1: OscillatorNode; osc2: OscillatorNode } | null>(null)

  useEffect(() => {
    if (!enabled) {
      nodesRef.current?.gain.gain.linearRampToValueAtTime(0.0001, ctxRef.current!.currentTime + 0.5)
      return
    }

    if (typeof window === 'undefined') return

    const setup = async () => {
      const existing = ctxRef.current
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return

      const ctx = existing ?? new AudioContextClass()
      ctxRef.current = ctx
      if (ctx.state === 'suspended') await ctx.resume()

      if (!nodesRef.current) {
        const gain = ctx.createGain()
        gain.gain.value = 0.0001
        gain.connect(ctx.destination)

        const osc1 = ctx.createOscillator()
        osc1.type = 'sine'
        osc1.frequency.value = 261.63
        osc1.connect(gain)

        const osc2 = ctx.createOscillator()
        osc2.type = 'triangle'
        osc2.frequency.value = 392
        osc2.connect(gain)

        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()
        lfo.frequency.value = 0.18
        lfoGain.gain.value = 14
        lfo.connect(lfoGain)
        lfoGain.connect(osc2.frequency)

        osc1.start()
        osc2.start()
        lfo.start()
        nodesRef.current = { gain, lfo, osc1, osc2 }
      }

      nodesRef.current.gain.gain.cancelScheduledValues(ctx.currentTime)
      nodesRef.current.gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.8)
    }

    void setup()

    return () => {
      if (ctxRef.current && nodesRef.current) {
        nodesRef.current.gain.gain.cancelScheduledValues(ctxRef.current.currentTime)
      }
    }
  }, [enabled])
}

export default function HomePage() {
  const [active, setActive] = useState(0)
  const [musicOn, setMusicOn] = useState(false)
  const [loveLetterOpen, setLoveLetterOpen] = useState(false)
  const [response, setResponse] = useState<'idle' | 'sending' | 'yes' | 'no'>('idle')
  const [responseMessage, setResponseMessage] = useState('')
  const [pulse, setPulse] = useState(false)

  const chapter = chapters[active]
  const currentPhoto = useMemo(() => gallery[Math.min(active, gallery.length - 1)], [active])

  useAmbientMusic(musicOn)

  useEffect(() => {
    const timer = window.setInterval(() => setPulse((v) => !v), 2800)
    return () => window.clearInterval(timer)
  }, [])

  const celebrate = (soft = false) => {
    confetti({
      particleCount: soft ? 90 : 160,
      spread: soft ? 70 : 110,
      startVelocity: soft ? 24 : 36,
      ticks: 240,
      scalar: 1.1,
      origin: { y: 0.62 }
    })
    confetti({
      particleCount: soft ? 60 : 120,
      spread: soft ? 55 : 85,
      angle: 60,
      origin: { x: 0.12, y: 0.76 }
    })
    confetti({
      particleCount: soft ? 60 : 120,
      spread: soft ? 55 : 85,
      angle: 120,
      origin: { x: 0.88, y: 0.76 }
    })
  }

  const sendAnswer = async (answer: 'yes' | 'no') => {
    setResponse('sending')
    setResponseMessage('Sending the royal decision...')

    try {
      const res = await fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer,
          name: 'Taran',
          chapter: chapter.title,
          timestamp: new Date().toISOString()
        })
      })

      const data = (await res.json()) as { ok?: boolean; notified?: boolean; message?: string }

      if (!res.ok || !data.ok) {
        throw new Error('Could not send response')
      }

      setResponse(answer)
      setResponseMessage(
        data.notified
          ? `Decision delivered to Jey successfully: ${answer.toUpperCase()} 💌`
          : `${answer.toUpperCase()} was captured. Add RESEND_API_KEY + NOTIFY_EMAIL in Vercel to get instant email alerts.`
      )
      celebrate(answer === 'no')
    } catch (error) {
      console.error(error)
      setResponse(answer)
      setResponseMessage(`The choice was clicked, but notification setup still needs one quick Vercel step.`)
      celebrate(true)
    }
  }

  return (
    <main className="dreamScene">
      <div className="aurora a1" />
      <div className="aurora a2" />
      <div className="aurora a3" />

      <div className="balloonField" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} style={{ left: `${(i * 6.7 + 3) % 100}%`, animationDelay: `${i * 0.9}s` }}>
            {cartoonClouds[i % cartoonClouds.length]}
          </span>
        ))}
      </div>

      <header className="topBar">
        <div>
          <p className="eyebrow">Jey’s apology universe for Taran (Gori)</p>
          <h1>Cinematic Storybook Version 3</h1>
        </div>
        <div className="topActions">
          <button className={`pill ${musicOn ? 'pillOn' : ''}`} onClick={() => setMusicOn((v) => !v)}>
            {musicOn ? '🎵 Romantic music on' : '🎵 Turn on romantic music'}
          </button>
          <button className="pill" onClick={() => setLoveLetterOpen((v) => !v)}>
            {loveLetterOpen ? 'Hide secret letter' : 'Open secret love letter'}
          </button>
        </div>
      </header>

      <section className="worldStage">
        <div className="mountains" />
        <div className="woodTable" />
        <div className="bookShadow" />

        <div className="storybook3d">
          <aside className="leftPage">
            <div className="foil foilLeft" />
            <p className="miniLabel">A very serious apology in a very extra package</p>
            <h2>Jey + Taran</h2>
            <p className="subtitle">from one sorry boyfriend to the girl who is still the whole plot twist of his life</p>

            <nav className="chapterStack" aria-label="Story chapters">
              {chapters.map((item, index) => (
                <motion.button
                  whileHover={{ x: 6, rotate: -0.4 }}
                  whileTap={{ scale: 0.98 }}
                  key={item.id}
                  className={`chapterCard ${active === index ? 'chapterCardActive' : ''}`}
                  onClick={() => setActive(index)}
                >
                  <span>{item.nav}</span>
                  <strong>{item.eyebrow}</strong>
                </motion.button>
              ))}
            </nav>

            <div className={`photoTower ${pulse ? 'photoTowerPulse' : ''}`}>
              <div className="polaroid p1">
                <div className="polaroidInner">
                  <Image src="/couple-photo.jpg" alt="Jey and Taran together" fill sizes="240px" />
                </div>
                <p>Main character energy</p>
              </div>
              <div className="polaroid p2">
                <div className="polaroidInner">
                  <Image src="/photo1.jpg" alt="Jey and Taran photo" fill sizes="220px" />
                </div>
                <p>Favorite memory evidence</p>
              </div>
              <div className="polaroid p3">
                <div className="polaroidInner">
                  <Image src="/photo2.jpg" alt="Jey and Taran photo together" fill sizes="220px" />
                </div>
                <p>Proof I adore you</p>
              </div>
            </div>
          </aside>

          <section className="rightPage">
            <div className="foil foilRight" />
            <AnimatePresence mode="wait">
              <motion.article
                key={chapter.id}
                initial={{ rotateY: 70, opacity: 0, x: 80 }}
                animate={{ rotateY: 0, opacity: 1, x: 0 }}
                exit={{ rotateY: -52, opacity: 0, x: -40 }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="pageContent"
              >
                <div className="pageTopline">
                  <span className="sticker">{chapter.sticker}</span>
                  <p className="miniLabel">{chapter.nav}</p>
                </div>
                <h3>{chapter.title}</h3>
                <div className="chapterCopy">
                  {chapter.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {chapter.id === 'oath' && (
                  <div className="promiseList">
                    {promises.map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="promiseItem"
                      >
                        <span>💘</span>
                        <p>{item}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {chapter.id === 'future' && (
                  <div className="futureSceneGrid">
                    <div className="futureGem">
                      <span>💼</span>
                      <strong>Agency era</strong>
                      <p>Focused work, smart moves, and building something massive together.</p>
                    </div>
                    <div className="futureGem">
                      <span>🛕</span>
                      <strong>Rishikesh chapter</strong>
                      <p>Peace, mountains, soft mornings, and gratitude for surviving the hard parts.</p>
                    </div>
                    <div className="futureGem">
                      <span>✈️</span>
                      <strong>Travel story</strong>
                      <p>New places, better memories, and you still being my favorite view.</p>
                    </div>
                  </div>
                )}

                {chapter.id === 'final' && (
                  <div className="decisionBox">
                    <p className="decisionLead">Official question for Miss Gori:</p>
                    <div className="decisionButtons">
                      <button className="yesBtn" onClick={() => void sendAnswer('yes')} disabled={response === 'sending'}>
                        Yes, grant Jey a re-do 💗
                      </button>
                      <button className="noBtn" onClick={() => void sendAnswer('no')} disabled={response === 'sending'}>
                        No... for now 😤
                      </button>
                    </div>
                    <p className="decisionStatus">{responseMessage || 'The answer can trigger an email notification to Jey once Vercel env vars are added.'}</p>
                  </div>
                )}

                <div className="pageBottomGallery">
                  <div className="wideMemory">
                    <Image src={currentPhoto} alt="Memory of Jey and Taran" fill sizes="(max-width: 900px) 90vw, 360px" />
                  </div>
                  <div className="miniFacts">
                    <p>Nickname: <strong>Gori</strong></p>
                    <p>Dream place: <strong>Rishikesh</strong></p>
                    <p>Relationship objective: <strong>heal, build, win together</strong></p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </section>
        </div>
      </section>

      <AnimatePresence>
        {loveLetterOpen && (
          <motion.section
            className="secretLetterWrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45 }}
          >
            <div className="secretLetter">
              <div className="waxSeal">💌</div>
              <p className="eyebrow">Hidden letter unlocked</p>
              <h4>To my Gori,</h4>
              <p>
                If you read nothing else on this whole website, read this: I do not want a version of life where I get used to your absence.
              </p>
              <p>
                I want the version where I grow up properly, protect what I have, make you feel deeply loved, and earn back the softness I damaged.
              </p>
              <p>
                You are not just my girlfriend. You are the girl I imagine peace with, ambition with, laughter with, and a whole future with.
              </p>
              <p className="signature">Always yours, Jey</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="footerNote">
        <p>
          For real notifications: add <strong>RESEND_API_KEY</strong> and <strong>NOTIFY_EMAIL</strong> in Vercel project settings. Then the Yes / No choice emails Jey instantly.
        </p>
      </footer>
    </main>
  )
}
