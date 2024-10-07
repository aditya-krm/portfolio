import Navbar from "@/components/customs/Nav";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Aditya Karmakar - Full Stack Developer & Software Engineer Portfolio",
  description:
    "Welcome to the portfolio of Aditya Karmakar, a full stack developer specializing in MERN stack, React, Node.js, and cloud solutions. Explore cutting-edge web development projects, technical skills, and innovative solutions for modern applications.",
  keywords: [
    "Aditya Karmakar",
    "Full Stack Developer",
    "React.js Developer",
    "Node.js Developer",
    "Web Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "Web Applications",
    "Technical Projects",
    "Programming Portfolio",
    "Aditya Karmakar Portfolio",
  ],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Aditya Karmakar" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <main>
          <Toaster position="top-right" richColors />
          <Navbar />
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
