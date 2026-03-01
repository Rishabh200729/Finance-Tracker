import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp } from "lucide-react";

const Budget = ({ budget }: { budget: { id: number; category: string; spent: number; limit: number } }) => {
  const percentage = (budget.spent / budget.limit) * 100;
  const isOver = budget.spent > budget.limit;
  const isWarning = !isOver && percentage >= 80;

  return (
    <div key={budget.id} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors relative overflow-hidden group">
      {/* Background Decorative Gradient */}
      {isOver && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
            {budget.category}
            {isOver && <AlertTriangle className="w-4 h-4 text-rose-500" />}
          </h3>
          <span className="text-[10px] uppercase tracking-tighter font-bold text-gray-400 dark:text-gray-500">Monthly Budget</span>
        </div>

        {/* Status Badge */}
        <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-colors underline-offset-2 ${isOver
          ? "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-100 dark:border-rose-800/50 animate-pulse"
          : isWarning
            ? "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50"
            : "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50"
          }`}>
          {isOver ? (
            "CRITICAL"
          ) : isWarning ? (
            "WARNING"
          ) : (
            <>
              <TrendingUp className="w-3 h-3" />
              HEALTHY
            </>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-3 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4 p-0.5 border border-transparent dark:border-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full flex items-center justify-end px-1.5 shadow-sm transition-colors ${isOver
            ? "bg-rose-500 shadow-rose-200 dark:shadow-none"
            : isWarning
              ? "bg-amber-500 shadow-amber-200 dark:shadow-none"
              : "bg-indigo-600 dark:bg-indigo-500 shadow-indigo-200 dark:shadow-none"
            }`}
        >
          {percentage > 20 && (
            <div className="w-1 h-1 bg-white/40 rounded-full animate-ping" />
          )}
        </motion.div>
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Spent</p>
          <span className={`text-lg font-black tracking-tight ${isOver ? 'text-rose-600 dark:text-rose-400' : 'text-gray-800 dark:text-gray-100'}`}>
            ₹{budget.spent.toLocaleString()}
          </span>
        </div>

        <div className="text-right space-y-0.5">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            {isOver ? "Exceeded By" : "Of Limit"}
          </p>
          <span className={`text-sm font-bold ${isOver ? 'text-rose-600 dark:text-rose-400' : 'text-gray-500 dark:text-gray-300'}`}>
            ₹{isOver ? (budget.spent - budget.limit).toLocaleString() : budget.limit.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Hover visual cue */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20" />
    </div>
  );
};

export default Budget;