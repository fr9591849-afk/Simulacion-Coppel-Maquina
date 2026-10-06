import React, { useState } from 'react';
import { Play, CheckCircle2, Cable, Smartphone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { VoiceGuideBanner } from '../VoiceGuideBanner';
import { PhoneRender } from '../PhoneRender';
import { audio } from '../../utils/audio';

interface Screen2ConnectPhoneProps {
  onStartDiagnostic: () => void;
  isLargeText?: boolean;
}

export const Screen2ConnectPhone: React.FC<Screen2ConnectPhoneProps> = ({
  onStartDiagnostic,
  isLargeText = false,
}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [cableType, setCableType] = useState<'usbc' | 'lightning'>('lightning');
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    audio.playClick();
    setTimeout(() => {
      onStartDiagnostic();
    }, 600);
  };

  const toggleCable = () => {
    audio.playClick();
    setIsConnected(!isConnected);
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-4xl mx-auto select-none">
      {/* Voice Guide Banner */}
      <div className="mb-4">
        <VoiceGuideBanner
          quote="Conecta tu teléfono para comenzar el diagnóstico."
          autoSpeak={true}
        />
      </div>

      {/* Title & Instructions */}
      <div className="text-center my-2">
        <h2
          className={`font-black text-slate-950 uppercase tracking-tight ${
            isLargeText ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          Conecta tu teléfono
        </h2>
        <p
          className={`text-slate-600 font-semibold mt-2 max-w-xl mx-auto ${
            isLargeText ? 'text-lg md:text-xl' : 'text-base md:text-lg'
          }`}
        >
          Conecta tu teléfono al puerto de diagnóstico para comenzar.
        </p>
      </div>

      {/* Visual Diagnostic Port Illustration */}
      <div className="my-4 p-6 md:p-8 rounded-3xl bg-gradient-to-b from-slate-100 via-white to-blue-50/50 border-2 border-slate-200/90 shadow-inner relative flex flex-col items-center justify-center">
        {/* Connection status badge */}
        <div className="absolute top-4 right-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              isConnected
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            {isConnected ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cable conectado y detectado</span>
              </>
            ) : (
              <>
                <Cable className="w-3.5 h-3.5 text-amber-600" />
                <span>Esperando conexión física</span>
              </>
            )}
          </div>
        </div>

        {/* Cable selector buttons */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-bold text-slate-500 mr-1">Tipo de conector:</span>
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              setCableType('lightning');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              cableType === 'lightning'
                ? 'bg-[#004F9F] text-white shadow-xs'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Lightning (iPhone)
          </button>
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              setCableType('usbc');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              cableType === 'usbc'
                ? 'bg-[#004F9F] text-white shadow-xs'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            USB-C (Universal)
          </button>
        </div>

        {/* Diagnostic Port & Phone Graphic */}
        <div className="relative flex flex-col items-center">
          {/* Phone Display */}
          <div className="relative">
            <PhoneRender type="iphone13" size="md" />

            {/* Simulated diagnostic connection overlay on phone screen */}
            <div className="absolute inset-0 m-1.5 rounded-[1.8rem] bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center text-white">
              {isConnected ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-2 animate-pulse">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-xs font-bold">iPhone 13 Detectado</span>
                  <span className="text-[10px] text-emerald-300 font-mono mt-0.5">Listo para escanear</span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center mb-2 animate-bounce">
                    <Cable className="w-6 h-6 text-yellow-400" />
                  </div>
                  <span className="text-xs font-bold">Inserte el conector</span>
                  <span className="text-[10px] text-slate-300 mt-0.5">En el puerto inferior</span>
                </>
              )}
            </div>
          </div>

          {/* Interactive Diagnostic Cable with Connector */}
          <div className="flex flex-col items-center -mt-1 relative z-20">
            {/* Metal connector plug */}
            <button
              type="button"
              onClick={toggleCable}
              title={isConnected ? 'Desconectar cable' : 'Conectar cable'}
              className={`w-10 h-7 rounded-b-md border-x-2 border-b-2 flex items-center justify-center transition-all cursor-pointer ${
                isConnected
                  ? 'bg-emerald-600 border-emerald-700 shadow-md shadow-emerald-500/30'
                  : 'bg-slate-400 border-slate-500 translate-y-3'
              }`}
            >
              <div className="w-5 h-2 bg-yellow-300 rounded-xs" />
            </button>

            {/* Armored Cable (like in the machine reference photo!) */}
            <div
              className={`w-4 h-16 rounded-full border-2 border-slate-400 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 shadow-inner flex flex-col items-center justify-around py-1 transition-all ${
                isConnected ? 'h-14' : 'h-20'
              }`}
            >
              <span className="w-full h-0.5 bg-slate-400/80" />
              <span className="w-full h-0.5 bg-slate-400/80" />
              <span className="w-full h-0.5 bg-slate-400/80" />
              <span className="w-full h-0.5 bg-slate-400/80" />
            </div>

            {/* Machine Port Bay */}
            <div className="w-32 h-6 bg-slate-800 rounded-b-xl border-t-4 border-yellow-400 shadow-md flex items-center justify-center">
              <span className="text-[9px] font-mono font-bold tracking-widest text-slate-300 uppercase">
                Puerto Kiosco 01
              </span>
            </div>
          </div>
        </div>

        {/* Security reassurance note */}
        <div className="mt-5 flex items-center gap-2 text-xs text-slate-600 bg-white/80 px-4 py-2 rounded-xl border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            Conexión segura y certificada: El diagnóstico solo evalúa el hardware. Ningún archivo personal es transferido.
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="max-w-md mx-auto w-full pt-2">
        <button
          type="button"
          onClick={handleStart}
          disabled={isStarting}
          className={`w-full py-5 px-8 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black tracking-wide uppercase transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl border-2 border-yellow-500/50 cursor-pointer ${
            isLargeText ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
          } ${isStarting ? 'opacity-80' : ''}`}
        >
          {isStarting ? (
            <>
              <div className="w-6 h-6 border-3 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Iniciando diagnóstico…</span>
            </>
          ) : (
            <>
              <span>Iniciar diagnóstico</span>
              <ArrowRight className="w-7 h-7 text-slate-950 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
