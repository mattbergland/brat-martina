import { useState, useEffect } from 'react';
import './App.css';

// ─── DATA ───────────────────────────────────────────

const SECTIONS = [
  { id: 'brand', label: 'Brand', emoji: '✨', desc: 'Brand identity work — logos, mood boards, visual direction for creators and lifestyle brands.' },
  { id: 'social', label: 'Social', emoji: '📱', desc: 'Social media strategy and management. Growing communities, one post at a time.' },
  { id: 'strategy', label: 'Strategy', emoji: '🎯', desc: 'Campaign planning and execution. From brief to launch to wrap report.' },
  { id: 'content', label: 'Content', emoji: '📝', desc: 'Content creation and curation — reels, carousels, stories, and everything in between.' },
  { id: 'collabs', label: 'Collabs', emoji: '🤝', desc: 'Creator collaborations and influencer partnerships. Matchmaking brands with the right voices.' },
  { id: 'campaigns', label: 'Campaigns', emoji: '🚀', desc: '50+ campaigns delivered and counting. Beauty, fashion, food, lifestyle, and more.' },
];

const STUFF = [
  { id: 'about', label: 'About', emoji: '💖' },
  { id: 'guestbook', label: 'Guestbook', emoji: '📮' },
  { id: 'links', label: 'Links', emoji: '🔗' },
];

const NEWS_ITEMS = [
  { date: '03.21.2026, 02:15 am', text: 'just wrapped a new campaign with a major beauty brand... teaser dropping this week 💅', author: 'martina' },
  { date: '03.15.2026, 11:30 am', text: 'hit 50+ campaigns!! thank you to everyone who trusted me with their brands ✨', author: 'martina' },
  { date: '03.10.2026, 04:22 pm', text: 'manu (my cat) knocked three sonny angels off the shelf. casualties: one hiker, one vegetable, one marine series 😭', author: 'martina' },
  { date: '02.28.2026, 09:45 am', text: 'working from dolores park today, sf weather finally cooperating 🌸', author: 'martina' },
  { date: '02.20.2026, 06:15 pm', text: 'new content strategy deck is DONE. 40 pages of pure magic if i do say so myself', author: 'martina' },
];

const SOCIAL_ITEMS = [
  { date: '03.20.2026, 06:00 pm', text: '9,451 followers and counting!! this community means everything 💕', author: 'martina' },
  { date: '03.18.2026, 10:12 am', text: 'blind box haul going up on stories today... pulled TWO ultra rares from the fruit series 🍓🍊', author: 'martina' },
  { date: '03.12.2026, 03:30 pm', text: 'chicken joint review update: that new spot on valencia? 8/10, would return for the spicy sandwich 🍗', author: 'martina' },
  { date: '03.05.2026, 12:00 pm', text: 'added new calico critters to the collection. the hedgehog family is SO precious 🦔', author: 'martina' },
  { date: '02.25.2026, 07:30 pm', text: 'argentina trip photos are finally up!! miss buenos aires already 🇦🇷', author: 'martina' },
];

const INITIAL_GUESTBOOK = [
  { name: 'matt', msg: 'love you so much babe 💚', date: '03.21.2026' },
  { name: 'sofia', msg: 'this site is EVERYTHING omg', date: '03.20.2026' },
  { name: 'anon', msg: 'ur sonny angel collection is insane', date: '03.19.2026' },
  { name: 'luna', msg: 'influencer queen!! teach me ur ways', date: '03.18.2026' },
];

const MARQUEE_ITEMS = [
  'sonny angels', 'jellycats', 'calico critters', 'blind boxes',
  'sf girl', 'argentina', 'manu the cat', 'chicken joints',
  'influencer strategist', 'certified brat', 'ultra rare',
];

// ─── SMALL COMPONENTS ───────────────────────────────

function Window({ title, children, className = '' }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`hp-window ${className}`}>
      <div className="hp-titlebar">
        <span className="hp-titlebar-text">{title}</span>
      </div>
      <div className="hp-window-content">
        {children}
      </div>
    </div>
  );
}

function ScrollBar({ label }: { label: string }) {
  return (
    <div className="hp-scrollbar">
      <div className="hp-scrollbar-track">
        <span className="hp-scrollbar-text">{label}</span>
      </div>
      <div className="hp-scrollbar-btn">▼</div>
    </div>
  );
}

