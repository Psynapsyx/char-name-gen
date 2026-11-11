// Finds unticked acceptance-criteria checkboxes in an issue body.
// Used by .github/workflows/issue-checklist.yml to reopen issues that were
// closed (usually by a merged PR) before every criterion was ticked.
//
// This module must stay free of Node APIs and dependencies: the workflow
// imports it directly with Node's built-in TypeScript type stripping.

/** Section headings whose checkboxes count as acceptance criteria. */
export const CRITERIA_HEADINGS = ['Done when', 'Acceptance criteria'];

const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const UNTICKED = /^\s*[-*+]\s+\[ \]\s+(.+?)\s*$/;

/**
 * Returns the text of every unticked checkbox (`- [ ] ...`) found under a
 * criteria heading. A section runs until the next heading of the same or a
 * higher level. Checkboxes in any other section are ignored.
 */
export function findUncheckedCriteria(
  body: string,
  headings: readonly string[] = CRITERIA_HEADINGS,
): string[] {
  const wanted = new Set(headings.map((h) => h.toLowerCase()));
  const unchecked: string[] = [];
  let sectionLevel: number | null = null;

  for (const line of body.split(/\r?\n/)) {
    const heading = HEADING.exec(line);
    if (heading) {
      const level = heading[1].length;
      if (wanted.has(heading[2].toLowerCase())) {
        sectionLevel = level;
      } else if (sectionLevel !== null && level <= sectionLevel) {
        sectionLevel = null;
      }
      continue;
    }

    if (sectionLevel === null) continue;
    const box = UNTICKED.exec(line);
    if (box) unchecked.push(box[1]);
  }

  return unchecked;
}

/** Builds the comment posted when an issue is reopened. */
export function formatReopenComment(unchecked: readonly string[]): string {
  const items = unchecked.map((item) => `- [ ] ${item}`).join('\n');
  return [
    'Reopened because some acceptance criteria are still unticked:',
    '',
    items,
    '',
    'Tick them when they are done and close the issue again. If an item is no longer needed, remove it from the issue, or close the issue as "not planned".',
  ].join('\n');
}
