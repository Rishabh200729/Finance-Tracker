import First from '@/components/First';
import { getCurrentSession } from "@/utils/lib";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentSession();

  // If the user is found (logged in), redirect them to the dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen font-sans">
      <First />
    </main>
  );
}