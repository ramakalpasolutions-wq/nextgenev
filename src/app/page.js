"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroNameReveal from "@/components/HeroNameReveal";
import styles from "./page.module.css";

// Image Carousel Component
const ImageCarousel = ({ images, autoPlayInterval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images, autoPlayInterval]);

  if (!images || images.length === 0) {
    return (
      <div className={styles.carouselPlaceholder}>
        [Upload Images from Admin Panel]
      </div>
    );
  }

  return (
    <div className={styles.carouselContainer}>
      {/* Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={styles.carouselImageWrapper}
          style={{ opacity: currentIndex === index ? 1 : 0 }}
        >
          <img
            src={img}
            alt={`Product ${index + 1}`}
            className={styles.carouselImage}
          />
        </div>
      ))}

      {/* Navigation Dots */}
      <div className={styles.carouselDots}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${styles.carouselDot} ${
              currentIndex === index ? styles.carouselDotActive : ""
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Previous/Next Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + images.length) % images.length
              )
            }
            className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default function Home() {
  // State for admin-uploaded media
  const [heroVideoUrl, setHeroVideoUrl] = useState("");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "NextGen 2-Wheeler Vehicles",
      category: "2-Wheeler",
      tagline: "Urban Mobility Redefined",
      description:
        "Our 2-wheeler electric vehicles are designed for the modern urban commuter who values efficiency, sustainability, and style. With a sleek aerodynamic design and advanced battery technology, these vehicles offer an impressive range of up to 50KM to 120KM on a single charge. Whether you're navigating busy city streets or cruising through suburban roads, our 2-wheelers deliver a smooth, silent, and eco-friendly ride. Equipped with fast charging capabilities, digital display, and eco mode, they combine cutting-edge technology with practical features to make your daily commute effortless and enjoyable.",
      images: [],
    },
    {
      id: 2,
      name: "NextGen 3-Wheeler Vehicles",
      category: "3-Wheeler",
      tagline: "Built for Business",
      description:
        "NextGen 3-wheelers are engineered for commercial excellence, offering unmatched reliability and performance for businesses across India. Built with a robust chassis and powerful electric motor, these vehicles can handle heavy payloads of up to 500 kg while maintaining exceptional energy efficiency. With a range of up to 150 KM to 300 KM, our 3-wheelers are perfect for logistics, delivery services, and passenger transport. The low maintenance design and long-lasting battery ensure minimal downtime and maximum productivity. Experience the future of commercial mobility with vehicles that are as tough as your business demands, yet gentle on the environment.",
      images: [],
    },
  ]);

  // Load admin-uploaded media from localStorage
  useEffect(() => {
    const loadAdminMedia = () => {
      const savedHeroVideo = localStorage.getItem("heroVideoUrl");
      if (savedHeroVideo) {
        try {
          const parsed = JSON.parse(savedHeroVideo);
          setHeroVideoUrl(parsed.url || parsed);
        } catch {
          setHeroVideoUrl(savedHeroVideo);
        }
      }

      const saved2WImages = localStorage.getItem("twoWheelerUrls");
      if (saved2WImages) {
        try {
          const imageData = JSON.parse(saved2WImages);
          const imageUrls = imageData.map((item) => item.url || item);
          setProducts((prev) => [{ ...prev[0], images: imageUrls }, prev[1]]);
        } catch (error) {
          console.error("Error loading 2-wheeler images:", error);
        }
      }

      const saved3WImages = localStorage.getItem("threeWheelerUrls");
      if (saved3WImages) {
        try {
          const imageData = JSON.parse(saved3WImages);
          const imageUrls = imageData.map((item) => item.url || item);
          setProducts((prev) => [prev[0], { ...prev[1], images: imageUrls }]);
        } catch (error) {
          console.error("Error loading 3-wheeler images:", error);
        }
      }
    };

    loadAdminMedia();

    const handleStorageChange = () => loadAdminMedia();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("adminMediaUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("adminMediaUpdated", handleStorageChange);
    };
  }, []);

  return (
    <div className={`${styles.pageWrapper}`}>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        {/* Video Background or Fallback */}
        {heroVideoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            key={heroVideoUrl}
            className={styles.heroVideo}
          >
            <source src={heroVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className={styles.heroFallbackBg} />
        )}

        {/* Dark Overlay */}
        <div
          className={`${styles.heroOverlay} ${
            heroVideoUrl
              ? styles.heroOverlayWithVideo
              : styles.heroOverlayNoVideo
          }`}
        />

        {/* Content Container */}
        <div className={styles.heroContentContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className={styles.heroSubtitle}>Electric Revolution</p>

            <div className={styles.heroNameReveal}>
              <HeroNameReveal />
            </div>

            <h1 className={styles.heroTitle}>
              Drive the
              <br />
              <span className={styles.heroTitleAccent}>Future</span>
            </h1>

            <p className={styles.heroDescription}>
              Experience India&apos;s most advanced electric 2-wheelers and
              3-wheelers. Zero emissions, maximum performance.
            </p>

            <div className={styles.heroCta}>
              <Link href="/products" className={styles.ctaButton}>
                Explore Vehicles
              </Link>
              <Link href="/dealership" className={styles.ctaButtonOutline}>
                Find Dealers
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className={styles.scrollIndicator}
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={styles.scrollText}
          >
            SCROLL
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={styles.scrollArrow}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT VEHICLES SECTION */}
      {products.map((product, index) => (
        <section
          key={product.id}
          className={`${styles.productSection} ${
            index % 2 !== 0 ? styles.productSectionAlt : ""
          }`}
        >
          <div className={styles.productContainer}>
            {/* Image Carousel Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`${styles.productImageSection} ${
                index % 2 === 0
                  ? styles.productImageLeft
                  : styles.productImageRight
              }`}
            >
              <ImageCarousel images={product.images} />
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${styles.productContentSection} ${
                index % 2 === 0
                  ? styles.productContentLeft
                  : styles.productContentRight
              }`}
            >
              <p className={styles.productCategory}>{product.category}</p>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productTagline}>{product.tagline}</p>

              {/* About Description */}
              <div className={styles.productAbout}>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
              </div>

              {/* CTA Button */}
              <div className={styles.productCtaSection}>
                <Link href="/products" className={styles.ctaButton}>
                  View Details →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* WHY CHOOSE US SECTION */}
      <section className={styles.whyChooseSection}>
       <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className={styles.whyChooseContainer}
>
  <h2 className={styles.whyChooseTitle}>
    Why Choose{" "}
    <span className={styles.whyChooseTitleAccent}>NextGen EV</span>
  </h2>
  <p className={styles.whyChooseDescription}>
    Leading the electric revolution in India with innovative technology,
    superior quality, and nationwide presence
  </p>

  <div className={styles.statsGrid}>
    {[
      {
        title: "100% Electric",
        desc: "Zero emissions, pure performance",
        icon: "⚡",
      },
      {
      title: "Clean Mobility Facilities",
      desc: "Sustainable electric mobility & supporting green transportation across India",
      icon: "🌱"

      },
      {
        title: "3 Year Warranty",
        desc: "On battery & motor",
        icon: "🛡️",
      },
      {
        title: "24/7 Support",
        desc: "Pan-India assistance",
        icon: "💬",
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        viewport={{ once: true }}
        className={styles.statCard}
      >
        <div className={styles.statIcon}>{item.icon}</div>
        <h3 className={styles.statTitle}>{item.title}</h3>
        <p className={styles.statDescription}>{item.desc}</p>
      </motion.div>
    ))}
  </div>
</motion.div>
{/* MINI DEALERSHIP PROMO SECTION */}
<section className={styles.dealerPromoSection}>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={styles.dealerPromoContainer}
  >
    <div className={styles.dealerPromoContent}>
      <p className={styles.dealerPromoTag}>Nationwide Network</p>

      <h2 className={styles.dealerPromoTitle}>
        Find an Authorized <span>NextGen EV Dealer</span>
      </h2>

      <p className={styles.dealerPromoDescription}>
        Experience our electric vehicles in person. Locate your nearest
        dealership, book a test drive, and get expert guidance today.
      </p>

      <Link href="/dealership" className={styles.ctaButton}>
        Dealership →
      </Link>
    </div>
  </motion.div>
</section>


      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={styles.ctaContainer}
        >
          <h2 className={styles.ctaTitle}>Have Questions About Our Electric Vehicles?</h2>
         
          <div className={styles.ctaButtons}>
            <Link href="/about" className={styles.ctaButton}>
              Know More
            </Link>
            <Link href="/contact" className={styles.ctaButtonOutline}>
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
