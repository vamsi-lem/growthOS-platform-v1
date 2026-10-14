import { Plus_Jakarta_Sans } from "next/font/google";

/** Single typeface for the app. `jakarta.style.fontFamily` is reused by charts so SVG text matches. */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const CHART_FONT = jakarta.style.fontFamily;
