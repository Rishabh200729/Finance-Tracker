'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

interface Transaction {
  id: number;
  amount: number;
  category: string;
  date: string | Date;
  description?: string | null;
}

interface Budget {
  id: number;
  userId: number;
  category: string;
  spent: number;
  limit: number;
}

interface SavingsGoal {
  id: number;
  userId: number;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string | Date | null;
}

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  addLocalTransaction: (newTx: Transaction) => void;
  updateLocalBudgets: (newBudget: Budget) => void;
  deleteLocalTransaction: (txId: number) => void;
  topSpendingCategories: { category: string; amount: number } | null;
  totalExpenses: number;
  income: number;
  updateIncome: (newIncome: number) => void;
  totalBudgets: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({
  children,
  initialData
}: {
  children: React.ReactNode,
  initialData: any
}) {
  console.log("Initial Data in FinanceProvider:", initialData);
  // 1. Initialize all states from the master fetcher
  const [transactions, setTransactions] = useState<Transaction[]>(initialData?.transactions || []);
  const [budgets, setBudgets] = useState<Budget[]>(initialData?.budgets || []);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(initialData?.savingsGoals || []);
  const [income, setIncome] = useState<number>(initialData?.monthlyIncomes?.length > 0 ? initialData.monthlyIncomes[0].amount : 0);
  const [totalBudgets, setTotalBudgets] = useState<number>(budgets.reduce((sum, b) => sum + b.limit, 0));

  // 1.5 Initialize aggregated stats from server
  const [totalExpenses, setTotalExpenses] = useState<number>(initialData?.calculatedStats?.monthlyExpenses || 0);
  const [topSpendingCategories, setTopSpendingCategories] = useState<{ category: string; amount: number } | null>(
    initialData?.calculatedStats?.topSpendingCategory || null
  );

  // 2. Helper to add transaction to the top of the list instantly
  const addLocalTransaction = (newTx: Transaction) => {
    setTransactions((prev: Transaction[]) => [newTx, ...prev]);
    //update total expenses if it's in the current month
    const now = new Date();
    const txDate = new Date(newTx.date);
    if (txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear()) {
      setTotalExpenses((prev: number) => prev + newTx.amount);
    }
  };
  // update the budgets list after creating or updating a budget, by checking if the budget already exists in the list and updating it, otherwise adding it to the list
  const updateLocalBudgets = (newBudget: Budget) => {
    setBudgets((prev: Budget[]) => {
      const existingIndex = prev.findIndex(b => b.id === newBudget.id);

      if (existingIndex !== -1) {
        const updatedBudgets = [...prev];
        updatedBudgets[existingIndex] = newBudget;
        return updatedBudgets;
      }
      return [...prev, newBudget];
    });
  };
  // delete a transaction from the transactions list by filtering it out based on the transaction id
  const deleteLocalTransaction = (txId: number) => {
    setTransactions((prev: Transaction[]) => {
      const txToDelete = prev.find(t => t.id === txId);
      if (txToDelete) {
        const now = new Date();
        const txDate = new Date(txToDelete.date);
        // on the frontend, decrement total expenses if the transaction is in the current month
        if (txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear()) {
          setTotalExpenses((cur: number) => cur - txToDelete.amount);
        }
      }
      return prev.filter(tx => tx.id !== txId);
    });
  }

  // update income or create a new income if it doesn't exist, and update the income state in the context
  const updateIncome = (newIncome: number) => {
    setIncome(newIncome);
  }
  return (
    <FinanceContext.Provider value={{
      transactions,
      budgets,
      savingsGoals,
      addLocalTransaction,
      deleteLocalTransaction,
      topSpendingCategories,
      totalExpenses,
      updateLocalBudgets,
      income,
      updateIncome,
      totalBudgets
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