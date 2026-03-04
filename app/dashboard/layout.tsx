import Header from "@/components/Header";
import { getCurrentSession, getDashBoardData } from "@/utils/lib";
import { redirect } from "next/navigation";
import { FinanceProvider } from "@/context/FinanceContext";
import { UserProvider } from "@/context/UserContext";
import FinanceChat from "@/components/FinanceChat";

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
    <UserProvider initialName={userData?.name} initialEmail={userData?.email}>
      <FinanceProvider initialData={userData}>
        <div className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-stone-900 dark:to-stone-800 p-4 min-h-screen transition-colors">
          <Header userName={userSession.name} />
          <main>{children}</main>
          <FinanceChat />
        </div>
      </FinanceProvider>
    </UserProvider>
  );
}
