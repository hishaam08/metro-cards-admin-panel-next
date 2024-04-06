import { NextResponse } from "next/server";
import { uploadSingleImage } from "@/backend/uploadFunc";

export async function POST(request, response) {
  const data = await request.json();
  const result = await uploadSingleImage(data.image);

  // console.log("result", result);
  return NextResponse.json(result);
}
