import Dashboard from "@/components/Dashboard";
import { getCurrentUser } from "@/utils/lib";

const Page = async () => {
  const user = await getCurrentUser();
  const userWithStringDate = user ? { ...user, createdAt: user.createdAt.toISOString() } : null;
  return <Dashboard user={userWithStringDate} />;
}

export default Page;
