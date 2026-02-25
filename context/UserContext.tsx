'use client';
import { useState, createContext, useContext } from "react";

interface UserContextType {
    userName: string;
    setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const setUser = (user: any) => {
        setUserName(user.userName);
        setEmail(user.email);
    };

    return (
        <UserContext.Provider value={{ userName, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
