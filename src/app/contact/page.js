"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const DARK_BG = "#020617";
const primaryColor = "#4ADE80";
const cardBaseBg = "#0B1120";
const cardTextColor = "#E5E5E5";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setStatus("success");
      setTimeout(() => setStatus(null), 6000);
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      className="premium-page-bg"
      initial="hidden"
      animate="show"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: DARK_BG,
        padding: "40px 16px 60px",
        fontFamily: "Inter, system-ui, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* PAGE HEADER */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        style={{
          maxWidth: 1200,
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
          GET IN TOUCH
        </p>

        <h1
          style={{
            color: primaryColor,
            fontSize: "clamp(32px, 5vw, 48px)",
            marginBottom: 16,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          Contact NextGen EV
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
          Have questions about our electric vehicles, dealership opportunities, or need support? 
          Our team is here to help. We'll get back to you within 24 hours.
        </p>
      </motion.div>

      {/* MAIN CONTAINER */}
      <div
  className="contact-grid"
  style={{
    maxWidth: 1200,
    margin: "0 auto",
    boxSizing: "border-box",
  }}
>

        {/* FORM SECTION */}
        <motion.div
          variants={pageVariants}
          style={{
            backgroundColor: cardBaseBg,
            border: `1px solid ${primaryColor}25`,
            borderRadius: 16,
            padding: "40px 32px",
            boxShadow: `0 0 40px ${primaryColor}15`,
            boxSizing: "border-box",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.1 }}
              style={{ marginBottom: 20 }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  color: primaryColor,
                  fontWeight: 600,
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Full Name *
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#0F0F0F",
                  border: `1px solid ${primaryColor}30`,
                  color: cardTextColor,
                  borderRadius: 10,
                  fontSize: 15,
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 12px ${primaryColor}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${primaryColor}30`;
                  e.target.style.boxShadow = "none";
                }}
              />
            </motion.div>

            {/* EMAIL */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.15 }}
              style={{ marginBottom: 20 }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  color: primaryColor,
                  fontWeight: 600,
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#0F0F0F",
                  border: `1px solid ${primaryColor}30`,
                  color: cardTextColor,
                  borderRadius: 10,
                  fontSize: 15,
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 12px ${primaryColor}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${primaryColor}30`;
                  e.target.style.boxShadow = "none";
                }}
              />
            </motion.div>

            {/* PHONE */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.2 }}
              style={{ marginBottom: 20 }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  color: primaryColor,
                  fontWeight: 600,
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 Your Mobile Number"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#0F0F0F",
                  border: `1px solid ${primaryColor}30`,
                  color: cardTextColor,
                  borderRadius: 10,
                  fontSize: 15,
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 12px ${primaryColor}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${primaryColor}30`;
                  e.target.style.boxShadow = "none";
                }}
              />
            </motion.div>

            {/* SUBJECT */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.25 }}
              style={{ marginBottom: 20 }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  color: primaryColor,
                  fontWeight: 600,
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Subject *
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#0F0F0F",
                  border: `1px solid ${primaryColor}30`,
                  color: cardTextColor,
                  borderRadius: 10,
                  fontSize: 15,
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                  cursor: "#nextgen-cursor",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 12px ${primaryColor}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${primaryColor}30`;
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="">Select a subject...</option>
                <option value="Product Inquiry">🚗 Product Inquiry</option>
                <option value="Dealership">🤝 Dealership Opportunity</option>
                <option value="Support">🛠️ Technical Support</option>
                <option value="Service">⚙️ Service Request</option>
                <option value="Other">💬 Other</option>
              </select>
            </motion.div>

            {/* MESSAGE */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.3 }}
              style={{ marginBottom: 28 }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  color: primaryColor,
                  fontWeight: 600,
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Message *
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Tell us more about your inquiry..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#0F0F0F",
                  border: `1px solid ${primaryColor}30`,
                  borderRadius: 10,
                  color: cardTextColor,
                  fontSize: 15,
                  fontFamily: "inherit",
                  resize: "vertical",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 12px ${primaryColor}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${primaryColor}30`;
                  e.target.style.boxShadow = "none";
                }}
              />
            </motion.div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 30px ${primaryColor}A0`,
              }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 28px",
                backgroundColor: loading ? `${primaryColor}80` : primaryColor,
                color: DARK_BG,
                border: "none",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 16,
                cursor: loading ? "not-allowed" : "#nextgen-cursor",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

            {/* SUCCESS MESSAGE */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: 20,
                  padding: 16,
                  backgroundColor: `${primaryColor}15`,
                  border: `1.5px solid ${primaryColor}`,
                  borderRadius: 12,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: primaryColor,
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  Message Sent Successfully!
                </p>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    color: "#cbd5e1",
                    fontSize: 13,
                  }}
                >
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            )}

            {/* ERROR MESSAGE */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: 20,
                  padding: 16,
                  backgroundColor: "#FF555515",
                  border: "1.5px solid #FF5555",
                  borderRadius: 12,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    marginBottom: 8,
                  }}
                >
                  ✗
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "#FF5555",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  Error Sending Message
                </p>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    color: "#cbd5e1",
                    fontSize: 13,
                  }}
                >
                  Please try again or contact us directly.
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* CONTACT INFO SECTION */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* CONTACT CARD */}
          <div
            style={{
              backgroundColor: cardBaseBg,
              border: `1px solid ${primaryColor}25`,
              borderRadius: 16,
              padding: 32,
              boxShadow: `0 0 40px ${primaryColor}15`,
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                color: primaryColor,
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 28,
                marginTop: 0,
              }}
            >
              Contact Information
            </h3>

            {/* EMAIL */}
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  background: `${primaryColor}15`,
                  border: `1px solid ${primaryColor}30`,
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={24} color={primaryColor} />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#6b7280",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Email
                </p>
                <a
                  href="mailto:support@nextgeneev.com"
                  style={{
                    color: cardTextColor,
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 500,
                    marginTop: 4,
                    display: "block",
                  }}
                >
                  support@nextgeneev.com
                </a>
              </div>
            </motion.div>

            {/* PHONE */}
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  background: `${primaryColor}15`,
                  border: `1px solid ${primaryColor}30`,
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Phone size={24} color={primaryColor} />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#6b7280",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Phone
                </p>
                <a
                  href="tel:+91 81067 24737"
                  style={{
                    color: cardTextColor,
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 500,
                    marginTop: 4,
                    display: "block",
                  }}
                >
                  +91 81067 24737
                </a>
              </div>
            </motion.div>

            {/* ADDRESS */}
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  background: `${primaryColor}15`,
                  border: `1px solid ${primaryColor}30`,
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin size={24} color={primaryColor} />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#6b7280",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Address
                </p>
                <p
                  style={{
                    color: cardTextColor,
                    fontSize: 15,
                    fontWeight: 500,
                    marginTop: 4,
                    margin: 0,
                  }}
                >
                Near Saptha Kanikalamma Temple, Tirupati Main Road,
                <br />
                Doddipalle, Chittoor - 517001
                <br />
                Andhra Pradesh, India
                </p>
              </div>
            </motion.div>
            {/* MAP */}
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                marginTop: 8,
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${primaryColor}30`,
                boxShadow: `0 0 30px ${primaryColor}10`,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%", // 16:9 aspect ratio
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.596763735988!2d79.415!3d13.628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b4c00000000%3A0x0000000000000000!2sSaptha%20Kanikalamma%20Temple%2C%20Tirupati%20Main%20Road%2C%20Doddipalle%2C%20Chittoor%20517001%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1734850000000"
                  style={{
                    border: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

          </div> 
          
          </motion.div>
        
      </div>

      {/* RESPONSIVE ADJUSTMENTS */}
      
    </motion.div>
  );
}
  