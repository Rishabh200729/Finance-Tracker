"use server"

import { db } from "@/src"
import { budgets, transactions } from "@/src/db/schema"
import { getCurrentSession } from "@/utils/lib"
import { and, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

interface ExtractedTransaction {
    date: string
    description: string
    amount: number
    category: string
    budgetLimit?: number
}

export async function importTransactionsAction(data: ExtractedTransaction[]) {
    try {
        const session = await getCurrentSession()
        if (!session) throw new Error("Unauthorized")

        await db.transaction(async (tx) => {
            for (const t of data) {
                const transactionDate = new Date(t.date)
                const MONTH_NAMES = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ]
                const month = MONTH_NAMES[transactionDate.getMonth()]
                const year = transactionDate.getFullYear().toString()

                // 1. Ensure a budget exists for this category/month/year if budgetLimit is provided
                // This allows the user to create a new category and set its budget on the fly
                if (t.budgetLimit !== undefined && t.budgetLimit >= 0) {
                    await tx.insert(budgets).values({
                        userId: session.id,
                        category: t.category,
                        limit: t.budgetLimit,
                        month,
                        year,
                        spent: 0
                    }).onConflictDoUpdate({
                        target: [budgets.userId, budgets.category, budgets.month, budgets.year],
                        set: { limit: t.budgetLimit }
                    });
                }

                // 2. Insert the transaction
                await tx.insert(transactions).values({
                    userId: session.id,
                    amount: t.amount,
                    category: t.category,
                    description: t.description,
                    date: transactionDate,
                })

                // 3. Update the budget spent amount (creating it with 0 limit if it doesn't exist yet)
                // This handles cases where Gemini found a category but the user didn't specify a budget limit
                await tx.insert(budgets).values({
                    userId: session.id,
                    category: t.category,
                    spent: t.amount,
                    limit: 0,
                    month,
                    year
                }).onConflictDoUpdate({
                    target: [budgets.userId, budgets.category, budgets.month, budgets.year],
                    set: {
                        spent: sql`${budgets.spent} + ${t.amount}`,
                    }
                })
            }
        })

        revalidatePath("/dashboard/transactions")
        return { success: true }
    } catch (error: any) {
        console.error("Import Action Error:", error)
        return { success: false, error: error.message || "Failed to import" }
    }
}
