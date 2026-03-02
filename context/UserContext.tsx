'use client';
import { useState, createContext, useContext } from "react";

interface UserContextType {
    userName: string;
    email: string;
    setUser: (user: any) => void;
    updateUser: (updates: Partial<{ userName: string; email: string }>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children, initialName, initialEmail }: {
    children: React.ReactNode;
    initialName?: string;
    initialEmail?: string;
}) => {
    const [userName, setUserName] = useState<string>(initialName || '');
    const [email, setEmail] = useState<string>(initialEmail || '');
    const setUser = (user: any) => {
        setUserName(user.userName || '');
        setEmail(user.email || '');
    };

    const updateUser = (updates: Partial<{ userName: string; email: string }>) => {
        if (updates.userName !== undefined) setUserName(updates.userName);
        if (updates.email !== undefined) setEmail(updates.email);
    };

    return (
        <UserContext.Provider value={{ userName, email, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
