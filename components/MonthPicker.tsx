"use client";

import { useFinance } from "@/context/FinanceContext";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function MonthPicker() {
    const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear } = useFinance();

    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    return (
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 px-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-2 mr-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Period</span>
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={handlePrevMonth}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 min-w-[140px] justify-center">
                    <span className="text-sm font-bold text-slate-800 dark:text-white">
                        {MONTHS[selectedMonth]} {selectedYear}
                    </span>
                </div>

                <button
                    onClick={handleNextMonth}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
