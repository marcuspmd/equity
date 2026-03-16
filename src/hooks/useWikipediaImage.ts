import { imageMap } from "../data/imageMap";

const getImageUrl = (path: string): string => {
  if (!path) return "";
  const baseUrl = (import.meta as any).env.BASE_URL || "/";
  return `${baseUrl.replace(/\/$/, "")}${path}`;
};

export function useWikipediaImage(id: string): string {
  const path = imageMap[id] ?? "";
  return getImageUrl(path);
}

export function useImageUrl(imagePath: string): string {
  return getImageUrl(imagePath);
}
