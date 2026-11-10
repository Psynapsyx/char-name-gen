/**
 * Upper-cases the first letter of a word and lower-cases the rest,
 * e.g. "tHORIN" -> "Thorin". Returns an empty string unchanged.
 */
export function capitalize(word: string): string {
  if (word === '') return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
