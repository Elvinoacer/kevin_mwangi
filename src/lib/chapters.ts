/**
 * The journey map — chapters of the scroll experience.
 * Sections declare themselves with data-chapter="<key>"; the ChapterHUD
 * tracks the active chapter and renders the journey rails.
 */
export const CHAPTERS = [
  { key: "arrival", index: "00", name: "Arrival", targetId: "hero" },
  { key: "signal", index: "01", name: "Signal", targetId: "manifesto" },
  { key: "proof", index: "02", name: "Proof", targetId: "proof" },
  { key: "works", index: "03", name: "Works", targetId: "projects" },
  { key: "path", index: "04", name: "Path", targetId: "experience" },
  { key: "craft", index: "05", name: "Craft", targetId: "craft" },
  { key: "human", index: "06", name: "Human", targetId: "about" },
  { key: "contact", index: "07", name: "Contact", targetId: "contact" },
] as const;

export type ChapterKey = (typeof CHAPTERS)[number]["key"];

export function chapterByKey(key: string) {
  return CHAPTERS.find((c) => c.key === key);
}
