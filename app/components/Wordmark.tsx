import Image from "next/image";

// Official horizontal logo (moto/marketing/branding/horizontal.png, variant A, D-32),
// trimmed to the artwork for small sizes. Meant for the navbar and the footer.
export default function Wordmark({ className }: { className?: string }) {
  return (
    <Image
      className={className ? `wordmark ${className}` : "wordmark"}
      src="/brand/logo-horizontal.webp"
      alt="Motor District"
      width={980}
      height={134}
      unoptimized
      preload
    />
  );
}
