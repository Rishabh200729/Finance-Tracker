"use client";
import React, { useState } from "react";
import { User, Transaction, Budgets } from "../models/models";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const Dashboard = ({ user }: { user: User | null }) => {
  const [loading, setLoading] = useState(user ? false : true);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-indigo-600 text-xl font-semibold animate-pulse">
          Loading Your Finances...
        </div>
      </div>
    );
  }

  return (
    // components/Dashboard.tsx
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
      <div
        className={`rounded-2xl p-6 text-white shadow-lg transition-all ${
          1 >= 0
            ? "bg-gradient-to-br from-indigo-500 to-blue-600"
            : "bg-gradient-to-br from-orange-500 to-red-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">
              Total Balance
            </p>
            <h2 className="text-3xl font-bold">₹1</h2>
          </div>
          <Wallet className="w-10 h-10 opacity-30" />
        </div>
      </div>

      <div className="rounded-2xl p-6 shadow-sm border border-emerald-100 transition-all bg-gradient-to-br from-green-400 to-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Monthly Income</p>
              <h2 className="text-3xl font-bold text-gray-800">+ ₹1</h2>
            </div>
            <div className="bg-emerald-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 transition-all bg-gradient-to-br from-rose-400 to-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-100 text-xs font-bold uppercase tracking-wider mb-1">Monthly Expenses</p>
              <h2 className="text-3xl font-bold text-gray-800">- ₹1</h2>
            </div>
            <div className="bg-rose-100 p-3 rounded-xl">
              <TrendingDown className="w-6 h-6 text-rose-600" />
            </div>
          </div>
        </div>
        </div>
  );
};

export default Dashboard;
