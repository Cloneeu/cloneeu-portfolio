import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Alexandro — I build software to keep learning";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: "54px 62px",
        background: "linear-gradient(135deg, #ffffff 28%, #ffedbe 58%, #cdffea 78%, #e7d4ff 100%)",
        color: "#000000",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 38,
          right: 44,
          display: "flex",
          width: 332,
          height: 332,
          border: "10px solid #000000",
          background: "#ffffff",
        }}
      >
        <div style={{ position: "absolute", top: 44, left: 42, display: "flex", width: 72, height: 72, background: "#3cd9b3" }} />
        <div style={{ position: "absolute", top: 116, left: 114, display: "flex", width: 72, height: 72, background: "#ffbcc3" }} />
        <div style={{ position: "absolute", top: 188, left: 186, display: "flex", width: 72, height: 72, background: "#000000" }} />
        <div style={{ position: "absolute", right: 34, bottom: 30, display: "flex", width: 34, height: 34, background: "#000000" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "2px solid #000000", fontSize: 17, letterSpacing: 3 }}>
          <span>CLONEEU ●</span>
          <span>SOFTWARE ENGINEER</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: 800 }}>
          <span style={{ fontSize: 82, fontWeight: 300, lineHeight: 0.95, letterSpacing: -5 }}>I build software</span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 88, fontStyle: "italic", lineHeight: 0.95, letterSpacing: -4 }}>to keep learning.</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18 }}>
          <span>ALEXANDRO / SYSTEMS ENGINEERING STUDENT</span>
          <span style={{ display: "flex", padding: "11px 18px", borderRadius: 999, background: "#000000", color: "#ffffff" }}>GITHUB ↗</span>
        </div>
      </div>
    </div>,
    size,
  );
}
