'use client';

import upsertIncome from "@/actions/upsertIncome";
import { useFinance } from "@/context/FinanceContext";
import { useState, useEffect } from "react";
import { Banknote, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

const IncomePage = () => {
  const { income, updateIncome } = useFinance();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleUpdateIncome = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await upsertIncome(income, formData);

      if (res.success && res.income !== undefined) {
        updateIncome(res.income);
        setMessage({ type: 'success', text: 'Income updated successfully!' });
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: 'error', text: res.error || 'Failed to update income.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner className="!w-12 !h-12 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Income Management</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Track your total earnings and maintain an accurate overview of your financial foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Balance Card */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
          <div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 w-fit rounded-2xl mb-6">
              <Banknote className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider mb-2">Total Income</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white">
              ₹{income?.toLocaleString("en-IN") || "0"}
            </h3>
          </div>
          <div className="mt-8 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <TrendingUp size={16} />
            <span>Ready to allocate</span>
          </div>
        </div>

        {/* Update Form Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Update Your Settings</h3>

          <form onSubmit={handleUpdateIncome} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="income" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                New Total Income Amount
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                <input
                  id="income"
                  name="income"
                  type="number"
                  placeholder="Enter your total monthly/annual income"
                  required
                  className="w-full pl-10 pr-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-lg font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${message.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-800'
                }`}>
                {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <p className="font-bold text-sm">{message.text}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <LoadingSpinner /> : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncomePage;