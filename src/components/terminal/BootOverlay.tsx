"use client";

import { BlackHoleLoader } from "@/components/terminal/BlackHoleLoader";
import type { BootPhase } from "@/hooks/useBootSequence";

const postLines = [
  "CLONEEU BIOS v3.1.84",
  "VIDEO ........... CRT PHOSPHOR ARRAY",
  "MEMORY CHECK .... 640K OK",
  "MOUNTING ........ /PORTFOLIO",
  "STARTING ........ COMMAND INTERFACE",
] as const;

interface BootOverlayProps {
  phase: Exclude<BootPhase, "ready">;
  onSkip: () => void;
}

const phaseLabels: Record<BootOverlayProps["phase"], string> = {
  checking: "Checking previous system state",
  "black-hole": "Initializing singularity bootstrap",
  "power-on": "Powering on CRT display",
  post: "Running system checks",
};

export function BootOverlay({ phase, onSkip }: BootOverlayProps) {
  return (
    <div className={`boot-overlay boot-overlay--${phase}`}>
      <p className="sr-only" role="status" aria-live="polite">
        {phaseLabels[phase]}
      </p>

      {phase === "black-hole" && (
        <>
          <BlackHoleLoader />
          <div className="boot-loader-copy">
            <p>SINGULARITY BOOTSTRAP</p>
            <span>CALIBRATING EVENT HORIZON</span>
            <div className="boot-loader-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </>
      )}

      {phase === "power-on" && (
        <div className="boot-power-line" aria-hidden="true">
          <span />
        </div>
      )}

      {phase === "post" && (
        <div className="boot-post" aria-hidden="true">
          {postLines.map((line, index) => (
            <p key={line} style={{ animationDelay: `${index * 180}ms` }}>
              <span>[{String(index).padStart(2, "0")}]</span> {line}
            </p>
          ))}
          <p className="boot-post__ready" style={{ animationDelay: "1050ms" }}>
            <span>[OK]</span> SYSTEM READY<span className="boot-post__cursor">_</span>
          </p>
        </div>
      )}

      {phase !== "checking" && (
        <button type="button" className="boot-skip" onClick={onSkip}>
          SKIP <kbd>ESC</kbd>
        </button>
      )}
    </div>
  );
}
