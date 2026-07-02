export interface Country {
  id: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  code: string;
  multiplier: number; // Exchange rate relative to USD
}

export const globalCountries: Country[] = [
  { id: 'usa', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', code: 'USD', multiplier: 1 },
  { id: 'uae', name: 'UAE / Dubai', flag: '🇦🇪', currency: 'AED', symbol: 'AED', code: 'AED', multiplier: 3.67 },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', code: 'GBP', multiplier: 0.79 },
  { id: 'india', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', code: 'INR', multiplier: 83.5 },
  { id: 'europe', name: 'Europe', flag: '🇪🇺', currency: 'EUR', symbol: '€', code: 'EUR', multiplier: 0.92 },
  { id: 'singapore', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'S$', code: 'SGD', multiplier: 1.35 },
];
