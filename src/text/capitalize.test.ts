import { describe, expect, it } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('capitalizes the first letter and lowercases the rest', () => {
    expect(capitalize('tHORIN')).toBe('Thorin');
  });

  it('leaves an already capitalized word unchanged', () => {
    expect(capitalize('Elrond')).toBe('Elrond');
  });

  it('handles a single letter', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('returns an empty string unchanged', () => {
    expect(capitalize('')).toBe('');
  });
});
