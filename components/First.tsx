'use client';
import { useRouter } from "next/navigation";

const First = () => {   
    const router = useRouter();
    return (
        <div>
            <h1>First Component</h1>
            <button onClick={() => router.push('/login')} className = "bg-blue-500 text-white px-4 py-2 rounded mt-4">Login</button>
            <button onClick={() => router.push('/register')} className = "bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4">Register</button>
        </div>
    );
};

export default First;