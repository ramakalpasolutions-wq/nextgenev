"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Video,
  Image as ImageIcon,
  Trash2,
  Check,
  X,
  LogOut,
  Loader,
  AlertCircle,
  Plus,
  Edit,
  Save,
  Package,
} from "lucide-react";

const PRIMARY = "#4ADE80";
const SECONDARY = "#00FFFF";
const BG = "#0A0A0A";
const CARD = "#111827";

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  // Hero Video State
  const [heroVideoFile, setHeroVideoFile] = useState(null);
  const [heroVideoUrl, setHeroVideoUrl] = useState("");
  const [heroVideoUploading, setHeroVideoUploading] = useState(false);
  const [uploadProgressVideo, setUploadProgressVideo] = useState(0);

  // 2-Wheeler Images State
  const [twoWheelerFiles, setTwoWheelerFiles] = useState([]);
  const [twoWheelerUrls, setTwoWheelerUrls] = useState([]);
  const [twoWheelerUploading, setTwoWheelerUploading] = useState(false);
  const [uploadProgress2W, setUploadProgress2W] = useState(0);

  // 3-Wheeler Images State
  const [threeWheelerFiles, setThreeWheelerFiles] = useState([]);
  const [threeWheelerUrls, setThreeWheelerUrls] = useState([]);
  const [threeWheelerUploading, setThreeWheelerUploading] = useState(false);
  const [uploadProgress3W, setUploadProgress3W] = useState(0);

  // Product Management State
  const [twoWheelerProducts, setTwoWheelerProducts] = useState([]);
  const [threeWheelerProducts, setThreeWheelerProducts] = useState([]);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Check authentication
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      setAuthenticated(true);
      loadExistingMedia();
      loadProducts();
    }
  }, [router]);

  // Load existing media from localStorage
  const loadExistingMedia = () => {
    const savedHeroVideo = localStorage.getItem("heroVideoUrl");
    const saved2WImages = localStorage.getItem("twoWheelerUrls");
    const saved3WImages = localStorage.getItem("threeWheelerUrls");

    if (savedHeroVideo) {
      try {
        setHeroVideoUrl(JSON.parse(savedHeroVideo));
      } catch {
        setHeroVideoUrl(savedHeroVideo);
      }
    }
    if (saved2WImages) setTwoWheelerUrls(JSON.parse(saved2WImages));
    if (saved3WImages) setThreeWheelerUrls(JSON.parse(saved3WImages));
  };

  // Load products
  const loadProducts = () => {
    const saved2W = localStorage.getItem("twoWheelerProducts");
    const saved3W = localStorage.getItem("threeWheelerProducts");

    if (saved2W) {
      try {
        setTwoWheelerProducts(JSON.parse(saved2W));
      } catch (e) {
        console.error("Error loading 2W products:", e);
      }
    }

    if (saved3W) {
      try {
        setThreeWheelerProducts(JSON.parse(saved3W));
      } catch (e) {
        console.error("Error loading 3W products:", e);
      }
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  // Hero Video Handlers
  const handleHeroVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        showError("Please select a valid video file");
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        showError("Video file size should be less than 100MB");
        return;
      }
      setHeroVideoFile(file);
    }
  };

  const uploadHeroVideo = async () => {
    if (!heroVideoFile) {
      showError("Please select a video first");
      return;
    }

    setHeroVideoUploading(true);
    setUploadProgressVideo(0);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", heroVideoFile);
      formData.append("folder", "nextgen-ev/hero");
      formData.append("resourceType", "video");

      const progressInterval = setInterval(() => {
        setUploadProgressVideo((prev) => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 500);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      setUploadProgressVideo(100);

      const videoData = { url: data.url, publicId: data.publicId };
      setHeroVideoUrl(videoData);
      localStorage.setItem("heroVideoUrl", JSON.stringify(videoData));
      setHeroVideoFile(null);

      window.dispatchEvent(new Event("adminMediaUpdated"));
      showSuccess("Hero video uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      showError(err.message || "Upload failed");
    } finally {
      setHeroVideoUploading(false);
      setUploadProgressVideo(0);
    }
  };

  const removeHeroVideo = async () => {
    try {
      if (heroVideoUrl?.publicId) {
        await fetch("/api/cloudinary-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId: heroVideoUrl.publicId,
            resourceType: "video",
          }),
        });
      }

      setHeroVideoUrl("");
      setHeroVideoFile(null);
      localStorage.removeItem("heroVideoUrl");
      window.dispatchEvent(new Event("adminMediaUpdated"));
      showSuccess("Hero video removed successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      showError("Failed to delete video");
    }
  };

  // 2-Wheeler Images Handlers
  const handle2WheelerImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length !== files.length) {
      showError("Some files were not images and were skipped");
    }

    setTwoWheelerFiles([...twoWheelerFiles, ...validImages]);
  };

  const upload2WheelerImages = async () => {
    if (twoWheelerFiles.length === 0) {
      showError("Please select images first");
      return;
    }

    setTwoWheelerUploading(true);
    setUploadProgress2W(0);
    setError("");

    try {
      const totalFiles = twoWheelerFiles.length;
      let completed = 0;

      const uploadPromises = twoWheelerFiles.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("folder", "nextgen-ev/2wheeler");
        formData.append("resourceType", "image");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const data = await response.json();

        completed++;
        setUploadProgress2W(Math.round((completed / totalFiles) * 100));

        return { url: data.url, publicId: data.publicId };
      });

      const results = await Promise.all(uploadPromises);
      const newUrls = [...twoWheelerUrls, ...results];

      setTwoWheelerUrls(newUrls);
      localStorage.setItem("twoWheelerUrls", JSON.stringify(newUrls));
      setTwoWheelerFiles([]);

      window.dispatchEvent(new Event("adminMediaUpdated"));
      showSuccess(`${results.length} image(s) uploaded successfully!`);
    } catch (err) {
      console.error("Upload error:", err);
      showError(err.message || "Upload failed");
    } finally {
      setTwoWheelerUploading(false);
      setUploadProgress2W(0);
    }
  };

  const remove2WheelerImage = async (index) => {
    const imageToRemove = twoWheelerUrls[index];

    try {
      if (imageToRemove.publicId) {
        await fetch("/api/cloudinary-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId: imageToRemove.publicId,
            resourceType: "image",
          }),
        });
      }

      const newUrls = twoWheelerUrls.filter((_, i) => i !== index);
      setTwoWheelerUrls(newUrls);
      localStorage.setItem("twoWheelerUrls", JSON.stringify(newUrls));
      window.dispatchEvent(new Event("adminMediaUpdated"));
      showSuccess("Image removed successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      showError("Failed to delete image");
    }
  };

  const removePending2WheelerImage = (index) => {
    const newFiles = twoWheelerFiles.filter((_, i) => i !== index);
    setTwoWheelerFiles(newFiles);
  };

  // 3-Wheeler Images Handlers
  const handle3WheelerImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length !== files.length) {
      showError("Some files were not images and were skipped");
    }

    setThreeWheelerFiles([...threeWheelerFiles, ...validImages]);
  };

  const upload3WheelerImages = async () => {
    if (threeWheelerFiles.length === 0) {
      showError("Please select images first");
      return;
    }

    setThreeWheelerUploading(true);
    setUploadProgress3W(0);
    setError("");

    try {
      const totalFiles = threeWheelerFiles.length;
      let completed = 0;

      const uploadPromises = threeWheelerFiles.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("folder", "nextgen-ev/3wheeler");
        formData.append("resourceType", "image");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const data = await response.json();

        completed++;
        setUploadProgress3W(Math.round((completed / totalFiles) * 100));

        return { url: data.url, publicId: data.publicId };
      });

      const results = await Promise.all(uploadPromises);
      const newUrls = [...threeWheelerUrls, ...results];

      setThreeWheelerUrls(newUrls);
      localStorage.setItem("threeWheelerUrls", JSON.stringify(newUrls));
      setThreeWheelerFiles([]);

      window.dispatchEvent(new Event("adminMediaUpdated"));
      showSuccess(`${results.length} image(s) uploaded successfully!`);
    } catch (err) {
      console.error("Upload error:", err);
      showError(err.message || "Upload failed");
    } finally {
      setThreeWheelerUploading(false);
      setUploadProgress3W(0);
    }
  };

  const remove3WheelerImage = async (index) => {
    const imageToRemove = threeWheelerUrls[index];

    try {
      if (imageToRemove.publicId) {
        await fetch("/api/cloudinary-delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicId: imageToRemove.publicId,
            resourceType: "image",
          }),
        });
      }

      const newUrls = threeWheelerUrls.filter((_, i) => i !== index);
      setThreeWheelerUrls(newUrls);
      localStorage.setItem("threeWheelerUrls", JSON.stringify(newUrls));
      window.dispatchEvent(new Event("adminMediaUpdated"));
      showSuccess("Image removed successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      showError("Failed to delete image");
    }
  };

  const removePending3WheelerImage = (index) => {
    const newFiles = threeWheelerFiles.filter((_, i) => i !== index);
    setThreeWheelerFiles(newFiles);
  };

  // Product Management Functions
  const addProduct = (category) => {
    const newProduct = {
      id: Date.now(),
      name: `${category} Model ${
        category === "2-Wheeler"
          ? twoWheelerProducts.length + 1
          : threeWheelerProducts.length + 1
      }`,
      category: category,
      tagline: category === "2-Wheeler" ? "Urban Mobility Redefined" : "Built for Business",
      range: category === "2-Wheeler" ? "50-150 km" : "Upto-150 km",
      topSpeed: category === "2-Wheeler" ? "45 km/h" : undefined,
      payload: category === "3-Wheeler" ? "500 kg" : undefined,
      price: "",
      batteryCapacity: "",
      batteryType: "",
      chargingTime: "",
      chargingType: "",
      motorPower: "",
      torque: "",
      acceleration: "",
      driveType: "",
      batteryWarranty: "",
      motorWarranty: "",
      chargerWarranty: "",
      colors: "",
      features: [],
      image: { url: "", publicId: "" },
    };

    if (category === "2-Wheeler") {
      const updated = [...twoWheelerProducts, newProduct];
      setTwoWheelerProducts(updated);
      localStorage.setItem("twoWheelerProducts", JSON.stringify(updated));
    } else {
      const updated = [...threeWheelerProducts, newProduct];
      setThreeWheelerProducts(updated);
      localStorage.setItem("threeWheelerProducts", JSON.stringify(updated));
    }

    window.dispatchEvent(new Event("adminMediaUpdated"));
    showSuccess(`New ${category} product added!`);
  };

  const updateProduct = (category, productId, updatedData) => {
    if (category === "2-Wheeler") {
      const updated = twoWheelerProducts.map((p) =>
        p.id === productId ? { ...p, ...updatedData } : p
      );
      setTwoWheelerProducts(updated);
      localStorage.setItem("twoWheelerProducts", JSON.stringify(updated));
    } else {
      const updated = threeWheelerProducts.map((p) =>
        p.id === productId ? { ...p, ...updatedData } : p
      );
      setThreeWheelerProducts(updated);
      localStorage.setItem("threeWheelerProducts", JSON.stringify(updated));
    }

    window.dispatchEvent(new Event("adminMediaUpdated"));
    showSuccess("Product updated successfully!");
  };

  const deleteProduct = async (category, productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      if (category === "2-Wheeler") {
        const product = twoWheelerProducts.find((p) => p.id === productId);

        if (product?.image?.publicId) {
          await fetch("/api/cloudinary-delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              publicId: product.image.publicId,
              resourceType: "image",
            }),
          });
        }

        const updated = twoWheelerProducts.filter((p) => p.id !== productId);
        setTwoWheelerProducts(updated);
        localStorage.setItem("twoWheelerProducts", JSON.stringify(updated));
      } else {
        const product = threeWheelerProducts.find((p) => p.id === productId);

        if (product?.image?.publicId) {
          await fetch("/api/cloudinary-delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              publicId: product.image.publicId,
              resourceType: "image",
            }),
          });
        }

        const updated = threeWheelerProducts.filter((p) => p.id !== productId);
        setThreeWheelerProducts(updated);
        localStorage.setItem("threeWheelerProducts", JSON.stringify(updated));
      }

      window.dispatchEvent(new Event("adminMediaUpdated"));
      showSuccess("Product deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      showError("Failed to delete product");
    }
  };

  if (!authenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Loader className="animate-spin" size={48} color={PRIMARY} />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        padding: "20px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          marginBottom: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          background: CARD,
          borderRadius: 16,
          border: `1px solid ${PRIMARY}30`,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 4,
            }}
          >
            Admin Dashboard
          </h1>
          <p style={{ color: "#888", fontSize: 14 }}>
            Manage Products, Images & Details
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            background: `linear-gradient(135deg, #EF4444, #DC2626)`,
            border: "none",
            borderRadius: 8,
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              maxWidth: 1400,
              margin: "0 auto 20px",
              padding: "16px 20px",
              background: "#EF444420",
              border: "1px solid #EF4444",
              borderRadius: 12,
              color: "#EF4444",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AlertCircle size={20} />
            {error}
            <button
              onClick={() => setError("")}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "#EF4444",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              maxWidth: 1400,
              margin: "0 auto 20px",
              padding: "16px 20px",
              background: `${PRIMARY}20`,
              border: `1px solid ${PRIMARY}`,
              borderRadius: 12,
              color: PRIMARY,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Check size={20} />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gap: 24,
        }}
      >
        {/* Hero Video Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: CARD,
            borderRadius: 16,
            padding: 24,
            border: `1px solid ${SECONDARY}30`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <Video size={24} color={SECONDARY} />
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "white" }}>
              Hero Video Background
            </h2>
          </div>

          {heroVideoUrl && (
            <div style={{ position: "relative", marginBottom: 20 }}>
              <video
                src={heroVideoUrl.url || heroVideoUrl}
                controls
                style={{
                  width: "100%",
                  maxHeight: 400,
                  borderRadius: 12,
                  border: `2px solid ${SECONDARY}`,
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={removeHeroVideo}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "#EF4444",
                  border: "none",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={18} color="white" />
              </motion.button>
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                color: BG,
                fontWeight: 700,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <Video size={18} style={{ display: "inline", marginRight: 8 }} />
              Choose Video File
              <input
                type="file"
                accept="video/*"
                onChange={handleHeroVideoChange}
                style={{ display: "none" }}
              />
            </label>
            {heroVideoFile && (
              <span style={{ marginLeft: 16, color: "#888", fontSize: 14 }}>
                {heroVideoFile.name} ({(heroVideoFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            )}
          </div>

          {heroVideoFile && (
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={uploadHeroVideo}
                disabled={heroVideoUploading}
                style={{
                  padding: "14px 32px",
                  background: heroVideoUploading
                    ? "#555"
                    : `linear-gradient(135deg, ${SECONDARY}, #0EA5E9)`,
                  border: "none",
                  borderRadius: 8,
                  color: "white",
                  fontWeight: 700,
                  cursor: heroVideoUploading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {heroVideoUploading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    Uploading {uploadProgressVideo}%...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload Video to Cloud
                  </>
                )}
              </motion.button>
              {heroVideoUploading && uploadProgressVideo > 0 && (
                <div
                  style={{
                    marginTop: 12,
                    height: 6,
                    background: "#333",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgressVideo}%` }}
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, ${SECONDARY}, ${PRIMARY})`,
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* 2-WHEELER PRODUCTS SECTION */}
        <ProductsSection
          title="2-Wheeler Products"
          category="2-Wheeler"
          products={twoWheelerProducts}
          onAddProduct={() => addProduct("2-Wheeler")}
          onUpdateProduct={(id, data) => updateProduct("2-Wheeler", id, data)}
          onDeleteProduct={(id) => deleteProduct("2-Wheeler", id)}
          showSuccess={showSuccess}
          showError={showError}
        />

        {/* 3-WHEELER PRODUCTS SECTION */}
        <ProductsSection
          title="3-Wheeler Products"
          category="3-Wheeler"
          products={threeWheelerProducts}
          onAddProduct={() => addProduct("3-Wheeler")}
          onUpdateProduct={(id, data) => updateProduct("3-Wheeler", id, data)}
          onDeleteProduct={(id) => deleteProduct("3-Wheeler", id)}
          showSuccess={showSuccess}
          showError={showError}
        />

        {/* 2-Wheeler Images Upload Section */}
        <ImagesUploadSection
          title="2-Wheeler Images"
          uploadedUrls={twoWheelerUrls}
          pendingFiles={twoWheelerFiles}
          uploading={twoWheelerUploading}
          uploadProgress={uploadProgress2W}
          onFileChange={handle2WheelerImagesChange}
          onUpload={upload2WheelerImages}
          onRemoveUploaded={remove2WheelerImage}
          onRemovePending={removePending2WheelerImage}
        />

        {/* 3-Wheeler Images Upload Section */}
        <ImagesUploadSection
          title="3-Wheeler Images"
          uploadedUrls={threeWheelerUrls}
          pendingFiles={threeWheelerFiles}
          uploading={threeWheelerUploading}
          uploadProgress={uploadProgress3W}
          onFileChange={handle3WheelerImagesChange}
          onUpload={upload3WheelerImages}
          onRemoveUploaded={remove3WheelerImage}
          onRemovePending={removePending3WheelerImage}
        />
      </div>
    </div>
  );
}

