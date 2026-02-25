'use server';

import { db } from "@/src";
import { monthly_incomes } from "@/src/db/schema";
import { getCurrentSession } from "@/utils/lib";
import { eq, and } from "drizzle-orm";

const upsertIncome = async (currentIncome: number, data: FormData) => {
    try {
        const session = await getCurrentSession();
        // Always good to handle the 'no session' case gracefully for the UI
        if (!session?.id) {
            return { success: false, error: "User not authenticated" };
        }

        const id = session.id;
        const newAmount = parseFloat(data.get('income') as string);
        
        if (isNaN(newAmount)) {
            return { success: false, error: "Invalid income amount" };
        }

        const now = new Date();
        const currentMonth = now.toLocaleString('default', { month: 'long' });
        const currentYear = now.getFullYear().toString();

        // The 'values' should represent the full object for a fresh insert
        const incomeObj = await db.insert(monthly_incomes)
            .values({
                userId: id,
                amount: newAmount,
                date: now,
                month: currentMonth,
                year: currentYear,
            })
            .onConflictDoUpdate({
                target: [monthly_incomes.userId], 
                set: {
                    amount: newAmount,
                    date: now,
                    month: currentMonth,
                    year: currentYear,
                },
            })
            .returning();

        return { 
            success: true, 
            income: Number(incomeObj[0].amount) // Drizzle sometimes returns decimals as strings
        };

    } catch (error) {
        console.error("Upsert Error:", error);
        return { success: false, error: "Database operation failed" };
    }
};

export default upsertIncome;