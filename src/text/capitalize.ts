/**
 * Matches the first letter of the word and the first letter after each hyphen or apostrophe,
 * skipping any non-letters in between (quotes, parentheses).
 * `\p{L}` is any Unicode letter, so accented letters like "é" and "ñ" count.
 */
const PART_START = /(^|[-'])(\P{L}*?)(\p{L})/gu;

/**
 * Lower-cases a word, then upper-cases the first letter of each
 * part separated by a hyphen or apostrophe,
 * e.g. "jean-LUC" -> "Jean-Luc", "o'brien" -> "O'Brien", "(éowyn)" -> "(Éowyn)".
 */
export function capitalize(word: string): string {
  return word
    .toLowerCase()
    .replace(
      PART_START,
      (_match, boundary: string, prefix: string, letter: string) =>
        boundary + prefix + letter.toUpperCase(),
    );
}
