'use server';
import { db } from "../src/index";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function loginUser( email: string, password: string ) {
    try{
        const foundUser = await db.select().from(users).where(eq(users.email, email));
        const cookieStore = await cookies();
        if (foundUser.length === 0) {
            return { error: "User not found" };
        }
        const isPasswordValid = await bcrypt.compare(password, foundUser[0].passwordHash);
        if (!isPasswordValid) {
            return { error: "Invalid password" };
        }
        const token = jwt.sign({ id: foundUser[0].id, name : foundUser[0].name }, process.env.JWT_SECRET!, { expiresIn: "1d" });
        cookieStore.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 24 * 60 * 60 });
        return { success: true };
    }catch(error){
        return { error: `An error occurred during login: ${error}` };
    }
}