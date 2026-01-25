'use client';
import Dashboard from "@/components/Dashboard";
import { useFinance } from "@/context/FinanceContext";

const Page = () => {
  const user = useFinance();
  console.log("User from useFinance in dashboard page:", user);
  return <Dashboard user={user} />;
}

export default Page;
