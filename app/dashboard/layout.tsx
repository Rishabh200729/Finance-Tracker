import Header from "@/components/Header";
import { getCurrentSession, getDashBoardData } from "@/utils/lib";
import { redirect } from "next/navigation";
import { FinanceProvider } from "@/context/FinanceContext";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = await getCurrentSession();

  if (!userSession?.id) {
    redirect("/login");
  }
  const userData = await getDashBoardData(userSession.id);
  
  return (
    <FinanceProvider initialData={userData}>
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 min-h-screen">
      <Header userName={userSession.name} />
      <main>{children}</main>
    </div>
    </FinanceProvider>
  );
}
