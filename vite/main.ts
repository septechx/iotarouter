import type { Plugin } from 'vite';
import path from 'path';
import { generateRoutes } from './tmpl.ts';

export default function vitePluginIotarouterVirtual(options?: {
  routePath?: string;
  virtualId?: string;
  debounceMs?: number;
}): Plugin {
  const routePath = options?.routePath ?? 'src';
  const virtualId = options?.virtualId ?? 'virtual:routes.tsx';
  const absRouteDir = path.resolve(process.cwd(), routePath);
  const debounceMs = options?.debounceMs ?? 50;

  let timer: NodeJS.Timeout | null = null;

  async function produce(): Promise<string> {
    const code = await generateRoutes(absRouteDir);
    return code;
  }

  return {
    name: 'vite-plugin-iotarouter',

    resolveId(id) {
      if (id === virtualId) {
        return virtualId;
      }
      return null;
    },

    async load(id) {
      if (id === virtualId) {
        const code = await produce();
        return code;
      }
      return null;
    },

    handleHotUpdate(ctx) {
      const file = ctx.file;
      if (!file) return;
      if (!file.startsWith(absRouteDir)) return;

      if (timer) clearTimeout(timer);
      return new Promise<any[]>((resolve) => {
        timer = setTimeout(async () => {
          timer = null;

          const mod = ctx.server.moduleGraph.getModuleById(virtualId);
          if (mod) {
            ctx.server.moduleGraph.invalidateModule(mod);
            resolve([mod]);
            return;
          }

          resolve([]);
        }, debounceMs);
      });
    },
  };
}
