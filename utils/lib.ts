'use server';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "../src/index";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id : string };
    console.log("Payload:", payload);
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.id))
      .limit(1);

    // remove password from result and return user object
    const user = result.map(({ passwordHash, ...rest }) => rest);
    return user[0] ?? null;
  } catch {
    return null;
  }
}


