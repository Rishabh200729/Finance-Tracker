"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
    console.log(status)

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirect logged-in users
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading state while checking auth
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Login to Your Account</h1>
      <Button onClick={() => signIn("google",{callbackUrl:"/dashboard/"})}>
        Login with Google
      </Button>
    </div>
  );
}
