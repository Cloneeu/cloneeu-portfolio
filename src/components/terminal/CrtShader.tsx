"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface CrtShaderConfig {
  noise: number;
  scanlines: number;
  phosphorMask: number;
  sweep: number;
  flicker: number;
  aberration: number;
  curvature: number;
  glass: number;
  vignette: number;
  phosphor: readonly [number, number, number];
}

export const DEFAULT_CRT_SHADER_CONFIG: CrtShaderConfig = {
  noise: 0.2,
  scanlines: 0.82,
  phosphorMask: 0.32,
  sweep: 0.2,
  flicker: 0.12,
  aberration: 0.16,
  curvature: 0.32,
  glass: 0.56,
  vignette: 0.62,
  phosphor: [0.486, 1, 0.478],
};

const VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform float uNoise;
uniform float uScanlines;
uniform float uPhosphorMask;
uniform float uSweep;
uniform float uFlicker;
uniform float uAberration;
uniform float uCurvature;
uniform float uGlass;
uniform float uVignette;
uniform vec3 uPhosphor;
uniform float uMotion;

float random(vec2 point) {
  return fract(sin(dot(point, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 barrelCoordinates(vec2 uv, float amount) {
  vec2 lens = uv * 2.0 - 1.0;
  float radiusSquared = dot(lens, lens);
  lens *= 1.0 + amount * radiusSquared;
  return lens * 0.5 + 0.5;
}

void main() {
  vec2 lens = vUv * 2.0 - 1.0;
  vec2 curvedUv = barrelCoordinates(vUv, uCurvature);
  vec2 curvedLens = curvedUv * 2.0 - 1.0;
  float animatedTime = uTime * uMotion;

  vec2 curvedPixels = curvedUv * uResolution;
  float pixelScan = 0.5 + 0.5 * sin(curvedPixels.y * 3.14159265);
  float broadScan = 0.5 + 0.5 * sin(curvedPixels.y * 0.235 + animatedTime * 0.8);
  float scanDarkness = pow(1.0 - pixelScan, 3.4) * 0.235;
  scanDarkness += pow(1.0 - broadScan, 5.0) * 0.05;
  scanDarkness *= uScanlines;

  vec2 noiseCell = floor(curvedPixels * 0.72);
  float noiseFrame = floor(animatedTime * 24.0);
  float grain = random(noiseCell + noiseFrame) - 0.5;
  float noiseDarkness = max(-grain, 0.0) * uNoise * 0.1;
  float noiseLight = max(grain, 0.0) * uNoise * 0.065;

  float slot = mod(floor(curvedPixels.x), 3.0);
  vec3 grille = slot < 1.0
    ? vec3(1.0, 0.12, 0.18)
    : slot < 2.0
      ? vec3(0.15, 1.0, 0.2)
      : vec3(0.18, 0.28, 1.0);
  float maskAmount = uPhosphorMask * 0.024;

  float sweepPosition = fract(animatedTime * 0.047);
  float sweepDistance = abs(curvedUv.y - sweepPosition);
  float sweepLight = exp(-pow(sweepDistance * 72.0, 2.0)) * uSweep * 0.09;

  float curvedDistance = length(curvedLens * vec2(0.82, 1.0));
  float edge = smoothstep(0.46, 1.13, curvedDistance);
  float edgeDarkness = edge * edge * uVignette * 0.24;
  float lensRim = smoothstep(0.82, 1.14, curvedDistance);

  float outsideX = smoothstep(0.985, 1.035, abs(curvedLens.x));
  float outsideY = smoothstep(0.985, 1.035, abs(curvedLens.y));
  float curvedEdge = max(outsideX, outsideY) * uCurvature;

  float flicker = (random(vec2(noiseFrame, 2.71)) - 0.5) * uFlicker * uMotion;
  float fringe = smoothstep(0.52, 1.0, abs(curvedLens.x)) * uAberration * 0.022;
  vec3 fringeColor = curvedLens.x < 0.0
    ? vec3(0.2, 0.45, 1.0)
    : vec3(1.0, 0.22, 0.16);

  vec2 glassShape = lens * vec2(0.74, 0.92);
  float glassDepth = sqrt(max(0.06, 1.0 - dot(glassShape, glassShape) * 0.62));
  vec3 glassNormal = normalize(vec3(-glassShape.x * 0.58, -glassShape.y * 0.5, glassDepth));
  vec3 glassLight = normalize(vec3(-0.58, 0.68, 1.0));
  vec3 viewDirection = vec3(0.0, 0.0, 1.0);
  float glassSpecular = pow(max(dot(reflect(-glassLight, glassNormal), viewDirection), 0.0), 26.0);
  float glassFresnel = pow(1.0 - max(dot(glassNormal, viewDirection), 0.0), 2.4);

  float diagonalReflection = exp(-pow((vUv.y - (1.08 - vUv.x * 0.34)) * 6.4, 2.0));
  diagonalReflection *= smoothstep(0.02, 0.3, vUv.x) * (1.0 - smoothstep(0.7, 0.98, vUv.x));
  float upperGlass = 1.0 - smoothstep(0.0, 0.58, distance(vUv, vec2(0.24, 1.04)));
  float glassReflection = (
    glassSpecular * 0.075 +
    diagonalReflection * 0.032 +
    upperGlass * 0.018 +
    glassFresnel * 0.026
  ) * uGlass;
  float rimReflection = lensRim * lensRim * uGlass * 0.022;

  float darkLayer = scanDarkness + noiseDarkness + edgeDarkness + curvedEdge * 0.38;
  float lightLayer = max(0.0, noiseLight + sweepLight + flicker + glassReflection + rimReflection);
  float totalAlpha = clamp(darkLayer + lightLayer + maskAmount + fringe, 0.0, 0.5);

  vec3 lightColor = uPhosphor * (noiseLight + sweepLight + glassReflection * 0.35);
  lightColor += vec3(0.68, 0.78, 0.7) * (glassReflection * 0.78 + rimReflection);
  lightColor += grille * maskAmount + fringeColor * fringe;
  vec3 color = lightColor / max(totalAlpha, 0.001);
  color = clamp(color, vec3(0.0), vec3(1.0));

  gl_FragColor = vec4(color, totalAlpha);
}
`;

interface CrtShaderProps {
  config?: CrtShaderConfig;
}

export function CrtShader({ config = DEFAULT_CRT_SHADER_CONFIG }: CrtShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configRef = useRef(config);
  const requestRenderRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    configRef.current = config;
    requestRenderRef.current?.();
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
        premultipliedAlpha: true,
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uNoise: { value: configRef.current.noise },
      uScanlines: { value: configRef.current.scanlines },
      uPhosphorMask: { value: configRef.current.phosphorMask },
      uSweep: { value: configRef.current.sweep },
      uFlicker: { value: configRef.current.flicker },
      uAberration: { value: configRef.current.aberration },
      uCurvature: { value: configRef.current.curvature },
      uGlass: { value: configRef.current.glass },
      uVignette: { value: configRef.current.vignette },
      uPhosphor: { value: new THREE.Color(...configRef.current.phosphor) },
      uMotion: { value: 1 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const screenEffect = new THREE.Mesh(geometry, material);
    screenEffect.frustumCulled = false;
    scene.add(screenEffect);

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const drawingBufferSize = new THREE.Vector2();
    let reducedMotion = reducedMotionQuery.matches;
    let animationFrame = 0;
    let lastFrameTime = -Infinity;
    let isVisible = !document.hidden;
    let renderedWidth = 0;
    let renderedHeight = 0;
    let renderedPixelRatio = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      if (
        width === renderedWidth &&
        height === renderedHeight &&
        pixelRatio === renderedPixelRatio
      ) {
        return;
      }

      renderedWidth = width;
      renderedHeight = height;
      renderedPixelRatio = pixelRatio;
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      renderer.getDrawingBufferSize(drawingBufferSize);
      uniforms.uResolution.value.copy(drawingBufferSize);
    };

    const updateUniforms = (timestamp: number) => {
      const currentConfig = configRef.current;

      uniforms.uTime.value = timestamp / 1000;
      uniforms.uNoise.value = currentConfig.noise;
      uniforms.uScanlines.value = currentConfig.scanlines;
      uniforms.uPhosphorMask.value = currentConfig.phosphorMask;
      uniforms.uSweep.value = currentConfig.sweep;
      uniforms.uFlicker.value = currentConfig.flicker;
      uniforms.uAberration.value = currentConfig.aberration;
      uniforms.uCurvature.value = currentConfig.curvature;
      uniforms.uGlass.value = currentConfig.glass;
      uniforms.uVignette.value = currentConfig.vignette;
      uniforms.uPhosphor.value.setRGB(...currentConfig.phosphor);
      uniforms.uMotion.value = reducedMotion ? 0 : 1;
    };

    const draw = (timestamp: number) => {
      if (!isVisible) {
        return;
      }

      if (timestamp - lastFrameTime >= 1000 / 30 || reducedMotion) {
        updateUniforms(timestamp);
        renderer.render(scene, camera);
        canvas.classList.add("crt-shader--ready");
        lastFrameTime = timestamp;
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const start = () => {
      window.cancelAnimationFrame(animationFrame);

      if (isVisible) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      start();
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      start();
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      window.cancelAnimationFrame(animationFrame);
      canvas.classList.remove("crt-shader--ready");
    };

    const handleContextRestored = () => {
      resize();
      start();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();

      if (reducedMotion) {
        start();
      }
    });

    requestRenderRef.current = start;
    resize();
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", resize);
    reducedMotionQuery.addEventListener("change", handleMotionChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    start();

    return () => {
      requestRenderRef.current = null;
      canvas.classList.remove("crt-shader--ready");
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resize);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="crt-shader" aria-hidden="true" />;
}
