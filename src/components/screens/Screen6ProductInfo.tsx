import React, { useState, useEffect } from 'react';
import { SmartphoneProduct } from '../../types';
import { CURRENT_TRADE_IN_DEVICE } from '../../data/mockPhones';
import { PhoneRender } from '../PhoneRender';
import { VoiceGuideBanner } from '../VoiceGuideBanner';
import { ArrowLeft, Check, Sparkles, ShieldCheck, Zap, AlertCircle, RotateCcw } from 'lucide-react';
import { audio } from '../../utils/audio';

interface Screen6ProductInfoProps {
  product: SmartphoneProduct;
  onBack: () => void;
  onConfirmSelection: (product: SmartphoneProduct) => void;
  isLargeText?: boolean;
}

export const Screen6ProductInfo: React.FC<Screen6ProductInfoProps> = ({
  product,
  onBack,
  onConfirmSelection,
  isLargeText = false,
}) => {
  // 'initial' = "Seleccionar teléfono"
  // 'confirming' = "Presiona nuevamente para confirmar"
  const [confirmState, setConfirmState] = useState<'initial' | 'confirming'>('initial');
  const [showFront, setShowFront] = useState(true);

  // Auto-reset confirmation state after 8 seconds if not clicked
  useEffect(() => {
    if (confirmState === 'confirming') {
      const timer = setTimeout(() => {
        setConfirmState('initial');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [confirmState]);

  const handleSelectButtonClick = () => {
    if (confirmState === 'initial') {
      audio.playClick();
      setConfirmState('confirming');
      audio.speak('Presiona nuevamente para confirmar tu elección.');
    } else {
      audio.playSuccess();
      onConfirmSelection(product);
    }
  };

  const difference = product.price - CURRENT_TRADE_IN_DEVICE.estimatedValue;

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-5xl mx-auto select-none">
      {/* Top Navigation & Voice Banner */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              onBack();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs md:text-sm font-bold text-slate-700 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a opciones</span>
          </button>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium block">Bonificación aplicada</span>
            <span className="text-xs md:text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              −${CURRENT_TRADE_IN_DEVICE.estimatedValue.toLocaleString('es-MX')} MXN ({CURRENT_TRADE_IN_DEVICE.model})
            </span>
          </div>
        </div>

        <VoiceGuideBanner
          quote={`Has seleccionado ${product.brand} ${product.model}. Revisa sus características y confirma tu selección.`}
          autoSpeak={true}
        />
      </div>

      {/* Main Product Details Card */}
      <div className="my-3 bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-5 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Large Product Image & Angle Switcher (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200/80">
          <div className="relative py-2">
            <PhoneRender type={product.imageType} size="lg" showBack={!showFront} />
          </div>

          {/* Toggle between Front and Back angle */}
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                audio.playClick();
                setShowFront(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                showFront
                  ? 'bg-[#004F9F] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Vista Frontal
            </button>
            <button
              type="button"
              onClick={() => {
                audio.playClick();
                setShowFront(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !showFront
                  ? 'bg-[#004F9F] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Vista Posterior (Cámaras)
            </button>
          </div>

          <span className="text-[11px] text-slate-400 mt-2 font-medium">
            Color: {product.color} · Modelo sellado en caja original
          </span>
        </div>

        {/* Right Side: Model, Storage, Price, and Key Features (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#004F9F]">
                {product.brand}
              </span>
              <span className="text-slate-300">·</span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 text-xs font-black">
                {product.storage}
              </span>
            </div>

            <h2
              className={`font-black text-slate-950 uppercase tracking-tight ${
                isLargeText ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
              }`}
            >
              {product.brand} {product.model}
            </h2>

            {/* Price Section */}
            <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 font-semibold block">Precio regular en tienda</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl md:text-4xl font-black text-slate-950 tabular-nums">
                    ${product.price.toLocaleString('es-MX')}
                  </span>
                  <span className="text-sm font-bold text-slate-600">MXN</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-emerald-700 font-bold block">Con tu intercambio pagarás solo:</span>
                <span className="text-2xl md:text-3xl font-black text-[#004F9F] tabular-nums">
                  ${difference.toLocaleString('es-MX')} MXN
                </span>
              </div>
            </div>

            {/* Short List of Key Features */}
            <div className="mt-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                Características principales:
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick specs grid */}
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600">
            <div className="bg-slate-50 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-bold">Pantalla</span>
              <span className="font-semibold text-slate-900 truncate block">{product.specs.screen}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-bold">Procesador</span>
              <span className="font-semibold text-slate-900 truncate block">{product.specs.processor}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block font-bold">Cámara</span>
              <span className="font-semibold text-slate-900 truncate block">{product.specs.camera}</span>
            </div>
          </div>
        </div>
      </div>

      {/* TWO-CLICK INTENTIONAL CONFIRMATION BUTTON (Screen 6 Requirement) */}
      <div className="max-w-xl mx-auto w-full pt-1">
        {confirmState === 'confirming' && (
          <div className="mb-2 text-center animate-bounce">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              Confirmación requerida: presiona una vez más para asegurar tu elección
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleSelectButtonClick}
          className={`w-full py-5 px-8 rounded-2xl font-black tracking-wide uppercase transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl ${
            confirmState === 'confirming'
              ? 'bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 ring-4 ring-amber-400/50 scale-[1.02] border-2 border-amber-600'
              : 'bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 border-2 border-yellow-500/50 hover:shadow-2xl'
          } ${isLargeText ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}
        >
          {confirmState === 'confirming' ? (
            <>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950" />
              </span>
              <span>Presiona nuevamente para confirmar</span>
            </>
          ) : (
            <>
              <Check className="w-7 h-7 text-slate-950 stroke-[3]" />
              <span>Seleccionar teléfono</span>
            </>
          )}
        </button>

        {confirmState === 'confirming' && (
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => {
                audio.playClick();
                setConfirmState('initial');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-semibold"
            >
              Cancelar y volver a pensar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
