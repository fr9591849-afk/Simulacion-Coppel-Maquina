import React from 'react';
import { X, PhoneCall, CheckCircle2, ShieldCheck, Zap, HelpCircle } from 'lucide-react';
import { audio } from '../utils/audio';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border-4 border-yellow-400 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
              Guía de Ayuda al Cliente
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              ¿Cómo funciona el Centro de Intercambio Coppel?
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Simple Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-[#004F9F] text-yellow-300 font-black text-xl flex items-center justify-center mb-3 shadow-sm">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Diagnóstico Rápido</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conectas tu teléfono al cable seguro. El kiosco revisa pantalla, batería, cámaras y memoria en 30 segundos.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-yellow-50/60 border border-yellow-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-yellow-400 text-slate-950 font-black text-xl flex items-center justify-center mb-3 shadow-sm">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Valuación Inmediata</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recibes una oferta garantizada en pesos que se descuenta directamente del precio de tu nuevo teléfono.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center mb-3 shadow-sm">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Estrena al Instante</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pagas solo la diferencia con tarjeta o Crédito Coppel y retiras tu nuevo smartphone de la bandeja de entrega.
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
            <span>Borrado certificado de datos personales</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500 shrink-0" />
            <span>Garantía de 1 año en tienda Coppel</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Equipos 100% originales y liberados</span>
          </div>
        </div>

        {/* Store Advisor Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-center sm:text-left">
            <span className="text-xs text-slate-500 block">¿Necesitas ayuda de una persona?</span>
            <span className="text-sm font-bold text-slate-900">
              Solicita asistencia al asesor del departamento de telefonía
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              alert('Asesor Coppel notificado. Un colaborador se acercará a la máquina en breve para apoyarte.');
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#004F9F] hover:bg-[#003D82] active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-yellow-400" />
            <span>Llamar a un asesor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
