Work on GitHub issue #$ARGUMENTS. Read it with `gh issue view $ARGUMENTS` (including comments) and follow CLAUDE.md.

Before anything else, move the issue to "In progress" on the project board (see "Board status" below).

Propose a plan first: files to change, commands to run, and how each acceptance criterion or "Done when" item will be verified.
After approval: branch, implement with tests, run lint and all tests, commit, push, and open a PR using the template. Don't merge.
Once the PR is open, move the issue to "In review".

## Board status

The board is project 1 owned by `Psynapsyx`, with a single-select field named "Status".

1. Get the item ID, adding the issue to the board if it isn't there yet (this is safe to run when it's already on the board):
   `gh project item-add 1 --owner Psynapsyx --url <issue URL> --format json --jq .id`
2. Look up the IDs by name, not from memory: the project ID with `gh project view 1 --owner Psynapsyx --format json --jq .id`, and the "Status" field and option IDs with `gh project field-list 1 --owner Psynapsyx --format json`.
3. Set the status:
   `gh project item-edit --id <item ID> --project-id <project ID> --field-id <Status field ID> --single-select-option-id <option ID>`

If a board update fails, say so and carry on with the work. Don't move the issue to "Done"; GitHub does that when the PR is merged.
