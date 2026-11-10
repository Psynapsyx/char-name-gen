import { describe, expect, it } from 'vitest';
import { capitalize } from './capitalize';

describe('capitalize', () => {
  describe('plain words', () => {
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

  describe('hyphenated words', () => {
    it('capitalizes each hyphen-separated part', () => {
      expect(capitalize('jean-luc')).toBe('Jean-Luc');
    });

    it('lowercases the rest of each part', () => {
      expect(capitalize('MARY-KATE-ANNE')).toBe('Mary-Kate-Anne');
    });

    it('keeps leading, trailing and doubled hyphens', () => {
      expect(capitalize('-ana--maria-')).toBe('-Ana--Maria-');
    });
  });

  describe('apostrophes', () => {
    it('capitalizes the letter after an apostrophe', () => {
      expect(capitalize("o'brien")).toBe("O'Brien");
      expect(capitalize("ka'RA")).toBe("Ka'Ra");
    });

    it('handles apostrophes and hyphens together', () => {
      expect(capitalize("o'neil-d'arcy")).toBe("O'Neil-D'Arcy");
    });

    it('capitalizes the first letter after a leading apostrophe', () => {
      expect(capitalize("'tis")).toBe("'Tis");
    });
  });

  describe('punctuation around the word', () => {
    it('capitalizes the first letter inside double quotes', () => {
      expect(capitalize('"bOLT"')).toBe('"Bolt"');
    });

    it('capitalizes the first letter inside parentheses', () => {
      expect(capitalize('(the grey)')).toBe('(The grey)');
    });

    it('leaves a word with no letters unchanged', () => {
      expect(capitalize('42')).toBe('42');
      expect(capitalize('--')).toBe('--');
    });
  });

  describe('accented and non-English letters', () => {
    it('capitalizes a French accented first letter', () => {
      expect(capitalize('éowyn')).toBe('Éowyn');
    });

    it('lowercases French accented letters after the first', () => {
      expect(capitalize('FRANÇOISE')).toBe('Françoise');
    });

    it('handles hyphenated French names with accents', () => {
      expect(capitalize('marie-élise')).toBe('Marie-Élise');
    });

    it('handles Spanish ñ and accented vowels', () => {
      expect(capitalize('ñUÑO')).toBe('Ñuño');
      expect(capitalize('ÁNGEL')).toBe('Ángel');
    });

    it('handles a letter written with a combining accent', () => {
      // "e" + U+0301 COMBINING ACUTE ACCENT, rather than the single character "é".
      expect(capitalize('éowyn')).toBe('Éowyn');
    });

    it('handles German umlauts', () => {
      expect(capitalize('übel')).toBe('Übel');
    });
  });
});
