/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import {
  TimelineNode,
  Category,
  categories,
  timelineData,
  categoryColors,
} from "./data/timeline";
import { UniverseSelector } from "./components/UniverseSelector";
import { Timeline } from "./components/Timeline";
import { Background } from "./components/Background";
import { motion, AnimatePresence } from "motion/react";
import { useWikipediaImage } from "./hooks/useWikipediaImage";

export default function App() {
  const [currentCategory, setCurrentCategory] =
    useState<Category>("The Pioneers");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const filteredNodes = timelineData.filter(
    (node) => node.category === currentCategory,
  );
  const selectedNode = filteredNodes[selectedIndex] || null;
  const imageUrl = useWikipediaImage(selectedNode?.id || "");
  const currentColor = categoryColors[currentCategory];

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => Math.min(prev + 1, filteredNodes.length - 1));
  }, [filteredNodes.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNextCategory = useCallback(() => {
    const currentIndex = categories.indexOf(currentCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    setCurrentCategory(categories[nextIndex]);
    setSelectedIndex(0);
  }, [currentCategory]);

  const handlePrevCategory = useCallback(() => {
    const currentIndex = categories.indexOf(currentCategory);
    const prevIndex =
      (currentIndex - 1 + categories.length) % categories.length;
    setCurrentCategory(categories[prevIndex]);
    setSelectedIndex(0);
  }, [currentCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowDown") {
        handleNextCategory();
      } else if (e.key === "ArrowUp") {
        handlePrevCategory();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleNextCategory, handlePrevCategory]);

  // Handle scroll to navigate timeline
  useEffect(() => {
    let timeoutId: number | undefined;
    let lastScrollTime = 0;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < 300) return; // Throttle to 1 scroll per 300ms

      if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
        lastScrollTime = now;
        if (e.deltaY > 0 || e.deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeoutId);
    };
  }, [handleNext, handlePrev]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-white/30">
      <Background
        selectedNode={selectedNode}
        imageUrl={imageUrl}
        color={currentColor}
      />

      <div className="relative z-20 h-screen flex flex-col">
        {/* Header */}
        <header className="p-8 flex justify-between items-center mix-blend-difference z-50">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-light tracking-widest uppercase"
          >
            Equity in Tech
          </motion.h1>
          <div className="text-white/50 text-sm font-mono flex gap-4">
            <span>↑↓ Universe</span>
            <span>←→ Timeline</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative flex flex-col items-center justify-center px-8 md:px-24 pb-48">
          <div className="absolute top-0 left-0 right-0 z-50">
            <UniverseSelector
              currentCategory={currentCategory}
              onSelect={(cat) => {
                setCurrentCategory(cat);
                setSelectedIndex(0);
              }}
              color={currentColor}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
              <h2
                className="text-[12vw] font-black uppercase tracking-tighter mix-blend-overlay select-none transition-colors duration-1000"
                style={{ color: currentColor, opacity: 0.15 }}
              >
                {currentCategory}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Foreground Content */}
          <AnimatePresence mode="wait">
            {selectedNode && (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center z-10 mt-16"
              >
                {/* Image Column */}
                <div className="lg:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={selectedNode.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <div className="text-6xl font-serif font-light text-white/90">
                      {selectedNode.year}
                    </div>
                  </div>
                </div>

                {/* Text Column */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
                  <div>
                    <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-3">
                      {selectedNode.name}
                    </h2>
                    <p
                      className="text-xl md:text-2xl font-medium transition-colors duration-1000"
                      style={{ color: currentColor }}
                    >
                      {selectedNode.title}
                    </p>
                  </div>

                  <div className="w-16 h-[1px] bg-white/30" />

                  <p className="text-lg md:text-xl leading-relaxed text-white/80 font-serif">
                    {selectedNode.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3">
                        Personality
                      </h4>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {selectedNode.personality}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-white/40 mb-3">
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {selectedNode.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm text-white/70 leading-relaxed"
                          >
                            <span
                              className="mr-3 mt-1 transition-colors duration-1000"
                              style={{ color: currentColor }}
                            >
                              •
                            </span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <div className="absolute bottom-0 left-0 right-0 z-50">
          <Timeline
            nodes={filteredNodes}
            selectedIndex={selectedIndex}
            onSelect={(idx) => setSelectedIndex(idx)}
            color={currentColor}
          />
        </div>
      </div>
    </div>
  );
}