// ─── LOADING SCREEN ─────────────────────────────────

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 12 + 4;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return next;
      });
    }, 180);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center hp-loading">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-2 hp-loading-logo">
          <div className="text-3xl font-bold mb-1">
            <span style={{ color: '#cc3366' }}>MARTINA</span>
            <span style={{ color: '#8b2252' }}>_PROJECT</span>
          </div>
          <div className="text-xs tracking-widest" style={{ color: '#a0526b' }}>
            DESIGNERS &amp; CREATORS COMMUNITY
          </div>
        </div>

        {/* Decorative stars */}
        <div className="flex justify-center gap-3 mb-4 text-lg">
          <span className="animate-sparkle" style={{ animationDelay: '0s' }}>✦</span>
          <span className="animate-sparkle" style={{ animationDelay: '0.3s' }}>✧</span>
          <span className="animate-sparkle" style={{ animationDelay: '0.6s' }}>✦</span>
          <span className="animate-sparkle" style={{ animationDelay: '0.9s' }}>✧</span>
          <span className="animate-sparkle" style={{ animationDelay: '1.2s' }}>✦</span>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-4 hp-loading-bar-track mx-auto">
          <div
            className="h-full hp-loading-bar-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Progress text */}
        <div className="text-xs mt-3 font-bold hp-loading-logo" style={{ fontSize: '10px' }}>
          {progress < 20 && 'loading assets...'}
          {progress >= 20 && progress < 40 && 'unpacking blind boxes...'}
          {progress >= 40 && progress < 60 && 'feeding manu...'}
          {progress >= 60 && progress < 80 && 'applying lip gloss...'}
          {progress >= 80 && progress < 100 && 'almost ready...'}
          {progress >= 100 && 'welcome! ✨'}
        </div>
        <div className="text-xs mt-1 font-bold" style={{ color: '#cc3366', fontFamily: "'Silkscreen', monospace", fontSize: '10px' }}>
          {Math.min(Math.round(progress), 100)}%
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeStuff, setActiveStuff] = useState<string | null>(null);
  const [guestbook, setGuestbook] = useState(INITIAL_GUESTBOOK);
  const [gbName, setGbName] = useState('');
  const [gbMsg, setGbMsg] = useState('');

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
  }

  const handleGuestbookSubmit = () => {
    if (!gbName.trim() || !gbMsg.trim()) return;
    const now = new Date();
    const date = `${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}.${now.getFullYear()}`;
    setGuestbook(prev => [{ name: gbName, msg: gbMsg, date }, ...prev]);
    setGbName('');
    setGbMsg('');
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative hp-page">
      {/* ─── BACKGROUND ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f5c6c6 0%, #fce4e4 40%, #f5c6c6 100%)' }} />
        {/* Wavy mountains */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 250" preserveAspectRatio="none" style={{ height: '220px' }}>
          <path d="M0,120 Q180,40 360,100 Q540,160 720,90 Q900,20 1080,100 Q1260,180 1440,80 L1440,250 L0,250 Z" fill="#e8a0a0" opacity="0.4" />
          <path d="M0,160 Q240,80 480,140 Q720,200 960,120 Q1200,40 1440,130 L1440,250 L0,250 Z" fill="#d48a8a" opacity="0.3" />
          <path d="M0,190 Q360,130 720,180 Q1080,230 1440,160 L1440,250 L0,250 Z" fill="#c07878" opacity="0.25" />
        </svg>
        {/* Floating decorative elements */}
        <div className="absolute animate-float-gentle" style={{ top: '8%', right: '15%', fontSize: '20px', opacity: 0.2, animationDelay: '0s' }}>✦</div>
        <div className="absolute animate-float-gentle" style={{ top: '15%', right: '35%', fontSize: '14px', opacity: 0.15, animationDelay: '1s' }}>✧</div>
        <div className="absolute animate-float-gentle" style={{ top: '25%', right: '8%', fontSize: '18px', opacity: 0.18, animationDelay: '2s' }}>⭐</div>
        <div className="absolute animate-float-gentle" style={{ top: '60%', left: '5%', fontSize: '16px', opacity: 0.12, animationDelay: '0.5s' }}>✿</div>
      </div>

      {/* ─── MAIN LAYOUT ─── */}
      <div className="relative z-10 h-full flex flex-col p-3 gap-2">

        {/* ─── TOP ROW: Logo + Scroll bars ─── */}
        <div className="flex gap-3 items-start flex-shrink-0">
          {/* Logo */}
          <div className="flex-shrink-0" style={{ width: '260px' }}>
            <div className="flex items-center gap-1">
              <span style={{ color: '#cc3366', fontSize: '18px' }}>✿</span>
              <div style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}>
                <span className="text-xl font-black tracking-tight" style={{ color: '#cc3366' }}>MARTINA</span>
                <span className="text-xl font-black tracking-tight" style={{ color: '#8b2252' }}>PROJECT</span>
              </div>
            </div>
            <div className="text-xs font-bold tracking-wider mt-0.5" style={{ color: '#a0526b', fontSize: '8px', letterSpacing: '1.5px' }}>
              DESIGNERS &amp; CREATORS COMMUNITY
            </div>
          </div>

          {/* Scroll bars */}
          <div className="flex-1 flex flex-col gap-1">
            <ScrollBar label="--------daily dose--------" />
            <ScrollBar label="------exchange links------" />
            <ScrollBar label="------hp internals--------" />
          </div>
        </div>

        {/* ─── MARQUEE BAR ─── */}
        <div className="flex-shrink-0 overflow-hidden rounded" style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid #cc6688', height: '16px' }}>
          <div className="flex whitespace-nowrap animate-marquee-scroll" style={{ width: '200%' }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="inline-block mx-3" style={{ fontSize: '9px', color: '#cc3366', lineHeight: '16px' }}>
                ✦ {item}
              </span>
            ))}
          </div>
        </div>

        {/* ─── MAIN CONTENT ROW ─── */}
        <div className="flex-1 flex gap-2 overflow-hidden min-h-0">

          {/* ─── LEFT COLUMN ─── */}
          <div className="flex flex-col gap-2 flex-shrink-0" style={{ width: '240px' }}>

            {/* Character / Avatar area */}
            <div className="hp-character-area overflow-hidden flex-shrink-0" style={{ height: '160px' }}>
              <div className="h-full flex items-center justify-center relative">
                {/* Decorative corners */}
                <div className="absolute top-1.5 left-2 animate-float-gentle" style={{ fontSize: '14px', animationDelay: '0s' }}>🌸</div>
                <div className="absolute top-1.5 right-2 animate-float-gentle" style={{ fontSize: '14px', animationDelay: '0.4s' }}>⭐</div>
                <div className="absolute bottom-1.5 left-2 animate-float-gentle" style={{ fontSize: '14px', animationDelay: '0.8s' }}>🎀</div>
                <div className="absolute bottom-1.5 right-2 animate-float-gentle" style={{ fontSize: '14px', animationDelay: '1.2s' }}>💫</div>

                {/* Profile content */}
                <div className="text-center relative z-10">
                  <div className="text-5xl mb-1">👩🏻‍🦰</div>
                  <div className="font-black" style={{ color: '#8b2252', fontFamily: "'Silkscreen', monospace", fontSize: '11px' }}>
                    martina b-h
                  </div>
                  <div className="mt-0.5 font-bold" style={{ color: '#a0526b', fontSize: '9px' }}>
                    ✨ ultra rare ✨
                  </div>
                  <div className="mt-1 flex gap-1 justify-center">
                    {['🐱', '🍓', '🎀', '🧸', '🌸'].map((e, i) => (
                      <span key={i} className="animate-sparkle" style={{ fontSize: '12px', animationDelay: `${i * 0.4}s` }}>{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sections grid */}
            <Window title="SECTIONS ★">
              <div className="grid grid-cols-3 gap-1 p-1.5">
                {SECTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded transition-all text-center cursor-pointer
                      ${activeSection === s.id ? 'hp-section-active' : 'hover:bg-pink-50'}`}
                  >
                    <span style={{ fontSize: '20px' }}>{s.emoji}</span>
                    <span className="font-bold leading-tight" style={{ color: '#8b2252', fontSize: '8px' }}>{s.label}</span>
                  </button>
                ))}
              </div>
            </Window>

            {/* Stuff row */}
            <Window title="STUFF ★">
              <div className="flex gap-1 p-1.5">
                {STUFF.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStuff(activeStuff === s.id ? null : s.id)}
                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded transition-all flex-1 cursor-pointer
                      ${activeStuff === s.id ? 'hp-section-active' : 'hover:bg-pink-50'}`}
                  >
                    <span style={{ fontSize: '18px' }}>{s.emoji}</span>
                    <span className="font-bold" style={{ color: '#8b2252', fontSize: '8px' }}>{s.label}</span>
                  </button>
                ))}
              </div>
            </Window>

            {/* Current Mood */}
            <Window title="CURRENT MOOD ★">
              <div className="p-2 text-center">
                <div className="flex justify-center gap-1 mb-1">
                  <span style={{ fontSize: '18px' }}>🐱</span>
                  <span style={{ fontSize: '18px' }}>✨</span>
                  <span style={{ fontSize: '18px' }}>🍵</span>
                </div>
                <div className="font-bold" style={{ color: '#8b2252', fontSize: '10px' }}>feeling cute, might strategize later</div>
                <div className="mt-1" style={{ color: '#a0526b', fontSize: '9px' }}>
                  sf based · argentine queen · cat mom
                </div>
              </div>
            </Window>
          </div>

          {/* ─── CENTER COLUMN: News ─── */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <Window title="NEWS ★" className="flex-1">
              <div className="overflow-y-auto h-full p-2 hp-scroll">
                {NEWS_ITEMS.map((item, i) => (
                  <div key={i} className="mb-2.5 pb-2 border-b border-pink-200">
                    <div className="font-bold" style={{ color: '#cc3366', fontSize: '10px' }}>{item.date}</div>
                    <p className="mt-0.5 leading-relaxed" style={{ color: '#333', fontSize: '11px' }}>{item.text}</p>
                    <div className="text-right mt-0.5">
                      <span className="font-bold" style={{ color: '#8b2252', fontSize: '10px' }}>{item.author} 📧</span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-1 pt-1.5 border-t border-pink-200">
                  <button className="hp-link">submit news</button>
                  <button className="hp-link">search archives</button>
                </div>
              </div>
            </Window>

            {/* Section detail overlay */}
            {activeSection && (
              <div className="hp-detail-panel flex-shrink-0">
                <Window title={`${SECTIONS.find(s => s.id === activeSection)?.label.toUpperCase()} — DETAIL ★`}>
                  <div className="p-2.5">
                    <div className="flex items-start gap-2">
                      <span style={{ fontSize: '28px' }}>{SECTIONS.find(s => s.id === activeSection)?.emoji}</span>
                      <div className="flex-1">
                        <div className="font-bold mb-1" style={{ color: '#8b2252', fontSize: '11px' }}>
                          {SECTIONS.find(s => s.id === activeSection)?.label}
                        </div>
                        <p style={{ color: '#333', fontSize: '11px', lineHeight: '1.5' }}>
                          {SECTIONS.find(s => s.id === activeSection)?.desc}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveSection(null)}
                      className="hp-link mt-2 block"
                    >
                      [close]
                    </button>
                  </div>
                </Window>
              </div>
            )}
          </div>

          {/* ─── RIGHT COLUMN: Social + Detail Panels ─── */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <Window title="SOCIALSCENE ★" className="flex-1">
              <div className="overflow-y-auto h-full p-2 hp-scroll">
                {SOCIAL_ITEMS.map((item, i) => (
                  <div key={i} className="mb-2.5 pb-2 border-b border-pink-200">
                    <div className="font-bold" style={{ color: '#cc3366', fontSize: '10px' }}>{item.date}</div>
                    <p className="mt-0.5 leading-relaxed" style={{ color: '#333', fontSize: '11px' }}>{item.text}</p>
                    <div className="text-right mt-0.5">
                      <span className="font-bold" style={{ color: '#8b2252', fontSize: '10px' }}>{item.author} 📧</span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between mt-1 pt-1.5 border-t border-pink-200">
                  <button className="hp-link">submit news</button>
                  <button className="hp-link">search archives</button>
                </div>
              </div>
            </Window>

            {/* About panel */}
            {activeStuff === 'about' && (
              <div className="hp-detail-panel flex-shrink-0">
                <Window title="ABOUT ★">
                  <div className="p-2.5">
                    <p className="leading-relaxed" style={{ color: '#333', fontSize: '11px' }}>
                      hey! i&apos;m <strong>martina barrera-hern&aacute;ndez</strong> &mdash; influencer strategist by day,
                      blind box collector by night. based in san francisco, originally from argentina.
                      i have a cat named manu who runs my life.
                      i love sonny angels, jellycats, calico critters, and chicken joints.
                    </p>
                    <div className="mt-2 flex flex-col gap-0.5" style={{ color: '#8b2252', fontSize: '10px' }}>
                      <div>📍 san francisco, ca</div>
                      <div>🐱 cat mom to manu</div>
                      <div>🇦🇷 argentina forever</div>
                      <div>📊 50+ campaigns delivered</div>
                      <div>👥 9,451 followers</div>
                    </div>
                    <button onClick={() => setActiveStuff(null)} className="hp-link mt-2 block">[close]</button>
                  </div>
                </Window>
              </div>
            )}

            {/* Guestbook panel */}
            {activeStuff === 'guestbook' && (
              <div className="hp-detail-panel flex-shrink-0">
                <Window title="GUESTBOOK ★">
                  <div className="p-2">
                    {/* Sign form */}
                    <div className="flex gap-1 mb-2">
                      <input
                        value={gbName}
                        onChange={e => setGbName(e.target.value)}
                        placeholder="name"
                        className="hp-input flex-1"
                        maxLength={20}
                      />
                      <input
                        value={gbMsg}
                        onChange={e => setGbMsg(e.target.value)}
                        placeholder="leave a message..."
                        className="hp-input flex-1"
                        maxLength={100}
                        onKeyDown={e => e.key === 'Enter' && handleGuestbookSubmit()}
                      />
                      <button onClick={handleGuestbookSubmit} className="hp-btn">sign!</button>
                    </div>
                    {/* Entries */}
                    <div className="overflow-y-auto hp-scroll" style={{ maxHeight: '100px' }}>
                      {guestbook.map((entry, i) => (
                        <div key={i} className="mb-1 pb-1 border-b border-pink-100" style={{ fontSize: '10px' }}>
                          <span className="font-bold" style={{ color: '#cc3366' }}>{entry.name}</span>
                          <span style={{ color: '#666' }}> — {entry.msg}</span>
                          <span style={{ color: '#999' }}> ({entry.date})</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setActiveStuff(null)} className="hp-link mt-1 block">[close]</button>
                  </div>
                </Window>
              </div>
            )}

            {/* Links panel */}
            {activeStuff === 'links' && (
              <div className="hp-detail-panel flex-shrink-0">
                <Window title="LINKS ★">
                  <div className="p-2.5">
                    <a
                      href="https://instagram.com/first_fig"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hp-link block mb-1.5"
                      style={{ fontSize: '11px' }}
                    >
                      📸 @first_fig on instagram
                    </a>
                    <a
                      href="mailto:hello@martina.bh"
                      className="hp-link block mb-1.5"
                      style={{ fontSize: '11px' }}
                    >
                      📧 hello@martina.bh
                    </a>
                    <div className="mt-2 pt-2 border-t border-pink-200">
                      <div className="font-bold mb-1" style={{ color: '#8b2252', fontSize: '9px' }}>FRIENDS &amp; FAVES:</div>
                      <div style={{ fontSize: '10px', color: '#666' }}>
                        sonnyangel.com · jellycat.com · calicocritters.com
                      </div>
                    </div>
                    <button onClick={() => setActiveStuff(null)} className="hp-link mt-2 block">[close]</button>
                  </div>
                </Window>
              </div>
            )}
          </div>
        </div>

        {/* ─── BOTTOM BARS ─── */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          {/* Sponsors */}
          <div className="hp-sponsor-bar">
            <span className="font-bold mr-2" style={{ color: '#cc3366' }}>HP SPONSORS</span>
            <span className="mx-1">sonnyangel</span> ·
            <span className="mx-1">jellycat</span> ·
            <span className="mx-1">calico critters</span> ·
            <span className="mx-1">blindboxes.jp</span> ·
            <span className="mx-1">sanrio</span>
          </div>

          {/* Support bar */}
          <div className="hp-support-bar flex items-center justify-center gap-3">
            <span className="font-bold" style={{ color: '#8b2252' }}>SUPPORT</span>
            <span>visitors: 4,892</span>
            <span>·</span>
            <span>online: 3</span>
            <span>·</span>
            <span>last updated: 03.21.2026</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-1">
            <div style={{ color: '#8b2252', fontSize: '8px' }}>
              hosting sponsored by <span className="font-bold">✿ MARTINA</span>METRO
            </div>
            <div style={{ color: '#8b2252', fontSize: '8px' }}>
              copyright 2000-2026, martina_project. all rights reserved.
            </div>
            <div style={{ color: '#8b2252', fontSize: '8px' }}>
              PARTNER SITES: <span className="font-bold">@first_fig</span> · <span className="font-bold">brat.martina.bh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
