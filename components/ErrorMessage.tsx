'use client';

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
    message: string | null;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800 rounded-2xl flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm font-medium shadow-sm transition-colors"
                >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ErrorMessage;
