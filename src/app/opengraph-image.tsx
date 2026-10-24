import { ImageResponse } from "next/og";

export const alt = "Surubata — Practical tech, from the start.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f3ec",
          color: "#1c1915",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 18, height: 18, borderRadius: 99, background: "#9a3412" }} />
          <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>Surubata</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Practical tech, from the start.
          </div>
          <div style={{ fontSize: 30, color: "#5c564e" }}>
            AI, automation, and tools for Nepali builders.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#1b4a38" }}>
          Nepal · Diaspora · United States
        </div>
      </div>
    ),
    { ...size },
  );
}
