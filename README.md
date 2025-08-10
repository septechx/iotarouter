# iotarouter

Tiny (19kB) file-based router for React.

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
