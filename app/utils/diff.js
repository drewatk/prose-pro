import { diffLines } from "diff";

const green = "#ccffb3",
  red = "#ff6666";
const diffColor = line => (line.added ? green : line.removed ? red : "");

/**
 * Accepts a color and wraps the line with a span component with a background color of color
 * @param {String} color
 * @param {String} line
 */
const wrapWithStyle = (color, line) =>
  `<div style="background-color: ${color}">${line}</div>`;

/**
 * Accepts two html strings, runs the diff and wraps each line with diff color scheme.
 * @param {String} v1
 * @param {String} v2
 */
const diff = (v1, v2) =>
  diffLines(v1, v2).map(line => wrapWithStyle(diffColor(line), line.value));

export default diff;
