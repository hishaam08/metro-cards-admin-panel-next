import { NextResponse } from "next/server";
import connectDB from "@/backend/dbConnect";
import Cards from "@/backend/cards";

connectDB();

export async function GET(request, response) {
  const cards = await Cards.find({});
  return NextResponse.json(cards);
}
