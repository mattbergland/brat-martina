import { useEffect, useState, useRef } from 'react';
import { Trophy } from 'lucide-react';
import { playAchievement } from '../hooks/useSound';

interface AchievementPopupProps {
  message: string;
  onDismiss: () => void;
}

export default function AchievementPopup({ message, onDismiss }: AchievementPopupProps) {
  const [visible, setVisible] = useState(false);
  const innerTimerRef = useRef<number>();
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    // Slide in
    requestAnimationFrame(() => setVisible(true));
    playAchievement();

    // Auto dismiss after 3s
    const timer = setTimeout(() => {
      setVisible(false);
      innerTimerRef.current = window.setTimeout(() => onDismissRef.current(), 500);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(innerTimerRef.current);
    };
  }, [message]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 z-[90] transition-all duration-500 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transform: `translateX(-50%) translateY(${visible ? '0' : '80px'})` }}
    >
      <div
        className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 border-white/60"
        style={{
          background: 'linear-gradient(135deg, rgba(255,209,220,0.95), rgba(255,249,196,0.95))',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(255, 209, 220, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.8)',
        }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FFD1DC, #B4E4FF)' }}
        >
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase text-pink-400"
            style={{ fontFamily: "'VCR OSD Mono', monospace" }}
          >
            Achievement Unlocked
          </p>
          <p
            className="text-sm font-bold text-gray-700"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
