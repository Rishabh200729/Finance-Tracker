import First from '@/components/First';
import { getCurrentUser } from "@/utils/lib";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  // If the user is found (logged in), redirect them to the dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
        <First />
    </div>
  );
}