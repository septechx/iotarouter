import fs from "fs";
import { lazy, Suspense, type ReactNode } from "react";
import { usePath } from "./router";

function loadPage(path: string) {
  if (fs.existsSync(`./${path}.tsx`)) {
    return lazy(() => import(`./${path}.tsx`));
  }
  if (fs.existsSync(`./${path}/page.tsx`)) {
    return lazy(() => import(`./${path}/page.tsx`));
  }
  // @ts-ignore-next-line
  return lazy(() => import(`./404.tsx`));
}

export function Route({ fallback }: { fallback: ReactNode }) {
  const path = usePath();
  const Page = loadPage(path);

  return (
    <Suspense fallback={fallback}>
      <Page />
    </Suspense>
  );
}
