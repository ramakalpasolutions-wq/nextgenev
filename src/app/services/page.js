// D:\ramakalpa project photos\code\nextgen\src\app\services\page.js
"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Wrench,
  Truck,
  Lightbulb,
  Leaf,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const DARK_BG = "#020617";
const primaryColor = "#4ADE80";
const cardBaseBg = "#0B1120";
const cardTextColor = "#E5E5E5";

export default function Services() {
  const services = [
    {
      id: "battery-repair",
      title: "EV Battery Repair",
      desc: "Lithium-ion battery diagnostics, cell/module replacement, BMS repair, and range restoration for 2W & 3W EVs.",
      icon: Wrench,
      color: "#4ADE80",
    },
    {
      id: "charger-repair",
      title: "EV Charger Repair",
      desc: "Repair and calibration of EV chargers: no output, slow charging, connector damage, and fan/cooling issues.",
      icon: Zap,
      color: "#22D3EE",
    },
    {
      id: "battery",
      title: "Battery Swap",
      desc: "Instant fast-swap battery stations designed for commercial fleets and delivery partners.",
      icon: Zap,
      color: "#FFD700",
    },
    {
      id: "maintenance",
      title: "Maintenance",
      desc: "Affordable on-demand EV service, periodic inspections, and mechanical/electrical repairs.",
      icon: Wrench,
      color: "#FF6B6B",
    },
    {
      id: "basic",
      title: "Basic Services",
      desc: "Essential support for individual EV owners including health check and software updates.",
      icon: Lightbulb,
      color: "#FFB84D",
    },
    {
      id: "fleet",
      title: "Fleet Solutions",
      desc: "Complete fleet management, telematics, and uptime monitoring for large operators.",
      icon: Truck,
      color: "#00D9FF",
    },
    {
      id: "eco",
      title: "Eco Charging",
      desc: "Solar-powered EV charging and green energy integration for homes and businesses.",
      icon: Leaf,
      color: "#3FBF85",
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      className="premium-page-bg"
      initial="hidden"
      animate="show"
      style={{
        backgroundColor: DARK_BG,
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <motion.div
        variants={pageVariants}
        style={{
          maxWidth: 900,
          margin: "0 auto 60px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 12,
            background: `linear-gradient(135deg, ${primaryColor} 0%, #22c55e 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SERVICES &amp; SOLUTIONS
        </p>

        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            color: primaryColor,
            marginBottom: 16,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          Our Services
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          Comprehensive EV solutions for vehicle owners, fleets, and charging
          infrastructure.
        </p>
      </motion.div>

      {/* SERVICES GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          boxSizing: "border-box",
        }}
      >
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                y: -12,
                boxShadow: `0 20px 50px ${primaryColor}30`,
              }}
              style={{
                backgroundColor: cardBaseBg,
                border: `1px solid ${primaryColor}25`,
                borderRadius: 16,
                padding: 28,
                boxSizing: "border-box",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                color: cardTextColor,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  background: service.color,
                  borderRadius: "50%",
                  filter: "blur(60px)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    width: 56,
                    height: 56,
                    background: `${service.color}20`,
                    border: `1.5px solid ${service.color}50`,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <IconComponent
                    size={28}
                    color={service.color}
                    strokeWidth={1.5}
                  />
                </motion.div>

                <h3
                  style={{
                    color: primaryColor,
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 8,
                    marginTop: 0,
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: 13,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {service.desc}
                </p>
              </div>

              <Link href="/contact">
                <motion.div
                  whileHover={{ x: 3 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: primaryColor,
                    fontSize: 12,
                    fontWeight: 600,
                    marginTop: 16,
                    paddingTop: 12,
                    borderTop: `1px solid ${primaryColor}15`,
                    cursor: "pointer",
                  }}
                >
                  <span>Contact Us</span>
                  <ChevronRight size={14} />
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
