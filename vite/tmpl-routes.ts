function makeRoute([routePath, routeName]: [string, string]) {
  return `
  case "/${routePath}":
    return lazy(() => import("${routeName}"))
  `;
}

function makeRoutes(routes: Record<string, string>, defaultRoute: string | undefined) {
  const hasDefault = defaultRoute !== undefined;

  return `
  function loadPage(path: string) {
    switch (path) {
      ${Object.entries(routes).map(makeRoute).join("\n")}
      default:
        ${hasDefault ? `return lazy(() => import("${defaultRoute}"))` : "return () => <div>404</div>"}
    }
  }
  `;
}

export function makeTmpl(routes: Record<string, string>, defaultRoute: string | undefined) {
  return `
  import { lazy, Suspense, type ReactNode } from "react";
  import { usePath } from "iotarouter";

  export default function Route({ fallback }: { fallback: ReactNode }) {
    const path = usePath();
    const Page = loadPage(path);
    
    return (
      <Suspense fallback={fallback}>
        <Page />
      </Suspense>
    );
  }

  ${makeRoutes(routes, defaultRoute)}
  `;
}
