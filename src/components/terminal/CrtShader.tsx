"use client";

import { useEffect, useRef } from "react";
import { createWebGLProgram } from "@/lib/webgl/program";

export interface CrtShaderConfig {
  noise: number;
  scanlines: number;
  phosphorMask: number;
  sweep: number;
  flicker: number;
  aberration: number;
  phosphor: readonly [number, number, number];
}

export const DEFAULT_CRT_SHADER_CONFIG: CrtShaderConfig = {
  noise: 0.22,
  scanlines: 0.52,
  phosphorMask: 0.3,
  sweep: 0.24,
  flicker: 0.14,
  aberration: 0.18,
  phosphor: [0.486, 1, 0.478],
};

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_noise;
uniform float u_scanlines;
uniform float u_phosphorMask;
uniform float u_sweep;
uniform float u_flicker;
uniform float u_aberration;
uniform vec3 u_phosphor;
uniform float u_motion;

out vec4 outColor;

float random(vec2 point) {
  return fract(sin(dot(point, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 centered = uv * 2.0 - 1.0;
  float animatedTime = u_time * u_motion;

  float pixelScan = 0.5 + 0.5 * sin(gl_FragCoord.y * 3.14159265);
  float broadScan = 0.5 + 0.5 * sin(gl_FragCoord.y * 0.235 + animatedTime * 0.8);
  float scanDarkness = pow(1.0 - pixelScan, 4.0) * 0.18;
  scanDarkness += pow(1.0 - broadScan, 6.0) * 0.035;
  scanDarkness *= u_scanlines;

  vec2 noiseCell = floor(gl_FragCoord.xy * 0.72);
  float noiseFrame = floor(animatedTime * 24.0);
  float grain = random(noiseCell + noiseFrame) - 0.5;
  float noiseDarkness = max(-grain, 0.0) * u_noise * 0.105;
  float noiseLight = max(grain, 0.0) * u_noise * 0.07;

  float slot = mod(floor(gl_FragCoord.x), 3.0);
  vec3 grille = slot < 1.0
    ? vec3(1.0, 0.12, 0.18)
    : slot < 2.0
      ? vec3(0.15, 1.0, 0.2)
      : vec3(0.18, 0.28, 1.0);
  float maskAmount = u_phosphorMask * 0.022;

  float sweepPosition = fract(animatedTime * 0.047);
  float sweepDistance = abs(uv.y - sweepPosition);
  float sweepLight = exp(-pow(sweepDistance * 72.0, 2.0)) * u_sweep * 0.1;

  float edge = smoothstep(0.48, 1.22, length(centered * vec2(0.76, 1.0)));
  float edgeDarkness = edge * edge * 0.16;

  float flicker = (random(vec2(noiseFrame, 2.71)) - 0.5) * u_flicker * u_motion;
  float fringe = smoothstep(0.55, 1.0, abs(centered.x)) * u_aberration * 0.025;
  vec3 fringeColor = centered.x < 0.0
    ? vec3(0.2, 0.45, 1.0)
    : vec3(1.0, 0.22, 0.16);

  float darkLayer = scanDarkness + noiseDarkness + edgeDarkness;
  float lightLayer = max(0.0, noiseLight + sweepLight + flicker);
  float totalAlpha = clamp(darkLayer + lightLayer + maskAmount + fringe, 0.0, 0.32);
  vec3 lightColor = u_phosphor * (noiseLight + sweepLight) + grille * maskAmount + fringeColor * fringe;
  vec3 color = lightColor / max(totalAlpha, 0.001);
  color = clamp(color, vec3(0.0), vec3(1.0));

  outColor = vec4(color * totalAlpha, totalAlpha);
}
`;

interface CrtShaderProps {
  config?: CrtShaderConfig;
}

export function CrtShader({ config = DEFAULT_CRT_SHADER_CONFIG }: CrtShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
      premultipliedAlpha: true,
    });

    if (!gl) {
      return;
    }

    let program: WebGLProgram;

    try {
      program = createWebGLProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    } catch {
      return;
    }

    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, "a_position");

    if (!positionBuffer || positionLocation < 0) {
      gl.deleteProgram(program);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      noise: gl.getUniformLocation(program, "u_noise"),
      scanlines: gl.getUniformLocation(program, "u_scanlines"),
      phosphorMask: gl.getUniformLocation(program, "u_phosphorMask"),
      sweep: gl.getUniformLocation(program, "u_sweep"),
      flicker: gl.getUniformLocation(program, "u_flicker"),
      aberration: gl.getUniformLocation(program, "u_aberration"),
      phosphor: gl.getUniformLocation(program, "u_phosphor"),
      motion: gl.getUniformLocation(program, "u_motion"),
    };

    gl.uniform1f(uniforms.noise, config.noise);
    gl.uniform1f(uniforms.scanlines, config.scanlines);
    gl.uniform1f(uniforms.phosphorMask, config.phosphorMask);
    gl.uniform1f(uniforms.sweep, config.sweep);
    gl.uniform1f(uniforms.flicker, config.flicker);
    gl.uniform1f(uniforms.aberration, config.aberration);
    gl.uniform3fv(uniforms.phosphor, new Float32Array(config.phosphor));

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    let animationFrame = 0;
    let lastFrameTime = -Infinity;
    let isVisible = !document.hidden;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(bounds.width * pixelRatio));
      const height = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (timestamp: number) => {
      if (!isVisible) {
        return;
      }

      if (timestamp - lastFrameTime >= 1000 / 30 || reducedMotion) {
        resize();
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.time, timestamp / 1000);
        gl.uniform1f(uniforms.motion, reducedMotion ? 0 : 1);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
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

    const resizeObserver = new ResizeObserver(() => {
      resize();

      if (reducedMotion) {
        start();
      }
    });

    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleMotionChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.classList.add("crt-shader--ready");
    start();

    return () => {
      canvas.classList.remove("crt-shader--ready");
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className="crt-shader"
      aria-hidden="true"
    />
  );
}
