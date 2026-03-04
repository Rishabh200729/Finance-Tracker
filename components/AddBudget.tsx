'use client';

import { useState, useEffect } from "react";
import upsertBudget from "../actions/addBudget";
import { useFinance } from "../context/FinanceContext";
import { motion } from "framer-motion";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

const AddBudget = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { budgets, totalBudgets, income, updateLocalBudgets, selectedMonth, selectedYear } = useFinance();

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Find if category exists (strictly for UX labels)
  const isUpdating = budgets.some(b =>
    b.category.toLowerCase() === category.trim().toLowerCase() &&
    b.month === MONTH_NAMES[selectedMonth] &&
    b.year === selectedYear.toString()
  );

  // Auto clean error after 5 seconds
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formData.set("category", category.trim());
    formData.set("month", MONTH_NAMES[selectedMonth]);
    formData.set("year", selectedYear.toString());

    const res = await upsertBudget(formData);

    if (res.success && res.newBudget) {
      updateLocalBudgets(res.newBudget);
      onClose();
    } else {
      setError(res.error || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 p-8 rounded-3xl w-full max-w-md shadow-2xl border border-transparent dark:border-slate-800 transition-all"
      >
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
          Create Budget
        </h2>

        <div className="space-y-5">
          {/* Category Input */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2 block">
              Budget Category
            </label>
            <input
              name="category"
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="e.g. Food, Gym, Travel..."
            />
          </div>

          {/* Monthly Limit */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2 block">
              Monthly Limit
            </label>
            <input
              name="limit"
              type="number"
              required
              placeholder="e.g. 5000"
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">Remaining Income: ₹{income - totalBudgets}</p>
        </div>

        {/* Error Notification */}
        <ErrorMessage message={error} />
        <div className="flex gap-3 mt-10">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 text-slate-500 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 text-white rounded-2xl font-bold transition-all disabled:opacity-50 shadow-lg ${isUpdating
              ? "bg-teal-600 hover:bg-teal-700 shadow-teal-200 dark:shadow-none"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                <span>Saving...</span>
              </div>
            ) : (isUpdating ? "Update Budget" : "Save Budget")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBudget;