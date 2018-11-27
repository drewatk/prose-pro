import utils from "../utils";
import path from "path";
import { projCons } from "../constants";
import Metadata from "../metadata";

/**
 * Creates a project JSON for the given project name in the metadata folder
 * @param {String} projectName
 */
async function create(projPath) {
  const filePath = path.join(projPath, projCons.metadataDir, projCons.projFile);

  try {
    await utils.createFile(filePath);
    await Metadata.initEmptyConfig(filePath);
  } catch (e) {
    throw new Error(`project-json create: ${e}`);
  }
}

export default { create };
