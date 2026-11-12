# Character Name Generator

A browser app that generates fantasy character and NPC names by race, theme and tone. It is built with AI agents as a learning and portfolio project. See [CLAUDE.md](CLAUDE.md) for how work flows.

Built with TypeScript (strict mode) and Vite, with no UI framework.

**Live site:** https://psynapsyx.github.io/char-name-gen/

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

Then open the URL Vite prints (usually http://localhost:5173/char-name-gen/). The app is served under `/char-name-gen/` everywhere, to match GitHub Pages.

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
| `npm run audit`        | Fail on moderate-or-worse vulnerabilities (via `audit-ci`)  |

Before the first end-to-end run, install the Playwright browser once with `npx playwright install chromium`. After a run, open the HTML report with `npx playwright show-report`.

## Continuous integration

Every pull request and every push to `main` runs [.github/workflows/ci.yml](.github/workflows/ci.yml): dependency audit, lint, format check, unit tests, build and end-to-end tests. If the end-to-end tests fail, the Playwright HTML report is uploaded as a workflow artifact.

The dependency audit uses [audit-ci](https://github.com/IBM/audit-ci) with [audit-ci.jsonc](audit-ci.jsonc). An accepted advisory is allowlisted only for an exact dependency path, so the same advisory through another package still fails. Every entry must give a reason and link the issue that will remove it.

When an issue is closed as completed, [.github/workflows/issue-checklist.yml](.github/workflows/issue-checklist.yml) checks its **Done when** or **Acceptance criteria** section. If any boxes there are still unticked, it reopens the issue and comments with a list of them, and the board moves the issue to **In review** rather than **Done**. To get past it, tick the boxes and close the issue again, remove items that are no longer needed, or close the issue as "not planned". The checkbox logic is in [scripts/issue-checklist/](scripts/issue-checklist/).

## Deployment

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) publishes the site to GitHub Pages. It runs only after CI passes on a push to `main`, and builds the exact commit CI tested. After deploying, it runs the Playwright smoke test against the live URL. It can also be run by hand from the Actions tab.

Vite's `base` is set to `/char-name-gen/` in [vite.config.ts](vite.config.ts) so asset URLs work under the Pages path. To run the end-to-end tests against an already-running site, set `PLAYWRIGHT_BASE_URL`:

```sh
PLAYWRIGHT_BASE_URL=https://psynapsyx.github.io/char-name-gen/ npx playwright test e2e/smoke.spec.ts
```

## License

See [LICENSE](LICENSE).
