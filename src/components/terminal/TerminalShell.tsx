import { CrtShader } from "@/components/terminal/CrtShader";
import { CrtWarpFilter } from "@/components/terminal/CrtWarpFilter";

const systemChecks = [
  "PHOSPHOR DISPLAY ........ ONLINE",
  "MEMORY BANK ............. 640K OK",
  "PORTFOLIO ARCHIVE ....... MOUNTED",
] as const;

const directories = ["ABOUT", "SKILLS", "EXPERIENCE", "PROJECTS", "CONTACT"] as const;

export function TerminalShell() {
  return (
    <main className="crt-workspace">
      <div className="crt-ambient-glow" aria-hidden="true" />
      <CrtWarpFilter />

      <section className="crt-terminal" aria-labelledby="terminal-title">
        <div className="crt-screen">
          <CrtShader />
          <div className="crt-scanlines" aria-hidden="true" />
          <div className="crt-glass-reflection" aria-hidden="true" />

          <div className="crt-content">
            <header className="terminal-topbar">
              <span>CLONEEU/OS</span>
              <span className="terminal-topbar__center">PERSONAL TERMINAL</span>
              <span>CRT-01</span>
            </header>

            <div className="terminal-viewport">
              <p className="terminal-eyebrow">CLONEEU PERSONAL COMPUTER SYSTEM</p>
              <h1 id="terminal-title" className="terminal-title">
                SYSTEM READY<span aria-hidden="true">_</span>
              </h1>

              <div className="terminal-rule" aria-hidden="true" />

              <div className="system-checks" aria-label="System status">
                {systemChecks.map((check) => (
                  <p key={check}>
                    <span aria-hidden="true">[ OK ]</span> {check}
                  </p>
                ))}
              </div>

              <section className="terminal-message" aria-labelledby="welcome-title">
                <p id="welcome-title" className="terminal-message__title">
                  WELCOME, VISITOR.
                </p>
                <p>
                  This machine contains the work, experience, and experiments of Alexandro.
                </p>
                <p>The interactive command interface is being initialized.</p>
              </section>

              <section className="directory-list" aria-labelledby="directory-list-title">
                <p id="directory-list-title" className="directory-list__label">
                  AVAILABLE DIRECTORIES
                </p>
                <div className="directory-list__items">
                  {directories.map((directory, index) => (
                    <span key={directory}>
                      <span aria-hidden="true">0{index + 1}/</span>
                      {directory}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <footer className="terminal-commandline">
              <div className="terminal-prompt" aria-label="Terminal prompt">
                <span className="terminal-prompt__user">guest@cloneeu</span>
                <span className="terminal-prompt__path">:~</span>
                <span className="terminal-prompt__symbol">$</span>
                <span className="terminal-cursor" aria-hidden="true" />
              </div>
              <span className="terminal-status">INTERFACE // STANDBY</span>
            </footer>
          </div>
        </div>
      </section>

    </main>
  );
}
