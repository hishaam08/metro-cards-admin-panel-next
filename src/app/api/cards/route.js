import { NextResponse } from "next/server";
import connectDB from "@/backend/dbConnect";
import Cards from "@/backend/cards";

connectDB();

// export async function GET(request, response) {
//   const query = await request.json();
//   console.log("Query", query);

//   const cards = await Cards.find({});
//   return NextResponse.json(cards);
// }

export async function POST(request, response) {
  const query = await request.json();

  const cards = await Cards.find({ name: { $regex: query.query } });
  return NextResponse.json(cards);
}
