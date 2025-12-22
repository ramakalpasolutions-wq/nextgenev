// src/app/products/page.js
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// -------------------
// Animation Variants
// -------------------
const pageVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// -------------------
// Products Page
// -------------------
export default function ProductsPage() {
  const primaryColor = "#4ADE80"; // Green
  const darkBg = "#020617"; // Page background (matches new Home)
  const cardBaseBg = "#0B1120"; // Card background
  const cardTextColor = "#E5E5E5"; // Text color

  const categories = [
    {
      id: "2w",
      title: "2-Wheelers",
      description: "Scooters & e-motorcycles designed for urban mobility.",
      image: "/Image white.png",
      link: "/products/2w",
    },
    {
      id: "3w",
      title: "3-Wheelers",
      description: "Cargo & passenger 3-wheel EVs ideal for commercial transport.",
      image: "/IMG-3W-White.png",
      link: "/products/3w",
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        backgroundColor: darkBg,
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "60px",
        paddingInline: "16px",
      }}
    >
      {/* HEADER BOX */}
      <motion.section
        variants={pageVariants}
        style={{
          maxWidth: "800px",
          margin: "0 auto 60px auto",
          padding: "40px 30px",
          backgroundColor: primaryColor + "15",
          border: `1px solid ${primaryColor}50`,
          borderRadius: "18px",
          textAlign: "center",
          boxShadow: `0 0 40px ${primaryColor}15`,
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            color: primaryColor,
            marginBottom: "16px",
            fontWeight: 700,
          }}
        >
          Our EV Product Lineup
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: cardTextColor,
            lineHeight: 1.6,
          }}
        >
          Explore the latest electric 2-wheelers and 3-wheelers engineered for
          Indian roads and businesses.
        </p>
      </motion.section>

      {/* PRODUCT CARDS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "32px",
          maxWidth: "1060px",
          margin: "0 auto",
        }}
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={cardVariants}>
            <ProductCard
              data={cat}
              primaryColor={primaryColor}
              cardBaseBg={cardBaseBg}
              cardTextColor={cardTextColor}
              darkBg={darkBg}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// -------------------
// Product Card Component
// -------------------
function ProductCard({
  data,
  primaryColor,
  cardBaseBg,
  cardTextColor,
  darkBg,
}) {
  return (
    <Link
      href={data.link}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <motion.article
        whileHover={{
          scale: 1.05,
          y: -10,
          boxShadow: `0 15px 40px ${primaryColor}40`,
          backgroundColor: darkBg,
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        style={{
          backgroundColor: cardBaseBg,
          border: `1px solid ${primaryColor}20`,
          borderRadius: "18px",
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            height: "450px",
            width: "100%",
            overflow: "hidden",
            borderRadius: "18px 18px 0 0",
            position: "relative",
          }}
        >
          <Image
            src={data.image}
            alt={data.title}
            fill
            style={{
              objectFit: "fill",
              transition: "transform 0.6s ease-out",
            }}
          />
        </div>

        {/* TEXT CONTENT */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              color: primaryColor,
              marginBottom: "4px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {data.title}
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: cardTextColor + "B0",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            {data.description}
          </p>

          {/* BUTTON */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: "8px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 22px",
              fontSize: "15px",
              fontWeight: "700",
              backgroundColor: primaryColor,
              color: darkBg,
              borderRadius: "999px",
              transition: "all 0.2s ease-out",
              alignSelf: "center",
            }}
          >
            View Specifications →
          </motion.div>
        </div>
      </motion.article>
    </Link>
  );
}
