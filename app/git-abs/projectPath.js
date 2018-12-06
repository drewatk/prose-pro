import path from "path";
import { rootDir } from "./constants";

/**
 * Returns the path to the given project name
 * @param {String} projectName
 */
const getProjectPath = projectName => {
  return path.join(rootDir, projectName);
};

export default getProjectPath;
