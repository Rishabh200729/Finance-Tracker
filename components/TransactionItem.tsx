'use client'
import { ArrowDownLeft, ArrowUpRight, Trash2, Loader } from "lucide-react";
import { useState } from "react";
import deleteTransaction from "@/actions/deleteTransaction";
import { useFinance } from "@/context/FinanceContext";
import { motion } from "framer-motion";

const TransactionItem = ({ t }: any) => {
  const { deleteLocalTransaction, updateLocalBudgets } = useFinance();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    setLoading(true);
    const res = await deleteTransaction(id);
    if (res.success) {
      deleteLocalTransaction(id);
      updateLocalBudgets(res.updatedBudget);
    } else {
      alert("Failed to delete transaction");
      setLoading(false); // Only stop loading if it fails, otherwise row unmounts
    }
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ display: "table-row" }} // Essential for table alignment
      className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors group"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${t.type === "income" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400"}`}>
            {t.type === "income" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
          </div>
          <span className="font-semibold text-gray-800 dark:text-white">{t.description}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-[10px] font-bold uppercase tracking-wide text-gray-600 dark:text-gray-300">
          {t.category}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {new Date(t.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className={`px-6 py-4 font-bold ${t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-800 dark:text-white"}`}>
        {t.type === "income" ? "+" : "-"} ₹{t.amount.toLocaleString("en-IN")}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end items-center min-h-[40px]">
          {loading ? (
            /* 1. Added animate-spin and removed group-hover dependencies */
            <Loader className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
          ) : (
            <button
              onClick={() => handleDelete(t.id)}
              className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

export default TransactionItem;