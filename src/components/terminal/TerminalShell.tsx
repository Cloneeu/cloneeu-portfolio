"use client";

import dynamic from "next/dynamic";
import { BootOverlay } from "@/components/terminal/BootOverlay";
import { CrtWarpFilter } from "@/components/terminal/CrtWarpFilter";
import { TerminalConsole } from "@/components/terminal/TerminalConsole";
import {
  TerminalPreferencesProvider,
  useTerminalPreferences,
} from "@/components/terminal/TerminalPreferences";
import { useBootSequence } from "@/hooks/useBootSequence";

const CrtShader = dynamic(
  () => import("@/components/terminal/CrtShader").then((module) => module.CrtShader),
  { ssr: false },
);

export function TerminalShell() {
  return (
    <TerminalPreferencesProvider>
      <TerminalMachine />
    </TerminalPreferencesProvider>
  );
}

function TerminalMachine() {
  const { phase, skipBoot } = useBootSequence();
  const { phosphor } = useTerminalPreferences();
  const isReady = phase === "ready";

  return (
    <main className={`crt-workspace crt-workspace--${phase}`}>
      <a className="skip-link" href="#terminal-input">
        Skip to terminal prompt
      </a>
      <div className="crt-ambient-glow" aria-hidden="true" />
      <CrtWarpFilter />

      <section className="crt-terminal" aria-label="Cloneeu personal terminal">
        <div className="crt-screen">
          {isReady && <CrtShader phosphor={phosphor.normalizedRgb} />}
          <div className="crt-scanlines" aria-hidden="true" />
          <div className="crt-glass-reflection" aria-hidden="true" />

          <div className="crt-content" aria-hidden={!isReady} inert={!isReady}>
            <header className="terminal-topbar">
              <span>CLONEEU/OS</span>
              <span className="terminal-topbar__center">PERSONAL TERMINAL</span>
              <span>CRT-01</span>
            </header>

            <TerminalConsole isReady={isReady} />
          </div>

          {!isReady && <BootOverlay phase={phase} onSkip={skipBoot} />}
        </div>
      </section>

    </main>
  );
}
