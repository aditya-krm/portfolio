import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/connectToDB";
import Blog from "@/models/blogs";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectToDB();
    const { slug } = params;

    const blog = await Blog.findOne({ slug }).exec();

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ message: "Error fetching blog" }, { status: 500 });
  }
}