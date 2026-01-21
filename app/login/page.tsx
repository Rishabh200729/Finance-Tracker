"use client";
import { Form, ReceiptIndianRupee } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { User } from "../../models/models";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); 
    if (formData.get("email") === "") {
      alert("Please enter your email.");
      return;
    }
    if (formData.get("password") === "") {
      alert("Please enter your password.");
      return;
    }
    const dummyUser: User = {
      id: 1,
      name: "John Doe",
      email: email,
    };
    setUser(dummyUser);
    localStorage.setItem("current-user", JSON.stringify(dummyUser));
  };
  return (
    <div className="flex  justify-center mt-5 p-4 rounded-2xl">
      <div className="bg-white rounded-2xl shadow-lg shadow-indigo-500/50 w-full max-w-lg p-8">
        <div className="text-center mb-8">
          <ReceiptIndianRupee className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">SmartFinance Tracker</h1>
          <p className="text-gray-600 mt-2">Manage your money wisely</p>
        </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => router.push('/register')}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register
              </button>
            </p>
          </form>
      </div>
    </div>
  );
};
export default Page;
