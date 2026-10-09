import { Archivo, Barlow, Barlow_Condensed } from "next/font/google";

// Display: Archivo Black Italic, stretched wide — the game menu's heavy italic headings.
const display = Archivo({
  subsets: ["latin"],
  style: "italic",
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

// Body: Barlow, drawn from highway signage — readable, a little technical.
const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// Data and labels: the condensed cut, like the in-game dashboard (Bahnschrift / DIN).
const data = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-data",
  display: "swap",
});

export const FONT_VARIABLES = `${display.variable} ${body.variable} ${data.variable}`;
