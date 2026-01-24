'use client';
import React, { useState, useEffect } from "react";
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function Analytics() {
  return( <div className="animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm uppercase font-bold tracking-wider">
              Total Income
            </p>
            <p className="text-3xl font-bold">
              Stats Income here
            </p>
          </div>
          <TrendingUp className="w-12 h-12 text-emerald-200 opacity-50" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rose-100 text-sm uppercase font-bold tracking-wider">
              Total Expenses
            </p>
            <p className="text-3xl font-bold">
              Total Expenses here
            </p>
          </div>
          <TrendingDown className="w-12 h-12 text-rose-200 opacity-50" />
        </div>
      </div>
      <div
        className={`bg-gradient-to-br ${1 >= 0 ? "from-indigo-400 to-indigo-600" : "from-amber-400 to-amber-600"} rounded-2xl p-6 text-white shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm uppercase font-bold tracking-wider">
              Balance
            </p>
            <p className="text-3xl font-bold">
              Balance here
            </p>
          </div>
          <DollarSign className="w-12 h-12 text-indigo-200 opacity-50" />
        </div>
      </div>
    </div>
  </div>
  )
}