import { useState } from 'react';
import { Sparkles, Star, Instagram, Mail, Heart, Music, Cat, MapPin } from 'lucide-react';
import BlindBox from './BlindBox';
import { playSquishy } from '../hooks/useSound';

interface BladeContentProps {
  bladeId: string;
  isActive: boolean;
  focusedTile: number;
  setFocusedTile: (id: number) => void;
  triggerAchievement: (msg: string) => void;
}

/* ─── HOME BLADE ─── */
function HomeBlade({ focusedTile, setFocusedTile }: {
  focusedTile: number;
  setFocusedTile: (id: number) => void;
}) {
  const tiles = [
    { id: 100, colSpan: 'col-span-2', rowSpan: 'row-span-2', content: (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Sparkles className="w-10 h-10 text-pink-300 mb-3" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Welcome to Martina's World
        </h2>
        <p className="text-sm text-gray-500 max-w-xs" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          influencer strategist by day, collector of cute things always
        </p>
      </div>
    )},
    { id: 101, colSpan: 'col-span-1', rowSpan: 'row-span-1', content: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <Cat className="w-8 h-8 text-pink-300 mb-2" />
        <p className="text-sm font-bold text-gray-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>Manu</p>
        <p className="text-xs text-gray-400" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>Cat Friend</p>
      </div>
    )},
    { id: 102, colSpan: 'col-span-1', rowSpan: 'row-span-1', content: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <MapPin className="w-8 h-8 text-blue-300 mb-2" />
        <p className="text-sm font-bold text-gray-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>San Francisco</p>
        <p className="text-xs text-gray-400" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>Home Base</p>
      </div>
    )},
    { id: 103, colSpan: 'col-span-2', rowSpan: 'row-span-1', content: (
      <div className="flex items-center justify-center h-full p-4 gap-4">
        <Music className="w-6 h-6 text-pink-300" />
        <div className="overflow-hidden flex-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>Now Playing</p>
          <p className="text-sm font-bold text-gray-700 whitespace-nowrap animate-marquee" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            vibes on repeat &middot; collecting memories &middot; living the dream
          </p>
        </div>
      </div>
    )},
    { id: 104, colSpan: 'col-span-1', rowSpan: 'row-span-1', content: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <Heart className="w-8 h-8 text-pink-400 mb-2" fill="#FFD1DC" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>Argentina</p>
      </div>
    )},
    { id: 105, colSpan: 'col-span-1', rowSpan: 'row-span-1', content: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <Star className="w-8 h-8 text-yellow-300 mb-2" fill="#FFF9C4" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>Ultra Rare</p>
      </div>
    )},
  ];

  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full">
      {tiles.map((tile) => {
        const isFocused = focusedTile === tile.id;
        return (
          <div
            key={tile.id}
            onMouseEnter={() => { setFocusedTile(tile.id); playSquishy(); }}
            className={`${tile.colSpan} ${tile.rowSpan} rounded-2xl relative overflow-hidden transition-all duration-300 ease-out cursor-pointer
              ${isFocused ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'}
            `}
            style={{
              background: isFocused ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(16px)',
              border: isFocused ? '2px solid #FFD1DC' : '2px solid rgba(255,255,255,0.4)',
              boxShadow: isFocused
                ? '0 0 30px rgba(255,209,220,0.5), inset 0 2px 8px rgba(255,255,255,0.6)'
                : 'inset 0 2px 8px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            {/* Glass glare */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-2xl" />
            {tile.content}
            {isFocused && (
              <div className="absolute inset-0 border-2 border-pink-300/50 rounded-2xl pointer-events-none animate-pulse" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── PORTFOLIO BLADE ─── */
function PortfolioBlade({ triggerAchievement }: { triggerAchievement: (msg: string) => void }) {
  const projects = [
    { title: 'Brand Campaign', description: 'Led influencer strategy for a major lifestyle brand launch across social platforms.', tags: ['Strategy', 'Social', 'Influencer'], color: '#FFD1DC' },
    { title: 'Content Series', description: 'Created a viral content series reaching 2M+ impressions in the first week.', tags: ['Content', 'Viral', 'Creative'], color: '#B4E4FF' },
    { title: 'Community Build', description: 'Built and managed an engaged community of 50K+ followers from scratch.', tags: ['Community', 'Growth', 'Engagement'], color: '#FFF9C4' },
    { title: 'Product Launch', description: 'Coordinated a multi-platform product launch with 15+ creator partnerships.', tags: ['Launch', 'Partnerships', 'Multi-Platform'], color: '#E0BBE4' },
    { title: 'Analytics Dashboard', description: 'Designed reporting frameworks to track campaign performance and ROI.', tags: ['Analytics', 'Data', 'ROI'], color: '#FFD1DC' },
    { title: 'Event Activation', description: 'Planned and executed a pop-up activation event with 500+ attendees.', tags: ['Events', 'IRL', 'Activation'], color: '#B4E4FF' },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
      {projects.map((project, i) => (
        <div key={i} className="min-h-0">
          <BlindBox
            title={project.title}
            description={project.description}
            tags={project.tags}
            color={project.color}
            onReveal={() => triggerAchievement(`Discovered: ${project.title}`)}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── ABOUT BLADE ─── */
function AboutBlade({ focusedTile, setFocusedTile }: {
  focusedTile: number;
  setFocusedTile: (id: number) => void;
}) {
  const tiles = [
    { id: 200, colSpan: 'col-span-2', rowSpan: 'row-span-2', content: (
      <div className="flex flex-col justify-center h-full p-6">
        <h2 className="text-2xl font-black text-gray-800 mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Martina Barrera-Hernandez
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Influencer strategist, creative director, and professional collector of cute things. 
          Based in San Francisco, originally from Argentina. When not crafting campaigns, 
          you'll find her unboxing Sonny Angels, cuddling Jellycats, or rearranging her 
          Calico Critters village.
        </p>
      </div>
    )},
    { id: 201, colSpan: 'col-span-1', rowSpan: 'row-span-1', content: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-3xl font-black text-pink-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>9,451+</p>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>Followers</p>
      </div>
    )},
    { id: 202, colSpan: 'col-span-1', rowSpan: 'row-span-1', content: (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-3xl font-black text-blue-300" style={{ fontFamily: "'Quicksand', sans-serif" }}>50+</p>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>Campaigns</p>
      </div>
    )},
    { id: 203, colSpan: 'col-span-2', rowSpan: 'row-span-1', content: (
      <div className="flex flex-col justify-center h-full p-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>Favorite Things</p>
        <div className="flex flex-wrap gap-2">
          {['Sonny Angels', 'Jellycats', 'Calico Critters', 'Blind Boxes', 'Chicken Joints', 'Love Notes'].map((thing) => (
            <span key={thing} className="px-3 py-1 rounded-full text-xs font-bold border border-pink-200/50"
              style={{ background: 'rgba(255,209,220,0.15)', color: '#999', fontFamily: "'Quicksand', sans-serif" }}
            >
              {thing}
            </span>
          ))}
        </div>
      </div>
    )},
    { id: 204, colSpan: 'col-span-2', rowSpan: 'row-span-1', content: (
      <div className="flex flex-col justify-center h-full p-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>Skills</p>
        <div className="space-y-2">
          {[
            { label: 'Influencer Strategy', pct: '95%' },
            { label: 'Content Creation', pct: '90%' },
            { label: 'Community Management', pct: '88%' },
            { label: 'Campaign Analytics', pct: '85%' },
          ].map((skill) => (
            <div key={skill.label}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-gray-500 font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{skill.label}</span>
                <span className="text-gray-400" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>{skill.pct}</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.4)' }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{
                  width: skill.pct,
                  background: 'linear-gradient(90deg, #FFD1DC, #B4E4FF)',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )},
  ];

  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full">
      {tiles.map((tile) => {
        const isFocused = focusedTile === tile.id;
        return (
          <div
            key={tile.id}
            onMouseEnter={() => { setFocusedTile(tile.id); playSquishy(); }}
            className={`${tile.colSpan} ${tile.rowSpan} rounded-2xl relative overflow-hidden transition-all duration-300 ease-out cursor-pointer
              ${isFocused ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'}
            `}
            style={{
              background: isFocused ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(16px)',
              border: isFocused ? '2px solid #B4E4FF' : '2px solid rgba(255,255,255,0.4)',
              boxShadow: isFocused
                ? '0 0 30px rgba(180,228,255,0.5), inset 0 2px 8px rgba(255,255,255,0.6)'
                : 'inset 0 2px 8px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-2xl" />
            {tile.content}
            {isFocused && (
              <div className="absolute inset-0 border-2 border-blue-200/50 rounded-2xl pointer-events-none animate-pulse" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── GUESTBOOK BLADE ─── */
function GuestbookBlade({ triggerAchievement }: { triggerAchievement: (msg: string) => void }) {
  const [entries, setEntries] = useState([
    { name: 'visitor_001', message: 'ur site is so cute omg', time: '2 hours ago' },
    { name: 'sonny_fan', message: 'fellow collector!! love this', time: '5 hours ago' },
    { name: 'sf_girlie', message: 'martina ur amazing ily', time: '1 day ago' },
  ]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) return;
    playSquishy();
    setEntries([{ name, message, time: 'just now' }, ...entries]);
    setName('');
    setMessage('');
    triggerAchievement('Signed the Guestbook!');
  };

  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-4 h-full">
      {/* Form */}
      <div className="col-span-1 rounded-2xl p-5 flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(16px)',
          border: '2px solid rgba(255,255,255,0.5)',
          boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.4)',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />
        <h3 className="text-lg font-black text-gray-800 mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          <Mail className="w-5 h-5 inline-block mr-2 text-pink-400" />
          Sign the Guestbook
        </h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your name"
          className="w-full px-4 py-2.5 rounded-xl mb-3 text-sm font-bold text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-pink-300"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.5)',
            fontFamily: "'Quicksand', sans-serif",
          }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="leave a message..."
          rows={4}
          className="w-full px-4 py-2.5 rounded-xl mb-4 text-sm font-bold text-gray-700 outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-pink-300 flex-1"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.5)',
            fontFamily: "'Quicksand', sans-serif",
          }}
        />
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-black text-sm tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #FFD1DC, #FFF9C4)',
            color: '#e8729a',
            fontFamily: "'Quicksand', sans-serif",
            boxShadow: '0 4px 16px rgba(255,209,220,0.3), inset 0 2px 6px rgba(255,255,255,0.6)',
          }}
        >
          Send
        </button>
      </div>

      {/* Entries */}
      <div className="col-span-2 rounded-2xl p-5 overflow-y-auto"
        style={{
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(16px)',
          border: '2px solid rgba(255,255,255,0.4)',
          boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.4)',
        }}
      >
        <div className="space-y-3">
          {entries.map((entry, i) => (
            <div
              key={i}
              className="p-4 rounded-xl transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.4)',
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-black text-gray-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  {entry.name}
                </p>
                <p className="text-xs text-gray-400" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>
                  {entry.time}
                </p>
              </div>
              <p className="text-sm text-gray-600" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                {entry.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SOCIAL BLADE ─── */
function SocialBlade({ focusedTile, setFocusedTile }: {
  focusedTile: number;
  setFocusedTile: (id: number) => void;
}) {
  const links = [
    { id: 300, label: 'Instagram', handle: '@first_fig', url: 'https://instagram.com/first_fig', icon: <Instagram className="w-8 h-8" />, color: '#FFD1DC' },
    { id: 301, label: 'Email', handle: 'Get in touch', url: 'mailto:hello@martina.bh', icon: <Mail className="w-8 h-8" />, color: '#B4E4FF' },
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-4 h-full">
      {links.map((link) => {
        const isFocused = focusedTile === link.id;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => { setFocusedTile(link.id); playSquishy(); }}
            className={`rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 ease-out cursor-pointer
              ${isFocused ? 'scale-[1.02] z-10' : 'hover:scale-[1.01]'}
            `}
            style={{
              background: isFocused ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(16px)',
              border: isFocused ? `2px solid ${link.color}` : '2px solid rgba(255,255,255,0.4)',
              boxShadow: isFocused
                ? `0 0 30px ${link.color}60, inset 0 2px 8px rgba(255,255,255,0.6)`
                : 'inset 0 2px 8px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-2xl" />
            <div className="mb-3" style={{ color: link.color }}>{link.icon}</div>
            <p className="text-lg font-black text-gray-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>{link.label}</p>
            <p className="text-sm text-gray-500" style={{ fontFamily: "'VCR OSD Mono', monospace" }}>{link.handle}</p>
          </a>
        );
      })}
    </div>
  );
}

/* ─── EXPORT ─── */
export default function BladeContent({ bladeId, isActive, focusedTile, setFocusedTile, triggerAchievement }: BladeContentProps) {
  if (!isActive) return null;

  switch (bladeId) {
    case 'home':
      return <HomeBlade focusedTile={focusedTile} setFocusedTile={setFocusedTile} />;
    case 'portfolio':
      return <PortfolioBlade triggerAchievement={triggerAchievement} />;
    case 'about':
      return <AboutBlade focusedTile={focusedTile} setFocusedTile={setFocusedTile} />;
    case 'guestbook':
      return <GuestbookBlade triggerAchievement={triggerAchievement} />;
    case 'social':
      return <SocialBlade focusedTile={focusedTile} setFocusedTile={setFocusedTile} />;
    default:
      return null;
  }
}
