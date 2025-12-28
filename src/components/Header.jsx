// src/components/Header.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* DESKTOP + MOBILE HEADER */}
      <header
        className={`header ${scrolled ? "scrolled" : ""}`}
        style={{
          background: `linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #4ADE8022 100%)`,
        }}
      >
        {/* LOGO SECTION (unchanged desktop style) */}
        <div className="logo-flex">
          <img
            src="/nextgen.png"
            alt="NextGen EV Logo"
            className="logo-image"
          />
          <a
            className="logo-text"
            style={{
              background: `linear-gradient(90deg, #4ADE80, #22C55E, #86EFAC)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            href="/"
          >
            NextGen EV
          </a>
        </div>

        {/* DESKTOP NAVIGATION (unchanged) */}
        <nav className="header-nav">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/dealership">Dealership</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* MOBILE MENU BUTTON (visible only on mobile & tablet) */}
        <button
          className="mobile-menu-trigger"
          onClick={() => setOpen(true)}
        >
          <Menu size={28} />
        </button>
      </header>

      {/* MOBILE MENU PANEL */}
      <div
        className={`mobile-nav-modal ${open ? "open" : ""}`}
      >
        {/* BACKDROP */}
        <div
          className="mobile-nav-backdrop"
          onClick={() => setOpen(false)}
        />

        {/* SLIDE-IN LINKS */}
        <div className="mobile-nav-panel">
          <div className="mobile-nav-topbar">
            <div className="logo-flex">
              <Zap size={18} color="linear-gradient(135deg, #22c55e 0%, #10b981 100%)" />
              <span className="logo-text">NextGen EV</span>
            </div>
            <button
              className="mobile-close-btn"
              onClick={() => setOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="mobile-nav-links">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
            <Link href="/dealership" onClick={() => setOpen(false)}>Dealership</Link>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </nav>

          {/* CONTACT BLOCK */}
          <div className="mobile-contact">
            <h4>Contact Us</h4>

            <p><strong>Email</strong> info@nextgenev.com</p>
            <p><strong>Phone</strong> +91 99001 12233</p>

            <p className="small muted">For urgent matters, call directly.</p>
          </div>
        </div>
      </div>
    </>
  );
}
