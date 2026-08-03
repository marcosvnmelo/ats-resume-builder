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
      projects: [
        {
          extends: true,
          test: {
            name: { label: 'node', color: 'green' },
            include: ['src/**/*.node.spec.{ts,tsx}'],
            browser: {
              enabled: false,
            },
          },
        },
        {
          extends: true,
          test: {
            name: { label: 'browser', color: 'blue' },
            include: ['src/**/*.browser.spec.{ts,tsx}'],
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              instances: [{ browser: 'chromium' }],
            },
          },
        },
      ],
      coverage: {
        enabled: true,
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.content.ts'],
        reporter: ['html'],
      },
      reporters: ['default', 'html'],
      // Safely externalize heavy Node-only tooling from trying to boot in Chromium
      server: {
        deps: {
          external: ['intlayer', '@rolldown/plugin-babel'],
        },
      },
    },
  }),
);
