"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export default function HeroMedia({ posterAlt, videoLabel }: { posterAlt: string; videoLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => setLoadVideo(true);
    const schedule = () => {
      timer = setTimeout(start, 6000);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    window.addEventListener("pointerdown", start, { once: true, passive: true });
    window.addEventListener("keydown", start, { once: true });

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("load", schedule);
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !reduceMotion) return;
    video.pause();
    video.currentTime = 0;
  }, [reduceMotion]);

  return (
    <div className="hero-media">
      <Image
        className="hero-media__poster"
        src="/media/wheelie-hero-poster.webp"
        alt={posterAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
      />
      <video
        ref={videoRef}
        className="hero-media__video"
        autoPlay={loadVideo && !reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        poster={loadVideo && !reduceMotion ? "/media/wheelie-hero-poster.webp" : undefined}
        aria-label={videoLabel}
      >
        {loadVideo && !reduceMotion && <source src="/media/moto-montage-v2.webm" type="video/webm" />}
        {loadVideo && !reduceMotion && <source src="/media/moto-montage-v2.mp4" type="video/mp4" />}
      </video>
      <div className="hero-media__scrim" aria-hidden="true" />
      <div className="hero-media__grain" aria-hidden="true" />
    </div>
  );
}
