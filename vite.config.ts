/// <reference types="vitest/config" />
// Vite config. The `test` block configures Vitest, which reads this same file.
import { defineConfig } from 'vite';
// The app version comes from package.json at build time, so the page can never
// show a stale, hand-typed number. release-please owns the value in package.json.
import packageJson from './package.json' with { type: 'json' };

export default defineConfig({
  // GitHub Pages serves the site from https://<user>.github.io/char-name-gen/,
  // so asset URLs need this prefix. It applies to dev and preview too, so every
  // environment serves the app at the same path.
  base: '/char-name-gen/',
  // Compile-time constants: Vite replaces each identifier with the given code.
  // Values must be JSON-encoded so they land in the bundle as string literals.
  // Types live in src/vite-env.d.ts.
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts', 'scripts/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts'],
    },
  },
});
