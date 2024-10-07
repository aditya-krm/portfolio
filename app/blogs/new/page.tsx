"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Dynamically import the Markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    password: "",
  });

  // Handle changes and auto-generate slug for title input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Auto-generate slug when title changes
    if (name === "title") {
      const slug = handleSlugGeneration(value);
      setFormData((prev) => ({ ...prev, [name]: value, slug }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Function to generate slug from title
  const handleSlugGeneration = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleContentChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, content: value || "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !formData.title ||
      !formData.slug ||
      !formData.excerpt ||
      !formData.content ||
      !formData.password
    ) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      toast.success("Your blog post has been successfully created.");
      router.push("/blogs");
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Failed to create blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog post title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Slug
          </label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            readOnly
            placeholder="enter-blog-post-slug"
          />
          <p className="mt-1 text-sm text-gray-500">
            The URL-friendly version of the title. Automatically generated.
          </p>
        </div>
        <div>
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Excerpt
          </label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Enter a brief summary of your blog post"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <MDEditor
            value={formData.content}
            onChange={handleContentChange}
            preview="live"
            height={400}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password to create blog post"
            required
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Blog Post"}
        </Button>
      </form>
    </div>
  );
}
