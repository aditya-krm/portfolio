"use client";

import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  DownloadIcon,
  PhoneIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EnhancedPortfolio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-900 text-white p-8 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto space-y-12"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        {/* Welcome Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={fadeInUp}
        >
          <div className="md:col-span-2 flex">
            <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Welcome to My Portfolio
                </CardTitle>
                {mounted && (
                  <TypeAnimation
                    sequence={[
                      "I develop MERN stack applications",
                      1000,
                      "I solve complex problems with React and Node.js",
                      1000,
                      "I create sleek, user-friendly interfaces",
                      1000,
                    ]}
                    wrapper="h2"
                    speed={50}
                    className="text-2xl text-blue-400"
                    repeat={Infinity}
                  />
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mt-4 text-base leading-relaxed">
                  I am a passionate Full Stack Developer with hands-on
                  experience in the MERN stack, including MongoDB, Express.js,
                  React.js, and Node.js. My expertise extends to React Native,
                  Next.js, and a variety of tools such as JWT, Tailwind CSS, and
                  Socket.io. I thrive in developing dynamic and secure web
                  applications, and I'm continuously expanding my skill set to
                  tackle new challenges. With a strong foundation in programming
                  languages like JavaScript, TypeScript, Python, C++, and Java,
                  I enjoy working on innovative projects and contributing to
                  open-source communities.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Card */}
          <motion.div className="flex" variants={fadeInUp}>
            <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm flex flex-col w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  Aditya Karmakar
                </CardTitle>
                <p className="text-gray-400">Full Stack Developer</p>
              </CardHeader>
              <CardContent className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="space-y-2 mb-4 cursor-pointer">
                    <motion.a
                      href="mailto:adkarmakar521@gmail.com?subject=Portfolio Inquiry"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center"
                    >
                      <MailIcon className="mr-2" /> adkarmakar521@gmail.com
                    </motion.a>
                    <motion.a
                      href="tel:6296306334"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center"
                    >
                      <PhoneIcon className="mr-2" /> 6296306334
                    </motion.a>
                  </div>

                  <div className="flex justify-center space-x-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button variant="outline" size="icon" asChild>
                        <Link
                          href="https://github.com/aditya-krm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button variant="outline" size="icon" asChild>
                        <Link
                          href="https://linkedin.com/in/aditya-karmakar"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    asChild
                  >
                    <Link
                      href={`https://drive.google.com/uc?export=download&id=${process.env.NEXT_PUBLIC_RESUME_ID}`}
                      rel="noopener noreferrer"
                    >
                      <DownloadIcon className="mr-2 h-4 w-4" /> Download Resume
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* About Me Section */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 leading-relaxed">
                I am a dedicated Full Stack Developer specializing in creating
                robust and scalable web applications. My journey in software
                development has equipped me with a diverse skill set, enabling
                me to tackle complex challenges and deliver high-quality
                solutions. I am passionate about leveraging the latest
                technologies to build applications that not only meet user needs
                but also provide exceptional user experiences.
              </p>
              <p className="mb-4 leading-relaxed">
                Beyond coding, I actively contribute to open-source projects and
                enjoy collaborating with other developers to drive innovation.
                My commitment to continuous learning ensures that I stay updated
                with emerging trends and best practices in the industry.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  className="transition-colors duration-200 hover:text-blue-400"
                >
                  <span className="font-bold">Front-end:</span> React, Next.js,
                  TypeScript, Tailwind CSS
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  className="transition-colors duration-200 hover:text-green-400"
                >
                  <span className="font-bold">Back-end:</span> Node.js,
                  Express.js, Python
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  className="transition-colors duration-200 hover:text-yellow-400"
                >
                  <span className="font-bold">Databases:</span> MongoDB, MySQL
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  className="transition-colors duration-200 hover:text-purple-400"
                >
                  <span className="font-bold">Other:</span> JWT, Socket.io,
                  Redux Toolkit
                </motion.li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Experience Section */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-600">
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2">
                  Full Stack Developer Intern
                </h3>
                <p className="text-gray-400 mb-2">WebStack Academy</p>
                <p className="mb-4">
                  During my internship at WebStack Academy, I developed various
                  full stack projects, including:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Gained hands-on experience with the MERN stack, mastering
                    MongoDB, Express.js, React.js, and Node.js.
                  </li>
                  <li>
                    Developed dynamic and responsive web applications through
                    practical projects.
                  </li>
                  <li>
                    Enhanced understanding of user authentication and security
                    through essential login techniques like Bcrypt.js, JWT.
                  </li>
                </ul>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Projects Section */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-500">
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: "Devhub - Social Media Platform",
                  tech: "Next.js, MongoDB, NextAuth",
                  description:
                    "A secure platform for developers to connect and share posts, with robust authentication.",
                  link: "https://devhub-post.vercel.app/",
                  github: "https://github.com/aditya-krm/devhub-post",
                },
                {
                  title: "Real-time Chat Application",
                  tech: "MERN Stack, Socket.io",
                  description:
                    "A live chat system featuring real-time communication and user authentication.",
                  link: "https://chat-app-0b1m.onrender.com/",
                  github: "https://github.com/aditya-krm/chat-app",
                },
                {
                  title: "AI Article Summarizer",
                  tech: "React, Redux Toolkit, GPT-4",
                  description:
                    "A web app that summarizes articles using OpenAI GPT-4, built with React and TypeScript.",
                  link: "https://ai-summarizer-wine-two.vercel.app/",
                  github: "https://github.com/aditya-krm/ai--summarizer",
                },
                {
                  title: "Role-Based Dashboard",
                  tech: "Next.js, JWT, MongoDB",
                  description:
                    "A role-based dashboard for managing users and their roles, with secure authentication.",
                  link: "https://role-based-dashboard.onrender.com/",
                  github: "https://github.com/aditya-krm/role-based-dashboard",
                },
                {
                  title: "Small Web Applications",
                  tech: "React, API Integration",
                  description:
                    "Collection of small-scale apps, including a currency converter, weather app, and more.",
                  link: "https://small-projects-sigma.vercel.app/",
                  github: "https://github.com/aditya-krm/Small-Projects",
                },
                {
                  title: "State-City Dropdown NPM Package",
                  tech: "JavaScript, NPM",
                  description:
                    "A customizable state-city dropdown component for India, published as an npm package.",
                  link: "https://www.npmjs.com/package/state-city-dropdown-india",
                  github:
                    "https://github.com/aditya-krm/state-city-dropdown-india",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800/50 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 mb-2">{project.tech}</p>
                  <p className="mb-4">{project.description}</p>
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    GitHub Repository
                  </Link>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills & Technologies Section */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    Languages
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "JavaScript (ES6+)",
                      "TypeScript",
                      "Python",
                      "C++",
                      "Java",
                    ].map((skill, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="h-2 w-2 bg-blue-500 rounded-full" />
                        <span>{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-400">
                    Frameworks & Tools
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "React & Next.js",
                      "Node.js & Express",
                      "Tailwind CSS & Bootstrap",
                      "Socket.io",
                      "JWT",
                      "Redux Toolkit",
                      "Git & GitHub",
                    ].map((skill, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="h-2 w-2 bg-green-500 rounded-full" />
                        <span>{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Section */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  className="transition-colors duration-200 hover:text-yellow-400"
                >
                  <span className="font-bold">NPM Package Published:</span>{" "}
                  Created and published the{" "}
                  <a
                    href="https://www.npmjs.com/package/state-city-dropdown-india"
                    className="text-blue-400 underline"
                  >
                    state-city-dropdown-india
                  </a>{" "}
                  package, enhancing form functionalities for developers.
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  className="transition-colors duration-200 hover:text-yellow-400"
                >
                  <span className="font-bold">Open Source Contributor:</span>{" "}
                  Contributed to various open-source projects, improving
                  features and fixing bugs to support the developer community.
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  className="transition-colors duration-200 hover:text-yellow-400"
                >
                  <span className="font-bold">Project Showcases:</span>{" "}
                  Successfully deployed multiple full stack applications,
                  including real-time chat systems and social media platforms,
                  demonstrating strong technical capabilities.
                </motion.li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Testimonials Section (Optional) */}
        {/* 
        <motion.div variants={fadeInUp}>
          <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-green-600">
                Testimonials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <blockquote className="italic">
                  "Aditya is a highly skilled developer who consistently delivers high-quality work. His expertise in full stack development has been invaluable to our projects."
                  <footer className="mt-2 text-right text-gray-400">- Jane Doe, Project Manager</footer>
                </blockquote>
                <blockquote className="italic">
                  "Working with Aditya has been a pleasure. His problem-solving abilities and dedication to excellence make him a standout developer."
                  <footer className="mt-2 text-right text-gray-400">- John Smith, Team Lead</footer>
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        */}
      </motion.div>
    </div>
  );
}
