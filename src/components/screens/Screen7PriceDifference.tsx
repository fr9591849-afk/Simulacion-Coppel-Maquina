import React from 'react';
import { SmartphoneProduct } from '../../types';
import { CURRENT_TRADE_IN_DEVICE } from '../../data/mockPhones';
import { VoiceGuideBanner } from '../VoiceGuideBanner';
import { PhoneRender } from '../PhoneRender';
import { ArrowRight, CreditCard, Minus, Plus, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { audio } from '../../utils/audio';

interface Screen7PriceDifferenceProps {
  product: SmartphoneProduct;
  onContinueToPayment: () => void;
  onChangePhone: () => void;
  isLargeText?: boolean;
}

export const Screen7PriceDifference: React.FC<Screen7PriceDifferenceProps> = ({
  product,
  onContinueToPayment,
  onChangePhone,
  isLargeText = false,
}) => {
  const difference = product.price - CURRENT_TRADE_IN_DEVICE.estimatedValue;

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-4xl mx-auto select-none">
      {/* Voice Guide Banner */}
      <div className="mb-3">
        <VoiceGuideBanner
          quote="La diferencia a pagar es de diez mil cuatrocientos noventa y nueve pesos."
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
          Resumen de tu intercambio
        </h2>
        <p className="text-slate-600 font-medium text-sm md:text-base mt-1">
          Revisa el cálculo automático de tu saldo y la diferencia final a liquidar.
        </p>
      </div>

      {/* Calculation Ledger Card */}
      <div className="my-3 bg-white rounded-3xl border-3 border-[#004F9F] shadow-2xl p-6 md:p-8">
        {/* Device Rows Breakdown */}
        <div className="space-y-4">
          {/* New Phone Item */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Plus className="w-6 h-6 text-[#004F9F]" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                  Nuevo teléfono
                </span>
                <span className="text-base md:text-lg font-black text-slate-900">
                  {product.brand} {product.model} · {product.storage}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl md:text-2xl font-black text-slate-950 tabular-nums">
                ${product.price.toLocaleString('es-MX')}
              </span>
              <span className="text-xs font-bold text-slate-500 ml-1">MXN</span>
            </div>
          </div>

          {/* Trade-in Value Deduction */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Minus className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider block">
                  Valor de intercambio (bonificación)
                </span>
                <span className="text-base md:text-lg font-black text-emerald-950">
                  {CURRENT_TRADE_IN_DEVICE.model} · {CURRENT_TRADE_IN_DEVICE.storage} ({CURRENT_TRADE_IN_DEVICE.condition})
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl md:text-2xl font-black text-emerald-700 tabular-nums">
                −${CURRENT_TRADE_IN_DEVICE.estimatedValue.toLocaleString('es-MX')}
              </span>
              <span className="text-xs font-bold text-emerald-600 ml-1">MXN</span>
            </div>
          </div>
        </div>

        {/* Divider Bar */}
        <div className="my-6 border-t-2 border-dashed border-slate-300" />

        {/* Big Prominent Difference Amount */}
        <div className="bg-gradient-to-r from-blue-900 via-[#004F9F] to-blue-950 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-yellow-300 block">
              Diferencia total a pagar:
            </span>
            <span className="text-xs text-blue-200">
              Pago único o difiérelo a pagos quincenales en caja
            </span>
          </div>

          <div className="text-center md:text-right">
            <div className="flex items-baseline justify-center md:justify-end gap-2">
              <span className="text-4xl md:text-5xl lg:text-6xl font-black text-yellow-300 font-sans tabular-nums drop-shadow">
                ${difference.toLocaleString('es-MX')}
              </span>
              <span className="text-xl md:text-2xl font-bold text-white">MXN</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Callout */}
        <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#004F9F]" />
            <span>Aceptamos tarjetas de débito, crédito Visa/Mastercard y Tarjeta Coppel</span>
          </div>
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              onChangePhone();
            }}
            className="text-xs font-bold text-[#004F9F] hover:underline"
          >
            Cambiar de teléfono
          </button>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="max-w-md mx-auto w-full pt-2">
        <button
          type="button"
          onClick={() => {
            audio.playClick();
            onContinueToPayment();
          }}
          className={`w-full py-5 px-8 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black tracking-wide uppercase transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl border-2 border-yellow-500/50 cursor-pointer ${
            isLargeText ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
          }`}
        >
          <span>Continuar al pago</span>
          <ArrowRight className="w-7 h-7 text-slate-950 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
