import path from 'node:path';
import { fileURLToPath } from 'node:url';

import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { intlayer } from 'vite-intlayer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: '/ats-resume-builder/',
  plugins: [
    devtools(),
    react(),
    babel({
      presets: [reactCompilerPreset()],
      plugins: !process.env.VITEST
        ? [['babel-plugin-react-remove-properties', { properties: ['data-testid', 'data-test'] }]]
        : [],
    }),
    tailwindcss(),
    intlayer(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
