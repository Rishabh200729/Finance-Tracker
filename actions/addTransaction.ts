'use server';
import { db } from "@/src";
import { budgets, transactions } from "@/src/db/schema";
import { getCurrentSession } from "@/utils/lib";
import { and, eq, sql } from "drizzle-orm";


const addTransaction = async (formData: FormData) => {
  try {
    const session = await getCurrentSession();

    const { id } = session || {};
    if (!id) throw new Error("User not authenticated");

    const description = formData.get('description') as string;
    const amount = parseFloat(formData.get('amount') as string);
    const category = formData.get('category') as string;

    return await db.transaction(async (tx) => {
      const [newTransaction] = await tx.insert(transactions).values({
        userId: id,
        amount,
        category,
        description,
        date: new Date(),
      }).returning();

      const [newBudget] = await tx.update(budgets).set({
        spent: sql`${budgets.spent} + ${amount}`,
      }).where(
        and(
          eq(budgets.userId, id),
          eq(budgets.category, category)
        )
      ).returning();
      return { success: true, newTransaction, newBudget };
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw new Error("Failed to add transaction");
  }

}

export default addTransaction;