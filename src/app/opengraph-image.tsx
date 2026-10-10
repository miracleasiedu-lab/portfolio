export const dynamic = "force-static";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}, Data Analyst in London`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#071426",
          color: "#e8f1f8",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#22d3ee" }}>{site.title}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>{site.name}</div>
          <div style={{ fontSize: 40, marginTop: 20, color: "#b9c8da", maxWidth: 900 }}>{site.headline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8ea2bb" }}>London, United Kingdom</div>
      </div>
    ),
    size,
  );
}