// ========== PRODUCTS SECTION COMPONENT ==========
function ProductsSection({
  title,
  category,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  showSuccess,
  showError,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: CARD,
        borderRadius: 16,
        padding: 24,
        border: `1px solid ${PRIMARY}30`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Package size={24} color={PRIMARY} />
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "white" }}>{title}</h2>
          <span style={{ color: "#888", fontSize: 14 }}>{products.length} products</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddProduct}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            background: `linear-gradient(135deg, ${PRIMARY}, #22C55E)`,
            border: "none",
            borderRadius: 8,
            color: BG,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={18} />
          Add Products
        </motion.button>
      </div>

      {products.length === 0 ? (
        <p style={{ color: "#888", textAlign: "center", padding: "40px 0" }}>
          No products yet. Click "Add Products" to create one.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 20 }}>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              category={category}
              onUpdate={onUpdateProduct}
              onDelete={onDeleteProduct}
              showSuccess={showSuccess}
              showError={showError}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ========== PRODUCT CARD COMPONENT WITH ALL FIELDS ==========
function ProductCard({ product, index, category, onUpdate, onDelete, showSuccess, showError }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(product);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError("Please select a valid image file");
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", `nextgen-ev/${category.toLowerCase().replace("-", "")}`);
      formData.append("resourceType", "image");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || "Upload failed");
      }

      const data = await response.json();
      setEditData({ ...editData, image: { url: data.url, publicId: data.publicId } });
      showSuccess("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      showError(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = () => {
    onUpdate(product.id, editData);
    setIsEditing(false);
  };

  const handleFeatureChange = (idx, value) => {
    const newFeatures = [...editData.features];
    newFeatures[idx] = value;
    setEditData({ ...editData, features: newFeatures });
  };

  const addFeature = () => {
    setEditData({ ...editData, features: [...editData.features, ""] });
  };

  const removeFeature = (idx) => {
    const newFeatures = editData.features.filter((_, i) => i !== idx);
    setEditData({ ...editData, features: newFeatures });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: "#0D0D0D",
        borderRadius: 12,
        padding: 20,
        border: `1px solid ${PRIMARY}20`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h3 style={{ color: PRIMARY, fontSize: 18, fontWeight: 700 }}>
          Product #{index + 1}
        </h3>
        <div style={{ display: "flex", gap: 8 }}>
          {isEditing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: `linear-gradient(135deg, ${PRIMARY}, #22C55E)`,
                border: "none",
                borderRadius: 6,
                color: BG,
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              <Save size={16} />
              Save
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: `linear-gradient(135deg, ${SECONDARY}, #0EA5E9)`,
                border: "none",
                borderRadius: 6,
                color: BG,
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              <Edit size={16} />
              Edit
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(product.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: `linear-gradient(135deg, #EF4444, #DC2626)`,
              border: "none",
              borderRadius: 6,
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <Trash2 size={16} />
            Delete
          </motion.button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
        {/* Image Section */}
        <div>
          {editData.image?.url ? (
            <div style={{ position: "relative" }}>
              <img
                src={editData.image.url}
                alt={editData.name}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: `2px solid ${PRIMARY}`,
                }}
              />
              {isEditing && (
                <label
                  style={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    background: `linear-gradient(135deg, ${PRIMARY}, #22C55E)`,
                    padding: "6px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    color: BG,
                  }}
                >
                  {uploadingImage ? "Uploading..." : "Change"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    disabled={uploadingImage}
                  />
                </label>
              )}
            </div>
          ) : (
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 200,
                border: `2px dashed ${PRIMARY}40`,
                borderRadius: 8,
                cursor: isEditing ? "pointer" : "not-allowed",
                background: "#111",
              }}
            >
              <ImageIcon size={32} color={PRIMARY} />
              <span style={{ color: PRIMARY, fontSize: 12, marginTop: 8 }}>
                {isEditing ? "Upload Image" : "No Image"}
              </span>
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  disabled={uploadingImage}
                />
              )}
            </label>
          )}
        </div>

        {/* Details Section */}
        <div style={{ display: "grid", gap: 12 }}>
          {/* Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField
              label="Product Name"
              value={editData.name}
              onChange={(v) => setEditData({ ...editData, name: v })}
              disabled={!isEditing}
            />
            <InputField
              label="Category"
              value={editData.category}
              disabled={true}
            />
          </div>

          {/* Tagline */}
          <InputField
            label="Tagline"
            value={editData.tagline}
            onChange={(v) => setEditData({ ...editData, tagline: v })}
            disabled={!isEditing}
          />

          {/* Row 2: Range & TopSpeed/Payload */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField
              label="Range"
              value={editData.range}
              onChange={(v) => setEditData({ ...editData, range: v })}
              disabled={!isEditing}
            />
            <InputField
              label={category === "2-Wheeler" ? "Top Speed" : "Payload"}
              value={category === "2-Wheeler" ? editData.topSpeed : editData.payload}
              onChange={(v) => setEditData({
                ...editData,
                [category === "2-Wheeler" ? "topSpeed" : "payload"]: v
              })}
              disabled={!isEditing}
            />
          </div>

          {/* Price */}
          <InputField
            label="Price"
            value={editData.price}
            onChange={(v) => setEditData({ ...editData, price: v })}
            disabled={!isEditing}
            placeholder="e.g., ₹55,000/- to ₹1,40,000/-"
          />

          {/* Battery Section */}
          <div style={{ color: "#888", fontSize: 12, fontWeight: 600, marginTop: 8 }}>
            BATTERY & CHARGING
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField
              label="Battery Capacity"
              value={editData.batteryCapacity}
              onChange={(v) => setEditData({ ...editData, batteryCapacity: v })}
              disabled={!isEditing}
              placeholder="e.g., 48/60/72 Volts"
            />
            <InputField
              label="Battery Type"
              value={editData.batteryType}
              onChange={(v) => setEditData({ ...editData, batteryType: v })}
              disabled={!isEditing}
              placeholder="e.g., Lithium-ion"
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField
              label="Charging Time"
              value={editData.chargingTime}
              onChange={(v) => setEditData({ ...editData, chargingTime: v })}
              disabled={!isEditing}
              placeholder="e.g., 3-4 hours"
            />
            <InputField
              label="Charging Type"
              value={editData.chargingType}
              onChange={(v) => setEditData({ ...editData, chargingType: v })}
              disabled={!isEditing}
              placeholder="e.g., Fast Charging"
            />
          </div>

          {/* Performance Section */}
          <div style={{ color: "#888", fontSize: 12, fontWeight: 600, marginTop: 8 }}>
            MOTOR & PERFORMANCE
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField
              label="Motor Power"
              value={editData.motorPower}
              onChange={(v) => setEditData({ ...editData, motorPower: v })}
              disabled={!isEditing}
              placeholder="e.g., 250W"
            />
            <InputField
              label="Torque"
              value={editData.torque}
              onChange={(v) => setEditData({ ...editData, torque: v })}
              disabled={!isEditing}
              placeholder="e.g., 80-95 Nm"
            />
          </div>

          {category === "2-Wheeler" && (
            <InputField
              label="Acceleration"
              value={editData.acceleration}
              onChange={(v) => setEditData({ ...editData, acceleration: v })}
              disabled={!isEditing}
              placeholder="e.g., 0-40 in 5 sec"
            />
          )}

          <InputField
            label="Drive Type"
            value={editData.driveType}
            onChange={(v) => setEditData({ ...editData, driveType: v })}
            disabled={!isEditing}
            placeholder="e.g., Rear / Hub Motor"
          />

          {/* Warranty Section */}
          <div style={{ color: "#888", fontSize: 12, fontWeight: 600, marginTop: 8 }}>
            VEHICLE DETAILS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField
              label="Battery Warranty"
              value={editData.batteryWarranty}
              onChange={(v) => setEditData({ ...editData, batteryWarranty: v })}
              disabled={!isEditing}
              placeholder="e.g., 2+1 Years"
            />
            <InputField
              label="Motor Warranty"
              value={editData.motorWarranty}
              onChange={(v) => setEditData({ ...editData, motorWarranty: v })}
              disabled={!isEditing}
              placeholder="e.g., 1 Year"
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField
              label="Charger Warranty"
              value={editData.chargerWarranty}
              onChange={(v) => setEditData({ ...editData, chargerWarranty: v })}
              disabled={!isEditing}
              placeholder="e.g., 1 Year"
            />
            <InputField
              label="Available Colors"
              value={editData.colors}
              onChange={(v) => setEditData({ ...editData, colors: v })}
              disabled={!isEditing}
              placeholder="e.g., Black, White, Red, Green, Blue, Yellow, Brown, Silver, Gold, Violet"
            />
          </div>

          {/* Features */}
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <label style={{ color: "#888", fontSize: 12, fontWeight: 600 }}>
                KEY FEATURES
              </label>
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addFeature}
                  style={{
                    padding: "4px 10px",
                    background: `${PRIMARY}40`,
                    border: `1px solid ${PRIMARY}`,
                    borderRadius: 4,
                    color: PRIMARY,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  + Add
                </motion.button>
              )}
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              {editData.features && editData.features.length > 0 ? (
                editData.features.map((feature, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., Fast Charging, Digital Display, Eco Mode"
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        background: isEditing ? "#1A1A1A" : "#0A0A0A",
                        border: `1px solid ${isEditing ? PRIMARY + "40" : "#333"}`,
                        borderRadius: 6,
                        color: "white",
                        fontSize: 14,
                      }}
                    />
                    {isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFeature(idx)}
                        style={{
                          padding: "6px 10px",
                          background: "#EF444440",
                          border: "1px solid #EF4444",
                          borderRadius: 4,
                          color: "#EF4444",
                          cursor: "pointer",
                          fontSize: 12,
                        }}
                      >
                        ✕
                      </motion.button>
                    )}
                  </div>
                ))
              ) : (
                <p style={{ color: "#666", fontSize: 12 }}>No features added</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ========== INPUT FIELD HELPER ==========
function InputField({ label, value, onChange, disabled, placeholder }) {
  return (
    <div>
      <label style={{ color: "#888", fontSize: 12, marginBottom: 4, display: "block" }}>
        {label}
      </label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 12px",
          background: !disabled ? "#1A1A1A" : "#0A0A0A",
          border: `1px solid ${!disabled ? PRIMARY + "40" : "#333"}`,
          borderRadius: 6,
          color: "white",
          fontSize: 14,
        }}
      />
    </div>
  );
}

