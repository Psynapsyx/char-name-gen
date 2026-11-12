import { describe, expect, it } from 'vitest';
import {
  ALLOWED_TYPES,
  RULES_URL,
  checkPrTitle,
  formatFailureMessage,
} from './conventionalTitle.ts';

function problemsFor(title: string): string[] {
  const result = checkPrTitle(title);
  return result.ok ? [] : result.problems;
}

describe('checkPrTitle', () => {
  it.each(ALLOWED_TYPES)('accepts the "%s" type', (type) => {
    expect(checkPrTitle(`${type}: do something (#1)`)).toEqual({ ok: true });
  });

  it('allows exactly the types listed in CLAUDE.md', () => {
    expect([...ALLOWED_TYPES]).toEqual(['feat', 'fix', 'test', 'refactor', 'docs', 'chore', 'ci']);
  });

  it.each([
    'chore(deps): bump vite from 8.3.6 to 8.4.0',
    'chore(deps-dev): bump the dev-dependencies group with 3 updates',
    'ci(deps): bump actions/checkout from 4 to 5',
  ])('accepts the Dependabot title "%s"', (title) => {
    expect(checkPrTitle(title)).toEqual({ ok: true });
  });

  it('accepts a breaking-change marker, with or without a scope', () => {
    expect(checkPrTitle('feat!: drop old name format')).toEqual({ ok: true });
    expect(checkPrTitle('feat(api)!: drop old name format')).toEqual({ ok: true });
  });

  it('ignores surrounding whitespace', () => {
    expect(checkPrTitle('  fix: trim names  ')).toEqual({ ok: true });
  });

  it('rejects a type that is not allowed', () => {
    const problems = problemsFor('feature: add elves');

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('`feature` is not an allowed type');
    expect(problems[0]).toContain('`feat`');
  });

  it('rejects an uppercase type and suggests the lowercase one', () => {
    expect(problemsFor('Fix: crash on empty list')).toEqual([
      'The type `Fix` must be lowercase: `fix`.',
    ]);
  });

  it.each([
    ['an issue-template title', '[Task] Check that PR titles follow Conventional Commits'],
    ['plain prose', 'Add dwarf names'],
    ['a space before the colon', 'feat : add dwarf names'],
    ['an empty title', ''],
  ])('rejects %s', (_label, title) => {
    const problems = problemsFor(title);

    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('must start with `<type>: `');
  });

  it('rejects an empty scope', () => {
    expect(problemsFor('feat(): add elves')).toEqual([
      'The scope in `()` is empty. Remove the brackets or put a scope in them.',
    ]);
  });

  it('rejects a missing space after the colon', () => {
    expect(problemsFor('feat:add dwarf names')).toEqual([
      'Put a space after the colon, e.g. `feat: add elves`.',
    ]);
  });

  it('rejects a missing description', () => {
    expect(problemsFor('feat:')).toEqual(['The description after the colon is missing.']);
    expect(problemsFor('feat:   ')).toEqual(['The description after the colon is missing.']);
  });

  it('reports every problem at once', () => {
    expect(problemsFor('feature():  ')).toHaveLength(3);
  });
});

describe('formatFailureMessage', () => {
  it('quotes the title, lists the problems and links to the rules', () => {
    const message = formatFailureMessage('Add elves', ['First problem', 'Second problem']);

    expect(message).toContain('"Add elves" is not a Conventional Commit');
    expect(message).toContain('- First problem\n- Second problem');
    expect(message).toContain(RULES_URL);
  });

  it('links to the "How work flows" section of CLAUDE.md', () => {
    expect(RULES_URL).toMatch(/\/blob\/main\/CLAUDE\.md#how-work-flows$/);
  });

  it('accepts a different rules link', () => {
    expect(formatFailureMessage('x', ['p'], 'https://example.test/rules')).toContain(
      'https://example.test/rules',
    );
  });
});
