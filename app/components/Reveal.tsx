"use client";

import { m } from "motion/react";

export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.58, delay, ease: [0.2, 0.72, 0.2, 1] }}
    >
      {children}
    </m.div>
  );
}
