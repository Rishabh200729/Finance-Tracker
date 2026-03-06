import { NextResponse } from "next/server";

// Polyfill DOMMatrix for pdf-parse in Node environments during build
if (typeof global !== 'undefined' && !(global as any).DOMMatrix) {
    (global as any).DOMMatrix = class DOMMatrix {
        constructor() { }
        static fromMatrix() { return new DOMMatrix(); }
    };
}

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const pdf = require("pdf-parse");
        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file) throw new Error("No file provided");

        const buffer = Buffer.from(await file.arrayBuffer());
        const data = await pdf(buffer);

        // Simple heuristic-based line extraction (depends on statement format)
        // In a real app, this would be much more sophisticated or use a vision model
        const lines = (data.text || "").split("\n").filter((line: string) => line.trim().length > 10);

        const transactions = lines.map((line: string) => ({
            Description: line,
            Amount: 0, // Placeholder
            Date: new Date().toISOString() // Placeholder
        })).slice(0, 20); // Limit for now

        return NextResponse.json(transactions);
    } catch (error) {
        console.error("PDF Parsing API Error:", error);
        return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
    }
}
