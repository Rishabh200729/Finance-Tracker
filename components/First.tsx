'use client';
import Link from 'next/link';
import { Wallet, BarChart3, Shield, ArrowRight, CheckCircle2, PieChart, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const First = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-orange-50/50 to-white dark:from-stone-950 dark:to-stone-900 transition-colors duration-500">
                <LoadingSpinner className="!w-12 !h-12 text-indigo-600" />
            </div>
        );
    }

    const features = [
        {
            icon: <Zap className="w-8 h-8 text-amber-500" />,
            title: "Smart Tracking",
            description: "Automatically categorize and track every transaction with precision."
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
            title: "Advanced Analytics",
            description: "Deep dive into your spending habits with interactive, real-time charts."
        },
        {
            icon: <Shield className="w-8 h-8 text-emerald-500" />,
            title: "Secure & Private",
            description: "Your financial data is encrypted and stays under your total control."
        }
    ];

    return (
        <div className="w-full bg-gradient-to-b from-orange-50/50 to-white dark:from-stone-950 dark:to-stone-900 transition-colors duration-500">
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                        <Wallet className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Smart Finance</span>
                </div>
                <Link
                    href="/login"
                    className="px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800"
                >
                    Sign In
                </Link>
            </nav>

            {/* Hero Section */}
            <header className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-8 animate-in fade-in slide-in-from-bottom-4">
                    <CheckCircle2 size={16} />
                    <span>Trusted by 50,000+ users worldwide</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
                    Master Your Money, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-amber-500">Effortlessly.</span>
                </h1>

                <p className="max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    The smartest way to track expenses, manage budgets, and achieve your financial goals with powerful insights and absolute security.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <Link
                        href="/register"
                        className="group relative px-10 py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-500/20 flex items-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-3">
                            Get Started Now <ArrowRight size={24} />
                        </span>
                    </Link>

                    <Link
                        href="/login"
                        className="px-10 py-5 rounded-2xl bg-white dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xl hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-3"
                    >
                        Learn More
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-10 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all group">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 w-fit rounded-2xl mb-8 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof / Stats */}
            <section className="py-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20">
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Everything you need to <br />
                            <span className="text-indigo-600">secure your future.</span>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl">
                            From simple expense logging to complex multi-budget tracking, we provide the tools you need to build wealth.
                        </p>
                        <div className="grid grid-cols-2 gap-8 text-left">
                            <div>
                                <p className="text-4xl font-black text-slate-900 dark:text-white">99%</p>
                                <p className="text-slate-500">Happy Users</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-slate-900 dark:text-white">$10M+</p>
                                <p className="text-slate-500">Tracked Monthly</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transform rotate-3">
                            <PieChart className="w-64 h-64 text-indigo-500 opacity-20 absolute -right-10 -bottom-10" />
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                                        $
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Savings Goal</p>
                                        <div className="w-48 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-2">
                                            <div className="w-3/4 h-full bg-green-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-indigo-600 rounded-3xl text-white">
                                    <p className="text-sm opacity-80 mb-1">Total Balance</p>
                                    <p className="text-3xl font-black">$45,230.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Final CTA */}
            <footer className="bg-slate-900 dark:bg-black py-20 px-6 text-center">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
                        Ready to start your journey?
                    </h2>
                    <Link
                        href="/register"
                        className="px-12 py-5 rounded-2xl bg-indigo-600 text-white font-black text-2xl hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/40 transition-all"
                    >
                        Sign Up for Free
                    </Link>
                    <p className="mt-8 text-slate-500">
                        © 2026 Smart Finance. Built for your success.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default First;