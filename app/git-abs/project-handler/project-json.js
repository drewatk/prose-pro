import utils from '../utils';
import path from 'path';
import { projCons } from '../constants';
import ProjectConfig from '../project-config';

/**
 * Creates a project JSON for the given project name in the metadata folder
 * @param {String} projectName
 */
async function create(projPath) {
  const filePath = path.join(projPath, projCons.metadataDir, projCons.projFile);

  return utils
    .createFile(filePath)
    .then(() => ProjectConfig.initEmptyConfig(filePath));
}

export default { create };
