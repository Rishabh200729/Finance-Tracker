import FinanceTracker from "@/components/Finance";
import { getCurrentUser } from "@/utils/lib";

const Page = async () => {
  const user = await getCurrentUser();
  const userWithStringDate = user ? { ...user, createdAt: user.createdAt.toISOString() } : null;
  return <FinanceTracker user={userWithStringDate} />;
}

export default Page;
