"use client";
import { ReceiptIndianRupee, Router } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { User } from "../../models/models";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/register";
import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto clean error after 5 seconds
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (username === "") {
      setError("Please enter your name.");
      return;
    }
    if (email === "") {
      setError("Please enter your email.");
      return;
    }
    if (password === "") {
      setError("Please enter your password.");
      return;
    }
    const status = await registerUser(username, email, password);
    if (status.error) {
      setError(status.error);
    }
    else {
      router.push("/dashboard");
    }
    setLoading(false);
  };
  return (
    <div className=" min-h-screen flex items-center justify-center  rounded-2xl">
      <div className="bg-white rounded-2xl shadow-lg shadow-indigo-500/50 w-full max-w-lg p-8  overflow-y-auto p-6">
        <div className="text-center mb-3">
          <ReceiptIndianRupee className="w-16 h-12 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">SmartFinance Tracker</h1>
          <p className="text-gray-600 mt-2">Manage your money wisely</p>
        </div>

        <ErrorMessage message={error} />

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                <span>Registering...</span>
              </div>
            ) : "Register"}
          </button>
          <p className="text-center text-sm text-gray-600">
            Have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Page;
