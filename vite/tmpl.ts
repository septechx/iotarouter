import fs from "fs/promises";
import fss from "fs";
import { makeTmpl } from "./tmpl-routes.ts";

export async function generateRoutes(routePath: string): Promise<string> {
  const files = await fs.readdir(routePath);

  const routes: Record<string, string> = {};

  for (const file of files) {
    const parts = file
      .split("/")
      .filter((part: string) => !part.startsWith("(") || !part.endsWith(")"));

    const resolvedFile = routePath + "/" + file;

    if (parts.length > 0) {
      const lastIndex = parts.length - 1;
      const lastPart = parts[lastIndex];

      if (lastPart === "page.tsx" || lastPart === "page.jsx") {
        parts.pop();
      } else if (lastPart.endsWith(".tsx") || lastPart.endsWith(".jsx")) {
        const contents = await fs.readFile(resolvedFile, "utf8");
        if (contents.includes("@IOTA_IGNORE")) {
          continue;
        }

        parts[lastIndex] = lastPart.replace(/\.tsx$/, "").replace(/\.jsx$/, "");
      } else {
        continue;
      }
    }

    const routeKey = parts.join("/");

    routes[routeKey] = resolvedFile;
  }

  const path404 = routePath + "/404.tsx";
  const exists404 = fss.existsSync(path404);

  const template = makeTmpl(routes, exists404 ? path404 : undefined);

  return template;
}
