"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const checkCursor = () => {
      const target = document.elementFromPoint(
        mousePosition.x,
        mousePosition.y
      );
      setIsPointer(
        window.getComputedStyle(target as Element).cursor === "pointer"
      );
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", checkCursor);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", checkCursor);
    };
  }, [mousePosition.x, mousePosition.y]);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    pointer: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-blue-400 mix-blend-difference pointer-events-none z-50"
        variants={variants}
        animate={isPointer ? "pointer" : "default"}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white mix-blend-difference pointer-events-none z-50"
        variants={variants}
        animate={isPointer ? "pointer" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      <style jsx global>{`
        body {
          cursor: none;
          user-select: none;
        }
      `}</style>
    </>
  );
}
