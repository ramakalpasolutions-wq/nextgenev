"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, LogIn, Sparkles } from "lucide-react";

const BG = "#0A0A0A";
const CARD = "#111827";
const PRIMARY = "#00FFFF";
const GREEN = "#4ADE80";

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [particles, setParticles] = useState([]);

  // Initialize particles only on client side to avoid window undefined error
  useEffect(() => {
    const particleData = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      animateX: Math.random() * window.innerWidth,
      animateY: Math.random() * window.innerHeight,
      duration: Math.random() * 10 + 10,
      size: Math.random() * 4 + 2,
      color: i % 2 === 0 ? PRIMARY : GREEN,
    }));
    setParticles(particleData);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (
        credentials.username === "NEXTGEN" &&
        credentials.password === "Nextgen@2025"
      ) {
        localStorage.setItem("adminAuth", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials!");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.initialX,
            y: particle.initialY,
            opacity: 0,
          }}
          animate={{
            x: particle.animateX,
            y: particle.animateY,
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: particle.color,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          background: [
            `radial-gradient(circle at 20% 50%, ${PRIMARY}15 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 50%, ${GREEN}15 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 50%, ${PRIMARY}15 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02, boxShadow: `0 20px 60px ${PRIMARY}30` }}
        style={{
          background: CARD,
          padding: 40,
          borderRadius: 20,
          width: 400,
          maxWidth: "90%",
          border: `1px solid ${PRIMARY}40`,
          position: "relative",
          zIndex: 10,
          boxShadow: `0 10px 40px ${PRIMARY}20`,
        }}
      >
        {/* Animated Lock Icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{ display: "inline-block" }}
          >
            <Lock size={48} color={PRIMARY} />
          </motion.div>
        </motion.div>

        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: 900,
            background: `linear-gradient(135deg, ${PRIMARY}, ${GREEN})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 10,
          }}
        >
          Admin Login
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: "center",
            color: "#888",
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          <Sparkles size={14} style={{ display: "inline", marginRight: 5 }} />
          Secure Access Portal
        </motion.p>

        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            style={{ position: "relative", marginTop: 20 }}
          >
            <motion.div
              animate={{
                scale: focusedInput === "username" ? 1.05 : 1,
                boxShadow:
                  focusedInput === "username"
                    ? `0 0 20px ${PRIMARY}50`
                    : "none",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User
                size={18}
                color={focusedInput === "username" ? PRIMARY : "#555"}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  transition: "color 0.3s",
                }}
              />
              <input
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                onFocus={() => setFocusedInput("username")}
                onBlur={() => setFocusedInput(null)}
                required
                style={{
                  ...input,
                  paddingLeft: 40,
                  border:
                    focusedInput === "username"
                      ? `2px solid ${PRIMARY}`
                      : "1px solid #333",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            style={{ position: "relative", marginTop: 20 }}
          >
            <motion.div
              animate={{
                scale: focusedInput === "password" ? 1.05 : 1,
                boxShadow:
                  focusedInput === "password"
                    ? `0 0 20px ${GREEN}50`
                    : "none",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Lock
                size={18}
                color={focusedInput === "password" ? GREEN : "#555"}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  transition: "color 0.3s",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                required
                style={{
                  ...input,
                  paddingLeft: 40,
                  border:
                    focusedInput === "password"
                      ? `2px solid ${GREEN}`
                      : "1px solid #333",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  color: "#EF4444",
                  marginTop: 15,
                  padding: "10px 15px",
                  background: "#EF444420",
                  borderRadius: 8,
                  border: "1px solid #EF4444",
                  fontSize: 14,
                }}
              >
                ⚠️ {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={loading}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 10px 30px ${GREEN}50`,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 10,
              background: loading
                ? "#555"
                : `linear-gradient(135deg, ${GREEN}, ${PRIMARY})`,
              border: "none",
              fontWeight: 700,
              marginTop: 25,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              color: "white",
              fontSize: 16,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      width: 18,
                      height: 18,
                      border: "3px solid white",
                      borderTop: "3px solid transparent",
                      borderRadius: "50%",
                    }}
                  />
                  Logging in...
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <LogIn size={18} />
                  Login
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shimmer Effect */}
            {!loading && (
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  background: "#0A0A0A",
  color: "white",
  fontSize: 14,
  outline: "none",
  transition: "all 0.3s ease",
};
