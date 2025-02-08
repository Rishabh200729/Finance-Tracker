'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {  
  const { data: session, status } = useSession();
  console.log(session, status);
  const router = useRouter();
  useEffect(()=>{
    if(status === "authenticated"){
      router.push("/dashboard");
    }
    if(status === "unauthenticated"){
      router.push("/login")
    }
  },[status]);
  return (
    <div>
      <h1>Finance trakcer</h1>
    </div>
  );
}
