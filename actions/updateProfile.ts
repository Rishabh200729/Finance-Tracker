'use server';
import { db } from "../src/index";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface session {
    id: number;
    name: string;
    email: string;
}

export async function updateProfile(name: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) return { error: "Not authenticated" };

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as session;
        const userId = payload.id;

        // Update the database
        await db.update(users)
            .set({ name })
            .where(eq(users.id, userId));

        // Update the cookie/token if the name changed to keep session in sync
        const newToken = jwt.sign(
            { id: userId, name, email: payload.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );
        cookieStore.set("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 24 * 60 * 60
        });

        return { success: true };
    } catch (error) {
        console.error("Update profile error:", error);
        return { error: `Update failed: ${error}` };
    }
}
