# vite-plugin-iotarouter

Vite plugin for iotarouter route generation.

## Usage

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
import { RouterProvider } from "iotarouter";
import Route from "virtual:routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <Route fallback={<div>Loading...</div>} />
    </RouterProvider>
  </StrictMode>
);
```

