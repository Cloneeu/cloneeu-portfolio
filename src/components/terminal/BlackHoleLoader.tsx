"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTerminalPreferences } from "@/components/terminal/TerminalPreferences";

const PARTICLE_COUNT = 2800;

const VERTEX_SHADER = `
attribute float aRadius;
attribute float aAngle;
attribute float aSpeed;
attribute float aSeed;
attribute float aDepth;

uniform float uTime;
uniform float uAspect;
uniform float uPixelRatio;

varying float vSeed;
varying float vBrightness;

void main() {
  float sequenceProgress = clamp(uTime / 2.6, 0.0, 1.0);
  float collapse = smoothstep(0.58, 1.0, sequenceProgress);
  float finalRadius = 0.012 + aSeed * 0.035;
  float radius = mix(aRadius, finalRadius, collapse);
  float orbitalVelocity = 0.24 + aSpeed * (0.72 / (aRadius + 0.1));
  float angle = aAngle + uTime * orbitalVelocity + collapse * (5.0 + aSeed * 8.0);
  float turbulence = sin(angle * 3.0 + aSeed * 18.0 + uTime) * 0.012 * (1.0 - collapse);

  vec2 point = vec2(
    cos(angle) * (radius + turbulence),
    sin(angle) * (radius * 0.34 + turbulence) + aDepth * 0.055
  );
  vec2 aspectScale = uAspect > 1.0
    ? vec2(1.0 / uAspect, 1.0)
    : vec2(1.0, uAspect);
  point *= aspectScale;

  gl_Position = vec4(point, 0.0, 1.0);
  gl_PointSize = (1.15 + aSeed * 1.75 + collapse * 1.8) * uPixelRatio;

  float eventHorizonGlow = 1.0 - smoothstep(0.1, 0.32, aRadius);
  vSeed = aSeed;
  vBrightness = 0.48 + eventHorizonGlow * 0.72 + collapse * 0.48;
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec3 uPhosphor;

varying float vSeed;
varying float vBrightness;

void main() {
  vec2 center = gl_PointCoord - 0.5;
  float distanceToCenter = length(center) * 2.0;
  float alpha = smoothstep(1.0, 0.16, distanceToCenter);
  vec3 hotColor = vec3(1.0, 0.9, 0.66);
  vec3 color = mix(uPhosphor, hotColor, pow(vSeed, 5.0) * 0.52);

  gl_FragColor = vec4(color * vBrightness, alpha * min(vBrightness, 1.0));
}
`;

export function BlackHoleLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { phosphor } = useTerminalPreferences();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        premultipliedAlpha: true,
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const radii = new Float32Array(PARTICLE_COUNT);
    const angles = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const seeds = new Float32Array(PARTICLE_COUNT);
    const depths = new Float32Array(PARTICLE_COUNT);
    const random = createSeededRandom(0xc10ee);

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const isEventHorizon = index < PARTICLE_COUNT * 0.24;
      radii[index] = isEventHorizon
        ? 0.115 + random() * 0.13
        : 0.2 + Math.pow(random(), 0.72) * 0.83;
      angles[index] = random() * Math.PI * 2;
      speeds[index] = 0.42 + random() * 1.15;
      seeds[index] = random();
      depths[index] = random() * 2 - 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));
    geometry.setAttribute("aAngle", new THREE.BufferAttribute(angles, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute("aDepth", new THREE.BufferAttribute(depths, 1));

    const uniforms = {
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uPixelRatio: { value: 1 },
      uPhosphor: { value: new THREE.Color(...phosphor.normalizedRgb) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(geometry, material);
    particles.frustumCulled = false;
    scene.add(particles);

    let animationFrame = 0;
    let startTime = performance.now();
    let renderedWidth = 0;
    let renderedHeight = 0;
    let renderedPixelRatio = 0;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
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
      uniforms.uAspect.value = width / height;
      uniforms.uPixelRatio.value = pixelRatio;
    };

    const draw = (timestamp: number) => {
      uniforms.uTime.value = (timestamp - startTime) / 1000;
      renderer.render(scene, camera);
      container.classList.add("black-hole-loader--ready");
      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      window.cancelAnimationFrame(animationFrame);
      container.classList.remove("black-hole-loader--ready");
    };

    const handleContextRestored = () => {
      startTime = performance.now();
      animationFrame = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    resize();
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [phosphor.normalizedRgb]);

  return (
    <div ref={containerRef} className="black-hole-loader" aria-hidden="true">
      <div className="black-hole-loader__fallback" />
      <canvas ref={canvasRef} className="black-hole-loader__canvas" />
      <div className="black-hole-loader__core" />
    </div>
  );
}

function createSeededRandom(initialSeed: number) {
  let seed = initialSeed >>> 0;

  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}
