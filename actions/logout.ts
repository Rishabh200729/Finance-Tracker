'use server';
import { cookies } from "next/headers";

export async function logoutUser() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");
        return { success: true };
    } catch (error) {
        return { error: `An error occurred during logout: ${error}` };
    }
}