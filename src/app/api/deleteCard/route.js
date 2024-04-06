import { NextResponse } from "next/server";
import connectDB from "@/backend/dbConnect";
import Cards from "@/backend/cards";

connectDB();
export async function POST(request, response) {
  const { id } = await request.json();
  const result = await Cards.deleteOne({ _id: id });
  console.log("Result ", result);
  return NextResponse.json(result.acknowledged);
}
