"use server"

import { chatWithTransactions } from "@/lib/gemini";
import { db } from "@/src/index";
import { transactions } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";
import { getCurrentSession } from "@/utils/lib";

export async function getChatResponseAction(query: string) {
    try {
        const session = await getCurrentSession();
        if (!session) {
            return { success: false, error: "Unauthorized" };
        }

        const userTransactions = await db.select()
            .from(transactions)
            .where(eq(transactions.userId, session.id))
            .orderBy(desc(transactions.date))
            .limit(50);

        const response = await chatWithTransactions(query, userTransactions);
        return { success: true, response };
    } catch (error) {
        console.error("Chat Action Error:", error);
        return { success: false, error: "Failed to get AI response" };
    }
}
