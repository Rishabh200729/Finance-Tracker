'use client';
import React, { createContext, useContext, useState } from 'react';

interface FinanceContextType {
  transactions: any[];
  budgets: any[];
  savingsGoals: any[];
  addLocalTransaction: (newTx: any) => void;
  deleteLocalTransaction: (txId: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ 
  children, 
  initialData 
}: { 
  children: React.ReactNode, 
  initialData: any 
}) {
  // 1. Initialize all states from the master fetcher
  const [transactions, setTransactions] = useState(initialData?.transactions || []);
  const [budgets, setBudgets] = useState(initialData?.budgets || []);
  const [savingsGoals, setSavingsGoals] = useState(initialData?.savingsGoals || []);

  // 2. Helper to add transaction to the top of the list instantly
  const addLocalTransaction = (newTx: any) => {
    setTransactions((prev) => [newTx, ...prev]);
  };
  const deleteLocalTransaction = (txId: number) => {
    setTransactions((prev) => prev.filter(tx => tx.id !== txId));
  }

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      budgets, 
      savingsGoals, 
      addLocalTransaction,
      deleteLocalTransaction,
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within FinanceProvider");
  return context;
};