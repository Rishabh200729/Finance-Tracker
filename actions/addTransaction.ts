'use server';
import { db } from "@/src";
import { transactions } from "@/src/db/schema";
import { getCurrentSession } from "@/utils/lib";


const addTransaction = async (formData: FormData) => {
  try{
      const session = await getCurrentSession();
      
      const { id } = session || {};
      if(!id) throw new Error("User not authenticated");

      const description = formData.get('description') as string;
      const amount = parseFloat(formData.get('amount') as string);
      const category = formData.get('category') as string;
  
      const [newTransaction] = await db.insert(transactions).values({
          userId: id ,
          amount,
          category,
          description,
          date: new Date(),
      }).returning();
      return {success : true, newTransaction};
  } catch (error) {
      console.error("Error adding transaction:", error);
      throw new Error("Failed to add transaction");
  }

}

export default addTransaction;