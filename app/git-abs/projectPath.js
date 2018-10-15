import path from "path";
import { rootDir } from "./constants";

const getProjectPath = projectName => {
  return path.join(rootDir, projectName);
};

export default getProjectPath;
