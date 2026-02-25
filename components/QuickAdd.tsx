import addTransaction from "@/actions/addTransaction";
import { DollarSign } from "lucide-react";
import React from "react";
import { useFinance } from "@/context/FinanceContext";
import { useRouter } from "next/navigation";

const QuickAdd = () => {
  const { addLocalTransaction, updateLocalBudgets, budgets } = useFinance();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addTransaction(new FormData(e.currentTarget as HTMLFormElement));

    if (res.success) {
      (e.target as HTMLFormElement).reset();
      addLocalTransaction(res.newTransaction);
      updateLocalBudgets(res.newBudget);
      router.push('/dashboard/transactions');
    }
  };


  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-stone-800 flex flex-col transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-orange-100 dark:bg-orange-900/50 p-2 rounded-lg">
          <DollarSign className="w-4 h-4 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="font-bold text-gray-800 dark:text-white">Quick Add</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex-1 flex flex-col justify-between"
      >
        <div className="space-y-3">
          <input
            name="description"
            type="text"
            placeholder="What did you spend on?"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-stone-800 border border-gray-100 dark:border-stone-700 rounded-2xl text-sm dark:text-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <div className="flex gap-3">
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              className="w-1/2 px-4 py-3 bg-gray-50 dark:bg-stone-800 border border-gray-100 dark:border-stone-700 rounded-2xl text-sm dark:text-gray-200 outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <select name="category" className="cursor-pointer appearance-none w-1/2 px-4 py-3 bg-gray-50 dark:bg-stone-800 border border-gray-100 dark:border-stone-700 rounded-2xl text-sm text-gray-500 dark:text-gray-200 outline-none hover:bg-gray-100 dark:hover:bg-stone-700 transition-all focus:ring-2 focus:ring-orange-500">
              {budgets.map((budget) => {
                return <option key={budget.id}>{budget.category}</option>
              })}

            </select>
          </div>
        </div>

        <button className="w-full bg-gray-900 dark:bg-orange-600 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-orange-600 dark:hover:bg-orange-500 transition-all active:scale-95 shadow-lg shadow-stone-100 dark:shadow-none mt-4">
          Add Transaction
        </button>
      </form >
    </div >
  );
};

export default QuickAdd;
