"use client";

import { motion } from "framer-motion";
import { Zap, Leaf, TrendingUp, Users, Award, Globe } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const heroVariants = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export default function About() {
  const stats = [
    { icon: Zap, label: "Energy efficient rides", value: "95%" },
    { icon: Leaf, label: "Zero tailpipe emissions", value: "100%" },
    { icon: TrendingUp, label: "Lower running cost", value: "-80%*" },
    { icon: Users, label: "Happy EV customers", value: "50K+*" },
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Electric vehicles that help reduce noise, local pollution, and fuel dependency in growing cities like Chittoor.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Modern EV platforms, smart battery technology, and practical range designed for real Indian road conditions.",
    },
    {
      icon: Users,
      title: "Network",
      description:
        "Working with NextGen EV to support riders, students, and small businesses with training, service, and after-sales support.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description:
        "EMI-friendly pricing and low running costs so more families and businesses can shift to electric mobility.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#0a0e27", minHeight: "100vh", overflow: "hidden" }}>
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          padding: "80px 20px 100px",
          background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <motion.div
          variants={heroVariants}
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: "clamp(32px, 8vw, 56px)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
              letterSpacing: "-1px",
            }}
          >
            NEXTGEN EV
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "18px",
              color: "#cbd5e1",
              lineHeight: 1.6,
              maxWidth: "700px",
              margin: "0 auto 40px",
              opacity: 0.9,
            }}
          >
            Nextgen EV is bringing future-ready electric mobility to Chittoor through NextGenEV
             in Doddipalle. From city commuters to commercial load carriers, our
            electric 2-wheelers and 3-wheelers are built for high performance, low running
            cost, and zero tailpipe emissions.
          </motion.p>

          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 50px rgba(34, 197, 94, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "14px 36px",
              fontSize: "16px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
              color: "#0a0e27",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Discover Nextgen EV
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          padding: "60px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 50px rgba(34, 197, 94, 0.15)",
                }}
                style={{
                  padding: "32px 24px",
                  background:
                    "linear-gradient(135deg, #111827 0%, #1a1f3a 100%)",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                  borderRadius: "14px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <Icon
                  size={32}
                  style={{
                    color: "#22c55e",
                    marginBottom: "12px",
                    margin: "0 auto 12px",
                  }}
                />
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#22c55e",
                    marginBottom: "8px",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "14px" }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        <p
          style={{
            color: "#64748b",
            fontSize: 12,
            marginTop: 16,
            textAlign: "center",
          }}
        >
          *Approximate values based on typical electric 2W/3W usage compared to petrol
          vehicles.
        </p>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          padding: "80px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#f1f5f9",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          Our Promise
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
          }}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 25px 60px rgba(34, 197, 94, 0.2)",
            }}
            style={{
              padding: "40px 32px",
              background:
                "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
              border: "2px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "16px",
              transition: "all 0.3s ease",
            }}
          >
            <Award
              size={40}
              style={{ color: "#22c55e", marginBottom: "16px" }}
            />
            <h3
              style={{
                fontSize: "22px",
                color: "#f1f5f9",
                marginBottom: "12px",
              }}
            >
              Our Mission at Nextgen EV
            </h3>
            <p
              style={{
                color: "#cbd5e1",
                lineHeight: 1.7,
                fontSize: "15px",
              }}
            >
              Deliver affordable, eco-friendly electric vehicles that cut fuel
              costs, reduce emissions, and support everyday riders, delivery
              partners, and small businesses across cities and tier-2 towns like
              Chittoor.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 25px 60px rgba(34, 197, 94, 0.2)",
            }}
            style={{
              padding: "40px 32px",
              background:
                "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
              border: "2px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "16px",
              transition: "all 0.3s ease",
            }}
          >
            <Globe
              size={40}
              style={{ color: "#22c55e", marginBottom: "16px" }}
            />
            <h3
              style={{
                fontSize: "22px",
                color: "#f1f5f9",
                marginBottom: "12px",
              }}
            >
              Our Vision for Electric Mobility
            </h3>
            <p
              style={{
                color: "#cbd5e1",
                lineHeight: 1.7,
                fontSize: "15px",
              }}
            >
              Build a nationwide network where clean, intelligent EVs are the
              first choice for every short trip, last-mile delivery, and
              commercial journey—starting from hubs like NextGenEV in
              Doddipalle, Chittoor.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          padding: "80px 20px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(34, 197, 94, 0.05) 100%)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: "42px",
            fontWeight: "700",
            color: "#f1f5f9",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          Our Core Values
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "28px",
          }}
        >
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 15px 40px rgba(34, 197, 94, 0.15)",
                }}
                style={{
                  padding: "28px 24px",
                  background: "#111827",
                  border: "1px solid rgba(34, 197, 94, 0.15)",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                }}
              >
                <Icon
                  size={28}
                  style={{
                    color: "#22c55e",
                    marginBottom: "12px",
                  }}
                />
                <h4
                  style={{
                    fontSize: "18px",
                    color: "#f1f5f9",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  {value.title}
                </h4>
                <p
                  style={{
                    color: "#94a3b8",
                    lineHeight: 1.6,
                    fontSize: "14px",
                  }}
                >
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          padding: "80px 20px",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#f1f5f9",
            marginBottom: "20px",
          }}
        >
          Join the Nextgen EV Movement
        </motion.h2>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: "18px",
            color: "#cbd5e1",
            marginBottom: "40px",
            lineHeight: 1.6,
          }}
        >
          Explore finance options, or get expert guidance on the right
          electric 2-wheeler or 3-wheeler for your needs.
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.a 
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 50px rgba(34, 197, 94, 0.3)",
            }}
                href="/products"
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "14px 36px",
              fontSize: "16px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
              color: "#0a0e27",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              textDecoration:"none"
            
            }}
            
          >
            Explore Nextgen EV Models
          </motion.a>

          <motion.a
          href="/contact"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 50px rgba(34, 197, 94, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "14px 36px",
              fontSize: "16px",
              fontWeight: "600",
              background: "transparent",
              color: "#22c55e",
              border: "2px solid #22c55e",
              borderRadius: "10px",
              cursor: "pointer",
              textDecoration:"none",
            }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </motion.section>
    </div>
  );
}
