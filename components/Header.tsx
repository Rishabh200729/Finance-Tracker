'use client';
import { DollarSign, BarChart3, Target, Calendar, SettingsIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import Link from 'next/link';
import { useUser } from "@/context/UserContext";

const Header = ({ userName: initialName }: { userName: string }) => {
  const { userName } = useUser();
  const pathName = usePathname();
  const activeTab = pathName === "/dashboard" ? "dashboard" : pathName.split("/")[2];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 mb-6 shadow-md transition-colors border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
              Smart Finance Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {userName || initialName}!</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 bg-slate-500 dark:bg-slate-700 text-white px-2 py-2 rounded-lg hover:bg-slate-600 dark:hover:bg-slate-600 transition shadow-md"
            >
              <SettingsIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: DollarSign },
            { id: "analytics", label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
            { id: "budgets", label: "Budgets", href: "/dashboard/budgets", icon: Target },
            { id: "transactions", label: "Transactions", href: "/dashboard/transactions", icon: Calendar },
            { id: "income", label: "Income", href: "/dashboard/income", icon: DollarSign },
          ].map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition whitespace-nowrap shadow-sm ${activeTab === tab.id ? "bg-indigo-600 dark:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Header;
