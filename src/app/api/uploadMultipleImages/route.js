import { NextResponse } from "next/server";
import { uploadMultipleImages } from "@/backend/uploadFunc";

export async function POST(request, response) {
  const data = await request.json();
  // console.log("data", data);
  const result = await uploadMultipleImages(data.images);

  // console.log("result", result);
  return NextResponse.json(result);
}
