# Repository settings

Some of the rules this project relies on live in GitHub's repository settings, not in files. A repo
made from this one as a template (#31) does **not** copy them, so they're written down here to be
repeated by hand.

Current as of #33. If you change a setting on GitHub, update this file in the same PR.

## Ruleset: Protect main

This ruleset enforces the "never push to `main`" and "CI must pass" rules from `CLAUDE.md`. Agents
push with the owner's credentials, so without it nothing would stop a mistaken direct push.

The exported ruleset is in [`rulesets/protect-main.json`](rulesets/protect-main.json).

### Import it (quickest)

1. **Settings > Rules > Rulesets > New ruleset > Import a ruleset.**
2. Choose `docs/rulesets/protect-main.json` and click **Create**.
3. Open a PR and check that both required checks show as "Required".

Or with the GitHub CLI, from the repo root (replace `OWNER/REPO`):

```sh
gh api -X POST repos/OWNER/REPO/rulesets --input docs/rulesets/protect-main.json
```

To update an existing ruleset, use `-X PUT repos/OWNER/REPO/rulesets/<ruleset id>` instead. You can
find the id with `gh api repos/OWNER/REPO/rulesets`.

### Create it by hand

**Settings > Rules > Rulesets > New ruleset > New branch ruleset**, then:

| Setting                                                       | Value                                                  |
| ------------------------------------------------------------- | ------------------------------------------------------ |
| Ruleset name                                                  | `Protect main`                                         |
| Enforcement status                                            | Active                                                 |
| Bypass list                                                   | Empty (nobody, including admins)                       |
| Target branches                                               | **Add target > Include default branch**                |
| Restrict deletions                                            | On                                                     |
| Require a pull request before merging                         | On                                                     |
| ↳ Required approvals                                          | **0**                                                  |
| ↳ Dismiss stale approvals / code owners / last-push / threads | Off                                                    |
| ↳ Allowed merge methods                                       | **Squash** only                                        |
| Require status checks to pass                                 | On                                                     |
| ↳ Require branches to be up to date before merging            | **Off**                                                |
| ↳ Status checks (source: GitHub Actions)                      | `Lint, test and build` and `Conventional Commit title` |
| Block force pushes                                            | On                                                     |
| Everything else                                               | Off                                                    |

To add a status check, type its name in **Add checks** and pick the GitHub Actions entry. A check only
shows in the list once it has run at least once in the repo, so open a PR first if it's missing.

### Why these values

- **0 required approvals.** Agents open PRs with the owner's account, and GitHub doesn't let you
  approve your own PR, so requiring 1 approval would block every merge. Review still happens; GitHub
  just doesn't count it.
- **Squash only.** This matches the repo's merge setting (below). The PR title becomes the commit on
  `main`, which is why the PR title check exists.
- **Branches don't need to be up to date.** With this on, every open PR has to pull in `main` and run
  CI again after each merge, even if it touches unrelated files. That catches two PRs that pass on
  their own but break once combined. Here PRs merge one at a time and CI runs again on every push to
  `main`, so the extra cost isn't worth it. To turn it on, set
  `strict_required_status_checks_policy` to `true` in the JSON.
- **Required checks are pinned to GitHub Actions** (`integration_id` 15368), so a status posted by
  some other app with the same name can't satisfy them.
- **No bypass list.** Even the owner goes through a PR. A direct push is rejected with
  `GH013: Repository rule violations found for refs/heads/main`.

### Keep check names in sync

A required check matches on the job's `name:`, not the workflow file name:

| Check                       | Defined in                       |
| --------------------------- | -------------------------------- |
| `Lint, test and build`      | `.github/workflows/ci.yml`       |
| `Conventional Commit title` | `.github/workflows/pr-title.yml` |

If you rename one of these jobs, update the ruleset in the same PR. Otherwise the old check is
"expected" forever and no PR can merge.

## Other settings

**Settings > General > Pull Requests**

| Setting                            | Value                                                   |
| ---------------------------------- | ------------------------------------------------------- |
| Allow merge commits                | Off                                                     |
| Allow squash merging               | On, with **Default commit message: Pull request title** |
| Allow rebase merging               | Off                                                     |
| Automatically delete head branches | On                                                      |
| Allow auto-merge                   | Off                                                     |

**Settings > Actions > General > Workflow permissions**

- **Read repository contents and packages permissions** (the default `GITHUB_TOKEN` is read-only;
  workflows ask for more in their own `permissions:` block).
- **Allow GitHub Actions to create and approve pull requests**: off.

**Settings > Pages**

- **Source: GitHub Actions** (deployed by `.github/workflows/deploy.yml`).
- The `github-pages` environment (**Settings > Environments**) only allows deployments from `main`.
