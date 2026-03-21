import { useState, useRef } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSquishy, playReveal } from '../hooks/useSound';

interface BlindBoxProps {
  title: string;
  description: string;
  tags?: string[];
  color?: string;
  onReveal?: () => void;
}

export default function BlindBox({ title, description, tags, color = '#FFD1DC', onReveal }: BlindBoxProps) {
  const [revealed, setRevealed] = useState(false);
  const [shaking, setShaking] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!revealed) {
      setShaking(true);
    }
  };

  const handleMouseLeave = () => {
    setShaking(false);
  };

  const handleClick = () => {
    if (revealed) return;

    playSquishy();

    // Fire confetti from the box position
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 60,
        spread: 80,
        origin: { x, y },
        colors: ['#FFD1DC', '#B4E4FF', '#FFF9C4', '#E0BBE4', '#ffffff'],
        shapes: ['star', 'circle'],
        ticks: 100,
        scalar: 0.8,
      });
    }

    setTimeout(() => {
      playReveal();
      setRevealed(true);
      setShaking(false);
      onReveal?.();
    }, 200);
  };

  return (
    <div
      ref={boxRef}
      className={`relative w-full h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        shaking ? 'animate-wiggle' : ''
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: revealed
          ? 'rgba(255, 255, 255, 0.5)'
          : `linear-gradient(145deg, ${color}40, ${color}20)`,
        backdropFilter: 'blur(16px)',
        border: revealed ? '2px solid rgba(255,255,255,0.6)' : '2px solid rgba(255,255,255,0.4)',
        boxShadow: revealed
          ? '0 8px 24px rgba(0,0,0,0.08), inset 0 2px 8px rgba(255,255,255,0.6)'
          : 'inset 0 4px 12px rgba(255,255,255,0.5), 0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      {/* Glass glare */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none" />

      {!revealed ? (
        /* Blind Box (unrevealed) */
        <div className="flex flex-col items-center justify-center h-full p-4 relative">
          {/* Box icon */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 relative"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}80)`,
              boxShadow: `0 4px 16px ${color}40`,
            }}
          >
            <Gift className="w-8 h-8 text-white" />
            {shaking && (
              <>
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-ping" />
                <Sparkles className="absolute -bottom-1 -left-2 w-3 h-3 text-pink-300 animate-ping" style={{ animationDelay: '0.2s' }} />
              </>
            )}
          </div>
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase"
            style={{ fontFamily: "'VCR OSD Mono', monospace" }}
          >
            ? ? ?
          </p>
          <p className="text-xs text-gray-400 mt-1"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Click to unbox
          </p>
        </div>
      ) : (
        /* Revealed Content */
        <div className="flex flex-col h-full p-5 relative animate-fade-in">
          <h3 className="text-lg font-black text-gray-800 mb-2"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-600 flex-1"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {description}
          </p>
          {tags && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs font-bold border"
                  style={{
                    background: `${color}20`,
                    borderColor: `${color}40`,
                    color: '#888',
                    fontFamily: "'VCR OSD Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
