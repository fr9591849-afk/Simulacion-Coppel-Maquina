import React from 'react';
import { CoppelKeyLogo } from './CoppelKeyLogo';
import { Sparkles, Cable, CreditCard, ChevronDown } from 'lucide-react';

interface KioskFrameProps {
  children: React.ReactNode;
  isKioskChassisMode: boolean;
  onToggleChassisMode: () => void;
}

export const KioskFrame: React.FC<KioskFrameProps> = ({
  children,
  isKioskChassisMode,
  onToggleChassisMode,
}) => {
  if (!isKioskChassisMode) {
    return (
      <div className="w-full min-h-screen bg-slate-100 flex flex-col items-center justify-start">
        {/* View Mode Switcher floating bar */}
        <div className="w-full bg-slate-900 text-slate-300 px-4 py-1.5 flex items-center justify-between text-xs border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Interfaz Digital de Kiosco Coppel</span>
          </div>
          <button
            type="button"
            onClick={onToggleChassisMode}
            className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-yellow-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <span>Ver con Chasis de la Máquina</span>
          </button>
        </div>

        {/* Pure Screen View */}
        <div className="w-full max-w-7xl flex-1 flex flex-col bg-slate-50 min-h-[calc(100vh-36px)] shadow-2xl">
          {children}
        </div>
      </div>
    );
  }

  // Physical Chassis Mode (Simulating the kiosk exterior seen in image.png)
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 p-2 sm:p-6 flex flex-col items-center justify-center">
      {/* Top Controller Toggle */}
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleChassisMode}
          className="px-4 py-2 rounded-xl bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-yellow-300 shadow-md transition-all flex items-center gap-2"
        >
          <span>← Volver a Pantalla Completa</span>
        </button>
        <span className="text-xs text-slate-400">
          Vista de gabinete físico Coppel (referencia de tienda)
        </span>
      </div>

      {/* Kiosk Physical Shell */}
      <div className="w-full max-w-5xl bg-gradient-to-b from-slate-100 via-white to-slate-200 rounded-[3rem] p-4 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] border-4 border-slate-300 relative flex flex-col items-center">
        {/* Blue Accented Side Curves (like in photo) */}
        <div className="absolute left-0 top-16 bottom-16 w-3 bg-[#004F9F] rounded-r-lg" />
        <div className="absolute right-0 top-16 bottom-16 w-3 bg-[#004F9F] rounded-l-lg" />

        {/* Top Kiosk Arch & Coppel Sign */}
        <div className="w-full flex flex-col items-center pb-4 border-b-2 border-slate-200">
          <div className="bg-white px-8 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
            <CoppelKeyLogo size="lg" variant="dark" />
          </div>
        </div>

        {/* Main Touchscreen Bezel */}
        <div className="w-full mt-4 bg-slate-900 rounded-[2.2rem] p-3 sm:p-4 shadow-2xl border-4 border-slate-800 relative">
          {/* Machine screen inset */}
          <div className="w-full bg-slate-50 rounded-[1.6rem] overflow-hidden min-h-[640px] flex flex-col shadow-inner">
            {children}
          </div>
        </div>

        {/* Lower Shelf Console: Diagnostics & Payment Terminal (Simulating lower hardware) */}
        <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2 border-slate-300">
          {/* Shelf 1: Sample phones showcase */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
              CATÁLOGO EN EXHIBICIÓN
            </span>
            <span className="text-xs font-bold text-slate-700">Samsung · iPhone · Xiaomi</span>
          </div>

          {/* Shelf 2: Diagnostic Bay with Armored Cable */}
          <div className="bg-slate-800 text-white p-3 rounded-2xl border border-slate-700 text-center flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-yellow-300 uppercase font-bold flex items-center gap-1">
              <Cable className="w-3.5 h-3.5 text-yellow-400" />
              DEPÓSITO / CABLE DIAGNÓSTICO
            </span>
            <span className="text-[11px] text-slate-300 mt-0.5">Puerto seguro protegido</span>
          </div>

          {/* Shelf 3: Payment Terminal */}
          <div className="bg-slate-900 text-white p-3 rounded-2xl border border-slate-700 text-center flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
              TERMINAL PINPAD BANCARIA
            </span>
            <span className="text-[11px] text-slate-300 mt-0.5">NFC Contactless · Chip EMV</span>
          </div>
        </div>
      </div>
    </div>
  );
};
