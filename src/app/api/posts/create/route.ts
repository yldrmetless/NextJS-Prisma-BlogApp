import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received body: ", body); 

    const post = await db.post.create({
      data: {
        title: body.title,
        content: body.content,
        tagId: body.tag, 
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("Error creating post: ", err); 
    return NextResponse.json(
      { message: "could not create post" },
      { status: 500 }
    );
  }
}
