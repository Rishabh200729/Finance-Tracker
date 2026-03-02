"use client";
import { Wallet, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { loginUser } from "../../actions/login";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const status = await loginUser(email, password);
      if (status.success) {
        router.push("/dashboard");
      } else {
        setError(status.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-indigo-50 dark:from-stone-950 dark:to-stone-950">
        <LoadingSpinner className="!w-12 !h-12 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-indigo-50 dark:from-stone-950 dark:to-indigo-950/20 transition-colors duration-500">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Logo & Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-[24px] shadow-2xl shadow-indigo-500/40 mb-6 group hover:rotate-6 transition-transform">
            <Wallet className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Continue your financial journey</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[40px] shadow-2xl p-10 border border-white dark:border-slate-800 relative overflow-hidden">
          {error && (
            <div className="mb-8 flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/30 animate-in zoom-in-95">
              <AlertCircle size={20} />
              <p className="font-bold text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none text-slate-900 dark:text-slate-100 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none text-slate-900 dark:text-slate-100 transition-all font-medium"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[20px] font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <LoadingSpinner className="text-white dark:text-slate-900" /> : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                Get Started
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <Link
          href="/"
          className="mt-8 mx-auto flex items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors font-bold"
        >
          ← Back to landing page
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
