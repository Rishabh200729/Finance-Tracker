'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by only rendering after mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse">
                <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
        );
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-sm border border-slate-200 dark:border-slate-700"
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
                <Moon className="w-6 h-6 text-indigo-600" />
            )}
        </button>
    );
}
