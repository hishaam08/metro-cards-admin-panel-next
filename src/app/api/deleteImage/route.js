import { NextResponse } from "next/server";
import { deleteImage } from "@/backend/uploadFunc";

export async function POST(request, response) {
  const data = await request.json();
  console.log("data", data);

  const result = await deleteImage(data.public_id);
  console.log("result", result);

  return NextResponse.json(result);
}
