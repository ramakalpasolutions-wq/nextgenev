import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const META_PUBLIC_ID = "metadata/nextgen_ev_media";
const META_RESOURCE_TYPE = "raw";

// Helper: Read metadata from Cloudinary
async function readMediaFromCloudinary() {
  try {
    const resource = await cloudinary.api.resource(META_PUBLIC_ID, {
      resource_type: META_RESOURCE_TYPE,
    });

    if (!resource?.secure_url) return getEmptyStructure();

    const res = await fetch(resource.secure_url);
    const data = await res.json();
    return data;
  } catch (e) {
    return getEmptyStructure();
  }
}

// Helper: Write metadata to Cloudinary
function uploadBufferToCloudinary(buffer, public_id) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: META_RESOURCE_TYPE,
        public_id,
        overwrite: true,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

async function writeMediaToCloudinary(data) {
  const buffer = Buffer.from(JSON.stringify(data, null, 2), "utf8");
  await uploadBufferToCloudinary(buffer, META_PUBLIC_ID);
}

function getEmptyStructure() {
  return {
    heroImages: [],
    twoWheelerUrls: [],
    threeWheelerUrls: [],
    twoWheelerProducts: [],
    threeWheelerProducts: [],
    batteryRepairUrls: [],
    chargerRepairUrls: [],
  };
}

// GET: Return all media
export async function GET() {
  try {
    const data = await readMediaFromCloudinary();
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/media:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST: Add uploaded images/products
export async function POST(req) {
  try {
    const body = await req.json();
    let data = await readMediaFromCloudinary();

    const { section, images, product } = body;

    if (!section) {
      return NextResponse.json({ error: "Missing section" }, { status: 400 });
    }

    // Add gallery images
    if (images && Array.isArray(images)) {
      data[section] = data[section] || [];
      data[section].push(...images);
      await writeMediaToCloudinary(data);
      return NextResponse.json({ ok: true, data });
    }

    // Add product
    if (product) {
      data[section] = data[section] || [];
      data[section].push(product);
      await writeMediaToCloudinary(data);
      return NextResponse.json({ ok: true, data });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (err) {
    console.error("POST /api/media:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// DELETE: Remove image or product
export async function DELETE(req) {
  try {
    const body = await req.json();
    let data = await readMediaFromCloudinary();

    const { section, index, publicId } = body;

    if (!section) {
      return NextResponse.json({ error: "Missing section" }, { status: 400 });
    }

    // Delete by index
    if (typeof index === 'number' && data[section]) {
      const removed = data[section].splice(index, 1);
      
      // Delete from Cloudinary if has publicId
      if (removed[0]?.publicId) {
        try {
          await cloudinary.uploader.destroy(removed[0].publicId);
        } catch (e) {
          console.error('Failed to delete from Cloudinary:', e);
        }
      }
      
      await writeMediaToCloudinary(data);
      return NextResponse.json({ ok: true, data });
    }

    // Delete by publicId
    if (publicId && data[section]) {
      const idx = data[section].findIndex(item => item.publicId === publicId);
      if (idx >= 0) {
        data[section].splice(idx, 1);
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (e) {
          console.error('Failed to delete from Cloudinary:', e);
        }
        await writeMediaToCloudinary(data);
        return NextResponse.json({ ok: true, data });
      }
    }

    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  } catch (err) {
    console.error("DELETE /api/media:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PUT: Update product
export async function PUT(req) {
  try {
    const body = await req.json();
    let data = await readMediaFromCloudinary();

    const { section, index, product } = body;

    if (!section || typeof index !== 'number' || !product) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    if (!data[section] || !data[section][index]) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    data[section][index] = product;
    await writeMediaToCloudinary(data);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("PUT /api/media:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
