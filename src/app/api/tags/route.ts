import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const tags = await db.tag.findMany();
    return NextResponse.json(tags, { status: 200 });
  } 
  catch (err) {
    return NextResponse.json(
      { message: "could not fetch tags" },
      { status: 500 }
    );
  }
};
