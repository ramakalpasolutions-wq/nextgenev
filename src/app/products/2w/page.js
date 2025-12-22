"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Battery,
  DollarSign,
  Gauge,
  Zap,
  Clock,
  Wrench,
  AlertCircle,
  Palette,
  Award,
  Truck, 
} from "lucide-react";
import { useRouter } from "next/navigation"; 
import styles from "./TwoWheelers.module.css";

const PRIMARY = "#4ADE80";
const NEON = "#00FFFF";
const DARK = "#0A0A0A";
const CARD_BG = "#0B1120";
const TEXT = "#E5E5E5";

const imgVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: (dir) => ({
    x: dir < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.4 },
  }),
};

const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function TwoWheelers() {
  const [models, setModels] = useState([]);
  const [[page, direction], setPage] = useState([0, 0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Added router
  const minSwipeDistance = 50;

  useEffect(() => {
    const loadProducts = () => {
      try {
        const saved2WProducts = localStorage.getItem("twoWheelerProducts");

        if (saved2WProducts) {
          const products = JSON.parse(saved2WProducts);

          const transformedProducts = products.map((product) => ({
            id: product.id,
            name: product.name,
            imageUrl: product.image?.url || product.image,
            range: product.range,
            price: product.price,
            description: product.tagline,
            category: product.category,
            topSpeed: product.topSpeed,
            batteryCapacity: product.batteryCapacity,
            batteryType: product.batteryType,
            chargingTime: product.chargingTime,
            chargingType: product.chargingType,
            motorPower: product.motorPower,
            torque: product.torque,
            acceleration: product.acceleration,
            driveType: product.driveType,
            warranty: product.warranty,
            colors: product.colors,
            features: product.features || [],
          }));

          setModels(transformedProducts);
        } else {
          setModels([
            {
              id: 1,
              name: "NextGen 2-Wheeler",
              imageUrl: "/placeholder-2w.jpg",
              range: "Upto-120 km",
              price: "From ₹30,000/-",
              description: "Urban Mobility Redefined",
              category: "2-Wheeler",
              topSpeed: "80 km/h",
              batteryCapacity: "3.5 kWh",
              batteryType: "Lithium-ion",
              chargingTime: "4-5 hours",
              chargingType: "Type 2",
              motorPower: "5 kW",
              torque: "170 Nm",
              acceleration: "8 sec",
              driveType: "Rear",
              warranty: "2 Years",
              colors: "Black, White, Red",
              features: ["Fast Charging", "Digital Display", "Eco Mode"],
            },
          ]);
        }
      } catch (error) {
        console.error("Error loading 2-wheeler products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    const handleUpdate = () => {
      console.log("Admin data updated - reloading 2-wheelers...");
      loadProducts();
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("adminMediaUpdated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("adminMediaUpdated", handleUpdate);
    };
  }, []);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      paginate(1);
    } else if (isRightSwipe) {
      paginate(-1);
    }
  };

  const handleGoToThreeWheelers = () => {
    router.push("/products/3w"); // Adjust path as needed
  };

  if (loading) {
    return (
      <div className={styles.fullscreenCenter}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.loadingBox}
        >
          <div className={styles.loadingSpinner} />
          Loading 2-Wheeler Models...
        </motion.div>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className={styles.fullscreenCenter}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.emptyBox}
        >
          <p className={styles.emptyTitle}>No 2-Wheeler Models Available</p>
          <p className={styles.emptySubtitle}>
            Please add products from the admin dashboard
          </p>
        </motion.div>
      </div>
    );
  }

  const current = models[page];

  const paginate = (dir) => {
    setShowDropdown(false);
    const nextPage = (page + dir + models.length) % models.length;
    setPage([nextPage, dir]);
  };

  return (
    <div className={styles.pageRoot}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h1 className={styles.pageTitle}>2-Wheeler Collection</h1>
          <p className={styles.pageSubtitle}>
            Use arrows to explore models ({models.length} available)
          </p>
        </motion.div>

        <motion.div
          className={styles.carouselContainer}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={page}
              src={current.imageUrl}
              alt={current.name}
              custom={direction}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={styles.carouselImage}
            />
          </AnimatePresence>

          {models.length > 1 && (
            <>
              <motion.button
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(74, 222, 128, 0.2)" }}
                whileTap={{ scale: 0.9 }}
                className={`${styles.arrowBtn} ${styles.arrowLeft}`}
                aria-label="Previous model"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </motion.button>

              <motion.button
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(74, 222, 128, 0.2)" }}
                whileTap={{ scale: 0.9 }}
                className={`${styles.arrowBtn} ${styles.arrowRight}`}
                aria-label="Next model"
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </motion.button>

              <div className={styles.dots}>
                {models.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setPage([idx, idx > page ? 1 : -1])}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${styles.dotBtn} ${
                      page === idx ? styles.dotActive : styles.dotInactive
                    }`}
                    aria-label={`Go to model ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>

        <motion.h2
          key={current.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={styles.modelName}
        >
          {current.name}
        </motion.h2>

        <motion.button
          onClick={() => setShowDropdown(!showDropdown)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.exploreBtn}
        >
          {showDropdown ? "Hide Details" : "View Specifications"}
        </motion.button>

        {/* NEW: 3-Wheelers Navigation Button - Fixed Side Position */}
        <motion.button
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ 
            scale: 1.05, 
            x: 10,
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={handleGoToThreeWheelers}
          className={`${styles.sideNavBtn} ${styles.threeWheelerBtn}`}
          aria-label="Go to 3-Wheeler Collection"
        >
          <Truck size={20} strokeWidth={2.5} />
          <span>3-Wheelers</span>
        </motion.button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={styles.detailsPanel}
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className={styles.detailsTitle}
              >
                {current.name} Specifications
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={styles.detailsDescription}
              >
                {current.description}
              </motion.p>

              {/* Primary Specs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={styles.specGrid}
              >
                <SpecRow icon={<Battery size={18} />} label="Range" value={current.range} />
                <SpecRow icon={<Gauge size={18} />} label="Top Speed" value={current.topSpeed} />
                <SpecRow icon={<DollarSign size={18} />} label="Price" value={current.price} />
              </motion.div>

              {/* Battery Section */}
              {(current.batteryCapacity || current.batteryType || current.chargingTime) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className={styles.specSection}
                >
                  <h4 className={styles.sectionTitle}>🔋 Battery & Charging</h4>
                  <div className={styles.specGrid}>
                    {current.batteryCapacity && (
                      <SpecRow
                        icon={<Zap size={18} />}
                        label="Battery Capacity"
                        value={current.batteryCapacity}
                      />
                    )}
                    {current.batteryType && (
                      <SpecRow
                        icon={<Battery size={18} />}
                        label="Battery Type"
                        value={current.batteryType}
                      />
                    )}
                    {current.chargingTime && (
                      <SpecRow
                        icon={<Clock size={18} />}
                        label="Charging Time"
                        value={current.chargingTime}
                      />
                    )}
                    {current.chargingType && (
                      <SpecRow
                        icon={<AlertCircle size={18} />}
                        label="Charging Type"
                        value={current.chargingType}
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Performance Section */}
              {(current.motorPower || current.torque || current.acceleration) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={styles.specSection}
                >
                  <h4 className={styles.sectionTitle}>⚙️ Performance</h4>
                  <div className={styles.specGrid}>
                    {current.motorPower && (
                      <SpecRow
                        icon={<Wrench size={18} />}
                        label="Motor Power"
                        value={current.motorPower}
                      />
                    )}
                    {current.torque && (
                      <SpecRow
                        icon={<Gauge size={18} />}
                        label="Torque"
                        value={current.torque}
                      />
                    )}
                    {current.acceleration && (
                      <SpecRow
                        icon={<Zap size={18} />}
                        label="0-60 Acceleration"
                        value={current.acceleration}
                      />
                    )}
                    {current.driveType && (
                      <SpecRow
                        icon={<Wrench size={18} />}
                        label="Drive Type"
                        value={current.driveType}
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Vehicle Details Section */}
              {(current.warranty || current.colors) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className={styles.specSection}
                >
                  <h4 className={styles.sectionTitle}>📋 Vehicle Details</h4>
                  <div className={styles.specGrid}>
                    {current.warranty && (
                      <SpecRow
                        icon={<Award size={18} />}
                        label="Warranty"
                        value={current.warranty}
                      />
                    )}
                    {current.colors && (
                      <SpecRow
                        icon={<Palette size={18} />}
                        label="Available Colors"
                        value={current.colors}
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* Features */}
              {current.features && current.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={styles.featuresWrapper}
                >
                  <h4 className={styles.featuresTitle}>✨ Key Features</h4>
                  <div className={styles.featuresList}>
                    {current.features.map((feature, idx) => (
                      <span key={idx} className={styles.featureChip}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SpecRow({ icon, label, value }) {
  return (
    <div className={styles.specRow}>
      <div className={styles.specLeft}>
        <span style={{ color: PRIMARY }}>{icon}</span>
        <span className={styles.specLabel}>{label}</span>
      </div>
      <span className={styles.specValue}>{value || "N/A"}</span>
    </div>
  );
}
