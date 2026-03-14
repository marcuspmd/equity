import { imageMap } from "../data/imageMap";

export function useWikipediaImage(id: string): string {
  return imageMap[id] ?? "";
}
