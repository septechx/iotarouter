# iotarouter

Tiny (3kB) file-based router for React.

## Usage

Using the `import.meta.glob` route provider:

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, Route } from "iotarouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <Route fallback={<div>404</div>} />
    </RouterProvider>
  </StrictMode>
);
```

Using the generated route provider (recommended):

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import iotarouter from "@iotarouter/vite";

export default defineConfig({
  plugins: [react(), iotarouter()],
});
```

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Route from "virtual:routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <Route fallback={<div>Loading...</div>} />
    </RouterProvider>
  </StrictMode>
);
```

```tsx
// src/page.tsx
export default function Page() {
  return <div>Hello world!</div>;
}
```

Place your routes in `src/<route>.tsx` files. The `/` path is mapped to `src/page.tsx`.
Directories wrapped in parentheses are ignored.
