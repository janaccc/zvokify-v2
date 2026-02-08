import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: './tests/components',
  // Component testing config
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
        ctPort: 3100,
        ctViteConfig: {
          // Tvoja Vite konfiguracija, če uporabljaš Next.js + @vitejs/plugin-react
        },
      },
    },
  ],
});
//