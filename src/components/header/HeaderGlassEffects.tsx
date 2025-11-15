'use client';

interface HeaderGlassEffectsProps {
  waveOffset: number;
  liquidDistortion: number;
}

export default function HeaderGlassEffects({
  waveOffset,
  liquidDistortion,
}: HeaderGlassEffectsProps) {
  return (
    <>
      {/* Liquid Glass Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>

      {/* Wave Effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
          backgroundSize: '200% 200%',
          animation: `wave 3s ease-in-out infinite, waveMove ${5 + Math.abs(liquidDistortion) * 0.001}s linear infinite`,
        }}
      ></div>

      {/* Water Droplet Effect */}
      <div
        className="absolute top-0 left-1/4 h-2 w-2 rounded-full bg-white/40 blur-sm"
        style={{
          animation: `droplet 4s ease-in-out infinite ${Math.abs(liquidDistortion) * 0.1}s`,
        }}
      ></div>
      <div
        className="absolute top-2 right-1/3 h-1 w-1 rounded-full bg-white/30 blur-sm"
        style={{
          animation: `droplet 3s ease-in-out infinite ${Math.abs(liquidDistortion) * 0.15}s`,
        }}
      ></div>

      {/* Glossy Edges */}
      <div
        className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{
          transform: `translateX(${waveOffset}px)`,
          filter: `blur(${0.5 + Math.abs(liquidDistortion) * 0.1}px)`,
        }}
      ></div>
      <div
        className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style={{
          transform: `translateX(${-waveOffset * 0.5}px)`,
          filter: `blur(${0.3 + Math.abs(liquidDistortion) * 0.05}px)`,
        }}
      ></div>

      <div
        className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent"
        style={{
          transform: `translateY(${waveOffset * 0.3}px)`,
          filter: `blur(${0.5 + Math.abs(liquidDistortion) * 0.1}px)`,
        }}
      ></div>
      <div
        className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent"
        style={{
          transform: `translateY(${-waveOffset * 0.2}px)`,
          filter: `blur(${0.3 + Math.abs(liquidDistortion) * 0.05}px)`,
        }}
      ></div>

      <div
        className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent"
        style={{
          transform: `translateY(${-waveOffset * 0.3}px)`,
          filter: `blur(${0.5 + Math.abs(liquidDistortion) * 0.1}px)`,
        }}
      ></div>
      <div
        className="absolute top-0 right-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent"
        style={{
          transform: `translateY(${waveOffset * 0.2}px)`,
          filter: `blur(${0.3 + Math.abs(liquidDistortion) * 0.05}px)`,
        }}
      ></div>

      <div
        className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{
          transform: `translateX(${-waveOffset * 0.7}px)`,
          filter: `blur(${0.5 + Math.abs(liquidDistortion) * 0.1}px)`,
        }}
      ></div>
      <div
        className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style={{
          transform: `translateX(${waveOffset * 0.3}px)`,
          filter: `blur(${0.3 + Math.abs(liquidDistortion) * 0.05}px)`,
        }}
      ></div>

      {/* Inner Glow with Liquid Motion */}
      <div
        className="absolute inset-1 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5"
        style={{
          transform: `rotate(${liquidDistortion * 0.5}deg)`,
          filter: `blur(${1 + Math.abs(liquidDistortion) * 0.2}px)`,
        }}
      ></div>
    </>
  );
}
