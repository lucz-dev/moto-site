"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 54;
const FPS = 28;
const SRC = (i: number) => `/media/clip/f${String(i).padStart(2, "0")}.jpg`;

/**
 * Plays the in-engine driving capture as a seamless looping clip. Frames are
 * pre-decoded to avoid hitches; on prefers-reduced-motion it holds a still.
 */
export default function DriveClip({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames: HTMLImageElement[] = [];
    let loaded = 0;
    let cancelled = false;

    const draw = (img: HTMLImageElement) => {
      if (!img.naturalWidth) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = SRC(i);
      img.onload = () => {
        loaded++;
        if (i === 0) {
          draw(img);
          setReady(true);
        }
        if (loaded === FRAME_COUNT && !cancelled) start();
      };
      frames[i] = img;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let frame = 0;
    let last = 0;
    const interval = 1000 / FPS;

    function start() {
      if (reduce) return; // hold the first frame
      last = performance.now();
      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        if (now - last < interval) return;
        last = now - ((now - last) % interval);
        frame = (frame + 1) % FRAME_COUNT;
        const img = frames[frame];
        if (img && img.complete) draw(img);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      data-ready={ready}
      aria-hidden="true"
      role="presentation"
    />
  );
}
