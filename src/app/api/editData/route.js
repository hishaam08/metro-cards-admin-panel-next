import { NextResponse } from "next/server";
import connectDB from "@/backend/dbConnect";
import Cards from "@/backend/cards";

connectDB();
export async function POST(request, response) {
  const data = await request.json();
  const id = data.data.id;

  console.log("id", id);

  const cardData = {};
  cardData.name = data.data.name;
  cardData.description = data.data.description;
  cardData.price = data.data.price;
  cardData.cardType = data.data.cardType;
  cardData.religionType = data.data.religionType;
  cardData.occasion = data.data.occasion;
  cardData.type = data.data.type;
  cardData.images = data.data.images;

  console.log("cd", cardData);

  const card = await Cards.findByIdAndUpdate(id, cardData);
  console.log("Card", card);

  return NextResponse.json("ok");
}
