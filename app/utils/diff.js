import { diffLines } from "diff";

const addedLine = line =>
  `<div style="background: rgba(153, 255, 153, 0.3); border-left-style: solid; border-left-width: 10px; border-left-color: rgba(153, 255, 153, 0.8); padding-left: 10px;" data-test-id="diff-added-line">
      ${line}
   </div>`;

const removedLine = line =>
  `<div style="background: rgba(255, 102, 102, 0.3); border-left-style: solid; border-left-width: 10px; border-left-color: rgba(255, 102, 102, 0.8); padding-left: 10px;" data-test-id="diff-removed-line">
      ${line}
   </div>`;

/**
 * Accepts a line diff object from diff-js and wraps the line with a appropriate styles
 */
const wrapWithStyle = line =>
  line.added
    ? addedLine(line.value)
    : line.removed
      ? removedLine(line.value)
      : line.value;

/**
 * Accepts two html strings, runs the diff and wraps each line with diff color scheme.
 * @param {String} v1
 * @param {String} v2
 */
const diff = (v1, v2) => diffLines(v1, v2).map(line => wrapWithStyle(line));

export default diff;
