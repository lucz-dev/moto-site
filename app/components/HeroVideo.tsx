"use client";

import { useEffect, useRef, useState } from "react";

/** The clip's usable window (s): the recording opens on the start grid and ends mid-corner. */
const START = 1.6;
const END = 11.3;
const FADE = 0.28;

/**
 * In-engine race footage (Porto Badisco coast, NPC riders) looping over its good
 * window with a short dip to navy at the cut. Paused off-screen; on
 * prefers-reduced-motion it stays on the poster until the visitor presses play.
 */
export default function HeroVideo({ className, playLabel, pauseLabel }: { className?: string; playLabel: string; pauseLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [dip, setDip] = useState(false);
  const wanted = useRef(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    wanted.current = !reduce;

    let raf = 0;
    const watch = () => {
      raf = requestAnimationFrame(watch);
      const t = v.currentTime;
      if (t < START - 0.05) v.currentTime = START;
      setDip(t > END - FADE || t < START + 0.12);
      if (t >= END) v.currentTime = START;
    };
    const onPlay = () => {
      setPlaying(true);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(watch);
    };
    const onPause = () => {
      setPlaying(false);
      cancelAnimationFrame(raf);
    };
    const onEnded = () => {
      v.currentTime = START;
      if (wanted.current) void v.play().catch(() => {});
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && wanted.current) void v.play().catch(() => {});
      else if (!e.isIntersecting) v.pause();
    });
    io.observe(v);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      wanted.current = true;
      void v.play().catch(() => {});
    } else {
      wanted.current = false;
      v.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        className={className}
        src="/media/hero/costa.mp4"
        poster="/media/hero/costa-poster.jpg"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className={`hero__dip${dip && playing ? " is-on" : ""}`} aria-hidden="true" />
      <button type="button" className="hero__toggle" onClick={toggle} aria-label={playing ? pauseLabel : playLabel}>
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zm5 0h3v14h-3z" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
        )}
      </button>
    </>
  );
}
