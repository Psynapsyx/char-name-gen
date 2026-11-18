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

## Releases

Versions, [CHANGELOG.md](CHANGELOG.md) (created with the first release) and [GitHub Releases](https://github.com/Psynapsyx/char-name-gen/releases) are managed by [release-please](https://github.com/googleapis/release-please). Nobody edits the version or the changelog by hand.

1. On every push to `main`, [.github/workflows/release-please.yml](.github/workflows/release-please.yml) reads the commits since the last release. If any of them call for a release, it opens a **Release PR** titled like `chore(main): release 0.2.0`, or updates the one already open. The PR bumps `version` in `package.json` and `package-lock.json` and adds the new entries to `CHANGELOG.md`.
2. CI runs on the Release PR like on any other PR. It's opened with a GitHub App token for this reason (setup in [docs/REPO_SETTINGS.md](docs/REPO_SETTINGS.md#github-app-for-releases)).
3. Nothing is released until the Release PR is merged. Merging it creates a `v*` tag (e.g. `v0.2.0`) and publishes a GitHub Release with the same notes.

The first release is `0.1.0`. Deploys don't wait for releases: the site deploys whenever CI passes on `main`, so the live site can be ahead of the latest release.

### What a commit does to the version

PRs are squash-merged, so the **PR title** is the commit that counts. The squash commit has no body, so mark a breaking change with `!` in the title; a `BREAKING CHANGE:` footer in the PR description is lost.

| PR title                                       | Before 1.0.0              | From 1.0.0                | In the changelog   |
| ---------------------------------------------- | ------------------------- | ------------------------- | ------------------ |
| `fix: ...`                                     | patch (`0.1.0` → `0.1.1`) | patch (`1.2.3` → `1.2.4`) | Bug Fixes          |
| `feat: ...`                                    | minor (`0.1.0` → `0.2.0`) | minor (`1.2.3` → `1.3.0`) | Features           |
| `feat!: ...` or `fix!: ...`                    | minor (`0.1.0` → `0.2.0`) | major (`1.2.3` → `2.0.0`) | ⚠ Breaking Changes |
| `chore:`, `ci:`, `docs:`, `test:`, `refactor:` | none                      | none                      | Not listed         |

Breaking changes only bump the minor version before 1.0.0 (`bump-minor-pre-major` in [release-please-config.json](release-please-config.json)), so the project doesn't jump to `1.0.0` by accident. Commits that don't trigger a release are still part of the next one; they just aren't listed in the changelog.

### Using this repo as a template

A new project made from this repo should start with no releases. Reset these files in its first PR:

- `package.json`: set `"version"` back to `"0.1.0"`, then run `npm install` so `package-lock.json` matches.
- `CHANGELOG.md`: delete it. release-please creates a fresh one with the first release.
- `.release-please-manifest.json`: set it to `{}`. With an empty manifest, the first release uses `initial-version` (`0.1.0`) from `release-please-config.json`.

The new repo also needs its own GitHub App, or the existing App installed on it, plus the variable and secret described in [docs/REPO_SETTINGS.md](docs/REPO_SETTINGS.md#github-app-for-releases).

## License

See [LICENSE](LICENSE).
