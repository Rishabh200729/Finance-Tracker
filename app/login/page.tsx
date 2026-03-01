"use client";
import { ReceiptIndianRupee } from "lucide-react";
import { FormEvent, useState } from "react";
import { User } from "../../models/models";
import { useRouter } from "next/navigation";
import { loginUser } from "../../actions/login";
import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto clean error after 5 seconds
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    if (formData.get("email") === "") {
      setError("Please enter your email.");
      return;
    }
    if (formData.get("password") === "") {
      setError("Please enter your password.");
      return;
    }
    const status = await loginUser(email, password);
    console.log("Login status:", status);
    if (status.success) {
      router.push("/dashboard");
    } else {
      setError(status.error || "Invalid email or password.");
    }
    setLoading(false);
  };
  return (
    <div className="flex justify-center mt-5 p-4 rounded-2xl min-h-screen bg-transparent">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg shadow-indigo-500/50 w-full max-w-lg p-8 border border-gray-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <ReceiptIndianRupee className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            SmartFinance Tracker
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-2">Manage your money wisely</p>
        </div>

        <ErrorMessage message={error} />

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                <span>Logging in...</span>
              </div>
            ) : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-slate-400">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};
export default Page;
