import crypto from "crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function forbidden() {
  return NextResponse.json(
    { message: "Acces administrateur requis." },
    { status: 403 }
  );
}

function getCloudinaryConfig() {
  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ??
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey =
    process.env.CLOUDINARY_API_KEY ?? process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return { cloudName, apiKey, apiSecret };
}

function signCloudinaryParams(params: Record<string, string>, apiSecret: string) {
  const signatureBase = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${signatureBase}${apiSecret}`)
    .digest("hex");
}

export async function POST(request: Request) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return forbidden();
  }

  const config = getCloudinaryConfig();

  if (!config) {
    return NextResponse.json(
      { message: "Configuration Cloudinary manquante." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File)) {
    return NextResponse.json(
      { message: "Le champ image est requis." },
      { status: 400 }
    );
  }

  if (!ACCEPTED_TYPES.has(image.type)) {
    return NextResponse.json(
      { message: "Format image non supporte." },
      { status: 400 }
    );
  }

  if (image.size > MAX_IMAGE_SIZE) {
    return NextResponse.json(
      { message: "L'image ne peut pas depasser 5 MB." },
      { status: 400 }
    );
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "Portefolio/blog";
  const paramsToSign = { folder, timestamp };
  const signature = signCloudinaryParams(paramsToSign, config.apiSecret);
  const uploadData = new FormData();
  const buffer = await image.arrayBuffer();

  uploadData.append("file", new Blob([buffer], { type: image.type }), image.name);
  uploadData.append("api_key", config.apiKey);
  uploadData.append("timestamp", timestamp);
  uploadData.append("folder", folder);
  uploadData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    {
      method: "POST",
      body: uploadData,
    }
  );
  const payload = (await response.json()) as {
    secure_url?: string;
    public_id?: string;
    width?: number;
    height?: number;
    error?: { message?: string };
  };

  if (!response.ok || !payload.secure_url) {
    return NextResponse.json(
      { message: payload.error?.message ?? "Upload Cloudinary impossible." },
      { status: response.status || 500 }
    );
  }

  return NextResponse.json({
    secureUrl: payload.secure_url,
    url: payload.secure_url,
    publicId: payload.public_id,
    width: payload.width,
    height: payload.height,
  });
}
