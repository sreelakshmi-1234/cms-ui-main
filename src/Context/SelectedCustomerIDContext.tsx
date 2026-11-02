import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface SelectedCustomerContextType {
  selectedCustomerID: string | null;
  setSelectedCustomerID: (id: string) => void;
}

const SelectedCustomerContext = createContext<SelectedCustomerContextType | undefined>(undefined);

export const SelectedCustomerIDProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCustomerID, setSelectedCustomerID] = useState<string | null>(() => {
    return localStorage.getItem('SelectedCustomerId');
  });

  useEffect(() => {
    if (selectedCustomerID) {
      localStorage.setItem('SelectedCustomerId', selectedCustomerID);
    }
  }, [selectedCustomerID]);

  return (
    <SelectedCustomerContext.Provider value={{ selectedCustomerID, setSelectedCustomerID }}>
      {children}
    </SelectedCustomerContext.Provider>
  );
};

export const useSelectedCustomerIDContext = () => {
  const context = React.useContext(SelectedCustomerContext);
  if (!context) {
    throw new Error('useSelectedCustomerContext must be used within a SelectedCustomerProvider');
  }
  return context;
};
