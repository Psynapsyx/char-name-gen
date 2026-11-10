/**
 * Matches the first letter of the text and the first letter after each
 * whitespace, hyphen or apostrophe (straight ' or curly ’), skipping any
 * non-letters in between (quotes, parentheses).
 * `\p{L}` is any Unicode letter, so accented letters like "é" and "ñ" count.
 */
const PART_START = /(^|[-'’\s])(\P{L}*?)(\p{L})/gu;

/**
 * Lower-cases a name, then upper-cases the first letter of each part
 * separated by whitespace, a hyphen or an apostrophe, e.g.
 * "jean-LUC" -> "Jean-Luc", "o'brien" -> "O'Brien", "(the grey)" -> "(The Grey)".
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
