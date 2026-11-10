# CLAUDE.md

Instructions for AI agents (Claude Code and others) working in this repo. Read this before every task.

## Project

**Character Name Generator** — a browser app that generates fantasy character and NPC names by race, theme and tone.

- Owner, lead designer and reviewer: Jameson (@Psynapsyx). Agents implement; Jameson decides and merges.
- Board: https://github.com/users/Psynapsyx/projects/1
- This is also a learning and portfolio project. Favour clear, idiomatic, well-tested code over clever code, and explain non-obvious decisions in PR descriptions.

## Tech stack (planned — scaffolded in Sprint 1)

| Layer | Choice |
| --- | --- |
| Language | TypeScript (strict mode) |
| Build / dev server | Vite |
| Unit tests | Vitest |
| End-to-end tests | Playwright |
| Lint / format | ESLint + Prettier |
| CI | GitHub Actions |
| Hosting | GitHub Pages |

Until the scaffold exists, there is no `package.json`. Do not add frameworks (React, etc.) or extra dependencies without an issue that approves them.

## Commands

```
npm install          # install dependencies
npm run dev          # local dev server
npm run build        # type-check (tsc) + production build to dist/
npm run preview      # serve the production build
npm run lint         # ESLint, zero warnings allowed
npm run format       # Prettier, write changes
npm run format:check # Prettier, check only
npm test             # Vitest unit tests (added in #2)
npm run test:e2e     # Playwright end-to-end tests (added in #3)
```

## How work flows

1. **Every change starts from a GitHub issue.** If there is no issue, stop and ask for one (or draft one for Jameson to approve).
2. **Read the whole issue**, including acceptance criteria and comments. If anything is ambiguous, ask in an issue comment rather than guessing.
3. **Branch from `main`** using `<type>/<issue-number>-<short-slug>`:
   - `feat/12-dwarf-names`, `fix/31-empty-list-crash`, `chore/4-setup-vitest`, `docs/7-readme`, `spike/9-markov-names`
4. **Commit with Conventional Commits:** `feat: add dwarf syllable table (#12)`. Types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`, `ci`. Small, focused commits.
5. **Write or update tests alongside the code** (see Testing below). Run lint and all tests before opening a PR.
6. **Open a pull request** using the PR template. Put `Closes #<issue>` in the body and fill in every section, including "AI involvement".
7. **Never push to `main`, never merge your own PR, never force-push a shared branch.** Jameson reviews and merges.
8. **One issue per PR.** If you find other problems, note them in the PR or draft a new issue; don't fix them in passing.

**Shortcut:** in Claude Code, `/work-issue <number>` (defined in `.claude/commands/work-issue.md`) starts this flow for an issue. It reads the issue and proposes a plan, then waits for approval before branching and implementing.

## Testing

- **Unit tests (Vitest):** all logic, especially name generation. Keep generation logic in pure functions, separate from the DOM, so it is easy to test.
- **Randomness must be testable:** generation functions accept an injectable random source or seed. Tests use a fixed seed and assert exact output, plus property-style checks (length limits, allowed characters, no duplicates within a batch).
- **End-to-end tests (Playwright):** each user-facing acceptance criterion gets at least one E2E test. Use role- and label-based locators (`getByRole`, `getByLabel`), not CSS selectors. Add `data-testid` only when no accessible locator exists.
- Tests live next to the code (`*.test.ts`) for unit tests and in `e2e/` for Playwright.
- Every acceptance criterion should be traceable to a test. Name tests after the behaviour, e.g. `generates 10 unique dwarf names`.
- A bug fix starts with a failing test that reproduces the bug.

## Code conventions

- TypeScript strict mode; avoid `any`.
- Small modules with single responsibilities. Name data (syllable tables, word lists) lives in data files, separate from logic.
- Accessible UI: semantic HTML, labelled controls, keyboard usable.
- Prettier formatting, ESLint clean.

## Security and safety

- Never commit secrets, API keys, tokens or personal data.
- Don't add dependencies without saying why in the PR; prefer well-maintained, widely used packages.
- Don't run destructive git or shell commands (history rewrites, deleting branches or files outside the task) without asking.

## Definition of Done

See [docs/DEFINITION_OF_DONE.md](docs/DEFINITION_OF_DONE.md). A task isn't done until every item there is true.
