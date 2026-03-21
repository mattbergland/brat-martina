import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Home, Briefcase, User, BookOpen, Share2 } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import AuraBackground from './components/AuraBackground';
import GamerCard from './components/GamerCard';
import BladeContent from './components/BladeContent';
import AchievementPopup from './components/AchievementPopup';
import { playBleep } from './hooks/useSound';
import './App.css';

const BLADES = [
  { id: 'home', label: 'Home', icon: Home, color: '#FFD1DC' },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase, color: '#B4E4FF' },
  { id: 'about', label: 'About Me', icon: User, color: '#FFF9C4' },
  { id: 'guestbook', label: 'Guestbook', icon: BookOpen, color: '#E0BBE4' },
  { id: 'social', label: 'Connect', icon: Share2, color: '#FFD1DC' },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeBlade, setActiveBlade] = useState(0);
  const [focusedTile, setFocusedTile] = useState(100);
  const [achievement, setAchievement] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const switchBlade = useCallback((index: number) => {
    if (index === activeBlade || transitioning) return;
    playBleep();
    setTransitioning(true);
    setActiveBlade(index);
    setTimeout(() => setTransitioning(false), 700);
  }, [activeBlade, transitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading) return;
      if (e.key === 'ArrowRight') {
        switchBlade(Math.min(activeBlade + 1, BLADES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        switchBlade(Math.max(activeBlade - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBlade, loading, switchBlade]);

  const triggerAchievement = useCallback((msg: string) => {
    setAchievement(msg);
  }, []);

  const dismissAchievement = useCallback(() => setAchievement(null), []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative cursor-sparkle select-none"
      style={{
        background: 'linear-gradient(135deg, #fff5f7 0%, #f0f4ff 50%, #fff9f0 100%)',
      }}
    >
      <AuraBackground />

      {/* ─── BLADE NAVIGATION ─── */}
      <nav className="absolute top-0 left-0 w-full h-20 z-50 flex items-end px-6 md:px-10 gap-1">
        {BLADES.map((blade, idx) => {
          const isActive = activeBlade === idx;
          const Icon = blade.icon;
          return (
            <button
              key={blade.id}
              onClick={() => switchBlade(idx)}
              className={`relative flex items-center justify-center gap-2 font-black tracking-wider rounded-t-2xl border-t-2 border-x-2 transition-all duration-300 ease-out cursor-pointer
                ${isActive
                  ? 'h-14 md:h-16 flex-[1.5] z-20'
                  : 'h-10 md:h-12 flex-1 z-10 hover:h-12 md:hover:h-14'}
              `}
              style={{
                background: isActive
                  ? 'rgba(255, 249, 196, 0.85)'
                  : 'rgba(255, 255, 255, 0.35)',
                borderColor: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: isActive
                  ? `inset 0 4px 10px rgba(255,255,255,0.8), 0 -4px 20px ${blade.color}40`
                  : 'inset 0 4px 10px rgba(255,255,255,0.4)',
                color: isActive ? '#e8729a' : '#999',
                fontFamily: "'Quicksand', sans-serif",
              }}
            >
              <Icon className={`w-4 h-4 ${isActive ? '' : 'hidden md:block'}`} />
              <span className={`uppercase text-xs md:text-sm font-black ${isActive ? '' : 'hidden md:inline'}`}>
                {blade.label}
              </span>
              {isActive && (
                <Sparkles className="absolute -top-3 -right-1 w-5 h-5 text-blue-300 animate-spin-slow" />
              )}
            </button>
          );
        })}
        {/* Track base line */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 z-30"
          style={{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(8px)',
          }}
        />
      </nav>

      {/* ─── HORIZONTAL SLIDING CONTENT ─── */}
      <div
        className="flex h-full transition-transform duration-700 pt-24 pb-6"
        style={{
          width: `${BLADES.length * 100}vw`,
          transform: `translateX(-${activeBlade * 100}vw)`,
          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {BLADES.map((blade, idx) => (
          <div
            key={`content-${blade.id}`}
            className="h-full px-6 md:px-10 flex"
            style={{ width: '100vw' }}
          >
            {/* Content area - leaves space for sidebar */}
            <div className={`flex-1 pr-4 md:pr-80 lg:pr-96 h-full transition-opacity duration-500 ${
              activeBlade === idx ? 'opacity-100' : 'opacity-0'
            }`}>
              <BladeContent
                bladeId={blade.id}
                isActive={activeBlade === idx}
                focusedTile={focusedTile}
                setFocusedTile={setFocusedTile}
                triggerAchievement={triggerAchievement}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ─── PERSISTENT GAMER CARD SIDEBAR ─── */}
      <GamerCard currentBlade={BLADES[activeBlade].label} />

      {/* ─── ACHIEVEMENT POPUP ─── */}
      {achievement && (
        <AchievementPopup
          message={achievement}
          onDismiss={dismissAchievement}
        />
      )}

      {/* ─── BOTTOM BAR ─── */}
      <div className="absolute bottom-0 left-0 w-full h-6 z-50 flex items-center justify-between px-6 md:px-10"
        style={{
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span className="text-xs text-gray-400 font-bold" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>
          MARTINA_OS v1.0
        </span>
        <span className="text-xs text-gray-400 font-bold" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>
          {BLADES[activeBlade].label.toUpperCase()} // USE ARROWS TO NAVIGATE
        </span>
      </div>
    </div>
  );
}
