/**
 * Matches the first letter of the word and the first letter after each hyphen,
 * skipping any non-letters in between (quotes, parentheses, apostrophes).
 * `\p{L}` is any Unicode letter, so accented letters like "é" and "ñ" count.
 */
const PART_START = /(^|-)(\P{L}*?)(\p{L})/gu;

/**
 * Lower-cases a word, then upper-cases the first letter of each
 * hyphen-separated part, e.g. "jean-LUC" -> "Jean-Luc", "(éowyn)" -> "(Éowyn)".
 * Apostrophes are not part boundaries: "ka'RA" -> "Ka'ra".
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
