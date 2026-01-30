import addTransaction from "@/actions/addTransaction";
import { DollarSign } from "lucide-react";
import React from "react";
import { useFinance } from "@/context/FinanceContext";
import { useRouter } from "next/navigation";

const QuickAdd = () => {
  const { addLocalTransaction, updateLocalBudgets } = useFinance();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addTransaction(new FormData(e.currentTarget as HTMLFormElement));

    if(res.success){
        (e.target as HTMLFormElement).reset();
        addLocalTransaction(res.newTransaction);
        updateLocalBudgets(res.newBudget);
        router.push('/dashboard/transactions');
    }
  };
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <DollarSign className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="font-bold text-gray-800">Quick Add</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex-1 flex flex-col justify-between"
      >
        <div className="space-y-3">
          <input
            name = "description"
            type="text"
            placeholder="What did you spend on?"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <div className="flex gap-3">
            <input
              name = "amount"
              type="number"
              placeholder="Amount"
              className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <select name="category" className="cursor-pointer appearance-none w-1/2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm text-gray-500 outline-none hover:bg-gray-100 transition-all focus:ring-2 focus:ring-indigo-500">
              <option>Food</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
            </select>
          </div>
        </div>

        <button className="w-full bg-gray-900 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-indigo-100 mt-4">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default QuickAdd;
