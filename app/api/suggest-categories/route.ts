import { hypothesizeCategories } from "@/lib/gemini";
import { NextResponse } from "next/server";

function excelDateToJSDate(serial: number) {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);

    const seconds = total_seconds % 60;
    total_seconds -= seconds;

    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}

export async function POST(req: Request) {
    try {
        const { transactions, categories } = await req.json();

        // Extract descriptions for AI
        const descriptions = transactions.map((t: any) => {
            // Handle various spreadsheet structures (common bank column names)
            return t.Description || t.description || t.Details || t.Narrative || Object.values(t)[1] || "Unknown";
        });

        const suggestedCategories = await hypothesizeCategories(descriptions, categories);

        const mappedTransactions = transactions.map((t: any, i: number) => {
            const amount = parseFloat(t.Amount || t.amount || t.Debit || t.Credit || Object.values(t)[2] || "0");
            const dateStr = t.Date || t.date || Object.values(t)[0] || new Date().toISOString();

            let date: Date;
            if (typeof dateStr === 'number') {
                date = excelDateToJSDate(dateStr);
            } else {
                date = new Date(dateStr);
            }
            if (isNaN(date.getTime())) date = new Date();

            return {
                date: date.toISOString(),
                description: descriptions[i],
                amount: Math.abs(amount),
                category: suggestedCategories[i] || "Uncategorized"
            };
        });

        return NextResponse.json({ transactions: mappedTransactions });
    } catch (error) {
        console.error("Categorization API Error:", error);
        return NextResponse.json({ error: "Failed to categorize" }, { status: 500 });
    }
}
