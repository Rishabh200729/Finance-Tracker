import Header from "@/components/Header";
import { getCurrentUser } from "@/utils/lib";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 min-h-screen">
      <Header user={user} />
      <main>{children}</main>
    </div>
  );
}
