import Blog from "@/models/blogs";
import { connectToDB } from "@/lib/connectToDB";

export const GET = async () => {
    try {
      await connectToDB();
      const blogs = await Blog.find({}).sort({ createdAt: -1 }).exec();
      
      return new Response(JSON.stringify(blogs), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return new Response(JSON.stringify({ message: "Error fetching blogs" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

export const POST = async (request: Request) => {

  const origin = request.headers.get("origin");
  const allowedOrigins = ["http://localhost:3000", "https://aditya-karmakar.vercel.app/"];

  const frontendApiKey = request.headers.get("x-api-key");
  const validApiKey = process.env.NEXT_PUBLIC_FRONTEND_API_KEY;

  if (!origin || !allowedOrigins.includes(origin)) {
    console.error(`Unauthorized access attempt from origin: ${origin}`);
    return new Response(JSON.stringify({ message: "Hey you! This API is not for the faint-hearted. Access denied! 🚫😂" }), {
      status: 403,
    });
  }

  if (frontendApiKey !== validApiKey) {
    return new Response(JSON.stringify({ message: "Oops! That's not the magical key! 🔑✨ Access denied! 🚫😂" }), {
      status: 403,
    });
  }

    try {
      await connectToDB();
      console.log("Database connected");
  
      const data = await request.json();
      console.log("Received data:", data);
  
      if (!data.title || !data.slug || !data.excerpt || !data.content) {
        console.log("Missing fields:", { title: data.title, slug: data.slug, excerpt: data.excerpt, content: data.content });
        return new Response(JSON.stringify({ message: "Missing required fields" }), {
          status: 400,
        });
      }
  
      const blog = new Blog(data);
      await blog.save();
  
      return new Response(JSON.stringify(blog), {
        status: 201,
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      return new Response(JSON.stringify({ message: "Error creating blog", error }), {
        status: 500,
      });
    }
  };
  