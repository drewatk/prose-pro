import { readdirSync, statSync, exists } from "fs";
import path from "path";
import { projCons } from "./constants";

/**
 * Lists the projects in the given directory name
 * @param {string} dirName
 */
export default function listProjects(dirName) {
  const validRepos = readdirSync(dirName)
    .filter(file => statSync(path.join(dirName, file)).isDirectory())
    .filter(dir =>
      exists(path.join(dir, projCons.metadataDir, projCons.projFile))
    );
  console.log(validRepos);
  // TODO: returning all directories because the final filter block is not returning any directories.
  return readdirSync(dirName).filter(file =>
    statSync(path.join(dirName, file)).isDirectory()
  );
}
