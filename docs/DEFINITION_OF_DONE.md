# Definition of Done

A story, bug or task is **done** only when every item below is true. Agents check these before opening a PR; the reviewer checks them before merging.

## Code

- [ ] Every acceptance criterion in the issue is met
- [ ] Code follows the conventions in [CLAUDE.md](../CLAUDE.md)
- [ ] No unrelated changes in the PR
- [ ] No secrets, keys or personal data committed

## Tests

- [ ] New or changed logic is covered by unit tests
- [ ] Each user-facing acceptance criterion has an end-to-end test
- [ ] Bug fixes include a test that failed before the fix
- [ ] Lint, unit and end-to-end tests all pass locally and in CI

## Review

- [ ] PR template filled in, including "How it was tested" and "AI involvement"
- [ ] Reviewed and approved by Jameson
- [ ] Merged to `main`, and the issue closed by the merge

## Docs

- [ ] README or other docs updated if behaviour, setup or commands changed

## Definition of Ready (before work starts)

An issue is ready for an agent to pick up when:

- [ ] The goal is clear (user story or task description)
- [ ] Acceptance criteria or "Done when" items are written and testable
- [ ] It's small enough to finish in one PR (roughly a day of work or less)
- [ ] It has a type label and a priority label
