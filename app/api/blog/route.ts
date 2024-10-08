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
  const webhookUrl = process.env.DISCORD_WEBHOOK || "";
  try {
    const data = await request.json();

    if (
      !data.title ||
      !data.slug ||
      !data.excerpt ||
      !data.content ||
      !data.password
    ) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const correctPassword = process.env.BLOG_PASSWORD;
    if (data.password !== correctPassword) {
      return new Response(JSON.stringify({ message: "Incorrect password" }), {
        status: 401,
      });
    }

    await connectToDB();

    const existingBlog = await Blog.findOne({
      slug: data.slug,
    }).exec();

    if (existingBlog) {
      return new Response(
        JSON.stringify({ message: "Blog with this slug already exists" }),
        {
          status: 400,
        }
      );
    }

    const blog = new Blog(data);
    await blog.save();

    const blogUrl = `https://aditya-karmakar.vercel.app/blogs/${data.slug}`;
    if (webhookUrl) {
      await sendBlogToDiscord(data.title, blogUrl, webhookUrl);
    } else {
      console.error("Discord webhook URL is not defined");
    }
    return new Response(JSON.stringify(blog), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return new Response(
      JSON.stringify({ message: "Error creating blog", error }),
      {
        status: 500,
      }
    );
  }
};

// function for webhook of discord
async function sendBlogToDiscord(
  blogTitle: string,
  blogUrl: string,
  webhookUrl: string
) {
  const data = {
    content: "@everyone New blog uploaded!",
    embeds: [
      {
        title: blogTitle,
        description: `Check out the full blog post here: ${blogUrl}`,
      },
    ],
  };

  try {
    if (!webhookUrl) {
      throw new Error("Discord webhook URL is not defined");
    }
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    console.log("Message sent to Discord successfully");
  } catch (error) {
    console.error("Error sending message to Discord:", error);
  }
}
