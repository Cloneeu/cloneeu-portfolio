"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type BootPhase = "checking" | "black-hole" | "power-on" | "post" | "ready";

export const REBOOT_EVENT = "cloneeu:reboot";
export const BOOT_COMPLETE_EVENT = "cloneeu:boot-complete";

const BOOT_SESSION_KEY = "cloneeu-terminal-booted:v1";

export function useBootSequence() {
  const [phase, setPhase] = useState<BootPhase>("checking");
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const finishBoot = useCallback(() => {
    clearTimers();
    setPhase("ready");
    window.dispatchEvent(new Event(BOOT_COMPLETE_EVENT));
  }, [clearTimers]);

  const runBoot = useCallback(() => {
    clearTimers();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("power-on");
      timersRef.current.push(window.setTimeout(finishBoot, 380));
      return;
    }

    setPhase("black-hole");
    timersRef.current.push(
      window.setTimeout(() => setPhase("power-on"), 2600),
      window.setTimeout(() => setPhase("post"), 3250),
      window.setTimeout(finishBoot, 5100),
    );
  }, [clearTimers, finishBoot]);

  const skipBoot = useCallback(() => {
    try {
      window.sessionStorage.setItem(BOOT_SESSION_KEY, "1");
    } catch {
      // The sequence can still finish when storage is unavailable.
    }

    finishBoot();
  }, [finishBoot]);

  useEffect(() => {
    const initializeFrame = window.requestAnimationFrame(() => {
      let hasBooted = false;

      try {
        hasBooted = window.sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
      } catch {
        // Treat blocked storage as a fresh session.
      }

      if (hasBooted) {
        finishBoot();
        return;
      }

      try {
        window.sessionStorage.setItem(BOOT_SESSION_KEY, "1");
      } catch {
        // The animation does not depend on storage being writable.
      }

      runBoot();
    });

    const handleReboot = () => runBoot();
    window.addEventListener(REBOOT_EVENT, handleReboot);

    return () => {
      window.cancelAnimationFrame(initializeFrame);
      window.removeEventListener(REBOOT_EVENT, handleReboot);
      clearTimers();
    };
  }, [clearTimers, finishBoot, runBoot]);

  useEffect(() => {
    if (phase === "ready" || phase === "checking") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        skipBoot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, skipBoot]);

  return { phase, skipBoot };
}
