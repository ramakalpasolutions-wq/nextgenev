"use client";

import { motion } from "framer-motion";

const letters = "NEXTGEN EV".split("");

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HeroNameReveal() {
  return (
    <motion.h1
      className="text-center font-semibold uppercase tracking-[0.35em] text-sm sm:text-base"
      variants={container}
      initial="hidden"
      animate="show"
      style={{ overflow: "hidden" }}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          variants={item}
          style={{
            display: "inline-block",
            transformOrigin: "bottom",
            marginRight: ch === " " ? "0.35em" : 0,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.h1>
  );
}
