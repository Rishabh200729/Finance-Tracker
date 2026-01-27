'use server';
import { db } from "@/src";
import { budgets } from "@/src/db/schema";
import { getCurrentSession } from "@/utils/lib";


const upsertBudget = async (formData: FormData) => {
      const session = await getCurrentSession();
      
      const { id } = session || {};
      if(!id) throw new Error("User not authenticated");

      const category = formData.get("category") as string;
      const limit = formData.get("limit") as string;
  
    try {
        const result = await db.insert(budgets).values({ userId: id , category, limit}).onConflictDoUpdate({
            target : budgets.category,
            set : { limit }
        }).returning();
        return { succcess : true , budget : result[0]}
  } catch (error) {
      console.error("Error adding transaction:", error);
      throw new Error("Failed to add transaction");
  }

}

export default upsertBudget;