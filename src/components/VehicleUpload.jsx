// src/components/VehicleUpload.jsx
"use client";

import { useState, useRef } from "react";
import { X, Upload, Loader } from "lucide-react";

const PRIMARY = "#4ADE80";
const NEON = "#00FFFF";
const DARK = "#0A0A0A";
const CARD_BG = "#0B1120";
const TEXT = "#E5E5E5";

export default function VehicleUpload({ onSuccess, initialData = null, isEditing = false }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      type: "2w",
      description: "",
      price: "",
      range: "",
      specifications: {
        battery: "",
        motor: "",
        topSpeed: "",
        chargingTime: "",
        weight: "",
      },
    }
  );

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || "");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSpecChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vehicle name is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.range.trim()) newErrors.range = "Range is required";
    if (!imageFile && !initialData?.imageUrl) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadToCloudinary = async () => {
    if (!imageFile) return initialData?.imageUrl;

    try {
      // Get signature
      const sigRes = await fetch("/api/cloudinary-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder: `ev_vehicles/${formData.type}`,
        }),
      });

      const { signature, timestamp, folder, apiKey, cloudName } = await sigRes.json();

      // Upload to Cloudinary
      const formDataCloud = new FormData();
      formDataCloud.append("file", imageFile);
      formDataCloud.append("api_key", apiKey);
      formDataCloud.append("timestamp", timestamp);
      formDataCloud.append("signature", signature);
      formDataCloud.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formDataCloud,
        }
      );

      const uploadedData = await uploadRes.json();
      return {
        url: uploadedData.secure_url,
        publicId: uploadedData.public_id,
      };
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      throw new Error("Failed to upload image to Cloudinary");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setUploading(true);
    try {
      let imageData = { url: imagePreview, publicId: null };

      if (imageFile) {
        imageData = await uploadToCloudinary();
      }

      const payload = {
        ...formData,
        imageUrl: imageData.url,
        publicId: imageData.publicId,
        ...(isEditing && { id: initialData._id }),
      };

      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/vehicles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API error");

      if (onSuccess) onSuccess();
      resetForm();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "2w",
      description: "",
      price: "",
      range: "",
      specifications: {
        battery: "",
        motor: "",
        topSpeed: "",
        chargingTime: "",
        weight: "",
      },
    });
    setImageFile(null);
    setImagePreview("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: CARD_BG,
        borderRadius: "16px",
        padding: "24px",
        border: `1px solid ${PRIMARY}40`,
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          color: PRIMARY,
          fontSize: "24px",
          fontWeight: 700,
          marginBottom: "20px",
        }}
      >
        {isEditing ? "Edit Vehicle" : "Upload New Vehicle"}
      </h2>

      {errors.submit && (
        <div
          style={{
            background: "rgba(255, 85, 85, 0.1)",
            color: "#FF5555",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          {errors.submit}
        </div>
      )}

      {/* Vehicle Name */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ color: TEXT, display: "block", marginBottom: "8px", fontWeight: 500 }}>
          Vehicle Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g., Ather 450X"
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "#0D0D0D",
            border: `1px solid ${errors.name ? "#FF5555" : PRIMARY}40`,
            borderRadius: "8px",
            color: TEXT,
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
        {errors.name && (
          <span style={{ color: "#FF5555", fontSize: "12px", marginTop: "4px", display: "block" }}>
            {errors.name}
          </span>
        )}
      </div>

      {/* Vehicle Type */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ color: TEXT, display: "block", marginBottom: "8px", fontWeight: 500 }}>
          Vehicle Type *
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "#0D0D0D",
            border: `1px solid ${PRIMARY}40`,
            borderRadius: "8px",
            color: TEXT,
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        >
          <option value="2w">2-Wheeler</option>
          <option value="3w">3-Wheeler</option>
        </select>
      </div>

      {/* Description */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ color: TEXT, display: "block", marginBottom: "8px", fontWeight: 500 }}>
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Vehicle description..."
          rows={3}
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "#0D0D0D",
            border: `1px solid ${PRIMARY}40`,
            borderRadius: "8px",
            color: TEXT,
            fontSize: "14px",
            boxSizing: "border-box",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Price & Range Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <div>
          <label style={{ color: TEXT, display: "block", marginBottom: "8px", fontWeight: 500 }}>
            Price *
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="e.g., ₹1,50,000"
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "#0D0D0D",
              border: `1px solid ${errors.price ? "#FF5555" : PRIMARY}40`,
              borderRadius: "8px",
              color: TEXT,
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
          {errors.price && (
            <span style={{ color: "#FF5555", fontSize: "12px", marginTop: "4px", display: "block" }}>
              {errors.price}
            </span>
          )}
        </div>

        <div>
          <label style={{ color: TEXT, display: "block", marginBottom: "8px", fontWeight: 500 }}>
            Range (km) *
          </label>
          <input
            type="text"
            name="range"
            value={formData.range}
            onChange={handleInputChange}
            placeholder="e.g., 150 km"
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "#0D0D0D",
              border: `1px solid ${errors.range ? "#FF5555" : PRIMARY}40`,
              borderRadius: "8px",
              color: TEXT,
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
          {errors.range && (
            <span style={{ color: "#FF5555", fontSize: "12px", marginTop: "4px", display: "block" }}>
              {errors.range}
            </span>
          )}
        </div>
      </div>

      {/* Specifications */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ color: PRIMARY, display: "block", marginBottom: "8px", fontWeight: 600 }}>
          Specifications
        </label>
        {Object.entries(formData.specifications).map(([key, value]) => (
          <input
            key={key}
            type="text"
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            onChange={(e) => handleSpecChange(key, e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              background: "#0D0D0D",
              border: `1px solid ${PRIMARY}30`,
              borderRadius: "6px",
              color: TEXT,
              fontSize: "13px",
              boxSizing: "border-box",
              marginBottom: "8px",
            }}
          />
        ))}
      </div>

      {/* Image Upload */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ color: TEXT, display: "block", marginBottom: "8px", fontWeight: 500 }}>
          Vehicle Image {!initialData && "*"}
        </label>

        {imagePreview && (
          <div
            style={{
              position: "relative",
              marginBottom: "12px",
              borderRadius: "8px",
              overflow: "hidden",
              border: `1px solid ${PRIMARY}40`,
            }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <button
              type="button"
              onClick={() => {
                setImageFile(null);
                setImagePreview("");
              }}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "rgba(0,0,0,0.7)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={16} color={NEON} />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: "100%",
            padding: "40px 16px",
            border: `2px dashed ${PRIMARY}40`,
            borderRadius: "8px",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: NEON,
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = PRIMARY;
            e.target.style.background = `${PRIMARY}10`;
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = `${PRIMARY}40`;
            e.target.style.background = "transparent";
          }}
        >
          <Upload size={24} />
          Click or drag to upload image
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        {errors.image && (
          <span style={{ color: "#FF5555", fontSize: "12px", marginTop: "4px", display: "block" }}>
            {errors.image}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={uploading}
        style={{
          width: "100%",
          padding: "12px",
          background: uploading ? `${PRIMARY}60` : `linear-gradient(135deg, ${PRIMARY} 0%, ${NEON} 100%)`,
          border: "none",
          borderRadius: "8px",
          color: DARK,
          fontWeight: 700,
          fontSize: "16px",
          cursor: uploading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 0.3s ease",
        }}
      >
        {uploading ? (
          <>
            <Loader size={18} style={{ animation: "spin 1s linear infinite" }} />
            Uploading...
          </>
        ) : (
          isEditing ? "Update Vehicle" : "Upload Vehicle"
        )}
      </button>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
