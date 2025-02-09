"use client";
import { Expense } from "@/lib/models/expense";
import { useState, useEffect } from "react";

interface FilterProps {
  expenses: Expense[];
  onFilter: (filteredExpenses: Expense[]) => void;
}

export default function Filter({ expenses, onFilter }: FilterProps) {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | "all">(today.getMonth() +1);
  const [selectedDay, setSelectedDay] = useState<number | "all">(today.getDate());

  useEffect(() => {
    // Filtering Logic
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseYear = expenseDate.getFullYear();
      const expenseMonth = expenseDate.getMonth() + 1;
      const expenseDay = expenseDate.getDate();

      return (
        expenseYear === selectedYear &&
        (selectedMonth === "all" || expenseMonth === selectedMonth) &&
        (selectedDay === "all" || expenseDay === selectedDay)
      );
    });

    // Send the filtered expenses to the parent
    onFilter(filteredExpenses);
  }, [selectedYear, selectedMonth, selectedDay, expenses, onFilter]);

  return (
    <div className="mb-4 flex gap-4">
      {/* Year Selector */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {Array.from({ length: 5 }, (_, i) => today.getFullYear() - i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Month Selector */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value === "all" ? "all" : Number(e.target.value))}
        className="border p-2 rounded"
      >
        <option value="all">All Months</option>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <option key={month} value={month}>
            {new Date(2025, month - 1).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      {/* Day Selector */}
      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value === "all" ? "all" : Number(e.target.value))}
        className="border p-2 rounded"
      >
        <option value="all">All Days</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
}
