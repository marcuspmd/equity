import { motion } from 'motion/react';
import { TimelineNode } from '../data/timeline';
import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TimelineProps {
  nodes: TimelineNode[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  color: string;
}

export function Timeline({ nodes, selectedIndex, onSelect, color }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && innerRef.current) {
      // +1 because the first child is the horizontal line div
      const selectedNode = innerRef.current.children[selectedIndex + 1] as HTMLElement;
      if (selectedNode) {
        const nodeLeft = selectedNode.offsetLeft;
        const nodeWidth = selectedNode.offsetWidth;
        
        containerRef.current.scrollTo({
          left: nodeLeft + nodeWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-48 flex items-center overflow-x-auto no-scrollbar z-30 px-[50vw]" ref={containerRef}>
      <div className="flex items-center gap-40 relative" ref={innerRef}>
        {/* The horizontal line */}
        <div className="absolute left-0 right-0 h-[1px] bg-white/20 top-1/2 -translate-y-1/2 z-0" />
        
        {nodes.map((node, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              key={node.id}
              onClick={() => onSelect(index)}
              className="relative flex flex-col items-center group z-10 shrink-0"
            >
              <span
                className={twMerge(
                  "absolute -top-10 font-mono text-xs tracking-widest transition-all duration-500",
                  isSelected ? "text-white opacity-100 scale-110" : "text-white/40 opacity-0 group-hover:opacity-100"
                )}
              >
                {node.year}
              </span>
              
              <div
                className={twMerge(
                  "w-4 h-4 rounded-full transition-all duration-500",
                  isSelected 
                    ? "scale-150" 
                    : "bg-white/30 group-hover:bg-white/80 group-hover:scale-125"
                )}
                style={isSelected ? { 
                  backgroundColor: color, 
                  boxShadow: `0 0 20px ${color}` 
                } : {}}
              />
              
              <span
                className={twMerge(
                  "absolute -bottom-10 font-sans text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-500",
                  isSelected ? "text-white opacity-100" : "text-white/40 opacity-0 group-hover:opacity-100"
                )}
              >
                {node.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
