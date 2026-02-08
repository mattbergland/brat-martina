import { useState, useEffect, useRef } from 'react'
import './App.css'

const BRAT_GREEN = '#8ACE00'
const BRAT_DARK = '#0C0C0C'

const phrases = [
  'martina',
  'incredible',
  'amazing',
  'influencer strategist by day',
  'annoying by night',
  'sf girl',
  'argentina',
  'martina',
  'brat',
  'icon',
  'martina',
]

const sections = [
  {
    title: 'martina barrera-hernández',
    subtitle: 'she is incredible and amazing',
  },
  {
    title: 'the vibe',
    lines: [
      'influencer strategist by day',
      'annoying by night',
      'sf based',
      'argentinian queen',
    ],
  },
  {
    title: 'the facts',
    lines: [
      'has a cat named manu',
      '9,451 followers and counting',
      'chicken joint enthusiast',
      'sends love notes',
      'certified brat',
    ],
  },
]

function HeroSection() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [blur, setBlur] = useState(2)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const newBlur = Math.max(0, 2 - scrollY / 200)
      setBlur(newBlur)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: BRAT_GREEN }}
    >
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-black font-black lowercase"
            style={{
              fontSize: `${Math.random() * 60 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 40 - 20}deg)`,
              fontFamily: 'Arial Black, Arial, sans-serif',
            }}
          >
            brat
          </div>
        ))}
      </div>

      <h1
        className="relative z-10 font-black lowercase leading-none text-center px-4 transition-all duration-700"
        style={{
          fontFamily: 'Arial Black, Arial, sans-serif',
          color: BRAT_DARK,
          fontSize: 'clamp(4rem, 15vw, 12rem)',
          filter: `blur(${blur}px)`,
        }}
      >
        {phrases[currentPhrase]}
      </h1>

      <div
        className="absolute bottom-12 z-10 animate-bounce"
        style={{ color: BRAT_DARK }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}

function TextSection({ title, subtitle, lines }: { title: string; subtitle?: string; lines?: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ backgroundColor: BRAT_DARK }}
    >
      <div
        className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <h2
          className="font-black lowercase text-center leading-tight mb-8"
          style={{
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: BRAT_GREEN,
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-center font-bold lowercase text-2xl md:text-4xl"
            style={{
              fontFamily: 'Arial Black, Arial, sans-serif',
              color: '#ffffff',
              opacity: 0.7,
            }}
          >
            {subtitle}
          </p>
        )}
        {lines && (
          <div className="flex flex-col items-center gap-4 mt-4">
            {lines.map((line, i) => (
              <p
                key={i}
                className="font-bold lowercase text-xl md:text-3xl"
                style={{
                  fontFamily: 'Arial Black, Arial, sans-serif',
                  color: '#ffffff',
                  opacity: visible ? 0.8 : 0,
                  transform: visible ? 'translateX(0)' : `translateX(${i % 2 === 0 ? '-40px' : '40px'})`,
                  transition: `all 700ms ease ${i * 200}ms`,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function MarqueeSection() {
  const text = 'martina is incredible and amazing  ·  '
  const repeated = text.repeat(10)

  return (
    <section
      className="py-8 overflow-hidden"
      style={{ backgroundColor: BRAT_GREEN }}
    >
      <div className="flex whitespace-nowrap">
        <div
          className="font-black lowercase text-4xl md:text-6xl"
          style={{
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: BRAT_DARK,
            animation: 'marquee 20s linear infinite',
          }}
        >
          {repeated}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

const instagramPosts = [
  'DUbjvFREgQw',
  'DUZKKfwkvlU',
  'DURGf_kEpic',
  'DUG2LuHEhEA',
  'DTij6qeD6xi',
  'DTd6AgJkhzT',
]

function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="px-4 md:px-12 py-24"
      style={{ backgroundColor: BRAT_DARK }}
    >
      <h2
        className="font-black lowercase text-center leading-tight mb-12"
        style={{
          fontFamily: 'Arial Black, Arial, sans-serif',
          color: BRAT_GREEN,
          fontSize: 'clamp(2rem, 6vw, 5rem)',
        }}
      >
        the feed
      </h2>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {instagramPosts.map((postId, i) => (
          <div
            key={postId}
            className="w-full overflow-hidden rounded-sm"
            style={{
              border: `2px solid ${BRAT_GREEN}`,
              transitionDelay: `${i * 100}ms`,
            }}
          >
            <iframe
              src={`https://www.instagram.com/p/${postId}/embed/captioned/`}
              className="w-full border-0"
              style={{ minHeight: '480px', background: BRAT_DARK }}
              loading="lazy"
              title={`Instagram post ${postId}`}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function InstagramSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ backgroundColor: BRAT_GREEN }}
    >
      <div
        className={`transition-all duration-1000 text-center ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <p
          className="font-black lowercase mb-4 text-lg md:text-2xl"
          style={{
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: BRAT_DARK,
          }}
        >
          follow the icon
        </p>
        <a
          href="https://instagram.com/first_fig"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block group"
        >
          <h2
            className="font-black lowercase leading-tight transition-all duration-300 group-hover:opacity-60"
            style={{
              fontFamily: 'Arial Black, Arial, sans-serif',
              color: BRAT_DARK,
              fontSize: 'clamp(3rem, 10vw, 9rem)',
            }}
          >
            @first_fig
          </h2>
        </a>
        <p
          className="font-black lowercase mt-8 text-xl md:text-3xl"
          style={{
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: BRAT_DARK,
          }}
        >
          martina barrera-hernández
        </p>
      </div>
    </section>
  )
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const togglePlay = () => {
    const iframe = iframeRef.current
    if (!iframe) return
    const msg = playing
      ? '{"event":"command","func":"pauseVideo","args":""}'
      : '{"event":"command","func":"playVideo","args":""}'
    iframe.contentWindow?.postMessage(msg, '*')
    setPlaying(!playing)
  }

  return (
    <>
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/qfAqtFuGjWM?enablejsapi=1&autoplay=0&loop=1&playlist=qfAqtFuGjWM"
        className="hidden"
        allow="autoplay"
        title="Vroom Vroom - Charli XCX"
      />
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 font-black lowercase text-sm md:text-base transition-all duration-300 hover:scale-105"
        style={{
          fontFamily: 'Arial Black, Arial, sans-serif',
          backgroundColor: playing ? BRAT_DARK : BRAT_GREEN,
          color: playing ? BRAT_GREEN : BRAT_DARK,
          border: `2px solid ${BRAT_GREEN}`,
          borderRadius: '2px',
        }}
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
        vroom vroom
      </button>
    </>
  )
}

function Footer() {
  return (
    <footer
      className="py-16 text-center"
      style={{ backgroundColor: BRAT_DARK }}
    >
      <p
        className="font-black lowercase text-lg"
        style={{
          fontFamily: 'Arial Black, Arial, sans-serif',
          color: BRAT_GREEN,
          opacity: 0.4,
        }}
      >
        made with love because martina is that girl
      </p>
    </footer>
  )
}

function App() {
  return (
    <div className="overflow-x-hidden" style={{ cursor: 'default' }}>
      <MusicPlayer />
      <HeroSection />
      {sections.map((section, i) => (
        <div key={i}>
          <TextSection
            title={section.title}
            subtitle={section.subtitle}
            lines={section.lines}
          />
          {i < sections.length - 1 && <MarqueeSection />}
        </div>
      ))}
      <MarqueeSection />
      <InstagramFeed />
      <InstagramSection />
      <Footer />
    </div>
  )
}

export default App
