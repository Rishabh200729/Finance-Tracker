import { Target } from "lucide-react";
const TopSpendingSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-gray-800 mb-1">Top Spending</h3>
        <p className="text-xs text-gray-400">
          Your biggest category this month
        </p>
      </div>

      <div className="py-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-rose-500" />
        </div>
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">
          Food & Dining
        </span>
        <h2 className="text-4xl font-black text-gray-900">₹2,400</h2>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
          <span>Budget Used</span>
          <span>45%</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="bg-rose-500 h-full w-[45%] transition-all duration-1000" />
        </div>
      </div>
    </div>
  );
};

export default TopSpendingSection;
