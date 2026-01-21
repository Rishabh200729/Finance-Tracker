import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Expense } from "@/lib/models/expense";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, amount, category } = await req.json();
    if (!title || !amount || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const expensesCollection = db.collection<Expense>("expenses");

    const newExpense: Expense = {
      userId: session.user.email!, // Store user reference
      title,
      amount: Number(amount),
      category,
      date: new Date(),
    };

    await expensesCollection.insertOne(newExpense);

    return NextResponse.json({ message: "Expense added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding expense:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const expenses = await db.collection<Expense>("expenses").find().toArray();
    console.log("expense", expenses);
    return NextResponse.json(expenses);
  }catch(error){
    console.log(error)
    return NextResponse.json({ error : "Failed to fetch expenses"}, { status : 500});
  }
}
