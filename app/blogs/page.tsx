"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/customs/Loading";
import { motion } from "framer-motion";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
}

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (isLoading) return <Loading />;
  if (error)
    return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-900 text-white p-8">
      <motion.div
        className="container mx-auto px-4 py-8"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.h1
          className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          variants={fadeInUp}
        >
          Latest Blog Posts
        </motion.h1>
        <motion.div className="space-y-8" variants={stagger}>
          {blogPosts.map((post) => (
            <motion.div key={post._id} variants={fadeInUp}>
              <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="hover:text-blue-400 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <Button
                      variant="outline"
                      className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-200"
                      asChild
                    >
                      <Link href={`/blogs/${post.slug}`}>Read more</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {blogPosts.length === 0 && (
          <motion.p
            className="text-center text-gray-400 mt-8"
            variants={fadeInUp}
          >
            No blog posts found.
          </motion.p>
        )}

        {/* {blogPosts.length > 0 && (
          <motion.div className="mt-12 flex justify-center" variants={fadeInUp}>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
            >
              Load More Posts
            </Button>
          </motion.div>
        )} */}
      </motion.div>
    </div>
  );
}
