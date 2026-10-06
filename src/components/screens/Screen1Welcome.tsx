import React from 'react';
import { ArrowRight, HelpCircle, Mic, Sparkles, Smartphone, ShieldCheck, Repeat, Volume2 } from 'lucide-react';
import { CoppelKeyLogo } from '../CoppelKeyLogo';
import { audio } from '../../utils/audio';

interface Screen1WelcomeProps {
  onStart: () => void;
  onOpenHowItWorks: () => void;
  isLargeText?: boolean;
}

export const Screen1Welcome: React.FC<Screen1WelcomeProps> = ({
  onStart,
  onOpenHowItWorks,
  isLargeText = false,
}) => {
  return (
    <div className="flex-1 w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 max-w-5xl mx-auto relative select-none">
      {/* Top Banner / Machine Title */}
      <div className="text-center pt-2 md:pt-4">
        {/* Machine header badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-900/10 border border-blue-600/20 text-[#004F9F] mb-4">
          <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-400" />
          <span className="text-xs md:text-sm font-bold tracking-wide uppercase">
            Autoservicio Inteligente Coppel
          </span>
        </div>

        {/* Authentic Coppel Key & Big Display Title */}
        <div className="flex justify-center mb-3">
          <CoppelKeyLogo size="xl" variant="dark" />
        </div>

        <h1
          className={`font-black text-slate-950 uppercase tracking-tight ${
            isLargeText ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-2xl md:text-4xl lg:text-5xl'
          } leading-tight max-w-3xl mx-auto drop-shadow-xs`}
        >
          CENTRO DE INTERCAMBIO <span className="text-[#004F9F]">DIGITAL</span> COPPEL
        </h1>

        <p
          className={`text-slate-600 font-medium mt-3 max-w-2xl mx-auto ${
            isLargeText ? 'text-lg md:text-xl' : 'text-base md:text-lg'
          }`}
        >
          Entrega tu teléfono actual, recibe su valor garantizado al instante y estrena el smartphone que siempre quisiste hoy mismo.
        </p>

        {/* Subtle Voice / Microphone Indicator */}
        <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200/80 shadow-xs text-amber-950">
          <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
            <Mic className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>Guía interactiva por voz activada</span>
              <Volume2 className="w-3.5 h-3.5 text-blue-700" />
            </div>
            <p className="text-[11px] text-slate-600">
              La máquina te guiará con voz clara paso a paso durante todo el proceso.
            </p>
          </div>
        </div>
      </div>

      {/* Center Interactive Hero Cards */}
      <div className="my-6 md:my-8 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto w-full">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3 text-left">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#004F9F] flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Paso 1</span>
            <span className="text-sm font-bold text-slate-900 leading-snug">Conecta tu teléfono actual</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3 text-left">
          <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
            <Repeat className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Paso 2</span>
            <span className="text-sm font-bold text-slate-900 leading-snug">Valuación en 30 segundos</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-3 text-left">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Paso 3</span>
            <span className="text-sm font-bold text-slate-900 leading-snug">Llévate tu nuevo equipo</span>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-col items-center gap-4 pb-2 md:pb-4 max-w-md mx-auto w-full">
        {/* Large Primary Button */}
        <button
          type="button"
          onClick={() => {
            audio.playClick();
            onStart();
          }}
          className={`w-full py-5 md:py-6 px-8 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black tracking-wide uppercase transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl border-2 border-yellow-500/50 cursor-pointer ${
            isLargeText ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
          }`}
        >
          <span>Comenzar intercambio</span>
          <ArrowRight className="w-7 h-7 text-slate-950 stroke-[2.5]" />
        </button>

        {/* Secondary Option */}
        <button
          type="button"
          onClick={() => {
            audio.playClick();
            onOpenHowItWorks();
          }}
          className="text-sm md:text-base font-bold text-slate-700 hover:text-[#004F9F] active:scale-95 py-2 px-4 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>¿Cómo funciona?</span>
        </button>

        <span className="text-[11px] text-slate-400 text-center font-medium">
          Aceptamos smartphones iPhone, Samsung, Xiaomi, Motorola y más.
        </span>
      </div>
    </div>
  );
};
