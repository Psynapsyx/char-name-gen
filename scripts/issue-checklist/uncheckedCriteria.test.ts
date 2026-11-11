import { describe, expect, it } from 'vitest';
import { findUncheckedCriteria, formatReopenComment } from './uncheckedCriteria.ts';

describe('findUncheckedCriteria', () => {
  it('returns unticked items under "Done when"', () => {
    const body = [
      '### What needs doing',
      '',
      'Some work.',
      '',
      '### Done when',
      '',
      '- [x] First thing',
      '- [ ] Second thing',
      '- [ ] Third thing',
    ].join('\n');

    expect(findUncheckedCriteria(body)).toEqual(['Second thing', 'Third thing']);
  });

  it('returns unticked items under "Acceptance criteria"', () => {
    const body = '### Acceptance criteria\n\n- [ ] Shows ten names\n- [x] Has a button';

    expect(findUncheckedCriteria(body)).toEqual(['Shows ten names']);
  });

  it('treats [x] and [X] as ticked', () => {
    const body = '### Done when\n\n- [x] lower\n- [X] upper';

    expect(findUncheckedCriteria(body)).toEqual([]);
  });

  it('ignores checkboxes in other sections', () => {
    const body = [
      '### Notes',
      '',
      '- [ ] Not a criterion',
      '',
      '### Done when',
      '',
      '- [x] Done',
      '',
      '### Notes, designs, references',
      '',
      '- [ ] Also not a criterion',
    ].join('\n');

    expect(findUncheckedCriteria(body)).toEqual([]);
  });

  it('keeps subheadings inside the criteria section', () => {
    const body = [
      '## Done when',
      '',
      '### After merge',
      '',
      '- [ ] Run it on main',
      '',
      '## Notes',
      '',
      '- [ ] Ignored',
    ].join('\n');

    expect(findUncheckedCriteria(body)).toEqual(['Run it on main']);
  });

  it('matches headings case-insensitively at any level', () => {
    expect(findUncheckedCriteria('# done WHEN\n- [ ] One')).toEqual(['One']);
  });

  it('counts nested items and other list markers', () => {
    const body = '### Done when\n\n* [ ] Star\n+ [ ] Plus\n  - [ ] Nested';

    expect(findUncheckedCriteria(body)).toEqual(['Star', 'Plus', 'Nested']);
  });

  it('handles Windows line endings', () => {
    const body = '### Done when\r\n\r\n- [ ] One\r\n- [x] Two\r\n';

    expect(findUncheckedCriteria(body)).toEqual(['One']);
  });

  it('returns nothing when there is no criteria section', () => {
    expect(findUncheckedCriteria('### Notes\n\n- [ ] Something')).toEqual([]);
  });

  it('returns nothing when the criteria section has no checkboxes', () => {
    expect(findUncheckedCriteria('### Done when\n\nIt works.')).toEqual([]);
  });

  it('returns nothing for an empty body', () => {
    expect(findUncheckedCriteria('')).toEqual([]);
  });

  it('accepts custom headings', () => {
    const body = '### Exit criteria\n\n- [ ] Ship it';

    expect(findUncheckedCriteria(body, ['Exit criteria'])).toEqual(['Ship it']);
  });
});

describe('formatReopenComment', () => {
  it('lists each unticked item as a checkbox', () => {
    const comment = formatReopenComment(['First', 'Second']);

    expect(comment).toContain('- [ ] First\n- [ ] Second');
    expect(comment).toMatch(/^Reopened because/);
  });
});
