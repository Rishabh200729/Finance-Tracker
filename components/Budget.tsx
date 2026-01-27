import { motion } from "framer-motion";

const Budget = ({ budget }) => {
  return (
    <div key={budget.id} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">"{budget.category}"</h3>
        <span className="text-xs font-medium text-gray-400">Monthly</span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(budget.spent / budget.limit) * 100}%` }}
          className={`h-full ${budget.spent > budget.limit ? 'bg-rose-500' : 'bg-indigo-600'}`}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Spent: ₹{budget.spent}</span>
        <span className="font-bold">Limit: ₹{budget.limit}</span>
      </div>
    </div>
  );
};

export default Budget;