// ========== IMAGES UPLOAD SECTION ==========
function ImagesUploadSection({
  title,
  uploadedUrls,
  pendingFiles,
  uploading,
  uploadProgress,
  onFileChange,
  onUpload,
  onRemoveUploaded,
  onRemovePending,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: CARD,
        borderRadius: 16,
        padding: 24,
        border: `1px solid ${PRIMARY}30`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <ImageIcon size={24} color={PRIMARY} />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "white" }}>{title}</h2>
        <span style={{ marginLeft: "auto", color: "#888", fontSize: 14 }}>
          {uploadedUrls.length} uploaded
        </span>
      </div>

      {uploadedUrls.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3
            style={{
              color: PRIMARY,
              fontSize: 14,
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Uploaded Images
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 12,
            }}
          >
            {uploadedUrls.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  position: "relative",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: `2px solid ${PRIMARY}`,
                }}
              >
                <img
                  src={item.url || item}
                  alt={`Uploaded ${index + 1}`}
                  style={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveUploaded(index)}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    background: "#EF4444",
                    border: "none",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={14} color="white" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
            color: BG,
            fontWeight: 700,
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          <Plus size={18} style={{ display: "inline", marginRight: 8 }} />
          Add Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {pendingFiles.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ color: "#888", fontSize: 14, marginBottom: 12 }}>
            Pending Upload ({pendingFiles.length})
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 12,
            }}
          >
            {pendingFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  position: "relative",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "2px solid #888",
                  opacity: 0.7,
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Pending ${index + 1}`}
                  style={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemovePending(index)}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    background: "#EF4444",
                    border: "none",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} color="white" />
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpload}
            disabled={uploading}
            style={{
              marginTop: 16,
              padding: "14px 32px",
              background: uploading ? "#555" : `linear-gradient(135deg, ${PRIMARY}, #22C55E)`,
              border: "none",
              borderRadius: 8,
              color: "white",
              fontWeight: 700,
              cursor: uploading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {uploading ? (
              <>
                <Loader className="animate-spin" size={18} />
                Uploading {uploadProgress}%...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload {pendingFiles.length} Image(s) to Cloud
              </>
            )}
          </motion.button>
          {uploading && uploadProgress > 0 && (
            <div
              style={{
                marginTop: 12,
                height: 6,
                background: "#333",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
                }}
              />
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
