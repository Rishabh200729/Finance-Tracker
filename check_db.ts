import 'dotenv/config';
import { db } from "./src";
import { transactions } from "./src/db/schema";

async function check() {
    try {
        const list = await db.select().from(transactions);
        const oldOnes = list.filter(t => t.date && new Date(t.date).getFullYear() === 1970);
        console.log(`Total transactions: ${list.length}`);
        console.log(`Transactions in 1970: ${oldOnes.length}`);
        if (oldOnes.length > 0) {
            console.log("Samples:", oldOnes.slice(0, 3));
        }
    } catch (error) {
        console.error("Error connecting to database:", error);
    } finally {
        process.exit(0);
    }
}

check();
