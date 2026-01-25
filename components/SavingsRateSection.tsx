const SavingsRateSection = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden flex flex-col justify-between">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
    
    <div className="relative z-10">
      <h3 className="font-bold text-indigo-100 mb-1">Savings Rate</h3>
      <p className="text-xs text-indigo-200/60">Efficiency of your income</p>
    </div>

    <div className="relative z-10 py-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-6xl font-black tracking-tighter">62%</h2>
        <div className="bg-emerald-400/20 text-emerald-300 px-2 py-1 rounded-lg text-xs font-bold">
          +4.2%
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-indigo-100 leading-relaxed italic">
        "You're saving more than 60% of your income. Great progress, Rishabh!"
      </p>
    </div>

    <div className="relative z-10 pt-4 border-t border-white/10 flex justify-between items-center">
      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">Financial Health</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 5 ? 'bg-emerald-400' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  </div>
    )
};

export default SavingsRateSection;