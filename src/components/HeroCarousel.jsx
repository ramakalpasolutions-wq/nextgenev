"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: "urban",
    title: "Electric mobility for modern India.",
    subtitle: "From daily commutes to last-mile deliveries, NextGen EV powers it all.",
    badge: "Urban & Fleet",
  },
  {
    id: "range",
    title: "Smart range. Fast charge. Low running cost.",
    subtitle:
      "Optimized batteries, efficient motors and connected intelligence for every kilometer.",
    badge: "Intelligent Performance",
  },
  {
    id: "future",
    title: "Built for the next decade of clean mobility.",
    subtitle: "Designed, engineered and assembled for Indian roads and Indian businesses.",
    badge: "Sustainable Future",
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export default function HeroCarousel({ primaryColor = "#4ADE80" }) {
  const [[index, direction], setIndex] = useState([0, 0]);

  useEffect(() => {
    const timer = setInterval(
      () => paginate(1),
      6500 // auto change
    );
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const paginate = (dir) => {
    setIndex(([i]) => {
      const nextIndex = (i + dir + slides.length) % slides.length;
      return [nextIndex, dir];
    });
  };

  const slide = slides[index];

  return (
    <section
      style={{
        maxWidth: 1040,
        margin: "10px auto 30px",
        padding: "22px 22px 26px",
        borderRadius: 24,
        border: `1px solid ${primaryColor}30`,
        background:
          "radial-gradient(circle at top left, #22c55e22 0, #020617 55%)",
        boxShadow: `0 24px 80px rgba(0,0,0,0.55)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "4px 10px",
              borderRadius: 999,
              border: `1px solid ${primaryColor}60`,
              color: primaryColor,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {slide.badge}
          </span>

          <h2
            style={{
              fontSize: "chrome(26px, 4vw, 34px)",
              color: "#F9FAFB",
            }}
          >
            {slide.title}
          </h2>

          <p
            style={{
              color: "#94A3B8",
              fontSize: 15,
              maxWidth: 640,
            }}
          >
            {slide.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* dots */}
      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 18,
          display: "flex",
          gap: 6,
        }}
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() =>
              setIndex(([current]) => [i, i > current ? 1 : -1])
            }
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              backgroundColor:
                i === index ? primaryColor : "rgba(148,163,184,0.4)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
