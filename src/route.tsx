import { type ReactNode } from "react";
import { usePath } from "./router";

const pages = import.meta.glob("/src/**/*.tsx", { eager: true });

export function Route({ fallback }: { fallback: ReactNode }) {
  const path = usePath();
  const cleaned = path.replace(/^\/+/, "") || "page";
  const file = `/src/${cleaned}.tsx`;

  const module = pages[file];

  if (!module?.default) {
    return fallback;
  }

  const Page = module.default;
  return <Page />;
}
