import nodegit from "nodegit";
import path from "path";
import { projCons } from "app/git-abs/constants";

const { gitDir } = projCons;

/**
 * Creates a Repository (nodegit) object for the git repo in the given project
 * @param {String} projPath
 *
 */
const open = projPath => {
  return nodegit.Repository.open(path.resolve(projPath, gitDir));
};

export default {
  open
};
