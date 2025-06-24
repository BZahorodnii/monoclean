'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppDataI {
  nav?: any,
  strings?: any,
  pages?: any,
  pagesBlock?: any,
  blogSlug?: string | null;
  dialogOpen?: boolean | 'joinWaitlist' | 'becomeACleaner' | 'partnerWithUs' | 'contactUs' | 'downloadAppCleaners' | 'downloadAppCustomers' | 'checkout';
};

interface AppContextI {
  data: AppDataI | null;
  setData: (data: AppDataI) => void;
};

const AppContext = createContext<AppContextI | null>(null);

export const useAppContext = (): AppContextI => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');

  return context;
};

export const AppProvider: React.FC<{ children: ReactNode, initialData: AppDataI }> = ({ children, initialData }) => {
  const [data, setData] = useState<AppDataI>(initialData);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};