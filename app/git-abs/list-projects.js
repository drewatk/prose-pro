import { readdirSync, statSync, exists } from "fs";
import path from "path";
import { projCons } from "./constants";

/**
 * Lists the projects in the given directory name
 * @param {string} dirName
 */
export default function listProjects(dirName) {
  return readdirSync(dirName)
    .filter(file => statSync(path.join(dirName, file)).isDirectory())
    .filter(dir => {
      exists(path.join(dir, projCons.metadataDir, projCons.projFile));
    });
}
