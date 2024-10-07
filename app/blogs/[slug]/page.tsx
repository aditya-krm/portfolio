"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { marked } from "marked";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import Loading from "@/components/customs/Loading";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  readingTime: number;
}

export default function BlogPost() {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError("Error fetching blog post. Please try again later.");
        console.error("Error fetching blog post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60, transition: { duration: 0.6 } },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-900 text-white p-8">
        <motion.div
          className="container mx-auto px-4 py-8 text-center"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <Button
            variant="outline"
            asChild
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            <Link href="/blogs">
              <ArrowLeft className="inline mr-2" />
              Back to all blogs
            </Link>
          </Button>
        </motion.div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-900 text-white p-8">
        <motion.div
          className="container mx-auto px-4 py-8 text-center"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-2xl font-bold mb-4 text-gray-300">
            Blog post not found
          </h1>
          <Button
            variant="outline"
            asChild
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            <Link href="/blogs">
              <ArrowLeft className="inline mr-2" />
              Back to all blogs
            </Link>
          </Button>
        </motion.div>
      </div>
    );

  const getMarkdownContent = (markdown: string) => {
    return { __html: marked(markdown) };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-900 text-white p-8">
      <motion.div
        className="container mx-auto px-4 py-8 max-w-3xl"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <Button
          variant="outline"
          asChild
          className="mb-6 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
        >
          <Link href="/blogs">
            <ArrowLeft className="inline mr-2" />
            Back to all blogs
          </Link>
        </Button>
        <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-800/70 border-b border-gray-700">
            <CardTitle className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              {blog.title}
            </CardTitle>
            <div className="flex items-center text-gray-400 text-sm mb-6 space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(blog.createdAt).toLocaleDateString("en-GB")}
              </span>
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                Aditya Karmakar
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div
              className="prose prose-invert max-w-none prose-headings:text-gray-300 prose-p:text-gray-400 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-gray-300 prose-code:text-gray-300 prose-pre:bg-gray-800/70 prose-pre:border prose-pre:border-gray-700"
              dangerouslySetInnerHTML={getMarkdownContent(blog.content)}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
