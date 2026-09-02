import { ImageResponse } from "next/og";

export const alt = "Cloneeu software engineer terminal portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "58px",
        background: "#010302",
        color: "#7cff7a",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          border: "2px solid rgba(124,255,122,0.38)",
          boxShadow: "inset 0 0 80px rgba(124,255,122,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 28px",
            borderBottom: "1px solid rgba(124,255,122,0.24)",
            color: "rgba(124,255,122,0.62)",
            fontSize: 20,
            letterSpacing: 3,
          }}
        >
          <span>CLONEEU/OS</span>
          <span>CRT-01</span>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 62px",
          }}
        >
          <span style={{ fontSize: 22, letterSpacing: 5, opacity: 0.68 }}>
            PERSONAL TERMINAL PORTFOLIO
          </span>
          <strong
            style={{
              marginTop: 18,
              fontSize: 82,
              lineHeight: 1,
              letterSpacing: -4,
              textShadow: "0 0 24px rgba(124,255,122,0.38)",
            }}
          >
            CLONEEU_
          </strong>
          <span style={{ marginTop: 28, fontSize: 30, opacity: 0.82 }}>
            SOFTWARE ENGINEER // SYSTEMS ENGINEER
          </span>
          <span style={{ marginTop: 50, fontSize: 20, opacity: 0.48 }}>
            guest@cloneeu:~$ explore portfolio
          </span>
        </div>
      </div>
    </div>,
    size,
  );
}
