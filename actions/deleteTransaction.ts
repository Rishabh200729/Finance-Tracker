'use server';
import { db } from "@/src";
import { transactions } from "@/src/db/schema";
import { eq } from "drizzle-orm";

const deleteTransaction = async (transactionId: number) => {
    try {
        await db.delete(transactions).where(eq(transactions.id, transactionId));
        return { success: true };
    } catch (error) {
        console.error("Error deleting transaction:", error);
        throw new Error("Failed to delete transaction");
    }
};

export default deleteTransaction;