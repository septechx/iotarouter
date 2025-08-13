import { type ReactNode } from "react";
import { usePath } from "./router";

const pages = import.meta.glob(["/src/**/*.tsx", "/src/**/*.jsx"], {
  eager: true,
});

const routeMap: Record<string, { default?: React.ComponentType }> = {};

Object.entries(pages).forEach(([filePath, module]) => {
  const parts = filePath
    .replace(/^\/src\//, "")
    .split("/")
    .filter((part) => !part.startsWith("(") || !part.endsWith(")"));

  if (parts.length > 0) {
    const lastIndex = parts.length - 1;
    const lastPart = parts[lastIndex];

    if (lastPart === "page.tsx" || lastPart === "page.jsx") {
      parts.pop();
    } else if (lastPart.endsWith(".tsx") || lastPart.endsWith(".jsx")) {
      parts[lastIndex] = lastPart.replace(/\.tsx$/, "");
    }
  }

  const routeKey = parts.join("/") || "page";

  if (module?.default) {
    routeMap[routeKey] = module;
  }
});

export function Route({ fallback }: { fallback: ReactNode }) {
  const currentPath = usePath().replace(/^\/+/, "") || "page";
  const { default: Page } = routeMap[currentPath] || {};

  return Page ? <Page /> : fallback;
}
