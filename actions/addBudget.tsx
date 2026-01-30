'use server';
import { db } from "@/src";
import { budgets } from "@/src/db/schema";
import { getCurrentSession } from "@/utils/lib";


const upsertBudget = async (formData: FormData) => {
    const session = await getCurrentSession();

    const { id } = session || {};
    if (!id) throw new Error("User not authenticated");
    console.log(formData);
    const category = formData.get("category") as string;
    const limit = formData.get("limit") as string;

    if (!category || !limit) {
        throw new Error("Category and limit are required");
    }
    const limitNumber = Number(limit);
    try {
        const result = await db.insert(budgets).values({ userId: id, category, limit: limitNumber }).onConflictDoUpdate({
            target: [budgets.userId, budgets.category],
            set: { limit: limitNumber }
        }).returning();
        return { succcess: true, newBudget: result[0] };
    } catch (error) {
        console.error("Error adding transaction:", error);
        throw new Error("Failed to add transaction");
    }

}

export default upsertBudget;