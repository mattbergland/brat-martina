import { Heart, Sparkles, Medal, User } from 'lucide-react';

interface GamerCardProps {
  currentBlade: string;
}

export default function GamerCard({ currentBlade }: GamerCardProps) {
  return (
    <aside className="absolute right-6 md:right-10 top-24 bottom-8 w-72 md:w-80 rounded-3xl border-2 border-white/70 flex flex-col p-5 z-40 overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.35)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 20px 50px rgba(180, 228, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      }}
    >
      {/* Jelly highlight top */}
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-white/50 to-transparent pointer-events-none rounded-t-3xl" />

      {/* Avatar Section */}
      <div className="relative w-full aspect-square rounded-2xl flex items-center justify-center border-4 border-white mb-5 overflow-hidden group cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #FFD1DC, #B4E4FF)',
          boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <User className="w-20 h-20 text-white/80 group-hover:scale-110 transition-transform duration-300" />
        {/* Sonny Angel Hat Badge */}
        <div className="absolute -top-1 right-3 px-3 py-1 rounded-full text-xs font-black text-pink-500 shadow-md"
          style={{
            background: '#FFF9C4',
            transform: 'rotate(12deg)',
            fontFamily: "'Quicksand', sans-serif",
          }}
        >
          Sonny Angel Fit
        </div>
        {/* Glare */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-2 mb-4 relative z-10">
        <h2 className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-2"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          MARTINA_OS
          <Sparkles className="w-4 h-4 text-pink-400" />
        </h2>
        <div className="flex items-center gap-2 py-2 px-3 rounded-xl border border-white/50"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <Medal className="w-4 h-4 text-blue-300" />
          <span className="text-xs font-bold text-gray-600"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Collector Status: Master
          </span>
        </div>
      </div>

      {/* Current World */}
      <div className="mb-4 relative z-10">
        <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest"
          style={{ fontFamily: "'VCR OSD Mono', monospace" }}
        >
          Current World
        </p>
        <p className="text-sm font-bold text-pink-400"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {currentBlade}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-4 relative z-10">
        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest"
          style={{ fontFamily: "'VCR OSD Mono', monospace" }}
        >
          Status
        </p>
        <div className="space-y-1">
          {[
            { label: 'Creativity', width: '95%' },
            { label: 'Vibes', width: '100%' },
            { label: 'Sparkle', width: '88%' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-gray-500 font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{stat.label}</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.4)' }}>
                <div className="h-full rounded-full" style={{
                  width: stat.width,
                  background: 'linear-gradient(90deg, #FFD1DC, #B4E4FF)',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zelda-style Health Bar */}
      <div className="mt-auto relative z-10">
        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest"
          style={{ fontFamily: "'VCR OSD Mono', monospace" }}
        >
          Social Energy
        </p>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((heart) => (
            <Heart
              key={heart}
              className="w-7 h-7 text-pink-400 drop-shadow-sm animate-pulse"
              fill="#FFD1DC"
              style={{ animationDelay: `${heart * 150}ms`, animationDuration: '2s' }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
