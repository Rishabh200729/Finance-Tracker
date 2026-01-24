'use client';
import React, { createContext, useContext, useState } from 'react';

const FinanceContext = createContext<any>(null);

export function FinanceProvider({ children, initialData }: { children: React.ReactNode, initialData: any }) {
  const [transactions, setTransactions] = useState(initialData.transactions);
  const [budgets, setBudgets] = useState(initialData.budgets);

  // This is how you update locally
  const updateBudgetLocally = (category: string, amount: number) => {
    setBudgets((prev: any) => ({ ...prev, [category]: amount }));
  };

  return ( <FinanceContext.Provider value={{ transactions, budgets, updateBudgetLocally }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);