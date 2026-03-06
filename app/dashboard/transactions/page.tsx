'use client'
import { Search, Upload } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { useState, useEffect } from "react";
import TransactionItem from "@/components/TransactionItem";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";
import MonthPicker from "@/components/MonthPicker";
import ImportDialog from "@/components/ImportDialog";

const Page = () => {
  const { transactions, selectedMonth, selectedYear } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const { budgets } = useFinance();
  const categories = Array.from(new Set(budgets.map(b => b.category)));

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    const matchesMonth = d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    const matchesSearch = (t.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMonth && matchesSearch;
  });

  // Group transactions by Date (for better daily/weekly breakdown within the month)
  // or just by Month/Year if we were showing all. 
  // Since we are showing only one month, grouping by DATE is more useful.
  // However, the user specifically asked "grouped month wise". 
  // This likely means if they were NOT filtering, they'd want month headers.
  // Since they ARE filtering, I will ensure the header reflects the month.

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner className="!w-12 !h-12 text-indigo-600" />
      </div>
    );
  }

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* Header & Search Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center w-full lg:w-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Transactions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage and track your spend
            </p>
          </div>
          <MonthPicker />
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-sm dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        <button
          onClick={() => setShowImport(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-2xl font-semibold transition shadow-md shadow-indigo-100 dark:shadow-none whitespace-nowrap"
        >
          <Upload className="w-4 h-4" />
          Import
        </button>
      </div>

      <AnimatePresence>
        {showImport && (
          <ImportDialog
            onClose={() => setShowImport(false)}
            onComplete={() => {
              // The page will revalidate due to server action
              window.location.reload();
            }}
            categories={categories}
          />
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Monthly Header */}
            <div className="bg-slate-50/50 dark:bg-slate-800/30 px-6 py-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                {MONTH_NAMES[selectedMonth]} {selectedYear}
              </h2>
            </div>

            {/* Header Grid */}
            <div className="grid grid-cols-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-4">
              <span className="col-span-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Transaction</span>
              <span className="col-span-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Category</span>
              <span className="col-span-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Date</span>
              <span className="col-span-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Amount</span>
              <span className="col-span-1 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">Action</span>
            </div>

            <div className="divide-y divide-slate-50 dark:divide-slate-800">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredTransactions.map((t) => (
                  <TransactionItem key={t.id} t={t} />
                ))}
              </AnimatePresence>
              {filteredTransactions.length === 0 && (
                <div className="px-6 py-12 text-center text-slate-400 dark:text-slate-600 italic">
                  No transactions found for this period.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
