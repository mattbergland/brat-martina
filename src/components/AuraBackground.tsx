import { useEffect, useRef } from 'react';

export default function AuraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const shapes = container.querySelectorAll<HTMLElement>('.float-shape');
      shapes.forEach((shape) => {
        const speed = parseFloat(shape.dataset.speed || '1');
        const rect = shape.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) * 0.02 * speed;
        const dy = (e.clientY - rect.top - rect.height / 2) * 0.02 * speed;
        shape.style.transform = `translate(${-dx}px, ${-dy}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aura gradient blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] bg-pink-200 rounded-full mix-blend-multiply filter blur-[120px] animate-aura-drift opacity-30" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] bg-blue-200 rounded-full mix-blend-multiply filter blur-[140px] animate-aura-drift-reverse opacity-25" />
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-yellow-100 rounded-full mix-blend-multiply filter blur-[100px] animate-aura-pulse opacity-20" />

      {/* Floating Y2K shapes */}
      {[
        { top: '8%', left: '15%', size: 40, color: '#FFD1DC', shape: 'star', speed: 0.8, delay: 0 },
        { top: '20%', left: '75%', size: 30, color: '#B4E4FF', shape: 'star', speed: 1.2, delay: 1 },
        { top: '60%', left: '10%', size: 50, color: '#FFF9C4', shape: 'blob', speed: 0.6, delay: 2 },
        { top: '75%', left: '80%', size: 35, color: '#FFD1DC', shape: 'star', speed: 1.0, delay: 3 },
        { top: '40%', left: '55%', size: 25, color: '#E0BBE4', shape: 'star', speed: 1.4, delay: 0.5 },
        { top: '85%', left: '40%', size: 45, color: '#B4E4FF', shape: 'blob', speed: 0.7, delay: 1.5 },
        { top: '15%', left: '50%', size: 20, color: '#FFD1DC', shape: 'star', speed: 1.1, delay: 2.5 },
        { top: '50%', left: '30%', size: 30, color: '#FFF9C4', shape: 'blob', speed: 0.9, delay: 3.5 },
      ].map((item, i) => (
        <div
          key={i}
          className="float-shape absolute animate-float-slow transition-transform duration-1000 ease-out"
          data-speed={item.speed}
          style={{
            top: item.top,
            left: item.left,
            animationDelay: `${item.delay}s`,
            animationDuration: `${6 + i * 0.5}s`,
          }}
        >
          {item.shape === 'star' ? (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill={item.color} opacity="0.5">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41Z" />
            </svg>
          ) : (
            <div
              style={{
                width: item.size,
                height: item.size * 0.8,
                backgroundColor: item.color,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                opacity: 0.4,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
