'use client';

import { useFinance } from "@/context/FinanceContext";
import Budget from "@/components/Budget";
import AddBudget from "@/components/AddBudget";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const Page = () => {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { budgets } = useFinance();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner className="!w-12 !h-12 text-indigo-600" />
      </div>
    );
  }
  return (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={() => setShowAddBudget(true)}
        className="px-6 py-2 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all"
      >
        + Create Budget
      </button>
    </div>
    {budgets.map((budget) => (
      <Budget key={budget.id} budget={budget} />
    ))}
    {showAddBudget && <AddBudget onClose={() => setShowAddBudget(false)} />}
  </div>
  );
};

export default Page;
