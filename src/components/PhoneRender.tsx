import React from 'react';

interface PhoneRenderProps {
  type: 's25' | 'iphone16' | 'xiaomi14t' | 'moto50' | 'pixel9' | 'honor6' | 'iphone13';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBack?: boolean;
}

export const PhoneRender: React.FC<PhoneRenderProps> = ({
  type,
  className = '',
  size = 'md',
  showBack = false,
}) => {
  const sizeMap = {
    sm: 'w-24 h-48',
    md: 'w-36 h-72',
    lg: 'w-48 h-96',
    xl: 'w-60 h-[28rem]',
  };

  const getPhoneConfig = () => {
    switch (type) {
      case 's25':
        return {
          frameColor: '#334155',
          bodyBg: 'from-slate-700 via-slate-800 to-slate-900',
          screenWallpaper: 'from-blue-600 via-indigo-700 to-slate-950',
          accent: '#60a5fa',
          brand: 'SAMSUNG',
          bezelRadius: 'rounded-[2.4rem]',
          islandType: 'punchhole',
        };
      case 'iphone16':
        return {
          frameColor: '#1e3a8a',
          bodyBg: 'from-blue-700 via-blue-900 to-slate-950',
          screenWallpaper: 'from-cyan-500 via-blue-600 to-indigo-950',
          accent: '#38bdf8',
          brand: 'Apple',
          bezelRadius: 'rounded-[2.6rem]',
          islandType: 'dynamicIsland',
        };
      case 'xiaomi14t':
        return {
          frameColor: '#0f172a',
          bodyBg: 'from-zinc-800 via-zinc-900 to-black',
          screenWallpaper: 'from-amber-600 via-orange-700 to-zinc-950',
          accent: '#f59e0b',
          brand: 'Xiaomi',
          bezelRadius: 'rounded-[2.2rem]',
          islandType: 'punchhole',
        };
      case 'moto50':
        return {
          frameColor: '#7c2d12',
          bodyBg: 'from-orange-700 via-amber-800 to-stone-900',
          screenWallpaper: 'from-orange-500 via-rose-600 to-stone-950',
          accent: '#fb923c',
          brand: 'motorola',
          bezelRadius: 'rounded-[2.5rem]',
          islandType: 'punchhole',
        };
      case 'pixel9':
        return {
          frameColor: '#475569',
          bodyBg: 'from-slate-200 via-slate-300 to-slate-400',
          screenWallpaper: 'from-emerald-500 via-teal-700 to-slate-950',
          accent: '#34d399',
          brand: 'Google',
          bezelRadius: 'rounded-[2.6rem]',
          islandType: 'punchhole',
        };
      case 'honor6':
        return {
          frameColor: '#064e3b',
          bodyBg: 'from-emerald-800 via-teal-900 to-slate-950',
          screenWallpaper: 'from-emerald-400 via-teal-600 to-emerald-950',
          accent: '#10b981',
          brand: 'HONOR',
          bezelRadius: 'rounded-[2.4rem]',
          islandType: 'pill',
        };
      case 'iphone13':
      default:
        return {
          frameColor: '#1e293b',
          bodyBg: 'from-slate-800 via-slate-900 to-black',
          screenWallpaper: 'from-blue-500 via-indigo-600 to-slate-900',
          accent: '#3b82f6',
          brand: 'Apple',
          bezelRadius: 'rounded-[2.4rem]',
          islandType: 'notch',
        };
    }
  };

  const config = getPhoneConfig();

  if (showBack) {
    // Render Back of Phone with authentic camera modules
    return (
      <div
        className={`relative ${sizeMap[size]} ${config.bezelRadius} p-1.5 shadow-2xl transition-transform duration-300 ${className}`}
        style={{
          backgroundColor: config.frameColor,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.3)',
        }}
      >
        <div
          className={`w-full h-full ${config.bezelRadius} bg-gradient-to-b ${config.bodyBg} p-4 relative overflow-hidden flex flex-col justify-between`}
        >
          {/* Metallic sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

          {/* Camera Module based on phone type */}
          {type === 's25' && (
            <div className="flex flex-col gap-2.5 p-1">
              {[1, 2, 3].map((cam) => (
                <div
                  key={cam}
                  className="w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-600 shadow-md flex items-center justify-center relative"
                >
                  <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-900/80 shadow-inner" />
                  </div>
                </div>
              ))}
              <div className="w-2 h-2 rounded-full bg-amber-100 ml-3 shadow-[0_0_8px_#fde68a]" />
            </div>
          )}

          {type === 'iphone16' && (
            <div className="w-12 h-24 rounded-full bg-blue-950/80 border border-blue-500/30 p-2 flex flex-col justify-between shadow-lg">
              <div className="w-7 h-7 rounded-full bg-black border border-slate-700 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-950" />
              </div>
              <div className="w-7 h-7 rounded-full bg-black border border-slate-700 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-950" />
              </div>
            </div>
          )}

          {type === 'xiaomi14t' && (
            <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-700 p-1.5 grid grid-cols-2 gap-1 shadow-lg">
              {[1, 2, 3, 4].map((c) => (
                <div key={c} className="rounded-full bg-zinc-900 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-zinc-950 border border-zinc-800" />
                </div>
              ))}
            </div>
          )}

          {type === 'pixel9' && (
            <div className="w-full -mx-4 h-9 bg-slate-700/80 rounded-full px-3 flex items-center justify-between border-y border-slate-500 shadow-md">
              <div className="flex items-center gap-2 bg-black px-2 py-1 rounded-full">
                <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700" />
                <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
            </div>
          )}

          {type === 'iphone13' && (
            <div className="w-14 h-14 rounded-2xl bg-slate-950/70 border border-slate-700 p-2 relative shadow-md">
              <div className="w-5 h-5 rounded-full bg-black border border-slate-600 absolute top-1.5 left-1.5" />
              <div className="w-5 h-5 rounded-full bg-black border border-slate-600 absolute bottom-1.5 right-1.5" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-100 absolute top-2 right-2.5" />
            </div>
          )}

          {/* Brand Wordmark subtle */}
          <div className="text-center font-bold tracking-widest text-[10px] text-white/30 uppercase mt-auto">
            {config.brand}
          </div>
        </div>
      </div>
    );
  }

  // Render Front of Phone (Screen view)
  return (
    <div
      className={`relative ${sizeMap[size]} ${config.bezelRadius} p-1.5 shadow-2xl transition-transform duration-300 ${className}`}
      style={{
        backgroundColor: config.frameColor,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)',
      }}
    >
      {/* Outer bezel */}
      <div
        className={`w-full h-full ${config.bezelRadius} bg-black p-1 relative overflow-hidden flex flex-col`}
      >
        {/* Screen Display */}
        <div
          className={`w-full h-full rounded-[1.8rem] bg-gradient-to-br ${config.screenWallpaper} relative overflow-hidden flex flex-col justify-between p-3 select-none text-white`}
        >
          {/* Dynamic Island / Notch / Punchhole */}
          <div className="relative w-full flex justify-center items-center z-10">
            {config.islandType === 'dynamicIsland' && (
              <div className="w-16 h-4 bg-black rounded-full flex items-center justify-between px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/90" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
              </div>
            )}
            {config.islandType === 'punchhole' && (
              <div className="w-2.5 h-2.5 bg-black rounded-full border border-slate-800" />
            )}
            {config.islandType === 'notch' && (
              <div className="w-14 h-3 bg-black rounded-b-xl flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </div>
            )}
            {config.islandType === 'pill' && (
              <div className="w-10 h-3 bg-black rounded-full" />
            )}
          </div>

          {/* Status bar & Clock */}
          <div className="text-center my-auto py-2">
            <div className="text-2xl font-bold tracking-tight text-white drop-shadow">
              12:30
            </div>
            <div className="text-[10px] text-white/80 font-medium tracking-wide">
              {config.brand}
            </div>

            {/* Glowing brand or abstract wallpaper artwork */}
            <div className="w-16 h-16 mx-auto my-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
              <div
                className="w-10 h-10 rounded-full blur-sm opacity-80"
                style={{ backgroundColor: config.accent }}
              />
            </div>
          </div>

          {/* Home indicator bar */}
          <div className="w-14 h-1 bg-white/70 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
};
