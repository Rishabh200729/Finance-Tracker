'use client';
import { useState } from "react";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount, category }),
    });

    if (res.ok) {
      setMessage("Expense added successfully!");
      setTitle("");
      setAmount("");
      setCategory("");
    } else {
      const { error } = await res.json();
      setMessage(error || "Failed to add expense.");
    }

    setLoading(false);  
  }
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full p-2 border rounded-md"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-md"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
    {message && <p className="mt-2 text-center text-green-600">{message}</p>}
    </div>
  )
}
