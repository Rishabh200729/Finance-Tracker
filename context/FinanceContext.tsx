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
  month: string;
  year: string;
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

  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
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

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  // Derived state - these are computed from the raw data and will update when the raw data changes
  const totalExpenses = useMemo(() => {
    return transactions
      .filter((tx) => {
        const d = new Date(tx.date);
        return (
          d.getMonth() === selectedMonth &&
          d.getFullYear() === selectedYear
        );
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

  }, [transactions, selectedMonth, selectedYear]);


  const topSpendingCategories = useMemo(() => {
    const monthlyTransactions = transactions.filter((tx) => {
      const d = new Date(tx.date);
      return (
        d.getMonth() === selectedMonth &&
        d.getFullYear() === selectedYear
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

  }, [transactions, selectedMonth, selectedYear]);


  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const filteredBudgets = useMemo(() => {
    return budgets.filter(b =>
      b.month === MONTH_NAMES[selectedMonth] &&
      b.year === selectedYear.toString()
    );
  }, [budgets, selectedMonth, selectedYear]);

  const totalBudgets = useMemo(() => {
    return filteredBudgets.reduce((sum, b) => sum + b.limit, 0);
  }, [filteredBudgets]);


  //  Mutations
  const addLocalTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);

    // Also update the budget spent amount locally if it exists for this month
    const d = new Date(newTx.date);
    const txMonth = MONTH_NAMES[d.getMonth()];
    const txYear = d.getFullYear().toString();

    setBudgets(prev => prev.map(b => {
      if (b.category === newTx.category && b.month === txMonth && b.year === txYear) {
        return { ...b, spent: b.spent + newTx.amount };
      }
      return b;
    }));
  };


  const deleteLocalTransaction = (txId: number) => {
    const txToDelete = transactions.find(t => t.id === txId);
    if (txToDelete) {
      const d = new Date(txToDelete.date);
      const txMonth = MONTH_NAMES[d.getMonth()];
      const txYear = d.getFullYear().toString();

      setBudgets(prev => prev.map(b => {
        if (b.category === txToDelete.category && b.month === txMonth && b.year === txYear) {
          return { ...b, spent: Math.max(0, b.spent - txToDelete.amount) };
        }
        return b;
      }));
    }
    setTransactions((prev) => prev.filter((tx) => tx.id !== txId));
  };


  const updateLocalBudgets = (newBudget: Budget) => {
    setBudgets((prev) => {
      const existingIndex = prev.findIndex((b) =>
        b.category === newBudget.category &&
        b.month === newBudget.month &&
        b.year === newBudget.year
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
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
        budgets: filteredBudgets,
        savingsGoals,

        addLocalTransaction,
        deleteLocalTransaction,
        updateLocalBudgets,

        topSpendingCategories,
        totalExpenses,
        totalBudgets,

        income,
        updateIncome,

        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear
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