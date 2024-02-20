import path from "path";

export function urlToAltText(url: string): string {
  const altText = path
    .basename(url)
    .replace(/\..+$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return altText;
}