'use client';

import { Loader } from "lucide-react";

interface LoadingSpinnerProps {
    className?: string;
}

const LoadingSpinner = ({ className = "" }: LoadingSpinnerProps) => {
    return (
        <Loader className={`w-4 h-4 animate-spin ${className}`} />
    );
};

export default LoadingSpinner;
