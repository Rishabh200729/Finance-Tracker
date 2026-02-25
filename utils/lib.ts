"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "../src/index";
import { transactions, users, budgets, savingsGoals, monthly_incomes } from "../src/db/schema";
import { eq, and, between, sum, desc } from "drizzle-orm";

interface session {
  id: number;
  name: string;
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
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // 1. Fetch the basic user data (budgets, goals, transaction,monthlyIncomes)
    const userWithRelations = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        transactions: {
          orderBy: (t, { desc }) => [desc(t.date)],
          limit: 10 // Only fetch recent transactions for UI
        },
        budgets: true,
        savingsGoals: true,
        monthlyIncomes: true
      }
    });

    if (!userWithRelations) return null;

    // 2. Aggregate monthly expenses
    const [monthlyExpenseResult] = await db
      .select({
        total: sum(transactions.amount),
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          between(transactions.date, startOfMonth, endOfMonth)
        )
      );

    // 3. Aggregate top spending category
    const [topCategoryResult] = await db
      .select({
        category: transactions.category,
        amount: sum(transactions.amount),
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          between(transactions.date, startOfMonth, endOfMonth)
        )
      )
      .groupBy(transactions.category)
      .orderBy(desc(sum(transactions.amount)))
      .limit(1);

    return {
      ...userWithRelations,
      calculatedStats: {
        monthlyExpenses: Number(monthlyExpenseResult?.total || 0),
        topSpendingCategory: topCategoryResult ? {
          category: topCategoryResult.category,
          amount: Number(topCategoryResult.amount)
        } : null
      }
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
};
