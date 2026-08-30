"use client";

import { useEffect, useRef } from "react";
import {
  PHOSPHOR_PRESETS,
  useTerminalPreferences,
} from "@/components/terminal/TerminalPreferences";

export function SettingsOutput() {
  const { phosphor, selectPreset, setCustomColor, resetPhosphor } =
    useTerminalPreferences();
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      panelRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      ref={panelRef}
      className="settings-panel"
      tabIndex={-1}
      aria-labelledby="settings-panel-title"
    >
      <header className="settings-panel__header">
        <div>
          <span>[MOUNTED] /SYSTEM/DISPLAY.CONFIG</span>
          <h2 id="settings-panel-title">PHOSPHOR CALIBRATION</h2>
        </div>
        <p>[TAB] NAVIGATE&nbsp;&nbsp; [ENTER] APPLY</p>
      </header>

      <div className="settings-panel__layout">
        <div>
          <p className="settings-panel__label">FACTORY PROFILES</p>
          <div className="settings-presets">
            {PHOSPHOR_PRESETS.map((preset, index) => {
              const selected = phosphor.hex.toLowerCase() === preset.hex.toLowerCase();

              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`settings-preset${selected ? " settings-preset--selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => selectPreset(preset.id)}
                >
                  <span className="settings-preset__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="settings-preset__swatch"
                    style={{ backgroundColor: preset.hex }}
                    aria-hidden="true"
                  />
                  <span>
                    <strong>{preset.label}</strong>
                    <small>{preset.description}</small>
                  </span>
                  <span className="settings-preset__state">
                    {selected ? "ACTIVE" : "STANDBY"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="settings-custom-color">
            <label htmlFor="custom-phosphor-color">
              <span>CUSTOM SIGNAL</span>
              <input
                id="custom-phosphor-color"
                type="color"
                value={phosphor.hex}
                onChange={(event) => setCustomColor(event.target.value)}
              />
            </label>
            <output htmlFor="custom-phosphor-color">{phosphor.hex.toUpperCase()}</output>
          </div>
        </div>

        <aside className="settings-preview" aria-label="Phosphor preview">
          <div className="settings-preview__screen">
            <span>DISPLAY TEST // {phosphor.label}</span>
            <strong>Aa 01</strong>
            <p>THE QUICK BROWN FOX</p>
            <div aria-hidden="true">████████░░</div>
          </div>
          <dl>
            <div>
              <dt>SIGNAL</dt>
              <dd>{phosphor.hex.toUpperCase()}</dd>
            </div>
            <div>
              <dt>PROFILE</dt>
              <dd>{phosphor.id.toUpperCase()}</dd>
            </div>
            <div>
              <dt>STORAGE</dt>
              <dd>LOCAL // AUTO-SAVED</dd>
            </div>
          </dl>
          <button type="button" className="settings-reset" onClick={resetPhosphor}>
            RESTORE FACTORY GREEN
          </button>
        </aside>
      </div>
    </section>
  );
}
