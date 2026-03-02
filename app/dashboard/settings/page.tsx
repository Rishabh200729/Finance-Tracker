"use client"
import { useEffect, useState } from 'react';
import { User, Shield, CheckCircle2, AlertCircle, LogOut, Trash2, X } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUser } from '@/context/UserContext';
import { updateProfile } from '@/actions/updateProfile';
import { logoutUser } from '@/actions/logout';
import { deleteAccount } from '@/actions/deleteAccount';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const router = useRouter();
    const { userName, email, updateUser } = useUser();
    const [name, setName] = useState(userName);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setName(userName);
    }, [userName]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    if (!mounted) return null;

    const handleSave = async () => {
        setIsSaving(true);
        setNotification(null);
        try {
            const result = await updateProfile(name);
            if (result.success) {
                updateUser({ userName: name });
                setNotification({ type: 'success', message: 'Profile updated!' });
            } else {
                setNotification({ type: 'error', message: result.error || 'Update failed' });
            }
        } catch (error) {
            setNotification({ type: 'error', message: 'Something went wrong' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        const result = await logoutUser();
        if (result.success) router.push('/login');
        setIsLoggingOut(false);
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        const result = await deleteAccount();
        if (result.success) router.push('/login');
        else {
            setNotification({ type: 'error', message: result.error || 'Deletion failed' });
            setShowDeleteConfirm(false);
        }
        setIsDeleting(false);
    };

    const isChanged = name !== userName;

    return (
        <div className="min-h-screen p-6 md:p-10 transition-colors duration-300 relative">
            {/* Floating Notification */}
            {notification && (
                <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${notification.type === 'success'
                    ? 'bg-white dark:bg-slate-900 border-green-100 dark:border-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-white dark:bg-slate-900 border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400'
                    } animate-in fade-in slide-in-from-top-12`}>
                    {notification.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    <span className="font-bold">{notification.message}</span>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-2xl text-rose-600 dark:text-rose-400">
                                <Trash2 size={28} />
                            </div>
                            <button onClick={() => setShowDeleteConfirm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Delete Account?</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">
                            This action is permanent. All your transactions, budgets, and data will be erased forever.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="flex-1 py-3 rounded-2xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all flex items-center justify-center gap-2"
                            >
                                {isDeleting ? <LoadingSpinner className="w-5 h-5" /> : null}
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">Settings</h1>

                <div className="space-y-8">
                    {/* Profile Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200 dark:border-slate-800 transition-all">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl text-indigo-600 dark:text-indigo-400">
                                <User size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Profile</h2>
                                <p className="text-slate-500 dark:text-slate-400">Your personal identity</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Display Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none text-slate-900 dark:text-slate-100 transition-all text-lg font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Email</label>
                                <input
                                    type="email"
                                    disabled
                                    value={email}
                                    className="w-full p-4 bg-slate-100 dark:bg-slate-800/80 border-2 border-transparent rounded-2xl text-slate-400 italic text-lg opacity-60"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={!isChanged || isSaving}
                                className="px-10 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 disabled:opacity-30 transition-all flex items-center gap-3"
                            >
                                {isSaving ? <LoadingSpinner className="w-6 h-6" /> : null}
                                Save Profile
                            </button>
                        </div>
                    </section>

                    {/* Account Actions Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400">
                                <Shield size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Account</h2>
                                <p className="text-slate-500 dark:text-slate-400">Manage your access</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex-1 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 flex items-center justify-between transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                        <LogOut size={24} className="text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-slate-800 dark:text-slate-100 text-lg">Sign Out</p>
                                        <p className="text-sm text-slate-500">Exit your session</p>
                                    </div>
                                </div>
                                {isLoggingOut ? <LoadingSpinner className="w-6 h-6 text-indigo-500" /> : <X className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                            </button>

                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex-1 p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-900/10 border-2 border-rose-100 dark:border-rose-900/20 hover:border-rose-200 dark:hover:border-rose-900/40 flex items-center justify-between transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-rose-600">
                                        <Trash2 size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-rose-600 dark:text-rose-400 text-lg">Delete Account</p>
                                        <p className="text-sm text-rose-400/80">Permanent removal</p>
                                    </div>
                                </div>
                                <AlertCircle className="text-rose-300 dark:text-rose-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
