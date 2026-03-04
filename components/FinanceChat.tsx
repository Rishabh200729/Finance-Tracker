"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { getChatResponseAction } from "@/actions/ai";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "ai";
    content: string;
}

const FinanceChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSend = async () => {
        if (!query.trim() || loading) return;

        const userMessage: Message = { role: "user", content: query };
        setMessages((prev) => [...prev, userMessage]);
        setQuery("");
        setLoading(true);

        const res = await getChatResponseAction(query);

        if (res.success && res.response) {
            setMessages((prev) => [...prev, { role: "ai", content: res.response! }]);
        } else {
            setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I couldn't process that. Please try again." }]);
        }
        setLoading(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl shadow-indigo-200 dark:shadow-none transition-all hover:rotate-12 group"
                    >
                        <MessageCircle className="w-6 h-6" />
                        <div className="absolute -top-1 -right-1 bg-emerald-500 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900" />
                    </motion.button>
                )}

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 w-[380px] h-[600px] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-colors"
                    >
                        {/* Header */}
                        <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-1.5 rounded-lg">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Finance Assistant</h3>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-indigo-100">AI Active</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700"
                        >
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                                    <Bot className="w-10 h-10 text-indigo-100 dark:text-slate-800" />
                                    <p className="text-sm text-slate-500 font-medium">
                                        Hello! Ask me anything about your transactions.
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {["Total spent this month", "Biggest expense?", "Spending habits"].map((hint) => (
                                            <button
                                                key={hint}
                                                onClick={() => setQuery(hint)}
                                                className="text-[10px] bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 px-3 py-1.5 rounded-full transition-all text-slate-600 dark:text-slate-400"
                                            >
                                                {hint}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[85%] flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${m.role === "user" ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-indigo-400"}`}>
                                            {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm shadow-sm ${m.role === "user"
                                            ? "bg-indigo-600 text-white rounded-tr-none"
                                            : "bg-slate-50 dark:bg-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
                                            }`}>
                                            {m.content}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700">
                                        <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask your query..."
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl py-3 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white dark:placeholder:text-slate-500 shadow-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!query.trim() || loading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-2 rounded-xl transition-all active:scale-90"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[10px] text-center text-slate-400 mt-2">
                                Powered by Gemini AI • Context-aware RAG
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FinanceChat;
