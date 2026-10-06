import React, { useState, useEffect } from 'react';
import { SmartphoneProduct } from '../../types';
import { CURRENT_TRADE_IN_DEVICE } from '../../data/mockPhones';
import { VoiceGuideBanner } from '../VoiceGuideBanner';
import { CreditCard, Wifi, CheckCircle2, Loader2, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { audio } from '../../utils/audio';

interface Screen8PaymentProps {
  product: SmartphoneProduct;
  onPaymentSuccess: () => void;
  isLargeText?: boolean;
}

export const Screen8Payment: React.FC<Screen8PaymentProps> = ({
  product,
  onPaymentSuccess,
  isLargeText = false,
}) => {
  const difference = product.price - CURRENT_TRADE_IN_DEVICE.estimatedValue;

  // 'waiting' | 'reading' | 'processing' | 'approved'
  const [paymentState, setPaymentState] = useState<'waiting' | 'reading' | 'processing' | 'approved'>('waiting');

  const startPaymentSimulation = (methodName: string) => {
    if (paymentState !== 'waiting') return;

    audio.playCardBeep();
    setPaymentState('reading');

    setTimeout(() => {
      setPaymentState('processing');
    }, 1000);

    setTimeout(() => {
      audio.playSuccess();
      setPaymentState('approved');
      audio.speak('Pago aprobado con éxito.');
    }, 2800);
  };

  useEffect(() => {
    if (paymentState === 'approved') {
      const timer = setTimeout(() => {
        onPaymentSuccess();
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [paymentState, onPaymentSuccess]);

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-4xl mx-auto select-none">
      {/* Voice Guide Banner */}
      <div className="mb-3">
        <VoiceGuideBanner
          quote="Acerca, inserta o desliza tu tarjeta en la terminal de pago."
          autoSpeak={true}
        />
      </div>

      {/* Screen Title */}
      <div className="text-center my-1">
        <h2
          className={`font-black text-slate-950 uppercase tracking-tight ${
            isLargeText ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          Realiza tu pago
        </h2>
        <p
          className={`text-slate-700 font-bold mt-1 ${
            isLargeText ? 'text-lg md:text-xl' : 'text-base md:text-lg'
          }`}
        >
          Acerca, inserta o desliza tu tarjeta.
        </p>
        <span className="text-xs text-slate-500">
          Terminal bancaria integrada de alta seguridad conectada a la máquina Coppel.
        </span>
      </div>

      {/* Payment Terminal Interactive Showcase */}
      <div className="my-3 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side: Realistic Visual Payment Terminal (Verifone / Ingenico style) (6 cols) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center">
          <div className="w-64 bg-slate-900 rounded-3xl p-4 shadow-2xl border-4 border-slate-700 relative overflow-hidden">
            {/* Terminal Top Bezel & NFC contactless reader */}
            <div className="flex items-center justify-between px-2 pb-3 border-b border-slate-800">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                COPPEL PAY · VERIFONE
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className={`w-2 h-2 rounded-full transition-all ${
                      paymentState === 'waiting'
                        ? 'bg-emerald-500 animate-pulse'
                        : paymentState === 'processing'
                        ? 'bg-amber-400 animate-ping'
                        : 'bg-emerald-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Terminal Digital LCD Screen */}
            <div className="my-3 bg-slate-950 border-2 border-slate-800 rounded-xl p-3 text-center min-h-[110px] flex flex-col items-center justify-center relative overflow-hidden">
              {paymentState === 'waiting' && (
                <>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-1 text-blue-400">
                    <Wifi className="w-5 h-5 rotate-90" />
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                    ACERQUE O INSERTE
                  </span>
                  <span className="text-sm font-mono font-black text-white mt-1">
                    TOTAL: ${difference.toLocaleString('es-MX')} MXN
                  </span>
                </>
              )}

              {paymentState === 'reading' && (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-amber-400 mb-1" />
                  <span className="text-xs font-mono text-amber-300 font-bold uppercase">
                    Leyendo tarjeta…
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1">
                    No retire la tarjeta
                  </span>
                </>
              )}

              {paymentState === 'processing' && (
                <>
                  <Loader2 className="w-7 h-7 animate-spin text-yellow-400 mb-1" />
                  <span className="text-sm font-mono text-yellow-300 font-black uppercase tracking-wider animate-pulse">
                    Procesando pago…
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1">
                    Autorizando con banco Coppel
                  </span>
                </>
              )}

              {paymentState === 'approved' && (
                <>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center mb-1 text-slate-950 shadow-md">
                    <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                  </div>
                  <span className="text-sm font-mono text-emerald-400 font-black uppercase tracking-wider">
                    ✓ PAGO APROBADO
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 mt-0.5">
                    AUT: #CP-849204 · GRACIAS
                  </span>
                </>
              )}
            </div>

            {/* Terminal Keypad */}
            <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-950/60 rounded-xl border border-slate-800 text-white font-mono text-xs text-center font-bold">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((k) => (
                <div
                  key={k}
                  className="py-1.5 bg-slate-800 rounded hover:bg-slate-700 transition-colors cursor-default"
                >
                  {k}
                </div>
              ))}
            </div>

            {/* Chip slot bottom */}
            <div className="mt-3 pt-2 border-t border-slate-800 flex flex-col items-center">
              <div className="w-20 h-2 bg-slate-950 rounded-full border border-slate-700" />
              <span className="text-[9px] font-mono text-slate-500 mt-1">RANURA DE CHIP</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Action Buttons to trigger terminal (6 cols) */}
        <div className="md:col-span-6 flex flex-col justify-center space-y-3">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Monto a liquidar:
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-3xl md:text-4xl font-black text-slate-950 tabular-nums">
                ${difference.toLocaleString('es-MX')}
              </span>
              <span className="text-base font-bold text-slate-600">MXN</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Bonificación de $8,500 MXN ya descontada
            </span>
          </div>

          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-700 block">
              Toca para simular tu método de pago preferido:
            </span>

            {/* Trigger 1: Contactless / NFC */}
            <button
              type="button"
              disabled={paymentState !== 'waiting'}
              onClick={() => startPaymentSimulation('contactless')}
              className="w-full p-4 rounded-2xl bg-white hover:bg-yellow-50 border-2 border-slate-200 hover:border-yellow-400 active:scale-[0.98] transition-all flex items-center justify-between shadow-sm cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004F9F] flex items-center justify-center shrink-0">
                  <Wifi className="w-5 h-5 rotate-90" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-slate-900 block">
                    Acercar tarjeta (Sin contacto / NFC)
                  </span>
                  <span className="text-xs text-slate-500">
                    Visa, Mastercard, Apple Pay o Google Pay
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#004F9F] bg-blue-50 px-2 py-1 rounded-md">
                Tocar
              </span>
            </button>

            {/* Trigger 2: Chip Insert */}
            <button
              type="button"
              disabled={paymentState !== 'waiting'}
              onClick={() => startPaymentSimulation('chip')}
              className="w-full p-4 rounded-2xl bg-white hover:bg-yellow-50 border-2 border-slate-200 hover:border-yellow-400 active:scale-[0.98] transition-all flex items-center justify-between shadow-sm cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-slate-900 block">
                    Insertar tarjeta con Chip
                  </span>
                  <span className="text-xs text-slate-500">
                    Tarjeta de débito o crédito bancaria
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-1 rounded-md">
                Insertar
              </span>
            </button>

            {/* Trigger 3: Coppel Card */}
            <button
              type="button"
              disabled={paymentState !== 'waiting'}
              onClick={() => startPaymentSimulation('coppel')}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 hover:to-yellow-100 border-2 border-yellow-400 active:scale-[0.98] transition-all flex items-center justify-between shadow-sm cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                  💛
                </div>
                <div className="text-left">
                  <span className="text-sm font-black text-slate-900 block">
                    Pagar con Crédito Coppel
                  </span>
                  <span className="text-xs text-slate-600">
                    Abono quincenal desde ${product.coppelBiweeklyInstallment} MXN
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-950 bg-yellow-400 px-2.5 py-1 rounded-md">
                Coppel
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Security Reassurance */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-200">
        <Lock className="w-4 h-4 text-emerald-600" />
        <span>Transacción encriptada con certificación bancaria PCI DSS nivel 1</span>
      </div>
    </div>
  );
};
