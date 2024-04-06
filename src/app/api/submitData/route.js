import { NextResponse } from "next/server";
import connectDB from "@/backend/dbConnect";
import Cards from "@/backend/cards";
import mongoose from "mongoose";

connectDB();
export async function POST(request, response) {
  const data = await request.json();
  console.log(data);

  const card = await Cards.create(data.data);
  console.log("Card", card);

  return NextResponse.json("ok");
}
