'use client'
import { Search, ArrowUpRight, ArrowDownLeft, Trash2 } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import React, { useState } from "react";

const Page = () => {
  const { transactions } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Transaction History
          </h1>
          <p className="text-sm text-gray-500">
            Manage and track your every spend
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
             <tbody className="divide-y divide-gray-50"> 
               {transactions.length > 0 ? (
                transactions
                  .filter((t) =>
                    t.description
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  )
                  .map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-xl ${t.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
                          >
                            {t.type === "income" ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownLeft className="w-4 h-4" />
                            )}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {t.description}
                          </span>
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
                      <td
                        className={`px-6 py-4 font-bold ${t.type === "income" ? "text-emerald-600" : "text-gray-800"}`}
                      >
                        {t.type === "income" ? "+" : "-"} ₹
                        {t.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-400 italic"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody> 
          </table> 
        </div>
      </div>
    </div>
  );
};
export default Page;
