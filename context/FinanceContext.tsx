'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

interface FinanceContextType {
  transactions: any[];
  budgets: any[];
  savingsGoals: any[];
  addLocalTransaction: (newTx: any) => void;
  deleteLocalTransaction: (txId: number) => void;
  topSpendingCategories: { category: string; amount: number } | null;
  totalExpenses: number;
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

  // CALCULATING TOP SPENDING CATEGORY AND SHOWIN G IT ON THE DASHBOARD PAGE 
  const totalExpenses = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + (tx.amount), 0);
  }, [transactions]);

  // CALCULATING TOTAL EXPENSES AND SHOWING IT ON THE DASHBOARD PAGE IN THE TOP SPENDING COMPONENT
  const topSpendingCategories = useMemo(() => {  
    if(transactions.length === 0) return null;
    const categoryMap : Record<string, number> = {};

    transactions.forEach(tx => {
        categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
    });

    const sorted = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? { category : sorted[0][0], amount: sorted[0][1]} : null;
  },[transactions]);

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      budgets, 
      savingsGoals, 
      addLocalTransaction,
      deleteLocalTransaction,
      topSpendingCategories,
      totalExpenses
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