"use client";
import { useState } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import QuickAdd from "./QuickAdd";
import TopSpendingSection from "./TopSpendingSection";
import { useFinance } from "@/context/FinanceContext";

const Dashboard = () => {
  const { income, totalExpenses, transactions, budgets } = useFinance();
  const [loading, setLoading] = useState(transactions === undefined ? true : false);
  console.log("Total Expenses in Dashboard:", totalExpenses);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-indigo-600 dark:text-indigo-400 text-xl font-semibold animate-pulse">
          Loading Your Finances...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        <div
          className={`rounded-2xl p-6 text-white shadow-lg transition-all ${income - totalExpenses >= 0
            ? "bg-gradient-to-br from-slate-800 to-slate-900"
            : "bg-gradient-to-br from-rose-500 to-rose-600"
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-1">
                Total Balance
              </p>
              <h2 className="text-3xl font-bold">₹{income - totalExpenses}</h2>
            </div>
            <Wallet className="w-10 h-10 opacity-30" />
          </div>
        </div>

        <div className="rounded-2xl p-6 shadow-sm border border-emerald-100 dark:border-emerald-900/20 transition-all bg-gradient-to-br from-emerald-400 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-50 text-xs font-bold uppercase tracking-wider mb-1">Monthly Income</p>
              <h2 className="text-3xl font-bold">+ {income}</h2>
            </div>
            <div className="bg-emerald-100/20 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-emerald-50" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 dark:border-rose-900/20 transition-all bg-gradient-to-br from-rose-400 to-rose-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-50 text-xs font-bold uppercase tracking-wider mb-1">Monthly Expenses</p>
              <h2 className="text-3xl font-bold">- ₹{totalExpenses}</h2>
            </div>
            <div className="bg-rose-100/20 p-3 rounded-xl">
              <TrendingDown className="w-6 h-6 text-rose-50" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <QuickAdd />
        <TopSpendingSection />
      </div>
    </div>);
};

export default Dashboard;
