import { pioneersData } from "./pioneers";
import { earlyCodersData } from "./early-coders";
import { spaceData } from "./space";
import { modernData } from "./modern";
import { justiceData } from "./justice";
import { communityData } from "./community";
import { TimelineNode, Category, categories, categoryColors } from "./types";
import {
  imageAccessibilityMetadata,
  getImageAccessibility,
  getAccessibilityByCategory,
  getAllAccessibilityMetadata,
  type ImageAccessibilityData,
} from "./imageAccessibility";

export type { TimelineNode, Category, ImageAccessibilityData };
export {
  categories,
  categoryColors,
  imageAccessibilityMetadata,
  getImageAccessibility,
  getAccessibilityByCategory,
  getAllAccessibilityMetadata,
};

export const timelineData: TimelineNode[] = [
  ...pioneersData,
  ...earlyCodersData,
  ...spaceData,
  ...modernData,
  ...justiceData,
  ...communityData,
].sort((a, b) => a.year - b.year);
