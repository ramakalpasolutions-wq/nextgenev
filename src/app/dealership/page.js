"use client";

import { motion } from "framer-motion";
import { pageVariants } from "@/styles/animations";
import { theme } from "@/styles/theme";
import { useState } from "react";

export default function Dealership() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/dealership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to submit");

      setStatus("success");
      setForm({ name: "", phone: "", email: "", location: "", message: "" });

      setTimeout(() => setStatus(null), 6000);
    } catch (error) {
      setStatus("error");
      setErrorMsg(error.message);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="premium-page-bg"
      style={{
        minHeight: "100vh",
        padding: "60px 16px",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "900px" }}>
        {/* HEADER */}
        <motion.div
          style={{
            marginBottom: "24px",
            padding: "24px 18px",
            backgroundColor: theme.primaryColor + "15",
            borderRadius: "16px",
            border: `1px solid ${theme.primaryColor}50`,
            textAlign: "center",
          }}
        >
          <h1 style={{ color: theme.primaryColor, fontSize: "26px", marginBottom: "8px", marginTop: 0 }}>
            Become Our Dealer
          </h1>
          <p style={{ color: theme.cardTextColor, opacity: 0.85, fontSize: "14px", margin: 0 }}>
            Fill out the form and our team will contact you within 24-48 hours.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: theme.cardBaseBg,
            padding: "24px 18px",
            borderRadius: "16px",
            border: `1px solid ${theme.primaryColor}30`,
            boxShadow: `0 0 20px ${theme.primaryColor}20`,
            display: "grid",
            gap: "18px",
          }}
        >
          {/* Name */}
          <div>
            <label style={{ color: theme.primaryColor, fontSize: "14px", display: "block", marginBottom: "6px" }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: theme.darkBg,
                color: "#fff",
                border: `1px solid ${theme.primaryColor}`,
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${theme.primaryColor}55`)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          {/* Phone */}
          <div>
            <label style={{ color: theme.primaryColor, fontSize: "14px", display: "block", marginBottom: "6px" }}>
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 Your Phone Number"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: theme.darkBg,
                color: "#fff",
                border: `1px solid ${theme.primaryColor}`,
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${theme.primaryColor}55`)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ color: theme.primaryColor, fontSize: "14px", display: "block", marginBottom: "6px" }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: theme.darkBg,
                color: "#fff",
                border: `1px solid ${theme.primaryColor}`,
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${theme.primaryColor}55`)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          {/* Location */}
          <div>
            <label style={{ color: theme.primaryColor, fontSize: "14px", display: "block", marginBottom: "6px" }}>
              Dealership Location *
            </label>
            <input
              type="text"
              name="location"
              required
              value={form.location}
              onChange={handleChange}
              placeholder="City, State, Pincode"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: theme.darkBg,
                color: "#fff",
                border: `1px solid ${theme.primaryColor}`,
                outline: "none",
                fontSize: "14px",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${theme.primaryColor}55`)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          {/* Message */}
          <div>
            <label style={{ color: theme.primaryColor, fontSize: "14px", display: "block", marginBottom: "6px" }}>
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your dealership plans..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: theme.darkBg,
                color: "#fff",
                border: `1px solid ${theme.primaryColor}`,
                outline: "none",
                fontSize: "14px",
                resize: "vertical",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${theme.primaryColor}55`)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px",
              borderRadius: "10px",
              backgroundColor: status === "loading" ? theme.primaryColor + "80" : theme.primaryColor,
              color: "#000",
              fontWeight: 700,
              fontSize: "15px",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              border: "none",
              width: "100%",
              transition: "all 0.3s ease",
            }}
          >
            {status === "loading" ? "Submitting..." : "Submit Dealership Form"}
          </motion.button>

          {/* Success Message */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "16px",
                backgroundColor: `${theme.primaryColor}15`,
                border: `1.5px solid ${theme.primaryColor}`,
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "12px", marginBottom: "8px" }}>✓</div>
              <p style={{ margin: 0, color: theme.primaryColor, fontSize: "15px", fontWeight: 700 }}>
                Request Submitted!
              </p>
              <p style={{ margin: "4px 0 0 0", color: "#cbd5e1", fontSize: "13px" }}>
                We'll contact you within 24-48 hours.
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "16px",
                backgroundColor: "#FF555515",
                border: "1.5px solid #FF5555",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>✗</div>
              <p style={{ margin: 0, color: "#FF5555", fontSize: "15px", fontWeight: 700 }}>
                Error Submitting Request
              </p>
              <p style={{ margin: "4px 0 0 0", color: "#cbd5e1", fontSize: "13px" }}>
                {errorMsg || "Please try again"}
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </motion.div>
  );
}
