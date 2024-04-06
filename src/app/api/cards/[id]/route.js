import { NextResponse } from "next/server";
import connectDB from "@/backend/dbConnect";
import Cards from "@/backend/cards";
import { NextRequest } from "next/server";

connectDB();

export async function GET(request, response) {
  const searchParams = new URL(request.url);
  const id = searchParams.pathname.substring(11);

  const card = await Cards.findById(id);

  return NextResponse.json(card);
}
