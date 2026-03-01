import addTransaction from "@/actions/addTransaction";
import { DollarSign } from "lucide-react";
import React from "react";
import { useFinance } from "@/context/FinanceContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

const QuickAdd = () => {
  const { addLocalTransaction, updateLocalBudgets, budgets } = useFinance();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto clean error after 5 seconds
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await addTransaction(new FormData(e.currentTarget as HTMLFormElement));

    if (res.success && 'newTransaction' in res && 'newBudget' in res) {
      (e.target as HTMLFormElement).reset();
      addLocalTransaction(res.newTransaction as any);
      updateLocalBudgets(res.newBudget as any);
      router.push('/dashboard/transactions');
    } else if ('error' in res) {
      setError(res.error || "Failed to add transaction.");
    } else {
      setError("An unexpected error occurred.");
    }
    setLoading(false);
  };


  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">
          <DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="font-bold text-gray-800 dark:text-white">Quick Add</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex-1 flex flex-col justify-between"
      >
        <div className="space-y-3">
          <input
            name="description"
            type="text"
            placeholder="What did you spend on?"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <div className="flex gap-3">
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              className="w-1/2 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <select name="category" className="cursor-pointer appearance-none w-1/2 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm text-slate-500 dark:text-slate-200 outline-none hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus:ring-2 focus:ring-indigo-500">
              {budgets.map((budget) => {
                return <option key={budget.id}>{budget.category}</option>
              })}

            </select>
          </div>
        </div>

        <ErrorMessage message={error} />

        <button
          disabled={loading}
          className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-slate-100 dark:shadow-none mt-4 disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner />
              <span>Adding...</span>
            </div>
          ) : "Add Transaction"}
        </button>
      </form >
    </div >
  );
};

export default QuickAdd;
