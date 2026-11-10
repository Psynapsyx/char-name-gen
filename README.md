# Character Name Generator

A browser app that generates fantasy character and NPC names by race, theme and tone. It is built with AI agents as a learning and portfolio project. See [CLAUDE.md](CLAUDE.md) for how work flows.

Built with TypeScript (strict mode) and Vite, with no UI framework.

## Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (required by Vite 8)
- npm (comes with Node.js)

## Setup

```sh
git clone https://github.com/Psynapsyx/char-name-gen.git
cd char-name-gen
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Commands

| Command                | What it does                                                |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Start the local dev server with hot reload                  |
| `npm run build`        | Type-check with `tsc`, then build for production to `dist/` |
| `npm run preview`      | Serve the production build locally                          |
| `npm run lint`         | Run ESLint; fails on any error or warning                   |
| `npm run format`       | Format files with Prettier                                  |
| `npm run format:check` | Check formatting without changing files                     |
| `npm test`             | Run unit tests with Vitest                                  |
| `npm run test:e2e`     | Build, serve and run end-to-end tests with Playwright       |

Before the first end-to-end run, install the Playwright browser once with `npx playwright install chromium`. After a run, open the HTML report with `npx playwright show-report`.

## License

See [LICENSE](LICENSE).
