import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Alert {
  id: string;
  purity: number;
  target: number;
  active: boolean;
}

interface AlertsContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  removeAlert: (id: string) => void;
  toggleAlert: (id: string) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

const STORAGE_KEY = '@user_alerts';

export const AlertsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setAlerts(JSON.parse(saved));
        } else {
          // Default initial alert
          setAlerts([{ id: 'default', purity: 24, target: 7400, active: true }]);
        }
      } catch (e) {
        console.error('Failed to load alerts', e);
      }
    };
    loadAlerts();
  }, []);

  const saveAlerts = async (newAlerts: Alert[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAlerts));
    } catch (e) {
      console.error('Failed to save alerts', e);
    }
  };

  const addAlert = (alert: Omit<Alert, 'id'>) => {
    const newAlert = { ...alert, id: Date.now().toString() };
    const updated = [...alerts, newAlert];
    setAlerts(updated);
    saveAlerts(updated);
  };

  const removeAlert = (id: string) => {
    const updated = alerts.filter(a => a.id !== id);
    setAlerts(updated);
    saveAlerts(updated);
  };

  const toggleAlert = (id: string) => {
    const updated = alerts.map(a => a.id === id ? { ...a, active: !a.active } : a);
    setAlerts(updated);
    saveAlerts(updated);
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, removeAlert, toggleAlert }}>
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (!context) throw new Error('useAlerts must be used within an AlertsProvider');
  return context;
};
