import { playwright } from '@vitest/browser-playwright';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig, mergeConfig } from 'vitest/config';

// Import your base vite configuration settings
import viteConfig from './vite.config.js';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      // Polyfills Node APIs so browser compilation doesn't crash on createRequire
      nodePolyfills({
        include: ['module', 'path', 'util'],
      }),
    ],
    test: {
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' }],
      },
      coverage: {
        enabled: true,
        include: ['src/**/*.{ts,tsx}'],
        reporter: ['html'],
      },
      reporters: ['default', 'html'],
      ui: true,
      // Safely externalize heavy Node-only tooling from trying to boot in Chromium
      server: {
        deps: {
          external: ['intlayer', '@rolldown/plugin-babel'],
        },
      },
    },
  }),
);
