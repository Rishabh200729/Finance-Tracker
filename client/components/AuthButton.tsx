'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function AuthButton(){
    const { data : session } = useSession();
    return (
        <div>
            {
                session ? (
                    <>
                        <Button variant="destructive" onClick={()=> signOut()}>Logout</Button>

                    </>
                ) : (
                    <Button  variant="default" onClick={()=> signIn("google")}>Login with Google</Button>
                )
            }
        </div>
    )
}