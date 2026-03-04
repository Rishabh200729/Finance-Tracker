'use server';
import { db } from "@/src";
import { budgets, monthly_incomes } from "@/src/db/schema";
import { getCurrentSession } from "@/utils/lib";
import { eq, and } from "drizzle-orm";

const upsertBudget = async (formData: FormData) => {
    const session = await getCurrentSession();
    const { id } = session || {};
    if (!id) throw new Error("User not authenticated");

    const category = formData.get("category") as string;
    const limit = formData.get("limit") as string;
    const month = formData.get("month") as string;
    const year = formData.get("year") as string;

    if (!category || !limit || !month || !year) throw new Error("Category, limit, month, and year are required");

    const limitNumber = Number(limit);

    try {
        // 1. Fetch Income and Existing Budgets for reliable validation for THIS month
        const [incomeRecord, userBudgets] = await Promise.all([
            db.query.monthly_incomes.findFirst({
                where: and(
                    eq(monthly_incomes.userId, id),
                    eq(monthly_incomes.month, month),
                    eq(monthly_incomes.year, year)
                )
            }),
            db.query.budgets.findMany({
                where: and(
                    eq(budgets.userId, id),
                    eq(budgets.month, month),
                    eq(budgets.year, year)
                )
            })
        ]);

        const totalIncome = incomeRecord?.amount || 0;
        const existingCategoryBudget = userBudgets.find(b => b.category.toLowerCase() === category.trim().toLowerCase());

        // 2. Business Logic Validation
        if (limitNumber > totalIncome) {
            return { success: false, error: "Budget limit cannot exceed current month's total income." };
        }

        const otherBudgetsTotal = userBudgets
            .filter(b => b.category.toLowerCase() !== category.trim().toLowerCase())
            .reduce((sum, b) => sum + b.limit, 0);

        if (otherBudgetsTotal + limitNumber > totalIncome) {
            return { success: false, error: "Insufficient remaining income for this month to allocate this budget." };
        }

        // 3. Perform Upsert
        const result = await db.insert(budgets).values({
            userId: id,
            category: category.trim(),
            limit: limitNumber,
            month,
            year
        }).onConflictDoUpdate({
            target: [budgets.userId, budgets.category, budgets.month, budgets.year],
            set: { limit: limitNumber }
        }).returning();

        return { success: true, newBudget: result[0] };
    } catch (error) {
        console.error("Error upserting budget:", error);
        return { success: false, error: "Failed to process budget request." };
    }
}

export default upsertBudget;