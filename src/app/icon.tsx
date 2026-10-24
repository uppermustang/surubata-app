import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 4, height: 4, borderRadius: 2, background: "#e8a06a", marginBottom: 3 }} />
          <div
            style={{
              width: 16,
              height: 8,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              border: "2px solid #e8a06a",
              borderBottom: "none",
            }}
          />
          <div style={{ width: 20, height: 2, borderRadius: 1, background: "#f6f3ec", marginTop: 2 }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
