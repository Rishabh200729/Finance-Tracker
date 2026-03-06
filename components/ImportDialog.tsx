"use client"

import { useState } from "react"
import { Upload, X, FileText, Loader2, Check, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import * as XLSX from "xlsx"
import { importTransactionsAction } from "@/actions/importTransactions"

interface ExtractedTransaction {
    date: string
    description: string
    amount: number
    category: string
    budgetLimit?: number
    id?: string
}

export default function ImportDialog({ onClose, onComplete, categories }: {
    onClose: () => void,
    onComplete: () => void,
    categories: string[]
}) {
    const [file, setFile] = useState<File | null>(null)
    const [isParsing, setIsParsing] = useState(false)
    const [isImporting, setIsImporting] = useState(false)
    const [transactions, setTransactions] = useState<ExtractedTransaction[]>([])
    const [step, setStep] = useState<"upload" | "review">("upload")
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setError(null)
        }
    }

    const parseExcel = async (file: File) => {
        return new Promise<any[]>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer)
                    const workbook = XLSX.read(data, { type: 'array', cellDates: true })
                    const sheetName = workbook.SheetNames[0]
                    const worksheet = workbook.Sheets[sheetName]
                    const json = XLSX.utils.sheet_to_json(worksheet, { raw: true })

                    // Normalize data: Excel dates can be numbers, convert to ISO strings
                    const normalized = json.map((row: any) => {
                        const newRow = { ...row };
                        for (const key in row) {
                            if (row[key] instanceof Date) {
                                newRow[key] = row[key].toISOString();
                            }
                        }
                        return newRow;
                    });

                    resolve(normalized)
                } catch (err) {
                    reject(err)
                }
            }
            reader.onerror = reject
            reader.readAsArrayBuffer(file)
        })
    }

    const handleUpload = async () => {
        if (!file) return
        setIsParsing(true)
        setError(null)

        try {
            const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls") || file.name.endsWith(".csv")

            let rawData = []
            if (isExcel) {
                rawData = await parseExcel(file)
            } else if (file.name.endsWith(".pdf")) {
                // PDF parsing is better handled server-side due to library complexity
                const formData = new FormData()
                formData.append("file", file)
                const res = await fetch("/api/parse-pdf", { method: "POST", body: formData })
                if (!res.ok) throw new Error("Failed to parse PDF")
                rawData = await res.json()
            } else {
                throw new Error("Unsupported file format")
            }

            // Convert raw data to standardized format and get AI suggestions
            const response = await fetch("/api/suggest-categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transactions: rawData, categories })
            })

            if (!response.ok) throw new Error("Failed to categorize transactions")
            const result = await response.json()

            setTransactions(result.transactions)
            setStep("review")
        } catch (err: any) {
            setError(err.message || "An error occurred during parsing")
        } finally {
            setIsParsing(false)
        }
    }

    const handleImport = async () => {
        setIsImporting(true)
        try {
            // Ensure dates are valid strings before sending
            const sanitizedTransactions = transactions.map(t => ({
                ...t,
                date: new Date(t.date).toISOString()
            }))
            const res = await importTransactionsAction(sanitizedTransactions)
            if (res.success) {
                onComplete()
                onClose()
            } else {
                throw new Error(res.error)
            }
        } catch (err: any) {
            setError(err.message || "Failed to import transactions")
        } finally {
            setIsImporting(false)
        }
    }

    const updateTransaction = (index: number, field: keyof ExtractedTransaction, value: any) => {
        const newTransactions = [...transactions]
        newTransactions[index] = { ...newTransactions[index], [field]: value }
        setTransactions(newTransactions)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Upload className="w-6 h-6 text-indigo-500" />
                        Import Transactions
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                        <X className="w-6 h-6 text-slate-500" />
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto">
                    {step === "upload" ? (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl bg-slate-50 dark:bg-slate-800/50">
                            <Upload className="w-16 h-16 text-indigo-400 mb-4" />
                            <p className="text-slate-600 dark:text-slate-300 font-medium mb-1">
                                Upload your bank statement
                            </p>
                            <p className="text-slate-400 text-sm mb-6">
                                Supports .xlsx, .xls, .csv and .pdf
                            </p>
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept=".xlsx,.xls,.csv,.pdf"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-upload"
                                className="bg-white dark:bg-slate-700 text-slate-700 dark:text-white px-6 py-2 rounded-full font-semibold shadow-sm border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600 transition"
                            >
                                {file ? file.name : "Select File"}
                            </label>

                            {file && (
                                <button
                                    onClick={handleUpload}
                                    disabled={isParsing}
                                    className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isParsing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Parsing Data...
                                        </>
                                    ) : (
                                        "Next: Review Transactions"
                                    )}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                We've extracted {transactions.length} transactions. Please review and categorize them.
                            </p>
                            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
                                        <tr>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Description</th>
                                            <th className="px-4 py-3">Category</th>
                                            <th className="px-4 py-3">Budget Limit</th>
                                            <th className="px-4 py-3 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {transactions.map((t, i) => (
                                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="date"
                                                        value={t.date.split('T')[0]}
                                                        onChange={(e) => updateTransaction(i, "date", e.target.value)}
                                                        className="bg-transparent border-none focus:ring-0 p-0 text-sm dark:text-slate-300"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="text"
                                                        value={t.description}
                                                        onChange={(e) => updateTransaction(i, "description", e.target.value)}
                                                        className="bg-transparent border-none focus:ring-0 p-0 w-full text-sm dark:text-slate-300"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <select
                                                                value={categories.includes(t.category) ? t.category : (t.category === "Uncategorized" ? "Uncategorized" : "new-suggested")}
                                                                onChange={(e) => {
                                                                    if (e.target.value === "Uncategorized") {
                                                                        updateTransaction(i, "category", "Uncategorized");
                                                                    } else if (e.target.value === "new-suggested") {
                                                                        // Keep the current suggested category
                                                                    } else {
                                                                        updateTransaction(i, "category", e.target.value);
                                                                    }
                                                                }}
                                                                className="bg-transparent border-none focus:ring-0 p-0 text-sm font-medium text-indigo-600 dark:text-indigo-400"
                                                            >
                                                                {categories.map(c => (
                                                                    <option key={c} value={c}>{c}</option>
                                                                ))}
                                                                <option value="Uncategorized">Uncategorized</option>
                                                                {!categories.includes(t.category) && t.category !== "Uncategorized" && (
                                                                    <option value="new-suggested">Suggested: {t.category}</option>
                                                                )}
                                                            </select>
                                                            {t.category !== "Uncategorized" && !categories.includes(t.category) && (
                                                                <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-md font-bold uppercase tracking-wider">New</span>
                                                            )}
                                                        </div>
                                                        {(t.category === "Uncategorized" || !categories.includes(t.category)) && (
                                                            <input
                                                                type="text"
                                                                list="budget-categories"
                                                                placeholder="Type category..."
                                                                value={t.category === "Uncategorized" ? "" : t.category}
                                                                onChange={(e) => updateTransaction(i, "category", e.target.value)}
                                                                className="text-xs bg-slate-50 dark:bg-slate-800 border-b border-indigo-200 dark:border-indigo-900 focus:border-indigo-500 focus:ring-0 px-2 py-1 rounded w-full outline-none dark:text-slate-300"
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {!categories.includes(t.category) && t.category !== "Uncategorized" ? (
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-slate-400 text-xs">$</span>
                                                            <input
                                                                type="number"
                                                                placeholder="Limit"
                                                                value={t.budgetLimit || ""}
                                                                onChange={(e) => updateTransaction(i, "budgetLimit", parseFloat(e.target.value))}
                                                                className="bg-slate-50 dark:bg-slate-800 border-none focus:ring-0 p-1 text-xs w-20 dark:text-slate-300 rounded"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs italic">Existing Budget</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-right font-mono text-sm dark:text-white">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={t.amount}
                                                        onChange={(e) => updateTransaction(i, "amount", parseFloat(e.target.value))}
                                                        className="bg-transparent border-none focus:ring-0 p-0 text-right w-20 dark:text-white"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <datalist id="budget-categories">
                    {categories.map(c => (
                        <option key={c} value={c} />
                    ))}
                </datalist>

                <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                        Cancel
                    </button>
                    {step === "review" && (
                        <button
                            onClick={handleImport}
                            disabled={isImporting}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-full font-bold shadow-md shadow-indigo-200 dark:shadow-none transition flex items-center gap-2 disabled:opacity-50"
                        >
                            {isImporting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Importing...
                                </>
                            ) : (
                                <>
                                    <Check className="w-5 h-5" />
                                    Confirm & Save
                                </>
                            )}
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
