"use client";
import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  LogOut,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Trash2,
  PieChart,
  BarChart3,
  Calendar,
  Target,
} from "lucide-react";
import { User, Transaction, Budgets } from "../models/models";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/actions/logout";
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FinanceTracker = ({ user }: { user: User | null }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState("food");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [budgets, setBudgets] = useState<Budgets>({});
  const [newBudgetCategory, setNewBudgetCategory] = useState("food");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");
  const [loading, setLoading] = useState(user ? false : true);

  const router = useRouter();
  const categories = [
    "food",
    "transport",
    "entertainment",
    "utilities",
    "salary",
    "investment",
    "other",
  ];
  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
  ];

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      router.push("/");
    } else {
      alert(result.error);
    }
  };
  // const loadTransactions = (userId: number) => {
  //   try {
  //     const result = localStorage.getItem(`transactions:${userId}`);
  //     if (result) {
  //       setTransactions(JSON.parse(result));
  //     }
  //   } catch (error) {
  //     setTransactions([]);
  //   }
  // };
  // const loadBudgets = (userId: number) => {
  //   try {
  //     const result = localStorage.getItem(`budgets:${userId}`);
  //     if (result) {
  //       setBudgets(JSON.parse(result));
  //     }
  //   } catch (error) {
  //     setBudgets({});
  //   }
  // };

  // const saveBudgets = (userId: number, newBudgets: Budgets) => {
  //   localStorage.setItem(`budgets:${userId}`, JSON.stringify(newBudgets));
  //   setBudgets(newBudgets);
  // };

  // const addTransaction = () => {
  //   if (!description || !amount || !user) {
  //     alert("Please fill all fields");
  //     return;
  //   }
  //   const newTransaction: Transaction = {
  //     id: Date.now(),
  //     userId: user.id,
  //     description,
  //     amount: parseFloat(amount),
  //     type,
  //     category,
  //     date: new Date().toISOString(),
  //   };
  //   const updatedTransactions = [...transactions, newTransaction];
  //   localStorage.setItem(
  //     `transactions:${user.id}`,
  //     JSON.stringify(updatedTransactions),
  //   );
  //   setTransactions(updatedTransactions);
  //   setDescription("");
  //   setAmount("");
  // };

  // const deleteTransaction = (id: number) => {
  //   if (!user) return;
  //   const updated = transactions.filter((t) => t.id !== id);
  //   localStorage.setItem(`transactions:${user.id}`, JSON.stringify(updated));
  //   setTransactions(updated);
  // };

  // const addBudget = () => {
  //   if (!newBudgetAmount || parseFloat(newBudgetAmount) <= 0 || !user) {
  //     alert("Please enter a valid budget amount");
  //     return;
  //   }
  //   const newBudgets = {
  //     ...budgets,
  //     [newBudgetCategory]: parseFloat(newBudgetAmount),
  //   };
  //   saveBudgets(user.id, newBudgets);
  //   setNewBudgetAmount("");
  // };

  // const removeBudget = (cat: string) => {
  //   if (!user) return;
  //   const newBudgets = { ...budgets };
  //   delete newBudgets[cat];
  //   saveBudgets(user.id, newBudgets);
  // };

  // // --- Analytics Logic ---
  // const calculateStats = () => {
  //   const income = transactions
  //     .filter((t) => t.type === "income")
  //     .reduce((sum, t) => sum + t.amount, 0);
  //   const expenses = transactions
  //     .filter((t) => t.type === "expense")
  //     .reduce((sum, t) => sum + t.amount, 0);
  //   const balance = income - expenses;
  //   return { income, expenses, balance };
  // };

  // const getCategoryExpenses = () => {
  //   const categoryTotals: { [key: string]: number } = {};
  //   transactions
  //     .filter((t) => t.type === "expense")
  //     .forEach((t) => {
  //       categoryTotals[t.category] =
  //         (categoryTotals[t.category] || 0) + t.amount;
  //     });
  //   return Object.entries(categoryTotals).map(([name, value]) => ({
  //     name,
  //     value,
  //   }));
  // };

  // const getMonthlyData = () => {
  //   const monthlyData: {
  //     [key: string]: { month: string; income: number; expenses: number };
  //   } = {};
  //   transactions.forEach((t) => {
  //     const month = new Date(t.date).toLocaleDateString("en-US", {
  //       month: "short",
  //       year: "numeric",
  //     });
  //     if (!monthlyData[month]) {
  //       monthlyData[month] = { month, income: 0, expenses: 0 };
  //     }
  //     if (t.type === "income") {
  //       monthlyData[month].income += t.amount;
  //     } else {
  //       monthlyData[month].expenses += t.amount;
  //     }
  //   });
  //   return Object.values(monthlyData).slice(-6);
  // };

  // const getDailySpending = () => {
  //   const last7Days: { [key: string]: number } = {};
  //   const today = new Date();
  //   for (let i = 6; i >= 0; i--) {
  //     const date = new Date(today);
  //     date.setDate(date.getDate() - i);
  //     const dateStr = date.toLocaleDateString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //     });
  //     last7Days[dateStr] = 0;
  //   }
  //   transactions
  //     .filter((t) => t.type === "expense")
  //     .forEach((t) => {
  //       const transDate = new Date(t.date);
  //       const dateStr = transDate.toLocaleDateString("en-US", {
  //         month: "short",
  //         day: "numeric",
  //       });
  //       if (last7Days[dateStr] !== undefined) {
  //         last7Days[dateStr] += t.amount;
  //       }
  //     });
  //   return Object.entries(last7Days).map(([day, spending]) => ({
  //     day,
  //     spending,
  //   }));
  // };

  // const getBudgetProgress = () => {
  //   const categoryExpenses: { [key: string]: number } = {};
  //   transactions
  //     .filter((t) => t.type === "expense")
  //     .forEach((t) => {
  //       categoryExpenses[t.category] =
  //         (categoryExpenses[t.category] || 0) + t.amount;
  //     });
  //   return Object.entries(budgets).map(([cat, budget]) => ({
  //     category: cat,
  //     budget,
  //     spent: categoryExpenses[cat] || 0,
  //     percentage: Math.min(((categoryExpenses[cat] || 0) / budget) * 100, 100),
  //   }));
  // };

  // const getFinancialInsights = () => {
  //   const stats = calculateStats();
  //   const categoryData = getCategoryExpenses();
  //   const topCategory = categoryData.sort((a, b) => b.value - a.value)[0];
  //   const savingsRate =
  //     stats.income > 0 ? ((stats.balance / stats.income) * 100).toFixed(1) : 0;
  //   return {
  //     topSpendingCategory: topCategory?.name || "N/A",
  //     topSpendingAmount: topCategory?.value || 0,
  //     savingsRate,
  //     avgDailyExpense: (stats.expenses / 30).toFixed(2),
  //     transactionCount: transactions.length,
  //   };
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-indigo-600 text-xl font-semibold animate-pulse">
          Loading Your Finances...
        </div>
      </div>
    );
  }

  // const stats = user
  //   ? calculateStats()
  //   : { income: 0, expenses: 0, balance: 0 };
  // const insights = user ? getFinancialInsights() : null;

  // --- Main Dashboard View ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Finance Tracker
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
          <div className="flex gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: "dashboard", label: "Dashboard", icon: DollarSign },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "budgets", label: "Budgets", icon: Target },
              { id: "transactions", label: "Transactions", icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition whitespace-nowrap shadow-sm ${activeTab === tab.id ? "bg-green-600 text-white shadow-indigo-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceTracker;

/* <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
  {[
    { id: "dashboard", label: "Dashboard", icon: DollarSign },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "budgets", label: "Budgets", icon: Target },
    { id: "transactions", label: "Transactions", icon: Calendar },
  ].map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition whitespace-nowrap shadow-sm ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-indigo-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
    >
      <tab.icon className="w-4 h-4" />
      {tab.label}
    </button>
  ))}
</div>

{activeTab === "dashboard" && (
  <div className="animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm uppercase font-bold tracking-wider">
              Total Income
            </p>
            <p className="text-3xl font-bold">
              ₹{stats.income.toFixed(2)}
            </p>
          </div>
          <TrendingUp className="w-12 h-12 text-emerald-200 opacity-50" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rose-100 text-sm uppercase font-bold tracking-wider">
              Total Expenses
            </p>
            <p className="text-3xl font-bold">
              ₹{stats.expenses.toFixed(2)}
            </p>
          </div>
          <TrendingDown className="w-12 h-12 text-rose-200 opacity-50" />
        </div>
      </div>
      <div
        className={`bg-gradient-to-br ${stats.balance >= 0 ? "from-indigo-400 to-indigo-600" : "from-amber-400 to-amber-600"} rounded-2xl p-6 text-white shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm uppercase font-bold tracking-wider">
              Balance
            </p>
            <p className="text-3xl font-bold">
              ₹{stats.balance.toFixed(2)}
            </p>
          </div>
          <DollarSign className="w-12 h-12 text-indigo-200 opacity-50" />
        </div>
      </div>
    </div>

    {insights && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-purple-600 font-bold uppercase">
            Top Spending
          </p>
          <p className="text-xl font-bold text-purple-800 capitalize">
            {insights.topSpendingCategory}
          </p>
          <p className="text-sm text-purple-600">
            ₹{insights.topSpendingAmount.toFixed(2)}
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-blue-600 font-bold uppercase">
            Savings Rate
          </p>
          <p className="text-xl font-bold text-blue-800">
            {insights.savingsRate}%
          </p>
          <p className="text-sm text-blue-600">of income saved</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-amber-600 font-bold uppercase">
            Daily Avg
          </p>
          <p className="text-xl font-bold text-amber-800">
            ₹{insights.avgDailyExpense}
          </p>
          <p className="text-sm text-amber-600">last 30 days</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-emerald-600 font-bold uppercase">
            Records
          </p>
          <p className="text-xl font-bold text-emerald-800">
            {insights.transactionCount}
          </p>
          <p className="text-sm text-emerald-600">Total entries</p>
        </div>
      </div>
    )}

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-600" />
        Add Transaction
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value as "expense" | "income")
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={addTransaction}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-bold shadow-lg"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}

{activeTab === "analytics" && (
  <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-600" />
          Expenses by Category
        </h3>
        {getCategoryExpenses().length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={getCategoryExpenses()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {getCategoryExpenses().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <PieChart className="w-12 h-12 mb-2 opacity-20" />
            No data yet
          </div>
        )}
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          Weekly Spending Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getDailySpending()}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="spending"
              stroke="#6366f1"
              strokeWidth={4}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        Monthly Comparison
      </h3>
      {getMonthlyData().length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getMonthlyData()}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="income"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 py-20">
          Record more months to see comparisons
        </p>
      )}
    </div>
  </div>
)}

{activeTab === "budgets" && (
  <div className="space-y-6 animate-in zoom-in-95 duration-500">
    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-inner">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Set Category Budget
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={newBudgetCategory}
          onChange={(e) => setNewBudgetCategory(e.target.value)}
          className="px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="number"
          step="0.01"
          placeholder="Budget Amount"
          value={newBudgetAmount}
          onChange={(e) => setNewBudgetAmount(e.target.value)}
          className="px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          onClick={addBudget}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-bold shadow-md"
        >
          <Target className="w-5 h-5" />
          Update Budget
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {getBudgetProgress().length === 0 ? (
        <div className="md:col-span-2 text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            No budgets defined yet. Set one above!
          </p>
        </div>
      ) : (
        getBudgetProgress().map(
          ({ category: cat, budget, spent, percentage }) => (
            <div
              key={cat}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold capitalize text-gray-800">
                  {cat}
                </h3>
                <button
                  onClick={() => removeBudget(cat)}
                  className="text-rose-500 hover:bg-rose-50 p-2 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-gray-500">
                  Spent: ₹{spent.toFixed(2)}
                </span>
                <span className="text-indigo-600">
                  Limit: ₹{budget.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-1000 ${percentage >= 100 ? "bg-rose-500" : percentage > 80 ? "bg-amber-500" : "bg-emerald-500"}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              <p
                className={`text-xs font-bold ${percentage > 100 ? "text-rose-600" : "text-gray-400"}`}
              >
                {percentage.toFixed(1)}% consumed{" "}
                {percentage > 100 && "• OVER BUDGET"}
              </p>
            </div>
          ),
        )
      )}
    </div>
  </div>
)}

{activeTab === "transactions" && (
  <div className="space-y-4 animate-in fade-in duration-500">
    <div className="flex justify-between items-center px-2">
      <h2 className="text-xl font-bold text-gray-800">
        Transaction History
      </h2>
      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
        {transactions.length} Total
      </span>
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Date
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Description
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                Category
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">
                Amount
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[...transactions]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() -
                  new Date(a.date).getTime(),
              )
              .map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-indigo-50/30 transition-colors"
                >
                  <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    {t.description}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 text-[10px] font-black uppercase rounded-full bg-gray-100 text-gray-500">
                      {t.category}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-6 text-right font-bold text-lg ${t.type === "income" ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {t.type === "income" ? "+" : "-"}₹
                    {t.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="text-gray-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {transactions.length === 0 && (
        <div className="text-center py-20">
          <Calendar className="w-16 h-16 text-gray-100 mx-auto mb-4" />
          <p className="text-gray-400 font-medium">
            No transactions found.
          </p>
        </div>
      )}
    </div>
  </div>
)}*/
