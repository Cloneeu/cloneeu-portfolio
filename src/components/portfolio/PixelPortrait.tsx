"use client";

import Image from "next/image";
import { animate, motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import portrait from "../../../public/images/alexandro.jpg";

const CANVAS_SIZE = 1125;
const MAX_PIXEL_SIZE = 35;

export function PixelPortrait() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scratchRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const pixelSizeRef = useRef(1);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [latched, setLatched] = useState(false);
  const reduceMotion = useReducedMotion();

  const drawPixelated = useCallback((pixelSize: number) => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas || !image.complete) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const scratch = scratchRef.current ?? document.createElement("canvas");
    scratchRef.current = scratch;
    const sampleSize = Math.max(1, Math.round(CANVAS_SIZE / Math.max(1, pixelSize)));
    scratch.width = sampleSize;
    scratch.height = sampleSize;

    const scratchContext = scratch.getContext("2d");
    if (!scratchContext) return;

    scratchContext.clearRect(0, 0, sampleSize, sampleSize);
    scratchContext.imageSmoothingEnabled = true;
    scratchContext.drawImage(image, 0, 0, sampleSize, sampleSize);

    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    context.imageSmoothingEnabled = false;
    context.drawImage(scratch, 0, 0, sampleSize, sampleSize, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }, []);

  const moveTo = useCallback(
    (target: number, hideWhenDone = false) => {
      animationRef.current?.stop();
      setCanvasVisible(true);

      if (reduceMotion) {
        pixelSizeRef.current = target;
        drawPixelated(target);
        if (hideWhenDone) setCanvasVisible(false);
        return;
      }

      animationRef.current = animate(pixelSizeRef.current, target, {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          pixelSizeRef.current = latest;
          drawPixelated(latest);
        },
        onComplete: () => {
          if (hideWhenDone) setCanvasVisible(false);
        },
      });
    },
    [drawPixelated, reduceMotion],
  );

  const activate = () => moveTo(MAX_PIXEL_SIZE);
  const deactivate = () => {
    if (!latched) moveTo(1, true);
  };

  const togglePixelation = () => {
    const nextLatched = !latched;
    setLatched(nextLatched);
    moveTo(nextLatched ? MAX_PIXEL_SIZE : 1, !nextLatched);
  };

  return (
    <div className="portrait-shell">
      <motion.button
        type="button"
        className="portrait-interaction"
        aria-label="Toggle pixel effect on Alexandro’s portrait"
        aria-pressed={latched}
        onClick={togglePixelation}
        onHoverStart={activate}
        onHoverEnd={deactivate}
        onFocus={activate}
        onBlur={deactivate}
      >
        <Image
          ref={imageRef}
          className="portrait-image"
          src={portrait}
          alt="Alexandro taking a mirror portrait"
          priority={false}
          sizes="(max-width: 760px) 88vw, 460px"
          onLoad={() => drawPixelated(pixelSizeRef.current)}
        />
        <canvas
          ref={canvasRef}
          className={`portrait-canvas${canvasVisible ? " portrait-canvas--visible" : ""}`}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          aria-hidden="true"
        />
        <span className="portrait-grid" aria-hidden="true" />
      </motion.button>
      <span className="portrait-caption">
        <span>PORTRAIT / 001</span>
        <span>460 × 460 PX</span>
      </span>
    </div>
  );
}
