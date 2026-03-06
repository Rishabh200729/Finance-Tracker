import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const adminModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function chatWithTransactions(query: string, transactions: any[]): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
        return "Please set up your Gemini API key to use the financial chat.";
    }

    const systemPrompt = `
    You are a professional financial assistant for the 'Smart Finance Tracker' app. 
    You have access to the user's recent transactions. 
    Your goal is to answer queries about their spending, trends, and financial health accurately and concisely.
    
    Context (Recent Transactions):
    ${JSON.stringify(transactions)}
    
    Rules:
    1. Only use the provided transaction data to answer specific financial questions.
    2. If the user asks for a total, calculate it exactly.
    3. Be encouraging but professional.
    4. If you don't have enough data or the query is unrelated to finance, politely say so.
    5. Keep responses brief (under 3 sentences unless complex calculation is needed).
  `;

    try {
        const chat = adminModel.startChat({
            history: [
                { role: "user", parts: [{ text: systemPrompt }] },
                { role: "model", parts: [{ text: "Understood. I am ready to analyze your financial data. How can I help you today?" }] },
            ],
        });

        const result = await chat.sendMessage(query);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("AI Chat Error:", error);
        return "I'm having trouble connecting to my brain right now. Please try again in a moment.";
    }
}

export async function hypothesizeCategories(transactionDescriptions: string[], availableCategories: string[]) {
    if (!process.env.GEMINI_API_KEY) {
        return transactionDescriptions.map(() => "Uncategorized");
    }

    const DEFAULT_CATEGORIES = [
        "Food & Dining", "Transportation", "Shopping", "Utilities",
        "Entertainment", "Health & Fitness", "Housing", "Income", "Personal Care"
    ];

    const finalCategories = availableCategories.length > 0 ? availableCategories : DEFAULT_CATEGORIES;

    const systemPrompt = `
    You are a financial categorization expert. 
    Your goal is to categorize bank transaction descriptions.
    
    Try to map each transaction to one of these EXISTING categories if possible:
    ${finalCategories.join(", ")}
    
    Rules:
    1. PRIORITIZE the existing categories listed above.
    2. If a transaction clearly does not fit any existing category, you may suggest a new, descriptive, and concise category name (1-3 words).
    3. If you are completely unsure, return 'Uncategorized'.
    4. Respond ONLY with a valid JSON array of category strings.
    5. Do NOT include any explanations or markdown.
    `;

    try {
        const result = await adminModel.generateContent([
            systemPrompt,
            `Descriptions: ${JSON.stringify(transactionDescriptions)}`
        ]);
        const responseText = result.response.text().trim();
        const jsonText = responseText.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("AI Categorization Error:", error);
        return transactionDescriptions.map(() => "Uncategorized");
    }
}
