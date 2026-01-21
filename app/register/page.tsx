"use client";
import { ReceiptIndianRupee, Router } from "lucide-react";
import React, { useState } from "react";
import { User } from "../../models/models";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Dummy authentication logic
    if (email === "") {
      alert("Please enter your email.");
      return;
    }
    if (password === "") {
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
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    action: () => void,
  ) => {
    if (e.key === "Enter") {
      action();
    }
  };
  return (
    <div className=" min-h-screen flex items-center justify-center  rounded-2xl">
      <div className="bg-white rounded-2xl shadow-lg shadow-indigo-500/50 w-full max-w-lg p-8  overflow-y-auto p-6">
        <div className="text-center mb-3">
          <ReceiptIndianRupee className="w-16 h-12 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">SmartFinance Tracker</h1>
          <p className="text-gray-600 mt-2">Manage your money wisely</p>
        </div>

        {showLogin && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
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
                onKeyPress={(e) => handleKeyPress(e, handleLogin)}
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
                onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Register
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
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
