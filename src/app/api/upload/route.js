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
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "nextgen-ev";
    const resourceType = formData.get("resourceType") || "auto";

    if (!file) {
      console.error("❌ No file in request");
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    console.log("📤 File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
      folder,
      resourceType
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    const uploadOptions = {
      folder: folder,
      resource_type: resourceType,
    };

    if (resourceType === "image") {
      uploadOptions.transformation = [
        { width: 1920, height: 1080, crop: "limit" },
        { quality: "auto:good" },
        { fetch_format: "auto" }
      ];
    }

    console.log("🚀 Uploading to Cloudinary with options:", uploadOptions);

    const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

    console.log("✅ Upload successful:", result.secure_url);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (error) {
    console.error("❌ Full upload error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Upload failed",
        details: error.error?.message || error.toString()
      },
      { status: 500 }
    );
  }
}
