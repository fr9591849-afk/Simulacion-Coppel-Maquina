import React, { useState } from 'react';
import { SmartphoneProduct } from '../../types';
import { MOCK_PHONES, CURRENT_TRADE_IN_DEVICE } from '../../data/mockPhones';
import { PhoneRender } from '../PhoneRender';
import { VoiceGuideBanner } from '../VoiceGuideBanner';
import { Info, ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react';
import { audio } from '../../utils/audio';

interface Screen5ChoosePhoneProps {
  onSelectProduct: (product: SmartphoneProduct) => void;
  isLargeText?: boolean;
}

export const Screen5ChoosePhone: React.FC<Screen5ChoosePhoneProps> = ({
  onSelectProduct,
  isLargeText = false,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const filteredPhones = selectedBrand === 'all'
    ? MOCK_PHONES
    : MOCK_PHONES.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());

  const handleInfoClick = (product: SmartphoneProduct) => {
    audio.playClick();
    onSelectProduct(product);
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-6xl mx-auto select-none">
      {/* Voice Guide Banner */}
      <div className="mb-3">
        <VoiceGuideBanner
          quote="¿Cuál teléfono te gustaría adquirir?"
          autoSpeak={true}
        />
      </div>

      {/* Screen Title & Trade-in Reminder */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 my-2 text-center md:text-left">
        <div>
          <h2
            className={`font-black text-slate-950 uppercase tracking-tight ${
              isLargeText ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
            }`}
          >
            ¿Qué teléfono quieres?
          </h2>
          <p className="text-slate-600 font-medium text-xs md:text-sm mt-0.5">
            Selecciona el modelo que te interese para ver sus características y calcular tu pago.
          </p>
        </div>

        {/* Small Trade-In Balance Floating Pill */}
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl px-4 py-2 flex items-center gap-3 shrink-0 shadow-xs">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Tu saldo a favor</span>
            <span className="text-base font-black text-[#004F9F] tabular-nums">
              ${CURRENT_TRADE_IN_DEVICE.estimatedValue.toLocaleString('es-MX')} MXN
            </span>
          </div>
          <span className="text-xs bg-yellow-400 text-slate-950 font-bold px-2 py-0.5 rounded-md">
            {CURRENT_TRADE_IN_DEVICE.model}
          </span>
        </div>
      </div>

      {/* Brand Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 mr-1 shrink-0">Filtrar:</span>
        {[
          { id: 'all', label: 'Todos los equipos' },
          { id: 'Samsung', label: 'Samsung' },
          { id: 'Apple', label: 'Apple' },
          { id: 'Xiaomi', label: 'Xiaomi' },
          { id: 'Motorola', label: 'Motorola' },
          { id: 'Google', label: 'Google Pixel' },
          { id: 'Honor', label: 'Honor' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              audio.playClick();
              setSelectedBrand(tab.id);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedBrand === tab.id
                ? 'bg-[#004F9F] text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Available Smartphones */}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 overflow-y-auto max-h-[58vh] pr-1 scrollbar-thin">
        {filteredPhones.map((phone) => {
          const isFeatured = phone.id === 'samsung-s25';
          const difference = phone.price - CURRENT_TRADE_IN_DEVICE.estimatedValue;

          return (
            <div
              key={phone.id}
              className={`bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between hover:shadow-xl relative group ${
                isFeatured
                  ? 'border-yellow-400 shadow-md ring-2 ring-yellow-400/20'
                  : 'border-slate-200 shadow-sm hover:border-blue-400'
              }`}
            >
              {/* Featured Badge */}
              {isFeatured && (
                <div className="absolute -top-3 left-4 bg-yellow-400 text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-slate-950" />
                  <span>Recomendado Coppel</span>
                </div>
              )}

              {/* Top info: Brand & Model & Storage */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      {phone.brand}
                    </span>
                    <h3 className="text-lg font-black text-slate-950 leading-tight">
                      {phone.model}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold shrink-0">
                    {phone.storage}
                  </span>
                </div>

                {/* Visual phone render */}
                <div className="py-4 flex justify-center items-center h-48 bg-radial from-slate-100 to-transparent rounded-2xl my-2">
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    <PhoneRender type={phone.imageType} size="sm" showBack={false} />
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-2 pt-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 font-semibold block">Precio de lista</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-950 font-sans tabular-nums">
                      ${phone.price.toLocaleString('es-MX')}
                    </span>
                    <span className="text-xs font-bold text-slate-500">MXN</span>
                  </div>

                  {/* Calculated Difference preview */}
                  <div className="mt-1.5 py-1 px-2.5 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-between text-xs font-semibold text-[#004F9F]">
                    <span>Pagas con intercambio:</span>
                    <span className="font-bold tabular-nums">
                      ${difference.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Action Button: "Más información" */}
              <button
                type="button"
                onClick={() => handleInfoClick(phone)}
                className={`mt-4 w-full py-3.5 px-4 rounded-xl font-black text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isFeatured
                    ? 'bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 shadow-md'
                    : 'bg-[#004F9F] hover:bg-[#003D82] active:scale-[0.98] text-white shadow-sm'
                }`}
              >
                <Info className="w-4 h-4 shrink-0" />
                <span>Más información</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="text-center text-xs text-slate-500 pt-1">
        Todos los teléfonos son 100% nuevos, originales, desbloqueados para cualquier compañía y cuentan con garantía Coppel.
      </div>
    </div>
  );
};
