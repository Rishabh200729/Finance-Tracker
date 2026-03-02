'use server';
import { db } from "../src/index";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function deleteAccount() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return { error: "Not authenticated" };

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
        const userId = payload.id;

        // Delete the user (cascades to transactions, budgets, etc. based on schema)
        await db.delete(users).where(eq(users.id, userId));

        // Clear the session cookie
        cookieStore.delete("token");

        return { success: true };
    } catch (error) {
        console.error("Delete account error:", error);
        return { error: `Failed to delete account: ${error}` };
    }
}
