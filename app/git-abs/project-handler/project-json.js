import utils from "../utils";
import path from "path";
import { projCons } from "../constants";
<<<<<<< HEAD
import ProjectConfig from "../project-config";
=======
import Metadata from "../metadata";
>>>>>>> saving

/**
 * Creates a project JSON for the given project name in the metadata folder
 * @param {String} projectName
 */
async function create(projPath) {
  const filePath = path.join(projPath, projCons.metadataDir, projCons.projFile);

<<<<<<< HEAD
  await utils.createFile(filePath);

  await ProjectConfig.initEmptyConfig(filePath);
=======
  return utils
    .createFile(filePath)
    .then(() => Metadata.initEmptyConfig(filePath));
>>>>>>> saving
}

export default { create };
