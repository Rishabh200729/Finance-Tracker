'use client';

import { useState } from "react";
import upsertBudget from "../actions/addBudget";
import { useFinance } from "../context/FinanceContext";
import { form } from "framer-motion/client";

const AddBudget = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const { totalBudgets, income, updateLocalBudgets } = useFinance();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Logic: Use custom category if provided, otherwise use dropdown
    if (customCategory.trim() !== "") {
      formData.set("category", customCategory.trim());
    }
    if(formData.get("limit") && income) {
      const limitValue = parseFloat(formData.get("limit") as string);
      if(limitValue > income) {
        alert("Budget limit cannot exceed total income.");
        setLoading(false);
        return;
      }
    }
    if(income - totalBudgets < parseFloat(formData.get("limit") as string)) {
      alert("You don't have enough remaining income to allocate this budget.");
      setLoading(false);
      return;
    }
    const res = await upsertBudget(formData);
    if (res.succcess) {
      updateLocalBudgets(res.newBudget);
      onClose();
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
          {/* Category Dropdown */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2 block">
              Select Category
            </label>
            <select
              name="category"
              disabled={customCategory.length > 0}
              className={`w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none text-slate-900 dark:text-slate-100 transition-opacity ${customCategory.length > 0 ? 'opacity-50' : 'opacity-100'}`}
            >
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Rent">Rent</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-400 uppercase font-medium">Or</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* New Category Input */}
          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2 block">
              Create New Category
            </label>
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="e.g. Gym, Travel..."
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
            className="flex-1 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Budget"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBudget;