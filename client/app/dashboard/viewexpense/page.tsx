"use client";
import Filter from "@/components/Filter";
import { Expense } from "@/lib/models/expense";
import { useState, useEffect } from "react";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        setLoading(true);
        const response = await fetch("/api/expenses");
        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExpenses();
  }, []);
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <Filter expenses={expenses} onFilter={setFilteredExpenses} />
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              <>
                {filteredExpenses.map((expense) => (
                  <tr key={expense._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {expense.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${expense.amount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {expense.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}

                {/* ✅ Total Row */}
                <tr className="bg-gray-200 font-bold">
                  <td
                    className="border border-gray-300 px-4 py-2 text-right"
                    colSpan={1}
                  >
                    Total:
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-red-500">
                    {totalSpent.toFixed(2)} /-
                  </td>
                  <td
                    className="border border-gray-300 px-4 py-2"
                    colSpan={2}
                  ></td>
                </tr>
              </>
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
