"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  PHOSPHOR_PRESETS,
  useTerminalPreferences,
} from "@/components/terminal/TerminalPreferences";

export function SettingsOutput() {
  const { phosphor, selectPreset, setCustomColor, resetPhosphor } =
    useTerminalPreferences();
  const titleId = useId();
  const colorInputId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const [colorMessage, setColorMessage] = useState("");

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
      aria-labelledby={titleId}
    >
      <header className="settings-panel__header">
        <div>
          <span>[MOUNTED] /SYSTEM/DISPLAY.CONFIG</span>
          <h2 id={titleId}>PHOSPHOR CALIBRATION</h2>
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
            <label htmlFor={colorInputId}>
              <span>CUSTOM SIGNAL</span>
              <input
                id={colorInputId}
                type="color"
                value={phosphor.hex}
                onChange={(event) => {
                  const color = event.target.value;

                  if (getContrastRatio(color, "#010603") < 4.5) {
                    setColorMessage(
                      `${color.toUpperCase()} was rejected because it is too dark for readable terminal text.`,
                    );
                    return;
                  }

                  setCustomColor(color);
                  setColorMessage(`${color.toUpperCase()} custom signal applied.`);
                }}
              />
            </label>
            <output htmlFor={colorInputId}>{phosphor.hex.toUpperCase()}</output>
          </div>
          <p className="settings-color-status" role="status" aria-live="polite">
            {colorMessage || "Custom colors require a minimum readable contrast ratio."}
          </p>
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

function getContrastRatio(foreground: string, background: string) {
  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(hex: string) {
  const channels = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels || channels.length !== 3) {
    return 0;
  }

  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4),
  );

  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
}
