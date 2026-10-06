export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface SmartphoneProduct {
  id: string;
  brand: string;
  model: string;
  storage: string;
  price: number;
  originalPrice?: number;
  color: string;
  colorHex: string;
  features: string[];
  specs: {
    screen: string;
    processor: string;
    camera: string;
    battery: string;
    os: string;
  };
  coppelBiweeklyInstallment: number; // Abono quincenal con Crédito Coppel
  inStock: boolean;
  imageType: 's25' | 'iphone16' | 'xiaomi14t' | 'moto50' | 'pixel9' | 'honor6';
}

export interface DiagnosticCategory {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  status: 'pending' | 'checking' | 'passed';
  metric: string;
}

export interface TradeInDevice {
  model: string;
  storage: string;
  condition: string;
  aestheticScore: string;
  estimatedValue: number;
}
