import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 npm run build  → plain HTML/CSS in ./out (used for static hosting).
 * Normal builds (Vercel) keep image optimisation and response headers.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStaticExport
  ? {
      reactStrictMode: true,
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      reactStrictMode: true,
      images: { formats: ["image/avif", "image/webp"] },
      async headers() {
        return [{ source: "/notebooks/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
      },
    };

export default nextConfig;
