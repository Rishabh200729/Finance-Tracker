'use client';

import upsertIncome from "@/actions/upsertIncome";
import { useFinance } from "@/context/FinanceContext";

const page = () => {
  const { income, updateIncome } = useFinance();

  const handleUpdateIncome = async(e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update income would go here
    console.log('Update Income button clicked');
    const res = await upsertIncome(income, new FormData(e.currentTarget as HTMLFormElement));
    console.log('Response from upsertIncome:', res);
  
    if (res.success && res.income !== undefined) {
      updateIncome(res.income);
    } else {
      console.log("Error")
    }
  };
  return (
    <div className="bg-white dark:bg-slate-900 p-4">   
        <h2 className="text-2xl font-bold mb-4">Income Page</h2>
        { income !== null ? (
            <p className="text-gray-800 dark:text-gray-200 mb-2">Current Total Income: <span className="font-semibold">${income.toFixed(2)}</span></p>
        ) : (
            <p className="text-gray-800 dark:text-gray-200 mb-2">No income data available. Please update your income.</p>
        )}
        <p className="text-gray-600">This is where you can manage your income sources and track your earnings.</p>
        <div className="mt-6 rounded-lg p-4 shadow-md bg-gray-50 dark:bg-slate-800">
        <form onSubmit={handleUpdateIncome}>
            <input name = "income" type="text" placeholder="Update total Income" className="border p-2 rounded mb-4 w-full border-gray-300 dark:border-slate-600  focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Income</button>
        </form>
        </div>
    </div>
  )
};

export default page;