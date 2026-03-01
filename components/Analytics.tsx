'use client';
import React, { useMemo } from "react";
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3 } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

const COLORS = ["#6366f1", "#10b981", "#f43f5e", "#fbbf24", "#64748b"];

export default function Analytics() {
  const { transactions, income, totalExpenses } = useFinance();

  const categoryData = useMemo(() => {
    const totals: Record<string, number> = {};
    const now = new Date();

    transactions
      .filter(tx => {
        const d = new Date(tx.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .forEach(tx => {
        totals[tx.category] = (totals[tx.category] || 0) + tx.amount;
      });

    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const barData = [
    { name: "Monthly", income, expenses: totalExpenses },
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm uppercase font-bold tracking-wider">Total Income</p>
              <p className="text-3xl font-bold">₹{income.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-teal-200 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rose-100 text-sm uppercase font-bold tracking-wider">Total Expenses</p>
              <p className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-12 h-12 text-rose-200 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm uppercase font-bold tracking-wider">Net Balance</p>
              <p className="text-3xl font-bold">₹{(income - totalExpenses).toLocaleString()}</p>
            </div>
            <DollarSign className="w-12 h-12 text-indigo-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart: Spending Distribution */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 dark:text-white">Spending Distribution</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#1e293b',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Income vs Expenses */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 dark:text-white">Income vs Expenses</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" hide />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#1e293b',
                    color: '#fff'
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
