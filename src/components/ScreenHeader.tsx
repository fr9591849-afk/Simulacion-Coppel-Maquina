import React from 'react';
import { CoppelKeyLogo } from './CoppelKeyLogo';
import { HelpCircle, RefreshCw, Volume2, VolumeX, Type } from 'lucide-react';
import { ScreenId } from '../types';
import { audio } from '../utils/audio';

interface ScreenHeaderProps {
  currentScreen: ScreenId;
  onGoToScreen: (screen: ScreenId) => void;
  onOpenHelp: () => void;
  onReset: () => void;
  isHighContrast: boolean;
  onToggleContrast: () => void;
  isLargeText: boolean;
  onToggleLargeText: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  currentScreen,
  onGoToScreen,
  onOpenHelp,
  onReset,
  isLargeText,
  onToggleLargeText,
}) => {
  const steps: { id: ScreenId; label: string; short: string }[] = [
    { id: 1, label: 'Bienvenida', short: 'Inicio' },
    { id: 2, label: 'Conexión', short: 'Conectar' },
    { id: 3, label: 'Diagnóstico', short: 'Prueba' },
    { id: 4, label: 'Valuación', short: 'Valor' },
    { id: 5, label: 'Elegir equipo', short: 'Catálogo' },
    { id: 6, label: 'Detalle', short: 'Confirmar' },
    { id: 7, label: 'Diferencia', short: 'Resumen' },
    { id: 8, label: 'Pago', short: 'Pago' },
    { id: 9, label: 'Entrega', short: 'Entrega' },
  ];

  const [soundMuted, setSoundMuted] = React.useState(audio.isSoundMuted);

  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMuted(next);
    audio.isSoundMuted = next;
    if (!next) {
      audio.playClick();
    }
  };

  return (
    <header className="w-full bg-[#004F9F] text-white shadow-md border-b-4 border-yellow-400 select-none z-30 shrink-0">
      {/* Upper Status & Brand Bar */}
      <div className="px-4 py-2.5 md:px-6 md:py-3 flex items-center justify-between gap-4">
        {/* Left: Brand Lockup & Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onGoToScreen(1)}
            className="flex items-center gap-2 text-left hover:opacity-95 transition-opacity"
            title="Ir al inicio"
          >
            <CoppelKeyLogo size="sm" variant="yellow-on-blue" />
            <div className="hidden sm:block border-l border-blue-300/40 pl-3">
              <h1 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-yellow-300">
                Centro de Intercambio Digital Coppel
              </h1>
              <span className="text-[10px] text-blue-100 font-medium block">
                Kiosco Inteligente de Autoservicio · Tienda Coppel
              </span>
            </div>
          </button>
        </div>

        {/* Center: Voice guidance badge indicator (subtle) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-400/30 text-xs text-blue-100">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sistema interactivo con asistencia de voz</span>
        </div>

        {/* Right: Functional Accessibility & Help Controls */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Large text toggle */}
          <button
            type="button"
            onClick={onToggleLargeText}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 border ${
              isLargeText
                ? 'bg-yellow-400 text-slate-950 border-yellow-400 shadow-sm'
                : 'bg-blue-800/80 hover:bg-blue-700/80 text-white border-blue-400/30'
            }`}
            title="Aumentar tamaño de texto para fácil lectura"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Texto {isLargeText ? 'Grande' : 'Normal'}</span>
          </button>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-1.5 md:px-2.5 md:py-1.5 rounded-lg bg-blue-800/80 hover:bg-blue-700/80 border border-blue-400/30 text-xs font-medium transition-colors flex items-center gap-1"
            title={soundMuted ? 'Activar efectos de sonido' : 'Silenciar sonido'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-red-300" /> : <Volume2 className="w-4 h-4 text-yellow-300" />}
            <span className="hidden sm:inline">{soundMuted ? 'Silencio' : 'Audio'}</span>
          </button>

          {/* Help button */}
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              onOpenHelp();
            }}
            className="px-2.5 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 font-bold text-xs transition-transform flex items-center gap-1 shadow-sm"
          >
            <HelpCircle className="w-4 h-4 text-slate-950" />
            <span>Ayuda</span>
          </button>

          {/* Restart button */}
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              onReset();
            }}
            className="p-1.5 md:px-2.5 md:py-1.5 rounded-lg bg-blue-800/80 hover:bg-blue-700/80 border border-blue-400/30 text-xs font-medium transition-colors text-blue-200 hover:text-white"
            title="Reiniciar proceso"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Lower Step Journey Breadcrumbs */}
      <div className="bg-[#003D82] px-3 py-1.5 overflow-x-auto scrollbar-none border-t border-blue-600/40">
        <div className="flex items-center justify-between min-w-max md:min-w-0 max-w-5xl mx-auto gap-1">
          {steps.map((step, idx) => {
            const isActive = currentScreen === step.id;
            const isCompleted = currentScreen > step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => {
                    audio.playClick();
                    onGoToScreen(step.id);
                  }}
                  className={`flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-yellow-400 text-slate-950 shadow-sm scale-105'
                      : isCompleted
                      ? 'text-blue-100 hover:text-white hover:bg-blue-700/60'
                      : 'text-blue-300/60 hover:text-blue-200'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? 'bg-slate-950 text-yellow-300'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-blue-900 text-blue-300'
                    }`}
                  >
                    {isCompleted ? '✓' : step.id}
                  </span>
                  <span className="whitespace-nowrap">{step.short}</span>
                </button>
                {idx < steps.length - 1 && (
                  <span className="text-blue-400/40 text-[10px]" aria-hidden="true">
                    ›
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
};
