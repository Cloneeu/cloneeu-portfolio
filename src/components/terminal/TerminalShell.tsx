"use client";

import { BootOverlay } from "@/components/terminal/BootOverlay";
import { CrtShader } from "@/components/terminal/CrtShader";
import { CrtWarpFilter } from "@/components/terminal/CrtWarpFilter";
import { TerminalConsole } from "@/components/terminal/TerminalConsole";
import { useBootSequence } from "@/hooks/useBootSequence";

export function TerminalShell() {
  const { phase, skipBoot } = useBootSequence();
  const isReady = phase === "ready";

  return (
    <main className={`crt-workspace crt-workspace--${phase}`}>
      <div className="crt-ambient-glow" aria-hidden="true" />
      <CrtWarpFilter />

      <section className="crt-terminal" aria-label="Cloneeu personal terminal">
        <div className="crt-screen">
          <CrtShader />
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
