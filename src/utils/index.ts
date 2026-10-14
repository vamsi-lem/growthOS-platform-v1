import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom font-size tokens from globals.css (@theme),
// otherwise `text-title-sm` / `text-theme-xs` are mistaken for colours and dropped
// when combined with a `text-gray-*` class.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["title-2xl", "title-xl", "title-lg", "title-md", "title-sm", "theme-xl", "theme-sm", "theme-xs"],
        },
      ],
    },
  },
});

/**
 * Combines and merges Tailwind CSS class names with conditional logic.
 * @example
 * cn("bg-white", isActive && "text-black", "px-4") → "bg-white text-black px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
