import React, { useState } from 'react';
import { SmartphoneProduct } from '../../types';
import { CURRENT_TRADE_IN_DEVICE } from '../../data/mockPhones';
import { VoiceGuideBanner } from '../VoiceGuideBanner';
import { PhoneRender } from '../PhoneRender';
import { CoppelKeyLogo } from '../CoppelKeyLogo';
import { CheckCircle2, PackageCheck, Printer, QrCode, RefreshCw, Sparkles, ShieldCheck, ArrowDown } from 'lucide-react';
import { audio } from '../../utils/audio';

interface Screen9ExchangeCompletedProps {
  product: SmartphoneProduct;
  onRestart: () => void;
  isLargeText?: boolean;
}

export const Screen9ExchangeCompleted: React.FC<Screen9ExchangeCompletedProps> = ({
  product,
  onRestart,
  isLargeText = false,
}) => {
  const [isCompartmentOpen, setIsCompartmentOpen] = useState(false);
  const [isPhoneRetrieved, setIsPhoneRetrieved] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleOpenCompartment = () => {
    audio.playCompartmentUnlock();
    setIsCompartmentOpen(true);
  };

  const handleRetrievePhone = () => {
    audio.playSuccess();
    setIsPhoneRetrieved(true);
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-5xl mx-auto select-none">
      {/* Voice Guide Banner */}
      <div className="mb-3">
        <VoiceGuideBanner
          quote="Tu pago fue aprobado. Tu nuevo teléfono está listo para recoger."
          autoSpeak={true}
        />
      </div>

      {/* Screen Title */}
      <div className="text-center my-1">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>¡Pago aprobado y transacción exitosa!</span>
        </div>

        <h2
          className={`font-black text-slate-950 uppercase tracking-tight ${
            isLargeText ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
          }`}
        >
          ¡Intercambio completado!
        </h2>

        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-lg md:text-xl font-black text-[#004F9F]">
            {product.brand} {product.model} · {product.storage}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider">
            Listo para recoger
          </span>
        </div>
      </div>

      {/* Delivery Compartment Visual Indicator (Prompt Requirement) */}
      <div className="my-3 bg-slate-900 rounded-3xl p-6 md:p-8 text-white border-4 border-yellow-400 shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Machine Delivery Bay Simulation (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center">
            {/* Visual Compartment Chamber */}
            <div className="w-full max-w-md bg-slate-950 border-4 border-slate-700 rounded-3xl p-4 relative shadow-inner">
              {/* Compartment Door Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isCompartmentOpen ? 'bg-emerald-400 animate-ping' : 'bg-yellow-400 animate-pulse'
                    }`}
                  />
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
                    BANDEJA DE ENTREGA #01
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isCompartmentOpen
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}
                >
                  {isCompartmentOpen ? 'DESBLOQUEADO' : 'LISTO PARA ABRIR'}
                </span>
              </div>

              {/* Inside Tray Chamber */}
              <div
                className={`my-3 h-48 rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden ${
                  isCompartmentOpen
                    ? 'bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-950 border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                {!isCompartmentOpen ? (
                  <div className="text-center p-3">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 text-slate-950 mx-auto flex items-center justify-center mb-2 shadow-lg animate-bounce">
                      <ArrowDown className="w-6 h-6 stroke-[3]" />
                    </div>
                    <span className="text-sm font-bold text-white block">
                      Compartimento inferior desbloqueado
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">
                      Presiona abajo para abrir la compuerta
                    </span>
                  </div>
                ) : !isPhoneRetrieved ? (
                  <div className="text-center p-3 animate-in fade-in zoom-in-95 duration-300">
                    {/* The new phone sealed box */}
                    <div className="relative inline-block my-1">
                      <div className="w-36 h-24 bg-gradient-to-r from-slate-100 via-white to-slate-200 text-slate-900 rounded-xl p-2 shadow-xl border-2 border-slate-300 flex flex-col justify-between">
                        <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                          <span>COPPEL TECH</span>
                          <span className="text-emerald-700">ORIGINAL</span>
                        </div>
                        <div className="text-center font-black text-xs text-slate-950">
                          {product.brand} {product.model}
                        </div>
                        <div className="text-[9px] font-mono text-center text-slate-600">
                          {product.storage} · Sellado
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                        NUEVO
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRetrievePhone}
                      className="mt-3 px-4 py-2 bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 mx-auto"
                    >
                      <PackageCheck className="w-4 h-4" />
                      <span>Retirar mi nuevo teléfono</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 mx-auto flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-white block">
                      ¡Teléfono retirado con éxito!
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">
                      Disfruta de tu nuevo equipo
                    </span>
                  </div>
                )}
              </div>

              {/* Compartment Door Control Button */}
              {!isCompartmentOpen ? (
                <button
                  type="button"
                  onClick={handleOpenCompartment}
                  className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <PackageCheck className="w-4 h-4" />
                  <span>Abrir bandeja y recoger smartphone</span>
                </button>
              ) : (
                <div className="text-center py-1">
                  <span className="text-xs text-emerald-400 font-mono flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Bandeja iluminada lista para retiro
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Transaction Details & Warranty Policy (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs font-mono text-yellow-300 uppercase font-bold block mb-1">
                COMPROBANTE DE INTERCAMBIO
              </span>
              <div className="text-xs space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Folio:</span>
                  <span className="font-mono font-bold text-white">#CP-2026-94810</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Equipo entregado:</span>
                  <span className="font-bold text-white">{CURRENT_TRADE_IN_DEVICE.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bonificación:</span>
                  <span className="font-bold text-emerald-400">
                    −${CURRENT_TRADE_IN_DEVICE.estimatedValue.toLocaleString('es-MX')} MXN
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nuevo equipo:</span>
                  <span className="font-bold text-yellow-300">
                    {product.brand} {product.model}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1.5 mt-1.5">
                  <span className="text-slate-300 font-bold">Estado:</span>
                  <span className="text-emerald-400 font-bold">Completado y Liquidado</span>
                </div>
              </div>
            </div>

            {/* Warranty & Security Badges */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantía Coppel de 12 meses aplicable en cualquier tienda nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Borrado de datos militares certificado del teléfono anterior</span>
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  audio.playClick();
                  setShowReceiptModal(true);
                }}
                className="flex-1 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-600 transition-colors"
              >
                <Printer className="w-4 h-4 text-yellow-400" />
                <span>Imprimir Ticket</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  audio.playClick();
                  setShowReceiptModal(true);
                }}
                className="flex-1 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-600 transition-colors"
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>QR Digital</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button: Restart Kiosk for Next Customer */}
      <div className="max-w-md mx-auto w-full pt-1">
        <button
          type="button"
          onClick={() => {
            audio.playClick();
            onRestart();
          }}
          className={`w-full py-5 px-8 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black tracking-wide uppercase transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl border-2 border-yellow-500/50 cursor-pointer ${
            isLargeText ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
          }`}
        >
          <RefreshCw className="w-6 h-6 stroke-[2.5]" />
          <span>Finalizar y reiniciar</span>
        </button>
      </div>

      {/* Ticket Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-slate-950 shadow-2xl border-4 border-yellow-400 text-center animate-in fade-in zoom-in-95">
            <CoppelKeyLogo size="sm" variant="dark" />
            <h4 className="font-black text-lg mt-2">Ticket de Intercambio</h4>
            <p className="text-xs text-slate-500">Tienda Coppel Centro · Kiosco Digital #01</p>

            <div className="my-4 p-3 bg-slate-50 rounded-xl text-left font-mono text-xs space-y-1 border border-slate-200">
              <div className="flex justify-between">
                <span>Fecha:</span>
                <span>{new Date().toLocaleDateString('es-MX')}</span>
              </div>
              <div className="flex justify-between">
                <span>Entregado:</span>
                <span>{CURRENT_TRADE_IN_DEVICE.model}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Bonificación:</span>
                <span>−${CURRENT_TRADE_IN_DEVICE.estimatedValue.toLocaleString('es-MX')}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-slate-300">
                <span>Adquirido:</span>
                <span>{product.brand} {product.model}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-[#004F9F] pt-1">
                <span>Total pagado:</span>
                <span>${(product.price - CURRENT_TRADE_IN_DEVICE.estimatedValue).toLocaleString('es-MX')} MXN</span>
              </div>
            </div>

            <div className="p-4 bg-slate-100 rounded-2xl flex flex-col items-center justify-center mb-4">
              <div className="w-28 h-28 bg-white p-2 rounded-xl shadow-xs border border-slate-300 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>
              <span className="text-[10px] text-slate-500 mt-2">
                Escanea con la App Coppel para guardar tu póliza de garantía
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                audio.playClick();
                setShowReceiptModal(false);
              }}
              className="w-full py-3 rounded-xl bg-[#004F9F] hover:bg-[#003D82] text-white font-bold text-xs uppercase"
            >
              Cerrar Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
