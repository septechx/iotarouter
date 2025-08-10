# iotarouter

Tiny (3kB) file-based router for React.

## Requirements

A bundler with support for the `import.meta.glob` API. E.g. Vite.

## Usage

```tsx
// main.tsx
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

Place your routes in `src/<route>.tsx` files. The `/` path is mapped to `src/page.tsx`.
