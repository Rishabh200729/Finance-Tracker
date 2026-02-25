"use client"
import { useEffect, useState } from 'react';
import { User, Shield, Wallet, Moon, Sun } from 'lucide-react';

const SettingsPage = () => {
    const [mounted, setMounted] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">

                {/* Header with Toggle */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Settings</h1>

                </div>

                <div className="space-y-6">
                    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <User size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Account Profile</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Manage your public information</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Display Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder="Rishabh"
                                    className="w-full p-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-slate-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    disabled
                                    placeholder="user@example.com"
                                    className="w-full p-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Financial Preferences */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                <Wallet size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Finance Settings</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Currency and tracking behavior</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                                <div>
                                    <p className="font-medium text-slate-700 dark:text-slate-200">Default Currency</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Set your primary currency for reports</p>
                                </div>
                                <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-1 text-sm text-slate-900 dark:text-slate-100 outline-none">
                                    <option>INR (₹)</option>
                                    <option>USD ($)</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                                <div>
                                    <p className="font-medium text-slate-700 dark:text-slate-200">Budget Alerts</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Notify when spending reaches 80%</p>
                                </div>
                                <input type="checkbox" className="w-5 h-5 accent-indigo-600 cursor-pointer" defaultChecked />
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Security</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Protect your financial data</p>
                            </div>
                        </div>
                        <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                            Change Password →
                        </button>
                    </section>
                </div>

                <div className="mt-10 flex justify-end gap-4">
                    <button className="px-6 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                        Cancel
                    </button>
                    <button className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;