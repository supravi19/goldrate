import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Holding {
  id: string;
  weight: number;
  purity: number;
  label: string;
}

interface PortfolioContextType {
  holdings: Holding[];
  addHolding: (holding: Omit<Holding, 'id'>) => void;
  removeHolding: (id: string) => void;
  totalGrams: (purity: number) => number;
  clearHoldings: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = '@user_holdings';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    const loadHoldings = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setHoldings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load holdings', e);
      }
    };
    loadHoldings();
  }, []);

  const saveHoldings = async (newHoldings: Holding[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHoldings));
    } catch (e) {
      console.error('Failed to save holdings', e);
    }
  };

  const addHolding = (holding: Omit<Holding, 'id'>) => {
    const newHolding = { ...holding, id: Math.random().toString(36).substr(2, 9) };
    const updated = [...holdings, newHolding];
    setHoldings(updated);
    saveHoldings(updated);
  };

  const removeHolding = (id: string) => {
    const updated = holdings.filter(h => h.id !== id);
    setHoldings(updated);
    saveHoldings(updated);
  };

  const clearHoldings = () => {
    setHoldings([]);
    saveHoldings([]);
  };

  const totalGrams = (purity: number) => {
    return holdings
      .filter(h => h.purity === purity)
      .reduce((sum, h) => sum + h.weight, 0);
  };

  return (
    <PortfolioContext.Provider value={{ holdings, addHolding, removeHolding, totalGrams, clearHoldings }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
