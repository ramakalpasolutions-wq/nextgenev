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

let isWriting = false;
const writeQueue = [];

async function processQueue() {
  if (isWriting) return;
  if (writeQueue.length === 0) return;

  isWriting = true;
  const task = writeQueue.shift();

  try {
    await task();
  } catch (err) {
    console.error("❌ Write error:", err);
  } finally {
    isWriting = false;
    
    if (writeQueue.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      processQueue();
    }
  }
}

// Initialize metadata file if it doesn't exist
async function initializeMetadata() {
  try {
    await cloudinary.api.resource(META_PUBLIC_ID, {
      resource_type: META_RESOURCE_TYPE,
    });
    console.log("✅ Metadata file exists");
  } catch (err) {
    console.log("📝 Creating metadata file for first time...");
    const emptyData = getEmptyStructure();
    const buffer = Buffer.from(JSON.stringify(emptyData, null, 2), "utf8");
    
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: META_RESOURCE_TYPE,
          public_id: META_PUBLIC_ID,
          overwrite: true,
        },
        (err, result) => {
          if (err) {
            console.error("❌ Failed to create metadata file:", err);
            reject(err);
          } else {
            console.log("✅ Metadata file created successfully");
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });
  }
}

// Initialize on startup
initializeMetadata().catch(err => console.error("Init error:", err));

async function readMediaFromCloudinary(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const resource = await cloudinary.api.resource(META_PUBLIC_ID, {
        resource_type: META_RESOURCE_TYPE,
      });

      if (!resource?.secure_url) return getEmptyStructure();

      const res = await fetch(resource.secure_url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      
      if (typeof data !== 'object' || data === null) {
        console.warn("⚠️ Invalid metadata structure, resetting");
        return getEmptyStructure();
      }
      
      return data;
    } catch (e) {
      console.error(`🔄 Read attempt ${i + 1}/${retries} failed:`, e.message);
      if (i === retries - 1) {
        console.error("❌ All read attempts failed, returning empty structure");
        return getEmptyStructure();
      }
      await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
    }
  }
}

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
  return new Promise((resolve, reject) => {
    writeQueue.push(async () => {
      try {
        const buffer = Buffer.from(JSON.stringify(data, null, 2), "utf8");
        const result = await uploadBufferToCloudinary(buffer, META_PUBLIC_ID);
        
        console.log("✅ Metadata written to Cloudinary");
        
        await new Promise(resolve => setTimeout(resolve, 500));
        const verification = await readMediaFromCloudinary(1);
        
        if (!verification || typeof verification !== 'object') {
          throw new Error("Verification failed: corrupted metadata");
        }
        
        console.log("✅ Verification successful");
        resolve(result);
      } catch (err) {
        console.error("❌ Write error:", err.message);
        reject(err);
      }
    });
    
    processQueue();
  });
}

function getEmptyStructure() {
  return {
    heroImages: [],
    twoWheelerUrls: [],
    threeWheelerUrls: [],
    batteryRepairUrls: [],
    chargerRepairUrls: [],
    twoWheelerProducts: [],
    threeWheelerProducts: [],
    batteryProducts: [],
    chargerProducts: [],
  };
}


export async function GET() {
  try {
    const data = await readMediaFromCloudinary();
    console.log("📖 GET /api/media - Sections:", Object.keys(data).filter(k => data[k].length > 0));
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ GET /api/media:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { section, images, product } = body;

    if (!section) {
      return NextResponse.json({ error: "Missing section" }, { status: 400 });
    }

    let data = await readMediaFromCloudinary();

    if (!data.hasOwnProperty(section)) {
      console.warn(`⚠️ Creating new section: ${section}`);
      data[section] = [];
    }

    if (images && Array.isArray(images)) {
      const beforeCount = data[section].length;
      data[section].push(...images);
      console.log(`📸 Added ${images.length} images to ${section}. Total: ${beforeCount} → ${data[section].length}`);
      
      await writeMediaToCloudinary(data);
      return NextResponse.json({ ok: true, data, addedCount: images.length });
    }

    if (product) {
      const beforeCount = data[section].length;
      data[section].push(product);
      console.log(`🛍️ Added product to ${section}. Total: ${beforeCount} → ${data[section].length}`);
      
      await writeMediaToCloudinary(data);
      return NextResponse.json({ ok: true, data, addedCount: 1 });
    }

    return NextResponse.json({ error: "Invalid request: no images or product" }, { status: 400 });
  } catch (err) {
    console.error("❌ POST /api/media:", err.message);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { section, index, publicId } = body;

    if (!section) {
      return NextResponse.json({ error: "Missing section" }, { status: 400 });
    }

    let data = await readMediaFromCloudinary();

    if (typeof index === 'number' && data[section]) {
      if (index < 0 || index >= data[section].length) {
        return NextResponse.json({ error: "Index out of bounds" }, { status: 400 });
      }

      const removed = data[section].splice(index, 1)[0];
      console.log(`🗑️ Removed at index ${index}`);
      
      if (removed?.publicId) {
        try {
          await cloudinary.uploader.destroy(removed.publicId);
          console.log(`🗑️ Deleted from Cloudinary: ${removed.publicId}`);
        } catch (e) {
          console.error('⚠️ Failed to delete from Cloudinary:', e.message);
        }
      }
      
      await writeMediaToCloudinary(data);
      return NextResponse.json({ ok: true, data, removed });
    }

    if (publicId && data[section]) {
      const idx = data[section].findIndex(item => item.publicId === publicId);
      if (idx >= 0) {
        const removed = data[section].splice(idx, 1)[0];
        console.log(`🗑️ Removed by publicId`);
        
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log(`🗑️ Deleted from Cloudinary: ${publicId}`);
        } catch (e) {
          console.error('⚠️ Failed to delete from Cloudinary:', e.message);
        }
        
        await writeMediaToCloudinary(data);
        return NextResponse.json({ ok: true, data, removed });
      }
    }

    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  } catch (err) {
    console.error("❌ DELETE /api/media:", err.message);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { section, index, product } = body;

    if (!section || typeof index !== 'number' || !product) {
      return NextResponse.json({ error: "Missing: section, index, or product" }, { status: 400 });
    }

    let data = await readMediaFromCloudinary();

    if (!data[section]) {
      return NextResponse.json({ error: `Section '${section}' not found` }, { status: 404 });
    }

    if (index < 0 || index >= data[section].length) {
      return NextResponse.json({ error: "Index out of bounds" }, { status: 400 });
    }

    const oldProduct = data[section][index];
    data[section][index] = product;
    console.log(`✏️ Updated product at index ${index}`);

    await writeMediaToCloudinary(data);
    return NextResponse.json({ ok: true, data, oldProduct, newProduct: product });
  } catch (err) {
    console.error("❌ PUT /api/media:", err.message);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
