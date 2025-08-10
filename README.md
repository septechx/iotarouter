# iotarouter

Tiny router for React.

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
  </StrictMode>,
);
```
