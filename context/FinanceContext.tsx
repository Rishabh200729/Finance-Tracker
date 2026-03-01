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
  deleteLocalTransaction: (txId: number) => void;
  updateLocalBudgets: (newBudget: Budget) => void;

  topSpendingCategories: { category: string; amount: number } | null;
  totalExpenses: number;
  totalBudgets: number;

  income: number;
  updateIncome: (newIncome: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({
  children,
  initialData
}: {
  children: React.ReactNode;
  initialData: any;
}) {

  console.log("Initial Data in FinanceProvider:", initialData);

  // Raw data to be stored in useState - this is the source of truth for the context
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialData?.transactions || []
  );

  const [budgets, setBudgets] = useState<Budget[]>(
    initialData?.budgets || []
  );

  const [savingsGoals] = useState<SavingsGoal[]>(
    initialData?.savingsGoals || []
  );

  const [income, setIncome] = useState<number>(
    initialData?.monthlyIncomes?.length > 0
      ? initialData.monthlyIncomes[0].amount
      : 0
  );

  // Derived state - these are computed from the raw data and will update when the raw data changes
  const totalExpenses = useMemo(() => {
    const now = new Date();

    return transactions
      .filter((tx) => {
        const d = new Date(tx.date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

  }, [transactions]);


  const topSpendingCategories = useMemo(() => {
    const now = new Date();

    const monthlyTransactions = transactions.filter((tx) => {
      const d = new Date(tx.date);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });

    const categoryTotals: Record<string, number> = {};

    monthlyTransactions.forEach((tx) => {
      categoryTotals[tx.category] =
        (categoryTotals[tx.category] || 0) + tx.amount;
    });

    let top: { category: string; amount: number } | null = null;

    for (const [category, amount] of Object.entries(categoryTotals)) {
      if (!top || amount > top.amount) {
        top = { category, amount };
      }
    }

    return top;

  }, [transactions]);


  const totalBudgets = useMemo(() => {
    return budgets.reduce((sum, b) => sum + b.limit, 0);
  }, [budgets]);


  //  Mutations
  const addLocalTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };


  const deleteLocalTransaction = (txId: number) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== txId));
  };


  const updateLocalBudgets = (newBudget: Budget) => {
    setBudgets((prev) => {

      const existingIndex = prev.findIndex((b) => b.id === newBudget.id);

      if (existingIndex !== -1) {
        const updated = [...prev];
        console.log(updated)
        updated[existingIndex] = newBudget;
        return updated;
      }

      return [...prev, newBudget];
    });
  };


  const updateIncome = (newIncome: number) => {
    setIncome(newIncome);
  };


  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        savingsGoals,

        addLocalTransaction,
        deleteLocalTransaction,
        updateLocalBudgets,

        topSpendingCategories,
        totalExpenses,
        totalBudgets,

        income,
        updateIncome
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}



export const useFinance = () => {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance must be used within FinanceProvider");
  }

  return context;
};