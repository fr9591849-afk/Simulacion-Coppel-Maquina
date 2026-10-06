import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { INITIAL_DIAGNOSTIC_CATEGORIES } from '../../data/mockPhones';
import { DiagnosticCategory } from '../../types';
import { PhoneRender } from '../PhoneRender';
import { audio } from '../../utils/audio';

interface Screen3PhoneDiagnosticProps {
  onComplete: () => void;
  isLargeText?: boolean;
}

export const Screen3PhoneDiagnostic: React.FC<Screen3PhoneDiagnosticProps> = ({
  onComplete,
  isLargeText = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState<DiagnosticCategory[]>(INITIAL_DIAGNOSTIC_CATEGORIES);
  const [currentCheckingIndex, setCurrentCheckingIndex] = useState(0);

  useEffect(() => {
    // Play initial voice prompt for diagnostic
    audio.speak('Analizando los componentes de tu teléfono. Por favor no lo desconectes.');

    const totalSteps = categories.length;
    const intervalTime = 420; // total duration ~ 3.5 seconds

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 3, 100);
        return next;
      });
    }, 90);

    const categoryTimer = setInterval(() => {
      setCurrentCheckingIndex((prevIdx) => {
        if (prevIdx < totalSteps) {
          // Play check sound
          audio.playCheck();

          setCategories((prevList) =>
            prevList.map((item, idx) => {
              if (idx <= prevIdx) {
                return { ...item, status: 'passed' };
              }
              if (idx === prevIdx + 1) {
                return { ...item, status: 'checking' };
              }
              return item;
            })
          );
          return prevIdx + 1;
        } else {
          clearInterval(categoryTimer);
          return prevIdx;
        }
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      clearInterval(categoryTimer);
    };
  }, []);

  // When progress reaches 100%, trigger success and transition
  useEffect(() => {
    if (progress >= 100) {
      audio.playSuccess();
      const delay = setTimeout(() => {
        onComplete();
      }, 750);
      return () => clearTimeout(delay);
    }
  }, [progress, onComplete]);

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-5xl mx-auto select-none">
      {/* Title & Progress Header */}
      <div className="text-center my-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#004F9F] text-xs font-bold mb-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#004F9F]" />
          <span>Diagnóstico Kiosco Coppel en curso</span>
        </div>

        <h2
          className={`font-black text-slate-950 uppercase tracking-tight ${
            isLargeText ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          Analizando tu teléfono…
        </h2>
        <p className="text-slate-600 font-medium mt-1 text-sm md:text-base">
          Verificando componentes de hardware, sensores, pantalla y batería del dispositivo.
        </p>

        {/* Big Progress Bar & Percentage */}
        <div className="mt-5 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5 px-1">
            <span>Progreso del escaneo</span>
            <span className="font-mono text-base font-black text-[#004F9F]">{progress}%</span>
          </div>
          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-[#004F9F] rounded-full transition-all duration-150 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer light effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Diagnostic Area: 8 Categories Grid + Scanning Device */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Device Scan Illustration (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl border-4 border-yellow-400/80">
          <div className="relative">
            <PhoneRender type="iphone13" size="md" />

            {/* Glowing Laser Scan Line passing through */}
            <div className="absolute inset-0 rounded-[2.4rem] overflow-hidden pointer-events-none">
              <div className="w-full h-2 bg-cyan-400 shadow-[0_0_15px_#22d3ee] absolute animate-[bounce_2s_infinite]" />
              <div className="w-full h-full bg-cyan-500/10" />
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="text-xs font-mono uppercase tracking-widest text-yellow-300 font-bold">
              iPhone 13 · 128 GB
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5 flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Puerto de diagnóstico activo</span>
            </div>
          </div>
        </div>

        {/* Right Column: The 8 Diagnostic Categories (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {categories.map((cat) => {
            const isPassed = cat.status === 'passed';
            const isChecking = cat.status === 'checking';

            return (
              <div
                key={cat.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isPassed
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-xs'
                    : isChecking
                    ? 'bg-yellow-50 border-yellow-400 text-slate-950 shadow-sm ring-2 ring-yellow-400/30'
                    : 'bg-white border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                      isPassed
                        ? 'bg-emerald-500 text-white'
                        : isChecking
                        ? 'bg-yellow-400 text-slate-950'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isChecking ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900 truncate">
                        {isPassed && '✓ '}
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {isPassed ? cat.metric : cat.sublabel}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isPassed
                        ? 'bg-emerald-100 text-emerald-800'
                        : isChecking
                        ? 'bg-yellow-200 text-yellow-900 animate-pulse'
                        : 'text-slate-400'
                    }`}
                  >
                    {isPassed ? 'Correcto' : isChecking ? 'Analizando' : 'Pendiente'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info & Quick Skip Button */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-200/80">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Diagnóstico automatizado bajo normas de calidad Coppel</span>
        </div>

        {/* Quick skip affordance for evaluator convenience */}
        <button
          type="button"
          onClick={() => {
            audio.playSuccess();
            onComplete();
          }}
          className="text-xs font-bold text-[#004F9F] hover:underline px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Omitir animación →
        </button>
      </div>
    </div>
  );
};
