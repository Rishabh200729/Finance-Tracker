'use server';
import { db, } from "@/src";
import { budgets, transactions } from "@/src/db/schema";
import { eq, sql, and } from "drizzle-orm";

const deleteTransaction = async (transactionId: number) => {
    try {
        return await db.transaction(async (tx) => {
            const [transaction] = await tx.select().from(transactions).where(eq(transactions.id, transactionId));
            await tx.delete(transactions).where(eq(transactions.id, transactionId));
            const [updatedBudget] = await tx.update(budgets).set({
                spent: sql`${budgets.spent} - ${transaction.amount}`,
            }).where(
                and(
                    eq(budgets.userId, transaction.userId),
                    eq(budgets.category, transaction.category)
                )
            ).returning();
            return { success: true, updatedBudget };
        });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        throw new Error("Failed to delete transaction");
    }
};

export default deleteTransaction;