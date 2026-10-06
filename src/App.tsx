import React, { useState } from 'react';
import { ScreenId, SmartphoneProduct } from './types';
import { MOCK_PHONES } from './data/mockPhones';
import { ScreenHeader } from './components/ScreenHeader';
import { HelpModal } from './components/HelpModal';
import { KioskFrame } from './components/KioskFrame';
import { Screen1Welcome } from './components/screens/Screen1Welcome';
import { Screen2ConnectPhone } from './components/screens/Screen2ConnectPhone';
import { Screen3PhoneDiagnostic } from './components/screens/Screen3PhoneDiagnostic';
import { Screen4EstimatedValue } from './components/screens/Screen4EstimatedValue';
import { Screen5ChoosePhone } from './components/screens/Screen5ChoosePhone';
import { Screen6ProductInfo } from './components/screens/Screen6ProductInfo';
import { Screen7PriceDifference } from './components/screens/Screen7PriceDifference';
import { Screen8Payment } from './components/screens/Screen8Payment';
import { Screen9ExchangeCompleted } from './components/screens/Screen9ExchangeCompleted';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [selectedProduct, setSelectedProduct] = useState<SmartphoneProduct>(MOCK_PHONES[0]); // Samsung Galaxy S25 default
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isKioskChassisMode, setIsKioskChassisMode] = useState(false);

  const handleReset = () => {
    setCurrentScreen(1);
    setSelectedProduct(MOCK_PHONES[0]);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isHighContrast ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
      }`}
    >
      <KioskFrame
        isKioskChassisMode={isKioskChassisMode}
        onToggleChassisMode={() => setIsKioskChassisMode(!isKioskChassisMode)}
      >
        <div className="w-full flex-1 flex flex-col justify-between min-h-[720px] bg-slate-50 relative overflow-hidden">
          {/* Top Kiosk Header */}
          <ScreenHeader
            currentScreen={currentScreen}
            onGoToScreen={(screenId) => setCurrentScreen(screenId)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onReset={handleReset}
            isHighContrast={isHighContrast}
            onToggleContrast={() => setIsHighContrast(!isHighContrast)}
            isLargeText={isLargeText}
            onToggleLargeText={() => setIsLargeText(!isLargeText)}
          />

          {/* Active Screen Container with smooth render */}
          <main className="flex-1 flex flex-col w-full relative z-10">
            {currentScreen === 1 && (
              <Screen1Welcome
                onStart={() => setCurrentScreen(2)}
                onOpenHowItWorks={() => setIsHelpOpen(true)}
                isLargeText={isLargeText}
              />
            )}

            {currentScreen === 2 && (
              <Screen2ConnectPhone
                onStartDiagnostic={() => setCurrentScreen(3)}
                isLargeText={isLargeText}
              />
            )}

            {currentScreen === 3 && (
              <Screen3PhoneDiagnostic
                onComplete={() => setCurrentScreen(4)}
                isLargeText={isLargeText}
              />
            )}

            {currentScreen === 4 && (
              <Screen4EstimatedValue
                onContinue={() => setCurrentScreen(5)}
                isLargeText={isLargeText}
              />
            )}

            {currentScreen === 5 && (
              <Screen5ChoosePhone
                onSelectProduct={(product) => {
                  setSelectedProduct(product);
                  setCurrentScreen(6);
                }}
                isLargeText={isLargeText}
              />
            )}

            {currentScreen === 6 && (
              <Screen6ProductInfo
                product={selectedProduct}
                onBack={() => setCurrentScreen(5)}
                onConfirmSelection={(product) => {
                  setSelectedProduct(product);
                  setCurrentScreen(7);
                }}
                isLargeText={isLargeText}
              />
            )}

            {currentScreen === 7 && (
              <Screen7PriceDifference
                product={selectedProduct}
                onContinueToPayment={() => setCurrentScreen(8)}
                onChangePhone={() => setCurrentScreen(5)}
                isLargeText={isLargeText}
              />
            )}

            {currentScreen === 8 && (
              <Screen8Payment
                product={selectedProduct}
                onPaymentSuccess={() => setCurrentScreen(9)}
                isLargeText={isLargeText}
              />
            )}

            {currentScreen === 9 && (
              <Screen9ExchangeCompleted
                product={selectedProduct}
                onRestart={handleReset}
                isLargeText={isLargeText}
              />
            )}
          </main>

          {/* Subtle Machine Footnote */}
          <footer className="w-full bg-slate-100 border-t border-slate-200/80 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Kiosco #01 · En línea con Sucursal Coppel</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Soporte telefónico: 800 220 7735</span>
              <span>·</span>
              <span>Garantía Coppel 2026</span>
            </div>
          </footer>
        </div>
      </KioskFrame>

      {/* Help / Guidance Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
