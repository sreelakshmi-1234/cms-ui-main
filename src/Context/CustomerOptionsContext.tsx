import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface Customer {
  value: string;
  label: string;
}

interface CustomerContextType {
  customerOptions: Customer[] | null;
  setCustomerOptions: (customers: Customer[]) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerOptionsProvider = ({ children }: { children: ReactNode }) => {
  const [customerOptions, setCustomerOptions] = useState<Customer[] | null>(() => {
    const savedCustomers = localStorage.getItem('customerOptions');
    return savedCustomers ? JSON.parse(savedCustomers) : null;
  });

  useEffect(() => {
    if (customerOptions) {
      localStorage.setItem('customerOptions', JSON.stringify(customerOptions));
    }
  }, [customerOptions]);

  return (
    <CustomerContext.Provider value={{ customerOptions, setCustomerOptions }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerOptionsContext = () => {
  const context = React.useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerOptionsContext must be used within a CustomerProvider');
  }
  return context;
};
