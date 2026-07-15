import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  Bike,
  Building2,
  CarFront,
  Cloud,
  Gauge,
  Map,
  PackageCheck,
  PersonStanding,
  RadioTower,
  Smartphone,
  Sparkles,
  Trophy,
  Wrench,
  Zap,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";

export type { Locale };
export type RoadmapStatus = "now" | "development" | "future";

export type RoadmapPhase = {
  status: RoadmapStatus;
  items: readonly string[];
};

export type FeatureCard = {
  id: string;
  icon: LucideIcon;
};

export type GalleryItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  featured?: boolean;
};

export const features: readonly FeatureCard[] = [
  { id: "physics", icon: Gauge },
  { id: "vehicles", icon: CarFront },
  { id: "world", icon: Map },
  { id: "activities", icon: PackageCheck },
  { id: "economy", icon: Wrench },
  { id: "villa", icon: Building2 },
  { id: "walking", icon: PersonStanding },
  { id: "audio", icon: AudioLines },
  { id: "platforms", icon: Smartphone },
  { id: "cloud", icon: Cloud },
];

export const roadmap: readonly RoadmapPhase[] = [
  {
    status: "now",
    items: ["physics", "freeroam", "activities", "garage", "platforms"],
  },
  {
    status: "development",
    items: ["multiplayer", "career", "stunts", "ai", "editor"],
  },
  {
    status: "future",
    items: ["biomes", "dayNight", "ghosts", "music"],
  },
];

export const gallery: readonly GalleryItem[] = [
  { id: "wheelie", src: "/media/wheelie.webp", width: 1920, height: 1080, featured: true },
  { id: "city", src: "/media/city-traffic.webp", width: 1920, height: 1080 },
  { id: "race", src: "/media/race.webp", width: 1920, height: 1080 },
  { id: "workshop", src: "/media/workshop.webp", width: 1920, height: 1080 },
  { id: "villa", src: "/media/villa-showroom.webp", width: 1920, height: 1080, featured: true },
];

export const stats = [
  { value: "29", key: "vehicles", icon: Bike },
  { value: "20", key: "showroom", icon: Building2 },
  { value: "1", key: "island", icon: Map },
  { value: "∞", key: "routes", icon: Zap },
] as const;

export const roadmapIcons: Record<RoadmapStatus, LucideIcon> = {
  now: Trophy,
  development: RadioTower,
  future: Sparkles,
};

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://moto.lucz.dev";
export const GAME_URL =
  process.env.NEXT_PUBLIC_GAME_URL ?? "https://moto-game-eta.vercel.app";
