import { useFinance } from "@/context/FinanceContext";
import { Target } from "lucide-react";

const TopSpendingSection = () => {
  const { income, totalExpenses, topSpendingCategories } = useFinance();
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-colors">
      <div>
        <h3 className="font-bold text-gray-800 dark:text-white mb-1">Top Spending</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Your biggest category this month
        </p>
      </div>

      <div className="py-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-rose-500 dark:text-rose-400" />
        </div>
        <span className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-widest mb-1">
          {topSpendingCategories?.category || 'N/A'}
        </span>
        <h2 className="text-4xl font-black text-gray-900 dark:text-white">₹{topSpendingCategories?.amount || 0}</h2>
      </div>

    </div>
  );
};

export default TopSpendingSection;
