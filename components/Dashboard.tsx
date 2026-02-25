"use client";
import { useState } from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import QuickAdd from "./QuickAdd";
import TopSpendingSection from "./TopSpendingSection";
import SavingsRateSection from "./SavingsRateSection";
import { useFinance } from "@/context/FinanceContext";

const Dashboard = () => {
  const { income, totalExpenses, transactions, budgets } = useFinance();
  const [loading, setLoading] = useState(transactions === undefined ? true : false);
  console.log("Total Expenses in Dashboard:", totalExpenses);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-stone-900 dark:to-stone-800 flex items-center justify-center">
        <div className="text-orange-600 dark:text-orange-400 text-xl font-semibold animate-pulse">
          Loading Your Finances...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
        <div
          className={`rounded-2xl p-6 text-white shadow-lg transition-all ${1 >= 0
            ? "bg-gradient-to-br from-orange-500 to-amber-600"
            : "bg-gradient-to-br from-rose-500 to-red-600"
            }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs font-bold uppercase tracking-wider mb-1">
                Total Balance
              </p>
              <h2 className="text-3xl font-bold">₹{income - totalExpenses}</h2>
            </div>
            <Wallet className="w-10 h-10 opacity-30" />
          </div>
        </div>

        <div className="rounded-2xl p-6 shadow-sm border border-orange-100 transition-all bg-gradient-to-br from-amber-400 to-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-xs font-bold uppercase tracking-wider mb-1">Monthly Income</p>
              <h2 className="text-3xl font-bold text-stone-800">+ {income}</h2>
            </div>
            <div className="bg-amber-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 transition-all bg-gradient-to-br from-rose-400 to-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-100 text-xs font-bold uppercase tracking-wider mb-1">Monthly Expenses</p>
              <h2 className="text-3xl font-bold text-stone-800">- ₹{totalExpenses}</h2>
            </div>
            <div className="bg-rose-100 p-3 rounded-xl">
              <TrendingDown className="w-6 h-6 text-rose-600" />
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
