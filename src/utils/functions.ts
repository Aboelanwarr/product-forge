/**
 * Slices a string to a maximum length and appends an ellipsis if it exceeds that length.
 *
 * @param {string} txt - The text to be sliced.
 * @param {number} [max=50] - The maximum number of characters to keep before adding ellipsis. Defaults to 50.
 * @returns {string} The sliced text, possibly with an ellipsis.
 */
export function txtSlicer(txt: string, max: number = 50) {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  return txt;
}
