/**
 * Formats a semver version for display, e.g. "0.1.0" becomes "v0.1.0".
 */
export function formatVersion(version: string): string {
  return `v${version}`;
}
