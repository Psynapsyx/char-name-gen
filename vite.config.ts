/// <reference types="vitest/config" />
// Vite config. The `test` block configures Vitest, which reads this same file.
import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves the site from https://<user>.github.io/char-name-gen/,
  // so asset URLs need this prefix. It applies to dev and preview too, so every
  // environment serves the app at the same path.
  base: '/char-name-gen/',
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts', 'scripts/**/*.ts'],
      exclude: ['**/*.test.ts'],
    },
  },
});
