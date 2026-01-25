"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "../src/index";
import { transactions, users, budgets, savingsGoals } from "../src/db/schema";
import { eq } from "drizzle-orm";

interface session {
  id : number;
  name : string;
}

export const getCurrentSession = async (): Promise<session | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as session;
    return payload;
  } catch {
    return null;
  }
};

export const getDashBoardData = async (userId: number) => {
  try {
    const result = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        transactions: {
          orderBy: (t, { desc }) => [desc(t.date)],
          limit : 10
        },
        budgets: true,
        savingsGoals: true
      }
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
