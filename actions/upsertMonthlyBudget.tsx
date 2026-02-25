'use server';

const upsertMonthlyBudget = async (income: number, userId: string) => {
    try {
    } catch (error) {
        console.error("Error upserting monthly budget:", error);
        throw new Error("Failed to update monthly budget");
    }
};

export default upsertMonthlyBudget;