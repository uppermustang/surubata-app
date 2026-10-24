import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1c1915",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#e8a06a", marginBottom: 16 }} />
          <div
            style={{
              width: 92,
              height: 46,
              borderTopLeftRadius: 46,
              borderTopRightRadius: 46,
              border: "10px solid #e8a06a",
              borderBottom: "none",
            }}
          />
          <div style={{ width: 116, height: 8, borderRadius: 4, background: "#f6f3ec", marginTop: 12 }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
