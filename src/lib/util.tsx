/**
 * Capitalizes every word (`/^\w/`) in a string.
 * @param str A string
 * @returns A string with the beginning of every word capitalized
 */
export function capitalize(str: string): string {
  return str.replaceAll(/^\w/g, (c) => c.toUpperCase());
}
