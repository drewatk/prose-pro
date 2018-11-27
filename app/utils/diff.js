import { diffLines } from "diff";

const diffColor = line => (line.added ? "+" : line.removed ? "-" : "");

/**
 * Accepts a color and wraps the line with a span component with a background color of color
 * @param {String} color
 * @param {String} line
 */
const wrapWithStyle = (color, line) => `<span>${color}</span>${line}`;

/**
 * Accepts two html strings, runs the diff and wraps each line with diff color scheme.
 * @param {String} v1
 * @param {String} v2
 */
const diff = (v1, v2) =>
  console.log(diffLines(v1, v2)) ||
  diffLines(v1, v2).map(line => wrapWithStyle(diffColor(line), line.value));

export default diff;
