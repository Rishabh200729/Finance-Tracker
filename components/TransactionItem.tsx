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
      className="hover:bg-gray-50/50 transition-colors group"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${t.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
            {t.type === "income" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
          </div>
          <span className="font-semibold text-gray-800">{t.description}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold uppercase tracking-wide text-gray-600">
          {t.category}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(t.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>
      <td className={`px-6 py-4 font-bold ${t.type === "income" ? "text-emerald-600" : "text-gray-800"}`}>
        {t.type === "income" ? "+" : "-"} ₹{t.amount.toLocaleString("en-IN")}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end items-center min-h-[40px]">
          {loading ? (
            /* 1. Added animate-spin and removed group-hover dependencies */
            <Loader className="w-4 h-4 animate-spin text-indigo-600" />
          ) : (
            <button
              onClick={() => handleDelete(t.id)}
              className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
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