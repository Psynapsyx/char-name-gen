import { describe, expect, it } from 'vitest';
import { capitalizeWords } from './capitalizeWords';

describe('capitalizeWords', () => {
  describe('plain words', () => {
    it('capitalizes the first letter and lowercases the rest', () => {
      expect(capitalizeWords('tHORIN')).toBe('Thorin');
    });

    it('leaves an already capitalized word unchanged', () => {
      expect(capitalizeWords('Elrond')).toBe('Elrond');
    });

    it('handles a single letter', () => {
      expect(capitalizeWords('a')).toBe('A');
    });

    it('returns an empty string unchanged', () => {
      expect(capitalizeWords('')).toBe('');
    });
  });

  describe('hyphenated words', () => {
    it('capitalizes each hyphen-separated part', () => {
      expect(capitalizeWords('jean-luc')).toBe('Jean-Luc');
    });

    it('lowercases the rest of each part', () => {
      expect(capitalizeWords('MARY-KATE-ANNE')).toBe('Mary-Kate-Anne');
    });

    it('keeps leading, trailing and doubled hyphens', () => {
      expect(capitalizeWords('-ana--maria-')).toBe('-Ana--Maria-');
    });
  });

  describe('multiple words', () => {
    it('capitalizes every space-separated word', () => {
      expect(capitalizeWords('gandalf the grey')).toBe('Gandalf The Grey');
    });

    it('capitalizes words in an epithet after a name', () => {
      expect(capitalizeWords('thorin (oakenshield the bold)')).toBe(
        'Thorin (Oakenshield The Bold)',
      );
    });

    it('keeps the original whitespace', () => {
      expect(capitalizeWords(' ana  maria	lópez ')).toBe(' Ana  Maria	López ');
    });
  });

  describe('apostrophes', () => {
    it('capitalizes the letter after an apostrophe', () => {
      expect(capitalizeWords("o'brien")).toBe("O'Brien");
      expect(capitalizeWords("ka'RA")).toBe("Ka'Ra");
    });

    it('capitalizes the letter after a curly apostrophe', () => {
      expect(capitalizeWords('o’brien')).toBe('O’Brien');
    });

    it('handles apostrophes and hyphens together', () => {
      expect(capitalizeWords("o'neil-d'arcy")).toBe("O'Neil-D'Arcy");
    });

    it('capitalizes the first letter after a leading apostrophe', () => {
      expect(capitalizeWords("'tis")).toBe("'Tis");
    });
  });

  describe('punctuation around the word', () => {
    it('capitalizes the first letter inside double quotes', () => {
      expect(capitalizeWords('"bOLT"')).toBe('"Bolt"');
      expect(capitalizeWords('"the bold"')).toBe('"The Bold"');
    });

    it('capitalizes the first letter inside parentheses', () => {
      expect(capitalizeWords('(the grey)')).toBe('(The Grey)');
    });

    it('leaves a word with no letters unchanged', () => {
      expect(capitalizeWords('42')).toBe('42');
      expect(capitalizeWords('--')).toBe('--');
    });
  });

  describe('accented and non-English letters', () => {
    it('capitalizes a French accented first letter', () => {
      expect(capitalizeWords('éowyn')).toBe('Éowyn');
    });

    it('lowercases French accented letters after the first', () => {
      expect(capitalizeWords('FRANÇOISE')).toBe('Françoise');
    });

    it('handles hyphenated French names with accents', () => {
      expect(capitalizeWords('marie-élise')).toBe('Marie-Élise');
    });

    it('handles Spanish ñ and accented vowels', () => {
      expect(capitalizeWords('ñUÑO')).toBe('Ñuño');
      expect(capitalizeWords('ÁNGEL')).toBe('Ángel');
    });

    it('handles a letter written with a combining accent', () => {
      // "e" + U+0301 COMBINING ACUTE ACCENT, rather than the single character "é".
      expect(capitalizeWords('éowyn')).toBe('Éowyn');
    });

    it('handles German umlauts', () => {
      expect(capitalizeWords('übel')).toBe('Übel');
    });
  });
});
