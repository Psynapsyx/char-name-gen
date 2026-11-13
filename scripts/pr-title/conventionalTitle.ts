// Checks that a pull request title is a Conventional Commit, e.g.
// `feat: add dwarf names (#12)` or `chore(deps): bump vite`.
// Used by .github/workflows/pr-title.yml. PRs are squash-merged with the PR
// title as the commit title, so the title is what lands on `main`.
//
// This module must stay free of Node APIs and dependencies: the workflow
// imports it directly with Node's built-in TypeScript type stripping.

/** Commit types allowed by CLAUDE.md ("How work flows", step 4). */
export const ALLOWED_TYPES = ['feat', 'fix', 'test', 'refactor', 'docs', 'chore', 'ci'] as const;

/** Where the commit rules are written down. Linked from the failure message. */
export const RULES_URL =
  'https://github.com/Psynapsyx/char-name-gen/blob/main/CLAUDE.md#how-work-flows';

export type TitleCheck = { ok: true } | { ok: false; problems: string[] };

// type, optional (scope), optional ! for a breaking change, then ":" and the
// rest. The rest is checked separately so the messages can be specific.
const TITLE = /^(?<type>[A-Za-z]+)(?:\((?<scope>[^()]*)\))?(?<breaking>!)?:(?<rest>.*)$/;

const allowedList = ALLOWED_TYPES.map((t) => `\`${t}\``).join(', ');

/** Checks a PR title and lists every problem found. */
export function checkPrTitle(title: string): TitleCheck {
  const match = TITLE.exec(title.trim());
  if (!match?.groups) {
    return {
      ok: false,
      problems: [
        `The title must start with \`<type>: \` or \`<type>(<scope>): \`. Allowed types: ${allowedList}.`,
      ],
    };
  }

  const { type, scope, rest } = match.groups;
  const problems: string[] = [];

  if (!(ALLOWED_TYPES as readonly string[]).includes(type)) {
    if ((ALLOWED_TYPES as readonly string[]).includes(type.toLowerCase())) {
      problems.push(`The type \`${type}\` must be lowercase: \`${type.toLowerCase()}\`.`);
    } else {
      problems.push(`\`${type}\` is not an allowed type. Use one of ${allowedList}.`);
    }
  }
  if (scope !== undefined && scope.trim() === '') {
    problems.push('The scope in `()` is empty. Remove the brackets or put a scope in them.');
  }
  if (rest.trim() === '') {
    problems.push('The description after the colon is missing.');
  } else if (!rest.startsWith(' ')) {
    problems.push('Put a space after the colon, e.g. `feat: add elves`.');
  }

  return problems.length === 0 ? { ok: true } : { ok: false, problems };
}

/** Builds the message shown when the check fails. */
export function formatFailureMessage(
  title: string,
  problems: readonly string[],
  rulesUrl: string = RULES_URL,
): string {
  return [
    `The PR title "${title}" is not a Conventional Commit:`,
    '',
    ...problems.map((p) => `- ${p}`),
    '',
    'Example: `feat: add dwarf syllable table (#12)`.',
    `See the commit rules: ${rulesUrl}`,
    'Edit the PR title to re-run this check. No new push is needed.',
  ].join('\n');
}
