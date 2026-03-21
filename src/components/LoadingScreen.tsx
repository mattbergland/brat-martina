import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { playBootUp } from '../hooks/useSound';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  'Checking Memory Card...',
  'Loading Calico Critter Assets...',
  'Unboxing Sonny Angels...',
  'Calibrating Sparkle Engine...',
  'Initializing Jellycat Physics...',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [showStart, setShowStart] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) {
      const lineIndex = Math.floor((progress / 100) * BOOT_LINES.length);
      setCurrentLine(Math.min(lineIndex, BOOT_LINES.length - 1));
    } else {
      setShowStart(true);
    }
  }, [progress]);

  const handleStart = () => {
    playBootUp();
    setFadingOut(true);
    setTimeout(onComplete, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 ${fadingOut ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: 'linear-gradient(135deg, #fff5f7 0%, #f0f4ff 50%, #fff9f0 100%)',
      }}
    >
      {/* Floating sparkles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow text-pink-200"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${12 + Math.random() * 20}px`,
              opacity: 0.4,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Logo */}
      <div className="relative mb-12">
        <h1
          className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(135deg, #FFD1DC, #B4E4FF, #FFD1DC)',
            fontFamily: "'Quicksand', sans-serif",
          }}
        >
          MARTINA_OS
        </h1>
        <Sparkles className="absolute -top-4 -right-6 w-8 h-8 text-pink-300 animate-spin-slow" />
        <Sparkles className="absolute -bottom-3 -left-4 w-6 h-6 text-blue-300 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      </div>

      {/* Boot text */}
      <div className="w-80 md:w-96 mb-8">
        <div
          className="font-mono text-xs text-gray-400 mb-4 h-5 transition-all duration-300"
          style={{ fontFamily: "'VCR OSD Mono', 'Courier New', monospace" }}
        >
          {progress < 100 ? (
            <>
              {BOOT_LINES[currentLine]}{' '}
              <span className="text-pink-400">[OK]</span>
            </>
          ) : (
            <span className="text-pink-400">System Ready</span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 rounded-full overflow-hidden border-2 border-pink-200/50"
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-200 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #FFD1DC, #B4E4FF, #FFF9C4)',
            }}
          />
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        className={`group relative px-10 py-4 rounded-full font-black text-lg tracking-wider transition-all duration-500 cursor-pointer ${
          showStart
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(135deg, #FFD1DC, #FFF9C4)',
          color: '#e8729a',
          boxShadow: '0 0 30px rgba(255, 209, 220, 0.5), inset 0 2px 8px rgba(255, 255, 255, 0.8)',
          fontFamily: "'Quicksand', sans-serif",
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles className="w-5 h-5 animate-pulse" />
          Press Start
          <Sparkles className="w-5 h-5 animate-pulse" />
        </span>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, #FFF9C4, #FFD1DC)',
            boxShadow: '0 0 40px rgba(255, 209, 220, 0.8)',
          }}
        />
      </button>
    </div>
  );
}
