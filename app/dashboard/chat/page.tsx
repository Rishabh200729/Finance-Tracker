"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Sparkles, User, Bot, Loader2, Trash2 } from "lucide-react";
import { getChatResponseAction } from "@/actions/ai";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    role: "user" | "ai";
    content: string;
}

const ChatPage = () => {
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

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl flex flex-col flex-1 overflow-hidden transition-colors">
                {/* Header */}
                <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl">Financial AI Assistant</h2>
                            <p className="text-indigo-100 text-xs">Analyze your spending with RAG-powered insights</p>
                        </div>
                    </div>
                    <button
                        onClick={clearChat}
                        className="hover:bg-white/10 p-2 rounded-xl transition-colors flex items-center gap-2 text-sm"
                        title="Clear Chat"
                    >
                        <Trash2 className="w-5 h-5" />
                        <span className="hidden sm:inline">Clear Chat</span>
                    </button>
                </div>

                {/* Chat Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700"
                >
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-4">
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-full">
                                <Bot className="w-16 h-16 text-indigo-200 dark:text-indigo-800" />
                            </div>
                            <h3 className="text-xl font-bold dark:text-white">How can I help you today?</h3>
                            <p className="text-sm text-slate-500 max-w-sm">
                                I can analyze your latest 50 transactions to answer questions about budget totals, spending trends, or specific items.
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center pt-4">
                                {[
                                    "What's my total spending this month?",
                                    "Give me a summary of my last 5 purchases",
                                    "What's my top spending category?",
                                    "Did I spend more than last week?"
                                ].map((hint) => (
                                    <button
                                        key={hint}
                                        onClick={() => setQuery(hint)}
                                        className="text-xs bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 px-4 py-2 rounded-full transition-all text-slate-600 dark:text-slate-400 font-medium"
                                    >
                                        {hint}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map((m, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                key={i}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[80%] flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-indigo-600 shadow-slate-100 dark:shadow-none"}`}>
                                        {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                    </div>
                                    <div className={`p-4 rounded-3xl text-sm shadow-sm leading-relaxed ${m.role === "user"
                                        ? "bg-indigo-600 text-white rounded-tr-none"
                                        : "bg-slate-50 dark:bg-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <div className="flex justify-start">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                                    <Bot className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                    <div className="relative max-w-3xl mx-auto">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask about your financial data (e.g., 'Total spent on groceries this week?')"
                            className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-6 pr-14 text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all dark:text-white dark:placeholder:text-slate-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!query.trim() || loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Powered by Gemini 2.5 Flash</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>Context-aware RAG processing</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
