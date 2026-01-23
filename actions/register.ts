'use server';
import { db } from "../src/index";
import { users } from "../src/db/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function registerUser( name : string , email: string, password: string ) {
    try {
    const cookieStore = await cookies();
    const foundUser = await db.select().from(users).where(or(eq(users.email, email),(eq(users.name, name))));
    if (foundUser.length > 0) {
        return { error: "User already exists" };
    }   
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await db.insert(users).values({ name ,email, passwordHash }).returning();
    const token = jwt.sign({ id: newUser[0].id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    cookieStore.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 24 * 60 * 60 });
    return { success: true };
    } catch (error) {
        return { error: `Registration failed ${error}` };
    }
}