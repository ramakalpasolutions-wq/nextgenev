import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    console.log("📤 Uploading to Cloudinary:", file.name, "Type:", resourceType);

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary with appropriate settings
    const uploadOptions = {
      folder: folder,
      resource_type: resourceType,
    };

    // Add video-specific options
    if (resourceType === "video") {
      uploadOptions.chunk_size = 6000000; // 6MB chunks for large videos
      uploadOptions.eager = [
        { streaming_profile: "hd", format: "m3u8" }
      ];
      uploadOptions.eager_async = true;
    } else if (resourceType === "image") {
      uploadOptions.transformation = [
        { width: 1920, height: 1080, crop: "limit" },
        { quality: "auto:good" },
        { fetch_format: "auto" }
      ];
    }

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
    console.error("❌ Cloudinary upload error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Upload failed",
        details: error.error?.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}
