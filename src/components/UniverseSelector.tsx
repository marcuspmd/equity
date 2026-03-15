import { motion } from "motion/react";
import { Category, categories } from "../data/timeline";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface UniverseSelectorProps {
  currentCategory: Category;
  onSelect: (category: Category) => void;
  color: string;
}

export function UniverseSelector({
  currentCategory,
  onSelect,
  color,
}: UniverseSelectorProps) {
  return (
    <div className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 sm:gap-6 z-50">
      {categories.map((category) => {
        const isActive = category === currentCategory;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className="group relative flex items-center min-w-11 min-h-11 -ml-3 pl-3"
          >
            <div
              className={twMerge(
                "w-2 h-2 rounded-full transition-all duration-500 shrink-0",
                isActive ? "scale-150" : "bg-white/30 group-hover:bg-white/60",
              )}
              style={
                isActive
                  ? {
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}`,
                    }
                  : {}
              }
            />
            <span
              className={twMerge(
                "absolute left-6 text-xs sm:text-sm font-medium tracking-widest uppercase transition-all duration-500 whitespace-nowrap",
                isActive
                  ? "opacity-100 translate-x-0"
                  : "text-white/30 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0",
              )}
              style={isActive ? { color } : {}}
            >
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
}
