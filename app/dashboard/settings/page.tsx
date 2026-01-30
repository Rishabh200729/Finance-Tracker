import React from 'react';
import { User, Bell, Shield, Wallet, Moon } from 'lucide-react';

const SettingsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-indigo-50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                                <User size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Account Profile</h2>
                                <p className="text-sm text-gray-500">Manage your public information</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                <input type="text" placeholder="Rishabh" className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" disabled placeholder="user@example.com" className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
                            </div>
                        </div>
                    </section>

                    {/* Financial Preferences */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-indigo-50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-100 rounded-lg text-green-600">
                                <Wallet size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Finance Settings</h2>
                                <p className="text-sm text-gray-500">Currency and tracking behavior</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div>
                                    <p className="font-medium text-gray-700">Default Currency</p>
                                    <p className="text-xs text-gray-500">Set your primary currency for reports</p>
                                </div>
                                <select className="bg-white border border-gray-200 rounded-md p-1 text-sm">
                                    <option>INR (₹)</option>
                                    <option>USD ($)</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div>
                                    <p className="font-medium text-gray-700">Budget Alerts</p>
                                    <p className="text-xs text-gray-500">Notify when spending reaches 80%</p>
                                </div>
                                <input type="checkbox" className="w-5 h-5 accent-indigo-600" defaultChecked />
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section className="bg-white rounded-2xl shadow-sm p-6 border border-indigo-50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-100 rounded-lg text-red-600">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Security</h2>
                                <p className="text-sm text-gray-500">Protect your financial data</p>
                            </div>
                        </div>
                        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                            Change Password →
                        </button>
                    </section>
                </div>

                <div className="mt-10 flex justify-end gap-4">
                    <button className="px-6 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-all">
                        Cancel
                    </button>
                    <button className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;