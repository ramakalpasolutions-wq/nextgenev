import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "nextgen-ev";
    const resourceType = formData.get("resourceType") || "auto";

    // Validate file
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    console.log("📤 Uploading file:", file.name, "Size:", file.size, "Type:", resourceType);

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload options
    const uploadOptions = {
      folder: folder,
      resource_type: resourceType,
    };

    // Add video-specific settings
    if (resourceType === "video") {
      uploadOptions.chunk_size = 6000000; // 6MB chunks
      uploadOptions.timeout = 120000; // 2 minutes timeout
    } else if (resourceType === "image") {
      uploadOptions.transformation = [
        { width: 1920, height: 1080, crop: "limit" },
        { quality: "auto:good" },
      ];
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

    console.log("✅ Upload successful:", result.secure_url);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      format: result.format,
    });

  } catch (error) {
    console.error("❌ Upload error:", error);
    
    return NextResponse.json(
      { 
        error: error.message || "Upload failed",
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
