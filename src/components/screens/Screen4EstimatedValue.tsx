import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Award, Tag } from 'lucide-react';
import { VoiceGuideBanner } from '../VoiceGuideBanner';
import { PhoneRender } from '../PhoneRender';
import { CURRENT_TRADE_IN_DEVICE } from '../../data/mockPhones';
import { audio } from '../../utils/audio';

interface Screen4EstimatedValueProps {
  onContinue: () => void;
  isLargeText?: boolean;
}

export const Screen4EstimatedValue: React.FC<Screen4EstimatedValueProps> = ({
  onContinue,
  isLargeText = false,
}) => {
  return (
    <div className="flex-1 w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-4xl mx-auto select-none">
      {/* Voice Guide Banner with required prompt text */}
      <div className="mb-3">
        <VoiceGuideBanner
          quote="El valor estimado de tu teléfono es de ocho mil quinientos pesos."
          autoSpeak={true}
        />
      </div>

      {/* Screen Title */}
      <div className="text-center my-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>8 pruebas de hardware completadas con éxito</span>
        </div>
        <h2
          className={`font-black text-slate-950 uppercase tracking-tight ${
            isLargeText ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          Diagnóstico completado
        </h2>
        <p className="text-slate-600 font-medium text-sm md:text-base mt-1">
          Tu equipo califica para el programa de intercambio inmediato Coppel.
        </p>
      </div>

      {/* Main Valuation Display Card */}
      <div className="my-4 bg-gradient-to-b from-white via-slate-50 to-blue-50/40 rounded-3xl border-3 border-[#004F9F] shadow-xl p-6 md:p-8 relative overflow-hidden">
        {/* Coppel Seal Watermark / Badge */}
        <div className="absolute -top-3 right-6 bg-[#004F9F] text-yellow-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-yellow-400" />
          <span>Oferta Garantizada Coppel</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Phone Render & Specs Summary (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <PhoneRender type="iphone13" size="sm" showBack={false} />

            <div className="mt-4 text-center">
              <h3 className="text-xl font-black text-slate-900">
                {CURRENT_TRADE_IN_DEVICE.model} — {CURRENT_TRADE_IN_DEVICE.storage}
              </h3>
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Condición: {CURRENT_TRADE_IN_DEVICE.condition}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Batería al 89% · Pantalla sin rayones · Cámara funcional
              </div>
            </div>
          </div>

          {/* Large Value Display (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left justify-center pl-0 md:pl-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#004F9F] mb-1">
              <Tag className="w-4 h-4 text-yellow-500" />
              <span>Valor estimado de intercambio</span>
            </div>

            {/* Huge Price in MXN */}
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 font-sans tabular-nums drop-shadow-xs">
                ${CURRENT_TRADE_IN_DEVICE.estimatedValue.toLocaleString('es-MX')}
              </span>
              <span className="text-2xl md:text-3xl font-bold text-[#004F9F]">MXN</span>
            </div>

            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed max-w-md">
              Esta cantidad se abonará <strong className="text-slate-900 font-bold">de forma íntegra e inmediata</strong> como saldo a favor al elegir tu nuevo teléfono en el siguiente paso.
            </p>

            {/* Benefit Bullets */}
            <div className="mt-4 space-y-2 text-xs text-slate-700 w-full">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Válido hoy en esta máquina de intercambio Coppel</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                <span>Sin trámites complicados ni tiempo de espera</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <span>Borrado de datos seguro certificado al finalizar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Continue Button */}
      <div className="max-w-md mx-auto w-full pt-2">
        <button
          type="button"
          onClick={() => {
            audio.playClick();
            onContinue();
          }}
          className={`w-full py-5 px-8 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black tracking-wide uppercase transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl border-2 border-yellow-500/50 cursor-pointer ${
            isLargeText ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
          }`}
        >
          <span>Continuar</span>
          <ArrowRight className="w-7 h-7 text-slate-950 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
