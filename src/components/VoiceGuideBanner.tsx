import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { audio } from '../utils/audio';

interface VoiceGuideBannerProps {
  quote: string;
  autoSpeak?: boolean;
  className?: string;
  variant?: 'prominent' | 'subtle';
}

export const VoiceGuideBanner: React.FC<VoiceGuideBannerProps> = ({
  quote,
  autoSpeak = true,
  className = '',
  variant = 'prominent',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(audio.isVoiceMuted);

  const handleSpeak = () => {
    setIsPlaying(true);
    audio.speak(quote, () => {
      setIsPlaying(false);
    });
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isMuted;
    setIsMuted(nextState);
    audio.isVoiceMuted = nextState;
    if (nextState) {
      audio.stopSpeaking();
      setIsPlaying(false);
    } else {
      handleSpeak();
    }
  };

  useEffect(() => {
    if (autoSpeak && !isMuted) {
      // Slight delay to allow screen render and avoid jarring immediate audio
      const timer = setTimeout(() => {
        handleSpeak();
      }, 350);
      return () => {
        clearTimeout(timer);
        audio.stopSpeaking();
      };
    }
    return () => {
      audio.stopSpeaking();
    };
  }, [quote]);

  if (variant === 'subtle') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-900 text-xs font-medium shadow-xs ${className}`}
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
        </span>
        <Volume2 className="w-3.5 h-3.5 text-blue-700" />
        <span>Guía por voz activa</span>
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-gradient-to-r from-blue-950 via-[#003875] to-blue-950 border border-blue-400/30 rounded-2xl p-3.5 md:p-4 text-white shadow-lg relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Background ambient pulse */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          {/* Animated sound wave bars container */}
          <button
            type="button"
            onClick={handleSpeak}
            title="Escuchar indicación por voz"
            className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 flex items-center justify-center shrink-0 shadow-md transition-transform"
          >
            {isPlaying ? (
              <div className="flex items-center gap-0.5 h-5 px-1">
                <span className="w-1 bg-slate-950 rounded-full animate-bounce [animation-delay:-0.3s] h-4" />
                <span className="w-1 bg-slate-950 rounded-full animate-bounce [animation-delay:-0.15s] h-5" />
                <span className="w-1 bg-slate-950 rounded-full animate-bounce [animation-delay:-0.45s] h-3" />
                <span className="w-1 bg-slate-950 rounded-full animate-bounce h-5" />
              </div>
            ) : (
              <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>

          {/* Voice text dialogue */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-300 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                Asistente de Voz Coppel
              </span>
              {isPlaying && (
                <span className="text-[10px] text-blue-200 bg-blue-800/80 px-2 py-0.2 rounded-full font-medium">
                  Hablando…
                </span>
              )}
            </div>
            <p className="text-sm md:text-base font-semibold text-white/95 leading-snug tracking-tight">
              "{quote}"
            </p>
          </div>
        </div>

        {/* Audio controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleSpeak}
            title="Repetir audio"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 transition-colors flex items-center gap-1 text-xs font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Repetir</span>
          </button>
          <button
            type="button"
            onClick={toggleMute}
            title={isMuted ? 'Activar voz' : 'Silenciar voz'}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-300" />
            ) : (
              <Volume2 className="w-4 h-4 text-yellow-300" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
